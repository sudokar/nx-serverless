import type { Serverless } from 'serverless/aws';

export const baseServerlessConfiguration: Partial<Serverless> = {
  frameworkVersion: '3',
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      target: 'node18',
      packager: 'yarn',
      sourcemap: true,
      sourcesContent: false,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    memorySize: 128,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    stage: '${opt:stage}',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    region: 'eu-west-1',
  },
};
