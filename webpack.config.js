const path = require('path');
const EmitAllPlugin = require('webpack-emit-all-plugin');

const CLIENT_PATH = path.join(__dirname, './client/dist');
const SERVER_PATH = path.join(__dirname, './server/lib');

module.exports = [
    {
        entry: './client/src/index.js',
        output: { path: CLIENT_PATH, filename: 'bundle.js' },
        module: {
            loaders: [
                {
                    test: /.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: ['env', 'react']
                    }
                }
            ]
        }
    }
]