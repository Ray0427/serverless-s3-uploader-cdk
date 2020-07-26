import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import * as iam from '@aws-cdk/aws-iam';

export class ServerlessS3UploaderStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const api = new apigateway.RestApi(this, 'Api', {
      defaultCorsPreflightOptions: {
        allowMethods: ['OPTIONS', 'GET'],
        allowHeaders: ['Content-Type'],
        allowOrigins: ['*'],
      },
    });
    const bucket = new s3.Bucket(this, 'S3Bucket', {
      cors: [{
        allowedHeaders: ['*'],
        allowedMethods: [
          s3.HttpMethods.GET,
          s3.HttpMethods.PUT,
          s3.HttpMethods.POST,
          s3.HttpMethods.DELETE,
          s3.HttpMethods.HEAD,
        ],
        allowedOrigins: ['*'],
      }],
    });
    const uploadFunction = new lambda.Function(this, 'UploaderFunction', {
      code: lambda.Code.asset('resources/s3-uploader-function'),
      handler: 'app.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        'UploadBucket': bucket.bucketName,
      },
      timeout: cdk.Duration.seconds(5),
      memorySize: 128,
    });
    const s3CrudPolicy = new iam.PolicyStatement({
      actions: [
        's3:GetObject',
        's3:PutObject',
      ],
      resources: [
        `${bucket.bucketArn}/*`,
      ],
    });
    uploadFunction.addToRolePolicy(s3CrudPolicy)
    const uploadIntegration = new apigateway.LambdaIntegration(uploadFunction, {});
    api.root.addMethod('GET', uploadIntegration);
    new cdk.CfnOutput(this, 'S3UploaderFunction', {
      value: uploadFunction.functionArn,
      description: 'Lambda Function ARN',
    });
    new cdk.CfnOutput(this, 'S3UploaderFunctionIamRole', {
      value: uploadFunction.role?.roleArn || '',
      description: 'Implicit IAM Role created for function',
    });
    new cdk.CfnOutput(this, 'S3BucketName', {
      value: bucket.bucketArn,
      description: 'S3 bucket',
    });
  }
}
