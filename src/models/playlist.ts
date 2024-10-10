import { Track } from './track.ts'

export interface Playlist {
    id: number
    tracks: Track[]
    userId: number
}
