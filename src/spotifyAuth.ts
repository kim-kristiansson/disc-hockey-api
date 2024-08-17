// spotifyAuth.ts
export interface SpotifyAuthParams {
    client_id: string
    redirect_uri: string
    scope: string[]
    state: string
    show_dialog?: boolean
}

export function constructSpotifyAuthUrl({
    client_id,
    redirect_uri,
    scope,
    state,
    show_dialog = false,
}: SpotifyAuthParams): string {
    const baseUrl = 'https://accounts.spotify.com/authorize'
    const params = new URLSearchParams({
        client_id,
        response_type: 'code',
        redirect_uri,
        scope: scope.join(' '),
        state,
        show_dialog: show_dialog.toString(),
    })

    return `${baseUrl}?${params.toString()}`
}
