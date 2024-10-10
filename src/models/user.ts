import { Playlist } from './playlist.ts'

export interface User {
    id: number
    playlists: Playlist[]
}
