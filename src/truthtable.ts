import { evaluateBinaryExpression, evaluateUnaryExpression, getOperatorType, OperatorType, } from './operators'
import { OperatorToken, PropositionToken, Token, } from './token'

type PropositionsValues = Record<string, boolean>

export class Truthtable {
  public generatePropositionsTable(propositions: Array<string>): Array<PropositionsValues> {
    return Array(2 ** propositions.length)
      .fill(0)
      .map((_, i) => Number(i)
        .toString(2)
        .padStart(propositions.length, '0')
      )
      .reverse()
      .map((combination) => combination
        .split('')
        .map(Number)
        .map(Boolean)
        .reduce((acc, value, index) => ({
          ...acc,
          [propositions[index]]: value,
        }), {})
      )
  }

  public evaluateExpression(tokens: Array<Token>, propositions: PropositionsValues) {
    const output: Array<boolean> = []

    for (const token of tokens) {
      if (token instanceof PropositionToken) {
        output.push(propositions[token.getName()])
        continue
      }

      if (token instanceof OperatorToken) {
        const operator = getOperatorType(token)

        if (operator === OperatorType.Unary) {
          const operand = output.pop()
          if (typeof operand === 'undefined') throw Error('Error') //TODO: Improve error
          output.push(evaluateUnaryExpression(token, operand))
          continue
        }

        if (operator === OperatorType.Binary) {
          const right = output.pop()
          const left = output.pop()
          if (typeof left === 'undefined' || typeof right === 'undefined') throw Error('Error 2') //TODO: Improve error
          output.push(evaluateBinaryExpression(token, left, right))
          continue
        }
      }
    }

    return output.pop()
  }
}