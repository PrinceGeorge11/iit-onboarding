
import { withCORS } from "../../src/cors";
import { prisma } from "../../src/db";
import { requireAuth } from "../../src/auth";

export default withCORS(async (req, res) => {
  const sess = requireAuth(req, res);
  if (!sess) return;

  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: "Missing id" });

  if (req.method === "GET") {
    const task = await prisma.task.findFirst({ where: { id, userId: sess.uid } });
    if (!task) return res.status(404).json({ error: "Not found" });
    return res.json(task);
  }
  if (req.method === "PUT") {
    const { title, status, due } = req.body || {};
    const task = await prisma.task.update({ where: { id }, data: { title, status, due: due ? new Date(due) : null } });
    return res.json(task);
  }
  if (req.method === "DELETE") {
    await prisma.task.delete({ where: { id } });
    return res.json({ ok: true });
  }
  res.status(405).end();
});
