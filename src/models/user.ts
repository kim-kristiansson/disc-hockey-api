import { Playlist } from './playlist.ts'

export type User = {
    id: number
    playlists: Playlist[]
    refreshToken: string
}
