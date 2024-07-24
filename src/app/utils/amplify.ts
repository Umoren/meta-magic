import config from "#/amplify_outputs.json"
import { Amplify } from "aws-amplify"
import { generateClient } from "aws-amplify/data"
import { type Schema } from "@/../../amplify/data/resource"

// Configure Amplify with Analytics
Amplify.configure({
    ...config,
    Analytics: {
        Pinpoint: {
            appId: config.analytics.amazon_pinpoint.app_id,
            region: config.analytics.amazon_pinpoint.aws_region
        }
    }
});

export const amplifyClient = generateClient<Schema>();