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
      headers: { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5N2U3ZWVlY2YwMWM4MDhiZjRhYjkzOTczNDBiZmIyOTgyZTg0NzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ltcGxlLXNlcnZlci1kZXYiLCJhdWQiOiJzaW1wbGUtc2VydmVyLWRldiIsImF1dGhfdGltZSI6MTY4ODE0MzQ3NywidXNlcl9pZCI6IlJBNE9QdHpXcjVQTXEyRldDOFU5VlRWeVF5TzIiLCJzdWIiOiJSQTRPUHR6V3I1UE1xMkZXQzhVOVZUVnlReU8yIiwiaWF0IjoxNjg4MTQzNDc3LCJleHAiOjE2ODgxNDcwNzcsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG4uZG9lQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.B6c3HNfd33fd6UJH_CwxwHSqq1udfJS0eB656DLQurpIJiYUyD4moHLMZLwCQWCKzVYjd48Vuh17vRuRGEek3BUy7lcgeAnFexahOCdwnnDVDq6M_qEFexc93RsGQEcjUp2hn3Q1QFqaqM2AAnZsNw5Ipa5zEAVH8mNW4rs55BrihFMXl7CIu8m6stesrbncbN7qWd6drFxUjAfj6rYkkPBomG5FJRMy3bWSacfQu8_ka0XIX_6nL1p7nYbCx4q8cP23G8sOj_Er4tWAB9naZ_1B4dROOzSlWDBr8Rp8Zie2m1T5iTaUt9QccSlr0Li11BQFfgueC10K8c4SZXaiwQ' },
      method: 'GET',
      url: 'api/private',
    })
    assert.equal(response.statusCode, 200)
    assert.deepEqual(response.json(), { hello: 'I am a private route!' })
  })

  // REMOVE NODE_ENV=test to run this test
  test.skip('should get a 401 as no headers is passed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: 'api/private',
    })
    assert.equal(response.statusCode, 401)
    assert.deepEqual(response.json(), {
      error: 'Unauthorized',
      message: 'Unauthorized',
      statusCode: 401,
    })
  })

  after(async () => {
    app.close()
  })
})

