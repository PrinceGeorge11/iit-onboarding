
import { prisma } from "../../src/db";
import bcrypt from "bcryptjs";
export default async function handler(_req, res) {
  const email = "student@hawk.illinoistech.edu";
  const password = await bcrypt.hash("Passw0rd!", 10);
  await prisma.user.upsert({ where: { email }, update: {}, create: { email, password } });
  res.json({ ok: true });
}
