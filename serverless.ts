import type { AWS } from '@serverless/typescript';
import { parkSearch } from './resources/parkSearch';
import hello from '@functions/hello';
import populateIndex from '@functions/populateIndex';
import triggerReIndex from '@functions/triggerReIndex';
import searchParks from '@functions/searchParks';
import * as dotenv from "dotenv";
const { parsed } = dotenv.config();


const serverlessConfiguration: AWS = {
  service: 'parks-search',
  frameworkVersion: '2',

  custom: {
    bundle: {
      linting: false
    }
  },
  plugins: ['serverless-bundle'],
  provider: {
    iamRoleStatements: [
      {
        "Effect": "Allow",
        "Action": [
          "lambda:InvokeFunction"
        ],
        "Resource": "*"
      },
      {
        "Effect": "Allow",
        "Action": [
          "es:*",
          "es:ESHttpGet"
        ],
        "Resource": [
          `arn:aws:es:us-west-2:${parsed.AWS_ACCOUNT}:domain/parks-search`,
          `arn:aws:es:us-west-2:${parsed.AWS_ACCOUNT}:domain/parks-search/*`
        ]
      }
    ],
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-west-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: parsed,
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, populateIndex, triggerReIndex,searchParks },
  package: {
    individually: true
  },
  resources: {
    Resources: {
      ParkSearch: parkSearch
    }
  }
};

module.exports = serverlessConfiguration;
