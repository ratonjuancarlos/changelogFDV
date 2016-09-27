'use strict';

const issuePrefix = /^(PA|EO)-\d+/gi;
const branchPrefix = /^(enhancement\/|fix\/|feature\/|doc\/|enhancement\/|refactor\/|style\/|test\/|chore\/)+/gi;    
const toRemove = {
    "prefixBranch": ["enhancement/", "fix/", "feature/", "doc/", "enhancement/", "refactor/", "style/", "test/", "chore/"],
    "removeFromCommit": ["Merge branch '", "' into 'develop'"]
}    

function updateFields(result) {
    result.map(commit => {
        commit.subjectClean = commit.subject;
        toRemove.removeFromCommit.forEach(function(remove) {
            commit.subjectClean = commit.subjectClean.replace(remove, "");
        })
        let branchType = commit.subjectClean.match(branchPrefix);

        if (branchType) {
            commit.branchType = branchType[0].replace("/", "");
            commit.subjectClean = commit.subjectClean.replace(branchType[0], "");
        } else {
            commit.branchType = "No branch type";
            commit.subjectClean = "";
        }

        let issue = commit.subjectClean.match(issuePrefix);

        if (issue) {
            commit.subjectClean = commit.subjectClean.replace(issue[0], "").replace("-", "").replace("/", "");
            commit.issueClean = '<a href="https://intelligize-scrum.atlassian.net/browse/' + issue[0] + '">' + issue[0] + '</a> ';
        } else {
            commit.issueClean = "No issue number";
        }
    })
    return result;
}




module.exports = updateFields;
