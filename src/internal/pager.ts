export type Pager<Data> = {
  data: Data[],
  first_id: string,
  last_id: string,
  has_more: boolean,
}
