import { connectToDatabase } from './database/connection.ts'

await connectToDatabase()

console.log('Application is running...')
