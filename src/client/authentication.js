class Auth {
    //@returns {boolean}
    static isUserAuthenticated() {
        return document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/);
    }

    static deauthenticateUser() {
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    static redirect(path) {
        window.location.href = path;
    }
}

export default Auth;