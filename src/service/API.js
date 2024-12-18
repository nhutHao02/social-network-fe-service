const USER_URL_BASE = "http://localhost:7000/api/v1";
const TWEER_URL_BASE = "http://localhost:4000/api/v1";
const CHAT_URL_BASE = "http://localhost:5000/api/v1";
const NOTIF_URL_BASE = "http://localhost:6000/api/v1";
const BASE_URL = "http://localhost:8000/api/v1";

const ENDPOINTS = {
    TWEETS: {
        GET_TWEETS: {
            method: 'GET',
            url: ({page = 1, limit = 10}) => `${TWEER_URL_BASE}/tweet/all?page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        },
        POST_TWEET: {
            method: 'POST',
            url: `${BASE_URL}/users`,
            requiresToken: true,
            responseType: 'json'
        },
        GET_BOOKMARK_TWEETS: {
            method: 'GET',
            url: ({userID, page = 0, limit = 10}) => `${BASE_URL}/tweet-saved/get-saved-tweet/${userID}?page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        },
        GET_TWEETS_BY_USERID: {
            method: 'GET',
            url: ({userID, page = 0, limit = 10}) => `${BASE_URL}/tweet/tweets/${userID}?page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        },
        GET_REPOST_TWEETS_BY_USERID: {
            method: 'GET',
            url: ({userID, page = 0, limit = 10}) => `${BASE_URL}/tweet-repost/get-repost-tweet/${userID}?page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        },
        GET_LOVE_TWEETS_BY_USERID: {
            method: 'GET',
            url: ({userID, page = 0, limit = 10}) => `${BASE_URL}/tweet-love/get-tweet-loved/${userID}?page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        },
        ACTION_TWEET_BY_USERID: {
            method: 'POST',
            url: `${TWEER_URL_BASE}/tweet/action`,
            requiresToken: true,
            responseType: 'json'
        },
        DELETE_ACTION_TWEET_BY_USERID: {
            method: 'DELETE',
            url: `${TWEER_URL_BASE}/tweet/delete-action`,
            requiresToken: true,
            responseType: 'json'
        },
    },
    AUTH: {
        SIGN_UP: {
            method: 'POST',
            url: `${USER_URL_BASE}/guest/sign-up`,
            requiresToken: false,
            responseType: 'json'
        },
        LOGIN: {
            method: 'POST',
            url: `${USER_URL_BASE}/guest/login`,
            requiresToken: false,
            responseType: 'json'
        }
    },
    NOTIFICATION: {
        GET_NOTIFICATIONS: {
            method: 'GET',
            url: ({userID, page = 0, limit = 12}) => `${BASE_URL}/notification/get/${userID}?page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        }
    }
}
export default ENDPOINTS