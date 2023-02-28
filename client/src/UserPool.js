import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-west-2_VygvrISZi",
    ClientId: "1bube19dudujtjbt6n2o24u9dp"
}

export default new CognitoUserPool(poolData); 