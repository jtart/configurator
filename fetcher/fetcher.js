'use strict';

const xml2jsParser = require('xml2js').parseString;

// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();
// AWS.config.setPromisesDependency(require('bluebird'));

// function xmlStringParser(xmlString)
// {
// 	return new Promise((resolve, reject) => {
// 	    xml2jsParser(xmlString, (err, result) => {
// 	         if(err){
// 	             reject(err);
// 	         }
// 	         else {
// 	             resolve(result);
// 	         }
// 	    });
// 	});
// }

const getiSiteData = (project, file) => {
    return require('fs').readFileSync(`./fixture/isite/${project}-${file}.xml`, 'utf8');
}

const xmlToJs = (xml) => {
	let data;
	xml2jsParser(xml, (err, result) => {
		if (err) {
			console.log(err);
		} else {
		data = result;
		}
	});
	return data;
}

module.exports.fetch = (event, context, callback) => {
	const message = JSON.parse(event.Records[0].Sns.Message);

	const project = message.project;
	const file = message.file;
	const iSiteData = getiSiteData(project, file);

	const iSiteDataJs = xmlToJs(iSiteData);

	const response = {
		statusCode: 200,
	    body: JSON.stringify({
	      	input: event,
	     	output: iSiteDataJs,
	    }),
	  };

  	callback(null, response);
};
