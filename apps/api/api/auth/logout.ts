
import { withCORS } from "../../src/cors";
import { clearSession } from "../../src/auth";

export default withCORS(async (_req, res) => {
  clearSession(res);
  res.json({ ok: true });
});
