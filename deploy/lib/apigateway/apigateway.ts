import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';

export class SSPApigatewayStack extends Stack {

    public readonly httpApi: HttpApi;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id);

        // Create a new HTTP API Gateway
        this.httpApi = new HttpApi(this, 'ssp-apigateway', {
            apiName: 'ssp-apigateway',
            description: 'API Gateway para los endpoint de SSP',
            createDefaultStage: true,
        });

        //Create output http api gateway id
        new CfnOutput(this, 'HttpApiGatewayId', {
            value: this.httpApi.apiId,
            description: 'Identificador de apigateway SSP',
            exportName: 'HttpApiGatewayId',
        });

    }
}
