import { defineBackend } from '@aws-amplify/backend';
import { data } from './data/resource';
import { PolicyStatement, Policy } from 'aws-cdk-lib/aws-iam';
import { CfnApp } from 'aws-cdk-lib/aws-pinpoint';
import { auth } from './auth/resource';
import { Stack } from 'aws-cdk-lib/core';

const backend = defineBackend({
  data,
  auth
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


const analyticsStack = backend.createStack("analytics-stack");

// create a Pinpoint app
const pinpoint = new CfnApp(analyticsStack, "Pinpoint", {
  name: "MetaEenfoAnalytics",
});

// create an IAM policy to allow interacting with Pinpoint
const pinpointPolicy = new Policy(analyticsStack, "PinpointPolicy", {
  policyName: "PinpointPolicy",
  statements: [
    new PolicyStatement({
      actions: ["mobiletargeting:UpdateEndpoint", "mobiletargeting:PutEvents"],
      resources: [pinpoint.attrArn + "/*"],
    }),
  ],
});

// apply the policy to the authenticated and unauthenticated roles
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(pinpointPolicy);

backend.addOutput({
  analytics: {
    amazon_pinpoint: {
      app_id: pinpoint.ref,
      aws_region: Stack.of(pinpoint).region,
    }
  },
});

