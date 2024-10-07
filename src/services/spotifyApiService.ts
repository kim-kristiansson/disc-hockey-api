export const getUserProfile = async (accessToken: string) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    if (response.ok) {
        return await response.json()
    } else {
        console.error('Error fetching user profile:', await response.json())
        return null
    }
}

export const getUserPlaylists = async (accessToken: string) => {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })

    if (response.ok) {
        return await response.json()
    } else {
        console.error('Error fetching playlists:', await response.json())
        return null
    }
}
