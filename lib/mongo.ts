import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)

export const clientPromise = client.connect()

let promise: Promise<MongoClient> | null = null

export function getClient() {
  if (!promise) promise = new MongoClient(process.env.MONGODB_URI!).connect()
  return promise
}