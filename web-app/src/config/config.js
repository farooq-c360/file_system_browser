const config = {
    production:{
        API_BASE_URLS: 'http://localhost:2000/',
        API_URLS: {
            BROWSER: {
                LIST: 'http://localhost:2000/files/',
                ADD: 'http://localhost:2000/files/add'
            },
            RECENT: {
                LIST: 'http://localhost:2000/recent/'
            },
            BOOKMARK: {
                LIST: 'http://localhost:2000/bookmark/',
                ADD: 'http://localhost:2000/bookmark/add'
            }
        }
    },
    default:{
        API_BASE_URLS: 'http://localhost:2000/',
        API_URLS: {
            BROWSER: {
                LIST: 'http://localhost:2000/files/',
                ADD: 'http://localhost:2000/files/add'
            },
            RECENT: {
                LIST: 'http://localhost:2000/recent/'
            },
            BOOKMARK: {
                LIST: 'http://localhost:2000/bookmark/',
                ADD: 'http://localhost:2000/bookmark/add'
            }
        }
    }
}

exports.get = function get(env){
    console.log(config.default);
    return config[env] || config.default
} 