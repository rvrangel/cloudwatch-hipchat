# cloudwatch-hipchat
AWS Lambda function to get a Cloudwatch alarm notification from SNS and post it to a Hipchat room

## Instructions

On Hipchat, create a new integration and get the auth token and room number, then edit the variables at the top of this function with your data.

On AWS you need to create a SNS topic that will receive your CloudWatch notifications (both ALARM and OK). After this, create this Lambda function and add the SNS topic as an Event Source. The Lambda Function will get the notifications from SNS and post it to your Hipchat room as soon as received.
