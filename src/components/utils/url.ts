export const getQueryParameter = (name: string): string | undefined => {
  const searchParameters = new URLSearchParams(window.location.search)
  return searchParameters.get(name) || undefined
}

export const setQueryParameter = (name: string, value: string) => {
  const searchParameters = new URLSearchParams(window.location.search)
  searchParameters.set(name, value)

  refresh(searchParameters)
}

export const deleteQueryParameter = (name: string) => {
  const searchParameters = new URLSearchParams(window.location.search)
  searchParameters.delete(name)

  refresh(searchParameters)
}

const refresh = (searchParameters: URLSearchParams) => {
  // Updates the URL with the new or updated query parameter
  const newUrl = `${window.location.pathname}?${searchParameters.toString()}`
  history.pushState(undefined, '', newUrl)
}
