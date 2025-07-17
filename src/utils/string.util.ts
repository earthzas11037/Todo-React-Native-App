export function interpolateString(pattern: string, values: { [key: string]: string }): string {
  return pattern.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    return values[key] || `:${key}`
  })
}
