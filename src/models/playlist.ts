import { Track } from './track.ts'

export interface Playlist {
    id: number
    name: string
    tracks: Track[]
}
