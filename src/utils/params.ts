export function getParmas(request: Request, params: string[]) {
  const url = new URL(request.url);
  const query: { [k: string]: string | null } = {};
  for (const param of params) {
    const value = url.searchParams.get(param);
    query[param] = value;
  }
  return query;
}

export function orderByParams(request: Request) {
  const url = new URL(request.url);

  const sortField = url.searchParams.get("sortField");
  const sortBy = url.searchParams.get("sortBy");
  if(!sortField || sortField === 'undefined') return undefined;
  return {[sortField]: ['asc','desc'].includes(sortBy?? 'wont match') ? sortBy : 'asc'}

}
