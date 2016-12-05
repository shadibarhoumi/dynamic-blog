module.exports = {
  entry: [
    'babel-polyfill',
    './public/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        loader: 'babel'
      },
      {
        test: /ReactHtml5Video\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.css$/,
        exclude: /ReactHtml5Video\.css$/,
        loader: 'style!css-loader?modules=1&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
        test: /\.(svg|woff|ttf|eot|png|jpg|gif|otf)(\?.*)?$/i,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  },
  devtool: 'source-map'
};
