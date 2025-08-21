import assert from 'node:assert/strict'
import path from 'node:path'
import { describe, test } from 'node:test'
import { fileURLToPath } from 'node:url'

import { csvToJs } from '../../../../src/modules/transactions-sync/connectors/csv.service.mjs'

describe('transactions-sync', () => {
  describe('csvToJs', () => {
    test('Should import the csv file and correct JS object', () => {
      const __filename = fileURLToPath(import.meta.url)
      const __dirname = path.dirname(__filename)
      const filePath = path.resolve(__dirname, 'fixtures.csv')
      const result = csvToJs({ fileName: filePath })
      assert.deepEqual(result, [{
        operationDate: '11/04/2023',
        valueDate: '11/04/2023',
        label: 'PRLV MACIF Centre Europe Product',
        debit: '-15,59',
        credit: '',
      }, {
        operationDate: '05/04/2023',
        valueDate: '05/04/2023',
        label: 'VIR CPAM RHONE',
        debit: '',
        credit: '26,66',
      }, {
        operationDate: '04/04/2023',
        valueDate: '04/04/2023',
        label: 'VIR INST ALAN SA',
        debit: '',
        credit: '40,58',
      }, {
        operationDate: '03/04/2023',
        valueDate: '03/04/2023',
        label: 'PRLV SURAVENIR',
        debit: '-100',
        credit: '',
      }, {
        operationDate: '03/04/2023',
        valueDate: '03/04/2023',
        label: 'CARTE 01/04 IKEA VENIS562-HFB/',
        debit: '-192,43',
        credit: '',
      }, {
        operationDate: '31/03/2023',
        valueDate: '31/03/2023',
        label: 'VIR Argent de Poche',
        debit: '-650',
        credit: '',
      }, {
        operationDate: '31/03/2023',
        valueDate: '31/03/2023',
        label: 'VIR Credit Immobilier',
        debit: '-1270',
        credit: '',
      }, {
        operationDate: '31/03/2023',
        valueDate: '31/03/2023',
        label: 'VIR Argent Abonnements',
        debit: '-160',
        credit: '',
      }, {
        operationDate: '30/03/2023',
        valueDate: '30/03/2023',
        label: 'CARTE 29/03 AIRBNB * HMEM4TR 318-488-4000',
        debit: '-543,78',
        credit: '',
      }, {
        operationDate: '30/03/2023',
        valueDate: '30/03/2023',
        label: 'VIR INDY.FR',
        debit: '',
        credit: '3823,3',
      }, {
        operationDate: '30/03/2023',
        valueDate: '30/03/2023',
        label: 'ANN CARTE AIRBNB * HMEM4TR 318-488-4000',
        debit: '',
        credit: '543,78',
      }, {
        operationDate: '21/03/2023',
        valueDate: '21/03/2023',
        label: 'VIR CPAM RHONE',
        debit: '',
        credit: '26,48',
      }, {
        operationDate: '20/03/2023',
        valueDate: '20/03/2023',
        label: 'PRLV ENGIE ENGIE',
        debit: '-45',
        credit: '',
      }, {
        operationDate: '20/03/2023',
        valueDate: '20/03/2023',
        label: 'PRLV EDF clients particuliers',
        debit: '-39',
        credit: '',
      }, {
        operationDate: '20/03/2023',
        valueDate: '20/03/2023',
        label: 'VIR INST ALAN SA',
        debit: '',
        credit: '0',
      }])
    })
  })
})
