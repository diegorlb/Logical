import { Lexer, } from './parser'

const lexer = new Lexer()
const tokens = lexer.getTokens('(a AND b) OR (c AND ¬d)')
console.log(tokens)
lexer.shuntingYard(tokens)