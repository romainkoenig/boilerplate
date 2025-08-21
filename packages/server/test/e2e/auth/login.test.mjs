import assert from 'node:assert/strict'
import { after, before, describe, test } from 'node:test'

import firebaseService from '../../../src/modules/auth/services/firebase.service.mjs'
import initAdminFirebase from '../../../src/modules/auth/services/firebase-admin.service.mjs'
import { build } from '../../../src/modules/server/app.mjs'

const adminFirebaseService = initAdminFirebase()

let app

before(async () => {
  app = build()
})

describe.skip('Login', async () => {
  const firebaseMock = {
    verifyUserPassword: () => ({ user: { uid: 'RA4OPtzWr5PMq2FWC8U9VTVyQyO2' } }),
    createCustomToken: () => 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ltcGxlLXNlcnZlci1kZXYiLCJhdWQiOiJzaW1wbGUtc2VydmVyLWRldiIsImF1dGhfdGltZSI6MTY4ODU5MDE1OCwidXNlcl9pZCI6IlJBNE9QdHpXcjVQTXEyRldDOFU5VlRWeVF5TzIiLCJzdWIiOiJSQTRPUHR6V3I1UE1xMkZXQzhVOVZUVnlReU8yIiwiaWF0IjoxNjg4NTkwMTU4LCJleHAiOjE2ODg1OTM3NTgsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG4uZG9lQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Wp-G07TPAkAQ93c4FWstJKuoHs6rxqBhr4dmM1dboDMPTd3p5l-xeIwnUSV1FIWAbWadlDLQ4DnM8N2sYK273DElc8k_1JSh8bzCjHz4_M1iDHtiHnDW28sw-qo9JArpbSTLyv8QqK8XSSfU9a1-mK66IMjn9Q0OL1LKru_wwZJfoKicgFgvzz5YN5mj-IxqR1TTPXTSUGnfVMIAQgNLNVM60GTjaY5HTOgqE1A16qx2pfPIR1FSQRmvHd9ou18yLJt7ZyeAM7kO2fET3rGoRQbF3qOnPJCa3EfpSe1G0yGKh2y4SsI7dGZKMQzjBe3oGLu3m99vY2Dgux96LRp99Q',
  }

  test('should get 200 and a token as a response when user login to server', async (ctx) => {
    ctx.mock.method(firebaseService, 'verifyUserPassword', firebaseMock.verifyUserPassword)
    ctx.mock.method(adminFirebaseService, 'createCustomToken', firebaseMock.createCustomToken)
    assert.strictEqual(firebaseService.verifyUserPassword.mock.calls.length, 0)
    assert.strictEqual(adminFirebaseService.createCustomToken.mock.calls.length, 0)
    const response = await app.inject({
      method: 'POST',
      url: 'api/auth/login',
      payload: {
        email: 'john.mock@gmail.com',
        password: '123456789',
      },
    })
    assert.strictEqual(firebaseService.verifyUserPassword.mock.calls.length, 1)
    assert.strictEqual(adminFirebaseService.createCustomToken.mock.calls.length, 1)

    assert.equal(response.statusCode, 200)
  })
})

after(async () => {
  app.close()
})

