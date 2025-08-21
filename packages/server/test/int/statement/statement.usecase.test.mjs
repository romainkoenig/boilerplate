import assert from 'node:assert/strict'
import {
  after, before, beforeEach, describe, test,
} from 'node:test'

import { database } from '../../../src/modules/server/db/database.mjs'
import { getStatementCollection } from '../../../src/modules/statement/statement.collection.mjs'
import { addStatement } from '../../../src/modules/statement/statement.usecase.mjs'

describe('Statement Usecases Integration Tests', () => {

  before(async () => {
    await database.connect('mongodb://localhost:27017/simple-budget-test', 'simple-budget-test')
  })

  after(async () => {
    database.assertLocalConnection()
    await database.close()
  })

  beforeEach(async () => {
    database.assertLocalConnection()
    await getStatementCollection().deleteMany({})
  })

  test('We enrich a statement with source fields and save it into DB', async () => {
    const statementData = {
      name: 'input',
      timestamp: new Date().toISOString(),
      description: 'Test Description',
      amount_in_cents: 1000,
      type: 'bancaire',
    }

    const statementId = await addStatement(statementData)

    assert.ok(statementId)

    const insertedStatement = await getStatementCollection().findOne({ _id: statementId })
    assert.ok(insertedStatement)
    assert.equal(insertedStatement.name, statementData.name)
    assert.equal(insertedStatement.source, 'manual')
  })
})