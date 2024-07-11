//create new waf stack with common rules
import { Stack, StackProps, } from 'aws-cdk-lib';
import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

export class SSPWafStack extends Stack {

    public readonly webAcl: CfnWebACL;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.webAcl = new CfnWebACL(this, 'SSPWebACLId', {
            defaultAction: { allow: {} },
            scope: 'REGIONAL',
            visibilityConfig: {
                cloudWatchMetricsEnabled: true,
                metricName: 'SSPWebACL',
                sampledRequestsEnabled: true,
            },
            rules: [
                {
                    name: 'AWS-AWSManagedRulesCommonRuleSet',
                    priority: 1,
                    statement: {
                        managedRuleGroupStatement: {
                            vendorName: 'AWS',
                            name: 'AWSManagedRulesCommonRuleSet',
                        },
                    },
                    overrideAction: {
                        none: {},
                    },
                    visibilityConfig: {
                        sampledRequestsEnabled: true,
                        cloudWatchMetricsEnabled: true,
                        metricName: 'SSPWebACL-CRS',
                    },
                },
            ],
        });
    }
}