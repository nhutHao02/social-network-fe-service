const USER_URL_BASE = "http://localhost:7000/api/v1";
const TWEER_URL_BASE = "http://localhost:4000/api/v1";
const CHAT_URL_BASE = "http://localhost:5000/api/v1";
const NOTIF_URL_BASE = "http://localhost:9000/api/v1";
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
        GET_TWEETS_BY_USERID: {
            method: 'GET',
            url: ({userID, action, page = 1, limit = 10}) => `${TWEER_URL_BASE}/tweet/tweet-action?userID=${userID}&page=${page}&limit=${limit}&action=${action}`,
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
        GET_TWEET_COMMENTS: {
            method: 'GET',
            url: ({tweetID, page = 1, limit = 10}) => `${TWEER_URL_BASE}/tweet/comment?page=${page}&limit=${limit}&tweetID=${tweetID}`,
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
            url: ({userID, page = 1, limit = 12}) => `${NOTIF_URL_BASE}/notif?userID=${userID}&page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        }
    },
    USER: {
        GET_INFO_BY_USER_ID: {
            method: 'GET',
            url: ({userID}) => `${USER_URL_BASE}/user/${userID}`,
            requiresToken: true,
            responseType: 'json'
        },
        GET_FOLLOWING_OF_USER_ID: {
            method: 'GET',
            url: ({userID}) => `${USER_URL_BASE}/user/following/${userID}`,
            requiresToken: true,
            responseType: 'json'
        },
        GET_FOLLOWER_OF_USER_ID: {
            method: 'GET',
            url: ({userID}) => `${USER_URL_BASE}/user/follower/${userID}`,
            requiresToken: true,
            responseType: 'json'
        },
        UPDATE_USER_INFO: {
            method: 'PUT',
            url: ({userID}) => `${USER_URL_BASE}/user`,
            requiresToken: true,
            responseType: 'json'
        },
    },
    CHAT: {
        RECENT_MESSAGES: {
            method: 'GET',
            url: ({userID, page = 1, limit = 12}) => `${CHAT_URL_BASE}/chat/recent?userID=${userID}&page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        },
        GET_PRIVATE_MESSAGES: {
            method: 'GET',
            url: ({senderID, receiverID, page = 1, limit = 12}) => `${CHAT_URL_BASE}/chat?senderID=${senderID}&receiverID=${receiverID}&page=${page}&limit=${limit}`,
            requiresToken: true,
            responseType: 'json'
        }
    },
}
export default ENDPOINTS