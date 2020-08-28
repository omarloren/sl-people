/**
 *  Didn't really want to have two different processes running,
 *  so I created a little custom server with a wrapper for the metaweather api and
 *  all the webpack-dev-server funcionality based on this example:
 *  https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/example/server.js
 *
 */

const http    = require('http');
const express = require('express');
const request = require('request');
const config  = require('config');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

require('console-stamp')(console, 'HH:MM:ss.l');

const app = express();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require('morgan')('short'));

(function() {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
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

app.get('/api/*', function(req, res) {
    const targetUrl = req.originalUrl.replace('api', '')

    request(
        {
            'url': `${config.get('sl_api_url')}${targetUrl}`,
            'headers': {
                'Authorization': `Bearer ${config.get('sl_api_key')}`
            }
        },
        function(err, response, body) {
            if (err) {
                return res.send(error);
            }
            res.send(body);
        }
    );
});

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
