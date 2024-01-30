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

// Register admin and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if admin exists
  const admin = await Admin.findOne({ email });

  if (admin) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
    return;
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create admin
  const newAdmin = await Admin.create({
    name,
    email,
    password: passwordHash,
  });

  // If admin was created sucessfully, return the token
  if (!newAdmin) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json({
    _id: newAdmin._id,
    token: generateToken(newAdmin._id),
  });
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
    profileImage: admin.profileImage,
    token: generateToken(admin._id),
  });
};

// Update admin
const update = async (req, res) => {
  const { name, password } = req.body;

  const reqAdmin = req.admin;

  const admin = await Admin.findById(new mongoose.Types.ObjectId(reqAdmin._id)).select(
    "-password"
  );

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

  const admin = await Admin.findById( new mongoose.Types.ObjectId(id)).select(
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