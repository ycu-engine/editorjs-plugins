import { resolve } from 'path'
import webpack from 'webpack'

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'SocialPost',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader?removeSVGTagAttrs=false',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

export default config
