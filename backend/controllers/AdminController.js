const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// Generate admin token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Register admin
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Verificar se todos os campos necessários foram fornecidos
    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(404)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // Verificar se a senha e a confirmação de senha são iguais
    if (password !== confirmPassword) {
      return res.status(404).json({
        error: "A senha e a confirmação de senha não correspondem.",
      });
    }

    // Verificar se o administrador já existe no banco de dados
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(404)
        .json({ error: "Já existe um administrador com esse e-mail." });
    }

    // Criar um novo administrador no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Novo administrador criado com sucesso." });
  } catch (error) {
    console.error("Erro ao registrar novo administrador:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao registrar novo administrador." });
  }
};

// Get logged in admin
const getCurrentAdmin = async (req, res) => {
  const admin = req.admin;

  res.status(200).json(admin);
};

// Sign admin in
const login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  // Check if admin exists
  if (!admin) {
    res.status(404).json({ errors: ["Administrador não encontrado!"] });
    return;
  }

  // Check if password matches
  if (!(await bcrypt.compare(password, admin.password))) {
    res.status(422).json({ errors: ["Senha inválida!"] });
    return;
  }

  // Return admin with token
  res.status(200).json({
    _id: admin._id,
    token: generateToken(admin._id),
  });
};

// Update admin
const update = async (req, res) => {
  const { name, password } = req.body;

  const reqAdmin = req.admin;

  const admin = await Admin.findById(
    new mongoose.Types.ObjectId(reqAdmin._id)
  ).select("-password");

  if (name) {
    admin.name = name;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    admin.password = passwordHash;
  }

  await admin.save();

  res.status(200).json(admin);
};

// Get admin by id
const getAdminById = async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(new mongoose.Types.ObjectId(id)).select(
    "-password"
  );

  // Check if admin exists
  if (!admin) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  res.status(200).json(admin);
};

module.exports = {
  register,
  getCurrentAdmin,
  login,
  update,
  getAdminById,
};
