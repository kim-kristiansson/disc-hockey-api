import type { PlaylistDto } from './playlist.dto.ts'
import type { TrackDto } from './track.dto.ts'

export interface HockeySoundSetDto {
    id: number
    name: string
    playlist: PlaylistDto
    penaltyPlaylist: PlaylistDto
    homeTeamGoalTrack: TrackDto
    awayTeamGoalTrack: TrackDto
}
