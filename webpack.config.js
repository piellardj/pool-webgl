module.exports = {
  entry: './tmp/scripts/js/main.js',
  output: {
    filename: 'main-min.js',
    path: '/home/jeremie/Bureau/github/pool-webgl/scripts/js/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'es2015', { modules: false } ]
          ]
        }
      }
    ]
  }
}
