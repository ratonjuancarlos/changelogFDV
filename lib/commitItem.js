'use strict';

function commitItem(commit) {
    return '<li>' + 
        commit.issueClean + 
        ' - ' +
        commit.subjectClean + 
        ' - ' +
        commit.author.name
}




module.exports = commitItem;
