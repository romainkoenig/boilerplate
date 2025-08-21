import assert from 'node:assert/strict'
import { after, before, describe, test } from 'node:test'

import { build } from '../../../src/modules/server/app.mjs'

let app

before(async () => {
  app = build()
})

describe('Setup server and make HTTP call', async () => {
  test('should get 200 as a response with root "/private" call', async () => {
    const response = await app.inject({
      method: 'GET',
      url: 'api/',
    })
    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(), { hello: 'world! I am a public route!' })
  })
})

after(async () => {
  app.close()
})

