export interface Token {
  getType(): string
}

export class PropositionToken implements Token {
  protected name: string

  constructor(name: string) {
    this.name = name
  }

  getName(): string {
    return this.name
  }

  getType(): string {
    return 'PropositionToken'
  }
}

export class OperatorToken implements Token {
  protected operator: string
  
  constructor(operator: string) {
    this.operator = operator
  }

  getOperator(): string {
    return this.operator
  }

  getType(): string {
    return 'OperatorToken'
  }
}


export class BracketToken implements Token {
  protected bracket: string
  
  constructor(bracket: string) {
    this.bracket = bracket
  }

  getBracket(): string {
    return this.bracket
  }

  getType(): string {
    return 'BracketToken'
  }
}