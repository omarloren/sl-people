/**
 *  Didn't really want to have two different processes running,
 *  so I created a little custom server with a wrapper for the metaweather api and
 *  all the webpack-dev-server funcionality based on this example:
 *  https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/example/server.js
 *
 */

const http    = require('http');
const express = require('express');
const config  = require('config');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config');
const { ppid } = require('process');
const compiler = webpack(webpackConfig);

const People = require('./lib/People').People;

require('console-stamp')(console, 'HH:MM:ss.l');

const app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require('morgan')('short'));

(function() {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config');
    const compiler = webpack(webpackConfig);

    app.use(
        require('webpack-dev-middleware')(compiler, {
        logLevel: 'warn',
        publicPath: webpackConfig.output.publicPath
        })
    );

    app.use(
        require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
        })
    );
})();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/people', async (req, res) => {
    const people = new People();
    try {
        await people.fetch();
        res.send(people.data);
    } catch(e) {
        console.error(e)
        res.send(500, 'Error while fetching people data')
    }
});

app.get('/api/people/frequency', async(req, res) => {
    const people = new People();
    try {
        await people.frequency();
        res.send(people.data)
    } catch(e) {
        console.error(e)
        res.send(500, 'Error while fetching people frequency data') 
    }
})

const server = http.createServer(app);

server.listen(config.get('server.port') || 8080, function() {

    if (!config.has('sl_api_key')) {
        console.error(`sl_api_key ::: not found in configuration file`)
    }

    if (!config.has('sl_api_url')) {
        console.error(`sl_api_url ::: not found in configuration file`) 
    }

    console.log('Listening on %j', server.address());
});
