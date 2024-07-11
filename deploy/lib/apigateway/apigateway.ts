import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';

export class SSPApigatewayStack extends Stack {

    public readonly sspApiGateway: HttpApi;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.sspApiGateway = new HttpApi(this, 'SSPApiGatewayId', {
            apiName: 'SSPApiGateway',
            corsPreflight: {
                allowMethods: [
                    CorsHttpMethod.DELETE,
                    CorsHttpMethod.GET,
                    CorsHttpMethod.HEAD,
                    CorsHttpMethod.OPTIONS,
                    CorsHttpMethod.PATCH,
                    CorsHttpMethod.POST,
                    CorsHttpMethod.PUT,
                ],
                allowOrigins: ['*']
            }
        });

        new CfnOutput(this, 'SSPApiGatewayOutput', { value: this.sspApiGateway.apiId });
    }
}
