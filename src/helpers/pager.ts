export function attachPagerQuery(endpoint: string, query?: PagerQuery) {
  const u = new URL(endpoint)
  query?.limit !== undefined && u.searchParams.set('limit', String(query.limit))
  query?.order !== undefined && u.searchParams.set('order', query.order)
  query?.after !== undefined && u.searchParams.set('order', query.after)
  query?.before !== undefined && u.searchParams.set('order', query.before)
  return u.href
}

export type PagerQuery = {
  limit?: number,
  order?: string,
  after?: string,
  before?: string,
}

export type Pager<Data> = {
  data: Data[],
  first_id: string,
  last_id: string,
  has_more: boolean,
}
