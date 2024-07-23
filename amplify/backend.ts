import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const backend = defineBackend({
  data,
});

const bedrockData = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.us-east-1.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: 'us-east-1',
      signingServiceName: 'bedrock'
    }
  }
);

bedrockData.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-v2:1"
    ],
    actions: ["bedrock:InvokeModel"],
  })
)
