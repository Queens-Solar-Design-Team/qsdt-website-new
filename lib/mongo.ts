import { MongoClient } from 'mongodb'

const g = globalThis as unknown as { _mongoPromise?: Promise<MongoClient> }

export function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')

  if (!g._mongoPromise) {
    // If connecting fails, forget the failed attempt so the next request retries
    // (otherwise one blip at startup leaves the site on built-in data until a restart)
    g._mongoPromise = new MongoClient(uri).connect().catch((err) => {
      g._mongoPromise = undefined
      throw err
    })
  }
  return g._mongoPromise
}