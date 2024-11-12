const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errors: ["Acesso negado!"] });
  }

  try {
    // Verifica o token e decodifica suas informações
    const verified = jwt.verify(token, jwtSecret);

    // Verifica se o token foi emitido recentemente (expira após 7 dias)
    if (verified.exp < Date.now() / 1000) {
      return res.status(401).json({ errors: ["Sessão expirada. Faça login novamente."] });
    }

    // Recupera os dados do admin baseado no id do token
    req.admin = await Admin.findById(verified.id).select("-password");

    // Se o token for válido, passa para o próximo middleware ou rota
    next();
  } catch (err) {
    res.status(400).json({ errors: ["O Token é inválido ou expirado!"] });
  }
};

module.exports = authGuard;
