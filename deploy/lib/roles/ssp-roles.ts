import { Stack, StackProps} from 'aws-cdk-lib';
import { Role, PolicyStatement, Effect, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

interface SSPRolesStackProps extends StackProps {
    sspSecret?: Secret;
}

export class SSPRolesStack extends Stack {
    
    public readonly sspBackRole: Role;
    
    constructor(scope: Construct, id: string, props?: SSPRolesStackProps) {
        super(scope, id, props);

        this.sspBackRole = new Role(this, 'SSPBackRole', {
            roleName: 'SSPBackRole',
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });

        this.sspBackRole.addToPolicy(new PolicyStatement({
            effect: Effect.ALLOW,
            actions: [
                "secretsmanager:GetSecretValue",
                "secretsmanager:DescribeSecret",
                "logs:DescribeLogStreams",
                "logs:GetLogEvents",
                "logs:FilterLogEvents",
                "cloudwatch:ListMetrics",
                "cloudwatch:GetMetricData",
                "logs:DescribeLogGroups",
                "xray:GetTraceSummaries",
                "xray:BatchGetTraces",
                "lambda:*"
            ], 
            resources: [
                "*"
            ]
        }));


    }
}