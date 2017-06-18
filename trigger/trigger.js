'use strict'

const AWS = require('aws-sdk');

module.exports.trigger = (event, context, callback) => {
  const sns = new AWS.SNS();

  const requestBody = JSON.parse(event.body);

  const accountId = '333957587677';
  const project = requestBody.project;
  const file = requestBody.file;
  if (typeof project !== 'string' || typeof file !== 'string') {
    console.error('Validation Failed');
    callback(new Error(`Couldn't post to SNS because of validation issues`));
    return
  }

  const message = {
      project: "${project}",
      file: "${file}"
    }

  const params = {
    Message: JSON.stringify(message),
    TopicArn: `arn:aws:sns:eu-west-1:${accountId}:isite-sns`
  };

  sns.publish(params, (error, data) => {
    if (error) {
      console.log(error);
      callback(error);
    }
    callback(null, { message: 'Message successfully published to SNS topic "config"', event });
  });
};

// console.log("Loading function");
// var AWS = require("aws-sdk");

// exports.handler = function(event, context) {
//     var eventText = JSON.stringify(event, null, 2);
//     console.log("Received event:", eventText);
//     var sns = new AWS.SNS();
//     var params = {
//         Message: eventText,
//         Subject: "Test SNS From Lambda",
//         TopicArn: "arn:aws:sns:us-west-2:123456789012:test-topic1"
//     };
//     sns.publish(params, context.done);
// };