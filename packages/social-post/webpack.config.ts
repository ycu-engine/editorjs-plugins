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
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

export default config
