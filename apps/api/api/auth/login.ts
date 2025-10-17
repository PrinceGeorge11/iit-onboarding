
import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../src/db";
import bcrypt from "bcryptjs";
import { setSession } from "../../src/auth";
import { withCORS } from "../../src/cors";

export default withCORS(async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") return res.status(405).end();
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: "Invalid credentials" });
  setSession(res, { uid: user.id, email: user.email, lang: user.lang });
  res.json({ ok: true });
});
