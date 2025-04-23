import type { NextConfig } from 'next';
import { Configuration, IgnorePlugin } from 'webpack'; // Added IgnorePlugin

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'flagcdn.com'
    ]
  },
  webpack: (config: Configuration) => {
    // Add IgnorePlugin for Console Ninja dependencies
    config.plugins = config.plugins || [];
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /(toffee|bracket-template|htmling)$/
      })
    );

    // Add externals for VS Code extension path
    config.externals = config.externals || [];
    config.externals.push({
      './../../.vscode/extensions/wallabyjs.console-ninja': 'commonjs empty'
    });

    // Ignore TypeScript declaration files
    config.module?.rules?.push({
      test: /\.d\.ts$/,
      loader: 'ignore-loader'
    });

    // Add proper TypeScript handling
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          compilerOptions: {
            isolatedModules: true,
          }
        }
      }
    });

    return config; // Added missing return statement
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: process.env.NEXT_OUTPUT_MODE === 'export' ? 'export' : undefined
};

export default nextConfig;