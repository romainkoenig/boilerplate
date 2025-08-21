import { MongoClient } from 'mongodb'

class Database {
  constructor() {
    this.uri = null
    this.client = null
    this.db = null
    this.indexesCreationFunctions = []
  }

  async connect(uri, dbName) {
    if (this.db) return this.db

    this.uri = uri
    this.client = await MongoClient.connect(uri)

    this.db = this.client.db(dbName)
    return this.db
  }

  getDb() {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.')
    }
    return this.db
  }

  assertLocalConnection() {
    if (this.uri != 'mongodb://localhost:27017/simple-budget-test')
      throw new Error('Database not local')
  }

  async close() {
    if (this.client) {
      await this.client.close()
    }
  }

  registerIndexesCreationsFunctions(indexesCreationFunction) {
    this.indexesCreationFunctions.push(indexesCreationFunction)
  }

  /**
   * On appelle cette méthode après la connexion à la base de données
   * pour créer les indexes
   * @returns {Promise<void>}
   */
  async createIndexes() {
    for (const indexesCreationFunction of this.indexesCreationFunctions) {
      await indexesCreationFunction()
    }
  }
}

// Singleton instance
const database = new Database()

export { database }