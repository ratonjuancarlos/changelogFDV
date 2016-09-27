const fse = require('fs-extra');
const exec = require('child_process').exec;
const _ = require('lodash');
const changeCase = require('change-case');

const cmd =  require('./lib/gitLog');
const updateFields =  require('./lib/updateFields');
const commitItem =  require('./lib/commitItem');




exports.generateChangeLog = function() {
    let result = {};
    let stream;
    stream = fse.createWriteStream('CHANGELOG.html');

    exec(cmd, function(error, stdout, stderr) {
        stdout = stdout.substring(0, stdout.length - 1);
        stdout = '[' + stdout + ']';
        result = JSON.parse(stdout);

        stream.write('<!DOCTYPE html><html><header></header><body>');
        stream.write('<h1>Intelligize changelog</h1>');


        result = updateFields(result);



        let resultByDate = _.groupBy(result, 'date');
		
		for (let dateCommit in resultByDate) {
		    stream.write('<h2>' + dateCommit + '</h2>');

		    if (resultByDate.hasOwnProperty(dateCommit)) {
		        let byBranch = _.groupBy(resultByDate[dateCommit], 'branchType');
		    
		        for (let branchTypeCommit in byBranch) {
		            stream.write('<h3>' + branchTypeCommit + '</h3>');
		    
		            byIssue = _.orderBy(byBranch[branchTypeCommit], ['issueClean'], ['desc']);

        			stream.write('<ul>');
		    
		            for (let issue in byIssue) {
		            	let commit = byIssue[issue]
		                stream.write( commitItem(commit) );

		            }
        	
        			stream.write('</ul>');
		        }
		    }
		}

        stream.write('</body></html>');
        stream.end();
    });
}

this.generateChangeLog();

// module.exports = generateChangeLog;