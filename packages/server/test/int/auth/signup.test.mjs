import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import authUsecase from '../../../src/modules/auth/usecases/signup.usecase.mjs'

describe('Auth', () => {
  describe('createUserWithPassword', () => {
    test('Should create a user with admin SDK and return basic information on it with the token', async () => {
      const firebaseMock = {
        createUser: () => ({
          customClaims: { customAuthVersion: 1 },
          disabled: false,
          displayName: null,
          email: 'john.doe@gmail.com',
          emailVerified: false,
          providerId: 'firebase',
          reloadUserInfo: [{}],
          reloadListener: null,
          uid: 'RA4OPtzWr5PMq2FWC8U9VTVyQyO2',
          accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5N2U3ZWVlY2YwMWM4MDhiZjRhYjkzOTczNDBiZmIyOTgyZTg0NzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ltcGxlLXNlcnZlci1kZXYiLCJhdWQiOiJzaW1wbGUtc2VydmVyLWRldiIsImF1dGhfdGltZSI6MTY4ODE0MzQ3NywidXNlcl9pZCI6IlJBNE9QdHpXcjVQTXEyRldDOFU5VlRWeVF5TzIiLCJzdWIiOiJSQTRPUHR6V3I1UE1xMkZXQzhVOVZUVnlReU8yIiwiaWF0IjoxNjg4MTQzNDc3LCJleHAiOjE2ODgxNDcwNzcsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG4uZG9lQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.B6c3HNfd33fd6UJH_CwxwHSqq1udfJS0eB656DLQurpIJiYUyD4moHLMZLwCQWCKzVYjd48Vuh17vRuRGEek3BUy7lcgeAnFexahOCdwnnDVDq6M_qEFexc93RsGQEcjUp2hn3Q1QFqaqM2AAnZsNw5Ipa5zEAVH8mNW4rs55BrihFMXl7CIu8m6stesrbncbN7qWd6drFxUjAfj6rYkkPBomG5FJRMy3bWSacfQu8_ka0XIX_6nL1p7nYbCx4q8cP23G8sOj_Er4tWAB9naZ_1B4dROOzSlWDBr8Rp8Zie2m1T5iTaUt9QccSlr0Li11BQFfgueC10K8c4SZXaiwQ',
          phoneNumber: null,
        }),
        createCustomToken: () => 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ltcGxlLXNlcnZlci1kZXYiLCJhdWQiOiJzaW1wbGUtc2VydmVyLWRldiIsImF1dGhfdGltZSI6MTY4ODU5MDE1OCwidXNlcl9pZCI6IlJBNE9QdHpXcjVQTXEyRldDOFU5VlRWeVF5TzIiLCJzdWIiOiJSQTRPUHR6V3I1UE1xMkZXQzhVOVZUVnlReU8yIiwiaWF0IjoxNjg4NTkwMTU4LCJleHAiOjE2ODg1OTM3NTgsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG4uZG9lQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Wp-G07TPAkAQ93c4FWstJKuoHs6rxqBhr4dmM1dboDMPTd3p5l-xeIwnUSV1FIWAbWadlDLQ4DnM8N2sYK273DElc8k_1JSh8bzCjHz4_M1iDHtiHnDW28sw-qo9JArpbSTLyv8QqK8XSSfU9a1-mK66IMjn9Q0OL1LKru_wwZJfoKicgFgvzz5YN5mj-IxqR1TTPXTSUGnfVMIAQgNLNVM60GTjaY5HTOgqE1A16qx2pfPIR1FSQRmvHd9ou18yLJt7ZyeAM7kO2fET3rGoRQbF3qOnPJCa3EfpSe1G0yGKh2y4SsI7dGZKMQzjBe3oGLu3m99vY2Dgux96LRp99Q',
      }
      const result = await authUsecase.createUserWithPassword({
        authService: firebaseMock,
        email: 'john.doe@gmail.com',
        password: 'trèsfortpasswd',
        confirmedPassword: 'trèsfortpasswd',
      })
      assert.deepEqual(result, { token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ltcGxlLXNlcnZlci1kZXYiLCJhdWQiOiJzaW1wbGUtc2VydmVyLWRldiIsImF1dGhfdGltZSI6MTY4ODU5MDE1OCwidXNlcl9pZCI6IlJBNE9QdHpXcjVQTXEyRldDOFU5VlRWeVF5TzIiLCJzdWIiOiJSQTRPUHR6V3I1UE1xMkZXQzhVOVZUVnlReU8yIiwiaWF0IjoxNjg4NTkwMTU4LCJleHAiOjE2ODg1OTM3NTgsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG4uZG9lQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Wp-G07TPAkAQ93c4FWstJKuoHs6rxqBhr4dmM1dboDMPTd3p5l-xeIwnUSV1FIWAbWadlDLQ4DnM8N2sYK273DElc8k_1JSh8bzCjHz4_M1iDHtiHnDW28sw-qo9JArpbSTLyv8QqK8XSSfU9a1-mK66IMjn9Q0OL1LKru_wwZJfoKicgFgvzz5YN5mj-IxqR1TTPXTSUGnfVMIAQgNLNVM60GTjaY5HTOgqE1A16qx2pfPIR1FSQRmvHd9ou18yLJt7ZyeAM7kO2fET3rGoRQbF3qOnPJCa3EfpSe1G0yGKh2y4SsI7dGZKMQzjBe3oGLu3m99vY2Dgux96LRp99Q' })
    })
  })
})
