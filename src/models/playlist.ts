import { Track } from './track.ts'

export type Playlist = {
    id: number
    tracks: Track[]
    userId: number
}
