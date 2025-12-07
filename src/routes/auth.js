import express from "express";
import { generateToken } from "../services/jwt.service.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Generate JWT token
 *     description: Generate a JWT token for authentication. Send your username in the request body.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *     responses:
 *       200:
 *         description: JWT token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Username required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username required
 */
router.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  const token = generateToken(username);
  res.json({ token });
});

export default router;
