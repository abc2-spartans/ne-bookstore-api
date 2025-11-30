import jwt from "jsonwebtoken";

export function generateToken(username) {
  const secret = process.env.JWT_SECRET || "changeme";
  const payload = { username };
  return jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "1h" });
}

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET || "changeme";
  try {
    return jwt.verify(token, secret, { algorithms: ["HS256"] });
  } catch (err) {
    return null;
  }
}
