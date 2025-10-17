
import { withCORS } from "../../src/cors";
import { getSession } from "../../src/auth";

export default withCORS(async (req, res) => {
  const sess = getSession(req);
  if (!sess) return res.json({ authed: false });
  res.json({ authed: true, user: { email: sess.email, lang: sess.lang } });
});
