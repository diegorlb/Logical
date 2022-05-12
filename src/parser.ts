import { Associativity, getAssociativity, getOperatorType, getPrecedence, OperatorType, } from './operators'
import { TokenStack, } from './stack'
import { BracketToken, OperatorToken, PropositionToken, Token, } from './token'

export class Parser {

  //Implemented pseudocode from https://www.andr.mu/logs/the-shunting-yard-algorithm/ with some modifications
  public execShunting(tokens: Array<Token>): [Array<Token>, Array<string>] {
    const output: Array<Token> = []
    const propositions: Array<string> = []
    const stack = new TokenStack()

    for (const token of tokens) {
      if (token instanceof PropositionToken) {
        output.push(token)
        const name = token.getName()
        if (!propositions.includes(name)) propositions.push(name)
        continue
      }

      if (token instanceof OperatorToken) {
        const operator = getOperatorType(token)
        const associativity = getAssociativity(token)

        if (operator === OperatorType.Unary) {
          if (associativity === Associativity.Left) stack.push(token)   //Prefix unary operator
          if (associativity === Associativity.Right) output.push(token) //Postfix unary operator
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

    return [output, propositions]
  }
}