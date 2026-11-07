import { MongoClient } from 'mongodb'

const g = globalThis as unknown as { _mongoPromise?: Promise<MongoClient> }

export function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set')

  if (!g._mongoPromise) {
    g._mongoPromise = new MongoClient(uri).connect()
  }
  return g._mongoPromise
}