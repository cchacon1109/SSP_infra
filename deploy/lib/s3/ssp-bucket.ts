//create new bucket stack
import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption, IBucket } from 'aws-cdk-lib/aws-s3';
import { RemovalPolicy } from 'aws-cdk-lib';

export class SSPBucketStack extends Stack {

    public readonly bucket: IBucket;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.bucket = new Bucket(this, 'SSPBucketSPAId', {
            bucketName: 'ssp-bucket-spa',
            encryption: BucketEncryption.S3_MANAGED,
            removalPolicy: RemovalPolicy.DESTROY
        });

        new CfnOutput(this, 'BucketNameOuput', { value: this.bucket.bucketName });
    }
}