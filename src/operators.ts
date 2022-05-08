import { OperatorToken } from "./token";

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