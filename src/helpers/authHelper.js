export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function isAuthenticated() {
    const user = getCurrentUser()
    if (user) {
        return true
    }
    return false
}

export function isAdmin() {
    const user = getCurrentUser()
    return user != null && user.userId === 2;

}

export function getLoggedUserId() {
    const user = getCurrentUser()
    if (user) {
        return user.userId
    }
    return false
}