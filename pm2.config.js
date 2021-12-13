module.exports = {
    apps: [{
        name: 'development',
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
    }]
}