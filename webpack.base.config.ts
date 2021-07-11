import * as path from 'path';
import * as slsw from 'serverless-webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import * as webpack from 'webpack';

export const baseWebpackConfig = (
  directory: string
): webpack.Configuration => ({
  context: directory,
  mode: 'production',
  entry: slsw.lib.entries,
  devtool: 'inline-cheap-module-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      () => {
        return () => {
          return {
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          };
        };
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.json', '.ts', '.js'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.app.json',
      }),
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(directory, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(directory, 'node_modules'),
            path.resolve(directory, '.serverless'),
            path.resolve(directory, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
});
