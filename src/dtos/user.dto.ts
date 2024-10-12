import type { HockeySoundSetDto } from './hockeySoundSet.dto.ts'

export interface UserDto {
    id: string
    hockeySoundSets: HockeySoundSetDto[]
    refreshToken: string
}
