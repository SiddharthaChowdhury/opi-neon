const path = require('path'), HTWP = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output:{
        path: path.join(__dirname, '/dist'),
        filename: 'build.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[{
                    loader: 'babel-loader'
                }]
            }
        ]
    },
    plugins:[
        new HTWP({
            template: path.join(__dirname, '/src/index.html')
        })
    ]
}