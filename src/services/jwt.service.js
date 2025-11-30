import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export function generateToken(username) {
  let privateKey;
  if (process.env.PRIVATE_KEY) {
    privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
  } else {
    privateKey = fs.readFileSync(
      path.join(process.cwd(), "config/private.pem"),
      "utf8"
    );
  }
  const payload = { username };
  return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn: "1h" });
}
export function verifyToken(token) {
  let publicKey;
  if (process.env.PUBLIC_KEY) {
    publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, "\n");
  } else {
    publicKey = fs.readFileSync(
      path.join(process.cwd(), "config/public.pem"),
      "utf8"
    );
  }
  try {
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  } catch (err) {
    return null;
  }
}
