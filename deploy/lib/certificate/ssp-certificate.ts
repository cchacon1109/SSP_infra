//create new certificate stack
import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';

export class SSPCertificateStack extends Stack {

    public readonly certificate: Certificate;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const hostedZone = HostedZone.fromLookup(this, 'HostedZone', {
            domainName: 'ssp.com',
        });

        this.certificate = new Certificate(this, 'SSPCertificate', {
            domainName: 'ssp.com',
            validation: CertificateValidation.fromDns(hostedZone),
        });

        new CfnOutput(this, 'CertificateArn', { value: this.certificate.certificateArn });
    }
}
