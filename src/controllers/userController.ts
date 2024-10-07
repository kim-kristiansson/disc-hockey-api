import { RouterContext } from '../deps.ts'
import { getUserProfile } from '../services/spotifyApiService.ts'
import { CustomState } from '../types.ts'

type MyRouterContext = RouterContext<string, Record<string, string>, CustomState>

export const getUserProfileHandler = async (ctx: MyRouterContext) => {
    try {
        const accessToken = ctx.state.accessToken

        if (!accessToken) {
            ctx.response.status = 401
            ctx.response.body = { error: 'Unauthorized' }
            return
        }

        const profile = await getUserProfile(accessToken)

        if (profile) {
            ctx.response.body = profile
        } else {
            ctx.response.status = 500
            ctx.response.body = { error: 'Failed to fetch user profile' }
        }
    } catch (error) {
        console.error('Error in getUserProfileHandler:', error)
        ctx.response.status = 500
        ctx.response.body = { error: 'Internal Server Error' }
    }
}
