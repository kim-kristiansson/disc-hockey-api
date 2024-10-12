import { TrackDto } from './track.dto.ts'

export interface PlaylistDto {
    id: number
    tracks: TrackDto[]
    userId: number
}
