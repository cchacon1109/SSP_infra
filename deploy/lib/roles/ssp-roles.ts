import { Stack, StackProps} from 'aws-cdk-lib';
import { Role, PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';


export class SSPRolesStack extends Stack {
    
    public readonly sspBackRole: Role;
    
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        
    

    }
}