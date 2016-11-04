'use strict';

const _ = require('lodash');

const issuePrefix = /^(PA|EO|V5X)(-|\\|\/)\d+/gi;
const branchPrefix = /^(enhancement|enhancement|enhacenment|enhacement|doc|refactor|style|test|task|chore|feature|fix|bugfix|PA|EO|V5X|\d*)(-|\\|\/)+/gi;    
const toRemove = {
    "prefixBranch": ["enhancement/", "fix/", "feature/", "doc/", "enhancement/", "refactor/", "style/", "test/", "chore/"],
    "removeFromCommit": ["Merged in ", "Merge branch ", " into develop"]
}    

function updateFields(result) {

    // let regex = /(^Merge branch \'(enhancement|doc|refactor|style|test|chore|feature|fix|bugfix|PA|EO|V5X))(\/)*((PA|EO|V5X)(-|\\|\/)\d+)*(-|\/|\\)\w+(\' into \'develop\')/gi
    let regex = /^Merge branch \'(enhancement|doc|refactor|style|test|chore|feature|fix|bugfix|PA|EO|V5X|\d)(-|\\|\/)*((PA|EO|V5X)(-|\\|\/)\d+)*/gi
    // result = result.filter(function (commit) {
    //     return regex.test(commit.subject);
    // })
    
    result.map(commit => {
        commit.subjectClean = commit.subject;
        toRemove.removeFromCommit.forEach(function(remove) {
            commit.subjectClean = commit.subjectClean.replace(remove, "");
        })

        let branchType = commit.subjectClean.match(branchPrefix);

        if (branchType) {
            commit.branchType = branchType[0].replace(/(-|\\|\/)/, "");
            commit.subjectClean = commit.subjectClean.replace(branchType[0], "");
        } else {
            commit.branchType = "No branch type";
        }

        let issue = commit.subjectClean.match(issuePrefix);

        if (issue) {
            console.log(commit)
            commit.subjectClean = commit.subjectClean.replace(issue[0], "").replace("-", "").replace("/", "");
            commit.subjectClean = _.startCase(commit.subjectClean);
            commit.issueClean = '<a  target="_blank"  href="https://intelligize-scrum.atlassian.net/browse/' + issue[0] + '">' + issue[0] + '</a> ';
            commit.commitLink = '<a  target="_blank"  href="https://bitbucket.org/intelligize/intelligize.ui/commits/' + commit.commit + '">' + commit.abbreviated_commit + '</a> ';
        } else {
            commit.issueClean = "No issue number";
        }
    })

    return result;
}




module.exports = updateFields;
