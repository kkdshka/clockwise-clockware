import restApiClient from './restApiClient';

class Auth {
    //@returns {boolean}
    static isUserAuthenticated() {
        return document.cookie.match(/^(.*;)?\s*isAuthorized\s*=\s*[^;]+(.*)?$/);
    }

    static deauthenticateUser() {
        restApiClient.signOut();
    }

    static redirect(path) {
        window.location.href = path;
    }
}

export default Auth;