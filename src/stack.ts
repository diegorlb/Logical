import { BracketToken, OperatorToken, Token, } from './token'

export class TokenStack {
  protected stack: Array<Token>

  constructor() {
    this.stack = []
  }

  push(element: Token): number {
    return this.stack.push(element)
  }

  pop(): Token {
    return this.stack.pop() as Token
  }

  top<T extends Token>(): T {
    return this.stack[this.stack.length - 1] as T
  }

  hasOperator(): boolean {
    return this.top() instanceof OperatorToken
  }

  hasBracket(bracket: string) {
    return this.top() instanceof BracketToken && this.top<BracketToken>().getBracket() === bracket
  }

  isEmpty(): boolean {
    return this.stack.length === 0
  }
}