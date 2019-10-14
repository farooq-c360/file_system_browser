const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        API_URL: process.env.API_URL
    },
    test:{
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://localhost:27017/mdd',
        API_URL: 'http://localhost:2000/'
    },
    default:{
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://localhost:27017/mdd',
        API_URL: 'http://localhost:2000/'
    }
}

exports.get = function get(env){
    console.log(config.default);
    return config[env] || config.default
} 