#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SSPApigatewayStack } from '../lib/apigateway/apigateway';
import { SSPCloudfrontStack } from '../lib/cloudfront/ssp-cloudfront';
import { SSPSupabaseSecretStack } from '../lib/secrets/spp-sercrets';
import { SSPBucketStack } from '../lib/s3/ssp-bucket';
import { SSPWafStack } from '../lib/waf/spp-waf';
import { SSPRolesStack } from '../lib/roles/ssp-roles';
import { Tags } from 'aws-cdk-lib';

const app = new cdk.App();

var env = {
    account: process.env.AWS_REGION,
    region: process.env.AWS_ACCOUNT_ID
};

var apigateway = new SSPApigatewayStack(app, "SSPApigatewayStack", {
    env: env
});

var secretsmanager = new SSPSupabaseSecretStack(app, "SSPSupabaseSecretStack", {
    supabaseKey: process.env.SUPABASE_KEY!,
    supabaseUrl: process.env.SUPABASE_URL!,
    env: env
});

var bucket = new SSPBucketStack(app, "SSPBucketStack", {
    env: env
});

var waf = new SSPWafStack(app, "SSPWafStack", {
    env: env
});

var cloudfront = new SSPCloudfrontStack(app, "SSPCloudFrontStack", {
    bucket: bucket.bucket,
    waf: waf.webAcl,
    env: env
});

var role = new SSPRolesStack(app, "SSPRolesStack", {
    env: env
});


Tags.of(apigateway).add('environment', process.env.ENVIRONMENT!);
Tags.of(secretsmanager).add('environment', process.env.ENVIRONMENT!);
Tags.of(bucket).add('environment', process.env.ENVIRONMENT!);
Tags.of(cloudfront).add('environment', process.env.ENVIRONMENT!);
Tags.of(role).add('environment', process.env.ENVIRONMENT!);