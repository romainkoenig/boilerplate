import assert from 'node:assert/strict'
import {
  after, before, beforeEach, describe, test,
} from 'node:test'

import { database } from '../../../src/modules/server/db/database.mjs'
import { ValidationError } from '../../../src/modules/server/db/validation.mjs'
import { getStatementCollection } from '../../../src/modules/statement/statement.collection.mjs'
import statementRepo from '../../../src/modules/statement/statement.repository.mjs'

describe('Statement Repository Integration Tests', () => {

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

  test('We should successfully add a statement', async () => {
    const statementData = {
      name: 'input',
      timestamp: new Date().toISOString(),
      description: 'Test Description',
      source: 'manual',
      amount_in_cents: 1000,
      type: 'bancaire',
    }

    const statementId = await statementRepo.addStatement(statementData)

    assert.ok(statementId)

    const insertedStatement = await getStatementCollection().findOne({ _id: statementId })
    assert.ok(insertedStatement)
    assert.equal(insertedStatement.name, statementData.name)
    assert.equal(insertedStatement.amount_in_cents, statementData.amount_in_cents)
    assert.equal(insertedStatement.type, statementData.type)
  })

  test('We should throw an ValidationError when adding an invalid statement', async () => {
    const invalidStatement = { title: 'Invalid Statement with missing fields' }
    assert.rejects(statementRepo.addStatement(invalidStatement), ValidationError, 'Error should be an instance of ValidationError')
  })
})