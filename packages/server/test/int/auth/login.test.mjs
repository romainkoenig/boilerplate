import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import authUsecase from '../../../src/modules/auth/usecases/login.usecase.mjs'

describe('Auth', () => {
  describe('loginUserWithPassword', () => {
    test('Should verify the user email and password and send a token back for the front to log if the check is successful', async () => {
      const firebaseMock = {
        verifyUserPassword: () => ({
          providerId: 'firebase',
          user: {
            uid: 'RA4OPtzWr5PMq2FWC8U9VTVyQyO2', // 	string	The user's unique ID, scoped to the project.
            email: 'john.doe@gmail.com', // 	string | null	The email of the user.
            emailVerified: false,
            isAnonymous: false,
            metadata: {
              creationTime: '',
              lastSignInTime: '',
            },
            providerData: [{
              displayName: null, // 	string | null	The display name of the user.
              email: 'john.doe@gmail.com', // 	string | null	The email of the user.
              phoneNumber: null, // 	string | null	The phone number normalized based on the E.164 standard (e.g. +16505550101) for the user.
              photoURL: null, // 	string | null	The profile photo URL of the user.
              uid: 'RA4OPtzWr5PMq2FWC8U9VTVyQyO2', // 	string	The user's unique ID, scoped to the project.
            }],
            refreshToken: '...',
            tenantId: '',
          },
        }),
        createCustomToken: () => 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ltcGxlLXNlcnZlci1kZXYiLCJhdWQiOiJzaW1wbGUtc2VydmVyLWRldiIsImF1dGhfdGltZSI6MTY4ODU5MDE1OCwidXNlcl9pZCI6IlJBNE9QdHpXcjVQTXEyRldDOFU5VlRWeVF5TzIiLCJzdWIiOiJSQTRPUHR6V3I1UE1xMkZXQzhVOVZUVnlReU8yIiwiaWF0IjoxNjg4NTkwMTU4LCJleHAiOjE2ODg1OTM3NTgsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG4uZG9lQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Wp-G07TPAkAQ93c4FWstJKuoHs6rxqBhr4dmM1dboDMPTd3p5l-xeIwnUSV1FIWAbWadlDLQ4DnM8N2sYK273DElc8k_1JSh8bzCjHz4_M1iDHtiHnDW28sw-qo9JArpbSTLyv8QqK8XSSfU9a1-mK66IMjn9Q0OL1LKru_wwZJfoKicgFgvzz5YN5mj-IxqR1TTPXTSUGnfVMIAQgNLNVM60GTjaY5HTOgqE1A16qx2pfPIR1FSQRmvHd9ou18yLJt7ZyeAM7kO2fET3rGoRQbF3qOnPJCa3EfpSe1G0yGKh2y4SsI7dGZKMQzjBe3oGLu3m99vY2Dgux96LRp99Q',
      }
      const result = await authUsecase.loginUserWithPassword({
        authService: firebaseMock,
        email: 'john.doe@gmail.com',
        password: 'trèsfortpasswd',
      })
      assert.deepEqual(result, { token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MWJiNGJkMWQwYzYxNDc2ZWIxYjcwYzNhNDdjMzE2ZDVmODkzMmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2ltcGxlLXNlcnZlci1kZXYiLCJhdWQiOiJzaW1wbGUtc2VydmVyLWRldiIsImF1dGhfdGltZSI6MTY4ODU5MDE1OCwidXNlcl9pZCI6IlJBNE9QdHpXcjVQTXEyRldDOFU5VlRWeVF5TzIiLCJzdWIiOiJSQTRPUHR6V3I1UE1xMkZXQzhVOVZUVnlReU8yIiwiaWF0IjoxNjg4NTkwMTU4LCJleHAiOjE2ODg1OTM3NTgsImVtYWlsIjoiam9obi5kb2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG4uZG9lQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Wp-G07TPAkAQ93c4FWstJKuoHs6rxqBhr4dmM1dboDMPTd3p5l-xeIwnUSV1FIWAbWadlDLQ4DnM8N2sYK273DElc8k_1JSh8bzCjHz4_M1iDHtiHnDW28sw-qo9JArpbSTLyv8QqK8XSSfU9a1-mK66IMjn9Q0OL1LKru_wwZJfoKicgFgvzz5YN5mj-IxqR1TTPXTSUGnfVMIAQgNLNVM60GTjaY5HTOgqE1A16qx2pfPIR1FSQRmvHd9ou18yLJt7ZyeAM7kO2fET3rGoRQbF3qOnPJCa3EfpSe1G0yGKh2y4SsI7dGZKMQzjBe3oGLu3m99vY2Dgux96LRp99Q' })
    })
  })
})
