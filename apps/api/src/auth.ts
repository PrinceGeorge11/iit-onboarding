
import { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";

const COOKIE = "iit.sid";
const secret = process.env.JWT_SECRET!;

export function setSession(res: VercelResponse, payload: object) {
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  res.setHeader("Set-Cookie", `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`);
}
export function clearSession(res: VercelResponse) {
  res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}
export function getSession(req: VercelRequest) {
  const cookie = (req.headers.cookie || "").split("; ").find(c => c.startsWith(`${COOKIE}=`));
  const token = cookie?.split("=")[1];
  if (!token) return null;
  try { return jwt.verify(token, secret) as any; } catch { return null; }
}
export function requireAuth(req: VercelRequest, res: VercelResponse) {
  const sess = getSession(req);
  if (!sess) { res.status(401).json({ error: "Unauthorized" }); return null; }
  return sess;
}
