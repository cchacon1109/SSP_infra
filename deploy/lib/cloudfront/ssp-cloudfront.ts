//add certificate manager

import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { CloudFrontWebDistribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';

interface SSPCloudfrontStackProps extends StackProps {
    bucket: IBucket;
}
export class SSPCloudfrontStack extends Stack {

    constructor(scope: Construct, id: string, props?: SSPCloudfrontStackProps) {
        super(scope, id, props);

        
        const originAccessIdentity = new OriginAccessIdentity(this, 'SSPOriginAccess');

        const distribution = new CloudFrontWebDistribution(this, 'SSPFrontWebDistribution', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: props!.bucket,
                        originAccessIdentity: originAccessIdentity,
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                },
            ],
        });

        new CfnOutput(this, 'DistributionDomainName', { value: distribution.distributionDomainName });
    }
}
