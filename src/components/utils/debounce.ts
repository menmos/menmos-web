/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (function_: (...arguments_: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout
  return (...arguments_: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias, unicorn/no-this-assignment
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => function_.apply(context, arguments_), wait)
  }
}
