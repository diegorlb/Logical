import { BracketToken, OperatorToken, PropositionToken, Token, } from './token'
import * as Util from './util'

export class Lexer {
  public getTokens(source: string): Array<Token> {
    let tokens: Array<Token> = []
    let cursor = 0

    while (cursor < source.length) {
      let char = source[cursor]
      if (Util.isWhitespaceChar(char)) {
        cursor++
        continue
      }

      if (Util.isPropChar(char)) {
        let buffer = []
        while (Util.isPropChar(char)) {
          buffer.push(char)
          char = source[++cursor]
        }
        tokens.push(new PropositionToken(buffer.join('')))
        continue
      }

      if (Util.isOperChar(char)) {
        let buffer = []
        while (Util.isOperChar(char)) {
          buffer.push(char)
          char = source[++cursor]
        }
        tokens.push(new OperatorToken(buffer.join('')))
        continue
      }

      if (Util.isBracketChar(char)) {
        tokens.push(new BracketToken(char))
        cursor++
        continue
      }

      throw Error(`Found unknown character: ${char}`)
    }

    return tokens
  }
}