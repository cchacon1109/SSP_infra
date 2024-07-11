//add certificate manager

import { Stack, StackProps, CfnOutput, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption, IBucket } from 'aws-cdk-lib/aws-s3';
import { CloudFrontAllowedCachedMethods, CloudFrontWebDistribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';

export class SSPCloudfrontStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const webAcl = new CfnWebACL(this, 'SSPWebACLId', {
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

        const bucket = new Bucket(this, 'SSPBucketSPAId', {
            bucketName: 'ssp-bucket-spa',
            encryption: BucketEncryption.S3_MANAGED,
            removalPolicy: RemovalPolicy.DESTROY
        });
        
        const originAccessIdentity = new OriginAccessIdentity(this, 'SSPOriginAccessId');

        const distribution = new CloudFrontWebDistribution(this, 'SSPFrontWebDistributionId', {
            defaultRootObject: 'index.html',
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: bucket,
                        originAccessIdentity: originAccessIdentity,
                    
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                },
            ],
            webACLId: webAcl.attrArn
        });

        new CfnOutput(this, 'DistributionDomainName', { value: distribution.distributionDomainName });
    }
}
