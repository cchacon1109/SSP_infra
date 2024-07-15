//create new secret manager stack class
import { Stack, StackProps, SecretValue, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

interface SSPSupabaseSecretStackProps extends StackProps {
    supabaseUrl: string;
    supabaseKey: string;
    supabaseSecret: string;
}

export class SSPSupabaseSecretStack extends Stack {
    public readonly secret: Secret;

    constructor(scope: Construct, id: string, props?: SSPSupabaseSecretStackProps) {
        super(scope, id, props);

        this.secret = new Secret(this, 'SSPSupabaseSecretId', {
            secretName: 'ssp-supabase-secret-v1',
            secretObjectValue: {
                supabaseUrl: SecretValue.unsafePlainText(props!.supabaseUrl),
                supabaseKey: SecretValue.unsafePlainText(props!.supabaseKey),
                supabaseSecret: SecretValue.unsafePlainText(props!.supabaseSecret)
            },
            removalPolicy: RemovalPolicy.DESTROY
        });
    }
}