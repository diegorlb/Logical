import { OperatorToken, } from './token'

export enum OperatorType {
  Unary,
  Binary,
}

export enum Associativity {
  Left,
  Right
}

export function getOperatorType(token: OperatorToken): OperatorType {
  const operator = token.getOperator()
  if ([
    '¬'
  ].includes(operator)) return OperatorType.Unary

  if ([
    'AND', 'OR'
  ].includes(operator)) return OperatorType.Binary

  throw Error(`Found unknown operator: ${operator}`)
}

export function getAssociativity(token: OperatorToken): Associativity {
  const operator = token.getOperator()

  if ([
    '¬'
  ].includes(operator)) return Associativity.Left

  if ([
    'AND', 'OR',
  ].includes(operator)) return Associativity.Right

  throw Error(`Found unknown operator: ${operator}`)
}

export function getPrecedence(token: OperatorToken): number {
  return 0
}

export function evaluateUnaryExpression(token: OperatorToken, operand: boolean) {
  const operator = token.getOperator()

  switch (operator) {
    case '¬': return !operand
    default: throw Error('Unknown unary expression')
  }
}

export function evaluateBinaryExpression(token: OperatorToken, left: boolean, right: boolean) {
  const operator = token.getOperator()

  switch (operator) {
    case 'AND': return left && right
    case 'OR': return left || right
    default: throw Error('Unknown unary expression')
  }
}