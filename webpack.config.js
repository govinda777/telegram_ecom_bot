const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv()
  ],
  mode: 'production'
};
