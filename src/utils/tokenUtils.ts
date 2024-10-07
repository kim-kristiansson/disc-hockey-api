export const isTokenExpired = (expiryTime?: string): boolean => {
    if (!expiryTime) return true
    const expiry = parseInt(expiryTime)
    return Date.now() > expiry
}
