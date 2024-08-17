import { afterAll, beforeAll } from 'vitest'
import server from './src/server'

let serverInstance: any

beforeAll(() => {
    serverInstance = server.listen(0)
})

afterAll(() => {
    if (serverInstance) {
        serverInstance.close((err: any) => {
            if (err) console.error(err)
        })
    }
})

export { serverInstance }
