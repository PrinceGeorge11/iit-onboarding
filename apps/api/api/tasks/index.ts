
import { withCORS } from "../../src/cors";
import { prisma } from "../../src/db";
import { requireAuth } from "../../src/auth";

export default withCORS(async (req, res) => {
  const sess = requireAuth(req, res);
  if (!sess) return;

  if (req.method === "GET") {
    const tasks = await prisma.task.findMany({ where: { userId: sess.uid }, orderBy: { createdAt: "desc" } });
    return res.json(tasks);
  }
  if (req.method === "POST") {
    const { title, due } = req.body || {};
    if (!title) return res.status(400).json({ error: "Missing title" });
    const task = await prisma.task.create({ data: { userId: sess.uid, title, due: due ? new Date(due) : null } });
    return res.status(201).json(task);
  }
  res.status(405).end();
});
