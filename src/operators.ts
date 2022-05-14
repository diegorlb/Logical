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
    'NOT',
  ].includes(operator)) return OperatorType.Unary

  if ([
    'AND', '&&',
    'OR', '||',
    '->', '=>',
    'IFF', '=',
    'XOR',
    'NAND',
    'NOR',
  ].includes(operator)) return OperatorType.Binary

  throw Error(`Found unknown operator: ${operator}`)
}

export function getAssociativity(token: OperatorToken): Associativity {
  const operator = token.getOperator()

  if ([
    'NOT',
  ].includes(operator)) return Associativity.Left

  if ([
    'AND', '&&',
    'OR', '||',
    '->', '=>',
    'IFF', '=',
    'XOR',
    'NAND',
    'NOR',
  ].includes(operator)) return Associativity.Right

  throw Error(`Found unknown operator: ${operator}`)
}

export function getPrecedence(token: OperatorToken): number {
  return 0
}

export function evaluateUnaryExpression(token: OperatorToken, operand: boolean) {
  const operator = token.getOperator()

  switch (operator) {
    case 'NOT': return !operand
    default: throw Error('Unknown unary expression')
  }
}

export function evaluateBinaryExpression(token: OperatorToken, left: boolean, right: boolean) {
  const operator = token.getOperator()

  switch (operator) {
    case 'AND':
    case '&&': return left && right
    case 'OR':
    case '||': return left || right
    case '->':
    case '=>': return !left || right
    case 'IFF':
    case '=': return (!left || right) && (!right || left)
    case 'XOR': return (left && !right) || (!left && right)
    case 'NAND': return !(left && right)
    case 'NOR': return !(left || right)
    default: throw Error('Unknown unary expression')
  }
}