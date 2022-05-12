#! /usr/bin/env node
import * as yargs from 'yargs'
import * as fs from 'fs'

import { Lexer, } from './lexer'
import { Truthtable } from './truthtable'
import { Parser } from './parser'

yargs
  .scriptName('logical')
  .usage('Usage: $0 -file <logical file> -table <custom operators\' truthtable>')
  .example(
    '$0 -file "example.logical"',
    'Loads "example.logical" file and evaluates propositional expression.'
  )
  .option('f', {
    alias: 'file',
    describe: 'File to load propositional expressions',
    type: 'string',
    demandOption: 'File is required',
    nargs: 1,
  })
  .option('t', {
    alias: 'table',
    describe: 'File to load custom operators\' truthtables',
    type: 'string',
    nargs: 1,
  })
  .parseAsync()
  .then(({ f: file, t: table, }) => {
    const source = fs.readFileSync(file)

    const lexer = new Lexer()
    const parser = new Parser()
    const truthtable = new Truthtable()

    const [shunted, propositions] = parser.execShunting(lexer.getTokens(source.toString()))
    const combinations = truthtable.generatePropositionsTable(propositions)

    const result = combinations.map((combination) => ({
      ...combination,
      'Output': truthtable.evaluateExpression(shunted, combination),
    }))

    console.table(result)
  })
  .catch(() => {

  })