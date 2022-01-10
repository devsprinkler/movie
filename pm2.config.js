module.exports = {
    apps: [{
        name: 'movie.api',
        script: './dist/app.js',
        instances: 0,
        exec_mode: 'cluster',
        node_args: ["--expose-gc"],
        env_development: {
            NODE_ENV: "development",
            SERVER_ENV: "development",
            DEBUG: "log:*",
            PORT: 3333
        },
        env_test: {
            NODE_ENV: "test",
            SERVER_ENV: "test",
            DEBUG: "log:*",
            PORT: 3333
        },
        env_production: {
            NODE_ENV: "production",
            SERVER_ENV: "production",
            DEBUG: "log:*",
            PORT: 3333
        }
    }]
}