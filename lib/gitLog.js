'use strict';

var cmd = 'git log ' +
    '--grep="^Merge branch \'fix" ' +
    '--grep="^Merge branch \'feat" ' +
    '--grep="^Merge branch \'docs" ' +
    '--grep="^Merge branch \'enhanc|BREAKING" ' +
    '--grep="^Merge branch \'refactor" ' +
    '--grep="^Merge branch \'style" ' +
    '--grep="^Merge branch \'test" ' +
    '--grep="^Merge branch \'chore" ' +
    '--grep="^Merge branch \'enhancement" ' +
    '--grep="^Merge pull request"  ' +
    '--pretty=format:\'{' +
    '"date": "%ad", %n ' +
    '"commit": "%H",%n  ' +
    '"abbreviated_commit": "%h",%n  ' +
    '"tree": "%T",%n  ' +
    '"abbreviated_tree": "%t",%n  ' +
    '"parent": "%P",%n  ' +
    '"abbreviated_parent": "%p",%n  ' +
    '"refs": "%D",%n  ' +
    '"encoding": "%e",%n  ' +
    '"subject": "%s",%n  ' +
    '"sanitized_subject_line": "%f",%n  ' +
    '"commit_notes": "%N",%n  ' +
    '"verification_flag": "%G?",%n  ' +
    '"signer": "%GS",%n  ' +
    '"signer_key": "%GK",%n  ' +
    '"author": {%n    ' +
    '"name": "%aN",%n    ' +
    '"email": "%aE",%n    ' +
    '"date": "%aD"%n  ' +
    '},%n  ' +
    '"commiter": {%n    ' +
    '"name": "%cN",%n    ' +
    '"email": "%cE",%n    ' +
    '"date": "%cD"%n  ' +
    '}%n' +
    '},\' ' +
    '--date=format:\'%d-%m-%Y\'';



module.exports = cmd;
