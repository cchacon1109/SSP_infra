import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { CorsHttpMethod, HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';

export class SSPApigatewayStack extends Stack {

    public readonly  sspApiGateway: HttpApi;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id);

        this.sspApiGateway = new HttpApi(scope, 'SSPApiGateway', {
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
                allowOrigins: ['*'],
                maxAge: Duration.seconds(0)
            }
        });

        new CfnOutput(this, 'SSPApiGateway', { value: this.sspApiGateway.apiId });
    }
}
