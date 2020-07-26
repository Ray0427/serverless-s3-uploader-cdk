# Serverless S3 Uploader CDK

This is a project inspired by [Serverless S3 Uploader](https://github.com/jbesw/sar-s3-serverless-uploader) development with CDK.

The Serverless S3 Uploader allows you to upload JPG files to Amazon S3 buckets from your web applications using pre-signed URLs.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Requirements
* AWS CLI already configured with Administrator permission
* [NodeJS 12.x installed](https://nodejs.org/en/download/)

## Installation
```sh
$ npm install
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Reference
- [Serverless S3 Uploader](https://github.com/jbesw/sar-s3-serverless-uploader)
- [AWS CDK Developer Guide](https://docs.aws.amazon.com/cdk/latest/guide/home.html)
