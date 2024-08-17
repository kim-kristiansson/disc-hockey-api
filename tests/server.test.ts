import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { serverInstance } from '../vitest.setup.js'

describe('Server', () => {
    it('should return status ok on /', async () => {
        const res = await request(serverInstance).get('/')
        expect(res.status).toBe(200)
        expect(res.body).toEqual({ status: 'ok' })
    })
})
