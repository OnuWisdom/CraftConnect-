const path = require('path');

module.exports = {

    entry: './public/js/signup.js',

    output: { 
        
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js')
    },

    mode: 'development'
}