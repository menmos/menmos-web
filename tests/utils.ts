export const login = () => {
  // TODO: Convert this into a API call to /login once we handle cookies
  localStorage.setItem(
    'menmos-web-token',
    JSON.stringify({ token: 'amagictoken', expiry: new Date().setHours(new Date().getHours() + 6) })
  )
}
