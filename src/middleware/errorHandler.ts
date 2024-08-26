import { Context } from 'https://deno.land/x/oak/mod.ts'

export const errorHandler = async (context: Context, next: () => Promise<unknown>) => {
    try {
        await next()
    } catch (err) {
        console.error('Error occurred:', err)
        context.response.status = 500
        context.response.body = { message: 'Internal Server Error' }
    }
}
