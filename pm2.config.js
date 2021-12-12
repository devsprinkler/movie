module.exports = {
    apps: [{
        name: 'development',
        script: './dist/app.js',
        instances: 0,
        exec_mode: 'cluster'
    }]
}