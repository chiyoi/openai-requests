export function withQuery(endpoint: string, query: {}) {
  const u = new URL(endpoint)
  for (const key in query) if (key !== undefined) u.searchParams.set(key, query[key])
  return u.href
}
