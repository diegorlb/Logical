import { Associativity, getAssociativity, getOperatorType, getPrecedence, OperatorType } from './operators'
import { TokenStack } from './stack'
import { BracketToken, OperatorToken, PropositionToken, Token, } from './token'
import * as Util from './util'

export class Lexer {
  constructor() {

  }

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

  public shuntingYard(tokens: Array<Token>) {
    const output = []
    const stack = new TokenStack()

    for (const token of tokens) {
      if (token instanceof PropositionToken) {
        output.push(token)
        continue
      }

      if (token instanceof OperatorToken) {
        const operator = getOperatorType(token)
        const associativity = getAssociativity(token)

        if (operator === OperatorType.Unary) {
          if (associativity === Associativity.Left) stack.push(token)   //Prefix unary
          if (associativity === Associativity.Right) output.push(token) //Postfix unary
          continue
        }

        if (operator === OperatorType.Binary) {
          const precedence = getPrecedence(token)

          if (associativity === Associativity.Left) {
            while (stack.hasOperator() && getPrecedence(stack.top()) >= precedence) {
              output.push(stack.pop())
            }
            stack.push(token)
            continue
          }

          if (associativity === Associativity.Right) {
            while (stack.hasOperator() && getPrecedence(stack.top()) > precedence) {
              output.push(stack.pop())
            }
            stack.push(token)
            continue
          }
        }
      }

      if (token instanceof BracketToken) {
        const bracket = token.getBracket()

        if (bracket === '(') {
          stack.push(token)
          continue
        }

        if (bracket === ')') {
          while (!stack.hasBracket('(')) {
            output.push(stack.pop())
          }
          if (!stack.hasBracket('(')) throw Error('Unbalanced brackets')
          stack.pop()
          continue
        }
      }
    }

    while (!stack.isEmpty()) {
      output.push(stack.pop())
    }

    console.log(output, stack)
  }
}