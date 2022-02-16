export const humanReadableDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Date(date).toLocaleDateString(undefined, options)
}
