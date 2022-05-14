export function isWhitespaceChar(char: string): boolean {
  return (typeof char === 'string') && /\s/.test(char)
}

export function isPropChar(char: string): boolean {
  return (typeof char === 'string') && /[a-z]/.test(char)
}

export function isOperChar(char: string): boolean {
  return (typeof char === 'string') && (/[A-Z\=\-\>\|\&]/.test(char))
}

export function isBracketChar(char: string): boolean {
  return (typeof char === 'string') && /[\(\)]/.test(char)
}