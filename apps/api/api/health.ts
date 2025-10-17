
import { withCORS } from "../src/cors";
export default withCORS((_req, res) => res.json({ ok: true }));
