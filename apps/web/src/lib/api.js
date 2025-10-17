
export async function api(path, opts = {}) {
  const base = import.meta.env.VITE_API_BASE_URL; // e.g., https://iit-api.vercel.app/api
  const res = await fetch(`${base}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error(typeof data === "string" ? data : data?.error || "Request failed");
  return data;
}
