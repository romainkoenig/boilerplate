export default {
  private: {
    secretKey: {
      doc: 'The secret key of clerk',
      env: 'CLERK_SECRET_KEY',
      format: String,
      default: '',
      // sensitive: true,
    },
  },
  public: {
    publicKey: {
      doc: 'The public key of clerk',
      format: String,
      default: '',
      env: 'CLERK_PUBLISHABLE_KEY',
    },
  },
}