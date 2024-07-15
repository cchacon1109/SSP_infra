#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SSPApigatewayStack } from '../lib/apigateway/apigateway';
import { SSPSupabaseSecretStack } from '../lib/secrets/spp-sercrets';
import { SSPRolesStack } from '../lib/roles/ssp-roles';

const app = new cdk.App();

var env = {
    account: process.env.AWS_ACCOUNT_ID!,
    region: process.env.AWS_REGION!
};

var apigateway = new SSPApigatewayStack(app, "SSPApigatewayStack", {
    env: env
});

var secretsmanager = new SSPSupabaseSecretStack(app, "SSPSupabaseSecretStack", {
    supabaseKey: process.env.SUPABASE_KEY!,
    supabaseUrl: process.env.SUPABASE_URL!,
    supabaseSecret: process.env.SUPABASE_SECRET!,
    env: env
});

var role = new SSPRolesStack(app, "SSPRolesStack", {
    env: env
});

