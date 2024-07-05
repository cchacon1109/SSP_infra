//create new secret manager stack class
import { Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class SSPSecretManagerStack extends Stack {
    public readonly secret: Secret;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.secret = new Secret(scope, 'SSPSecret', {
            secretName: 'SSPSecret',
            secretObjectValue: {
                username: SecretValue.unsafePlainText('admin'),
                password: SecretValue.unsafePlainText('password')
            }
        });
    }
}