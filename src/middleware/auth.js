import { verifyToken } from "../services/jwt.service.js";

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(403).json({ message: "Invalid token" });
  }
  req.user = user;
  next();
};

export default auth;
