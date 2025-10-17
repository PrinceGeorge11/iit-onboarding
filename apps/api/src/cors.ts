
import { VercelRequest, VercelResponse } from "@vercel/node";

const ORIGIN = process.env.WEB_ORIGIN!;

export function withCORS(handler: (req: VercelRequest, res: VercelResponse)=>any) {
  return async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Access-Control-Allow-Origin", ORIGIN);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    if (req.method === "OPTIONS") return res.status(200).end();
    return handler(req, res);
  };
}
