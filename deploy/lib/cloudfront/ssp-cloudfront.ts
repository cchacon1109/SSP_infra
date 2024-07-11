//add certificate manager

import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IBucket } from 'aws-cdk-lib/aws-s3';
import { CloudFrontAllowedCachedMethods, CloudFrontWebDistribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';

interface SSPCloudfrontStackProps extends StackProps {
    bucket: IBucket;
    waf: CfnWebACL;
}
export class SSPCloudfrontStack extends Stack {

    constructor(scope: Construct, id: string, props?: SSPCloudfrontStackProps) {
        super(scope, id, props);

        
        const originAccessIdentity = new OriginAccessIdentity(this, 'SSPOriginAccessId');

        const distribution = new CloudFrontWebDistribution(this, 'SSPFrontWebDistributionId', {
            defaultRootObject: 'index.html',
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: props!.bucket,
                        originAccessIdentity: originAccessIdentity,
                    
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                },
            ],
            webACLId: props!.waf.attrArn
        });

        new CfnOutput(this, 'DistributionDomainName', { value: distribution.distributionDomainName });
    }
}
