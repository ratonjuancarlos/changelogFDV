const fse = require('fs-extra');
const exec = require('child_process').exec;
const _ = require('lodash');
const request = require("request");


const cmdUnix =  require('./lib/gitLog');
const cmdWin =  require('./lib/gitLogWin');
const updateFields =  require('./lib/updateFields');
const commitItem =  require('./lib/commitItem');


exports.generateChangeLog = function() {

	process.argv.forEach(function (val, index, array) {
	  console.log(index + ':***-------******** ' + val);
	});



	let result = {};
    let stream;
    stream = fse.createWriteStream('CHANGELOG.html');

    var isWin = /^win/.test(process.platform);

    let cmd = (isWin) ? cmdWin : cmdUnix;

    // console.log("Running git log for " + (isWin) ? 'Windows' : 'Not Windows');
    exec(cmd, function(error, stdout, stderr) {
        stdout = stdout.substring(0, stdout.length - 1);
        stdout = '[' + stdout + ']';
        result = JSON.parse(stdout);

        // console.log("Starting HTML doc...");
        stream.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="style-src \'self\' \'unsafe-inline\'"></head><body>');
        // console.log("Adding styles...");
		// stream.write(styles);
        stream.write('<h1>Intelligize changelog</h1>');


        // console.log("Updating fields from json...");
        result = updateFields(result);



        // console.log("Grouping json by date");
        let resultByDate = _.groupBy(result, 'date');
		
		for (let dateCommit in resultByDate) {
		    stream.write('<h2>' + dateCommit + '</h2>');

		    if (resultByDate.hasOwnProperty(dateCommit)) {
        		// console.log("Grouping by date and commit");
		        let byBranch = _.groupBy(resultByDate[dateCommit], 'branchType');
		    
		        for (let branchTypeCommit in byBranch) {
		            stream.write('<h3>' + branchTypeCommit + '</h3>');
		    
        			// console.log("Sorting by branch type");
		            byIssue = _.orderBy(byBranch[branchTypeCommit], ['issueClean'], ['desc']);

        			stream.write('<ul>');
		    
		            for (let issue in byIssue) {
		            	let commit = byIssue[issue]
        				// console.log("Rendering commits");
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
