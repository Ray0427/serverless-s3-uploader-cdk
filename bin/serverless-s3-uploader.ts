#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessS3UploaderStack } from '../lib/serverless-s3-uploader-stack';

const app = new cdk.App();
new ServerlessS3UploaderStack(app, 'ServerlessS3UploaderStack');
