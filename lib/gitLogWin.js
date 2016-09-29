'use strict';

var cmd = 'git log --grep="^Merge branch \'fix" --grep="^Merge branch \'feat" --grep="^Merge branch \'docs" --grep="^Merge branch \'enhanc|BREAKING" --grep="^Merge branch \'refactor" --grep="^Merge branch \'style" --grep="^Merge branch \'test" --grep="^Merge branch \'chore" --grep="^Merge branch \'enhancement" --grep="^Merge pull request" --pretty=format:"{\\"date\\":\\"%ad\\", \\"commit\\":\\"%H\\", \\"abbreviated_commit\\":\\"%h\\", \\"tree\\":\\"%T\\", \\"abbreviated_tree\\":\\"%t\\", \\"parent\\":\\"%P\\", \\"abbreviated_parent\\":\\"%p\\", \\"refs\\":\\"%D\\", \\"encoding\\":\\"%e\\", \\"subject\\":\\"%s\\",\\"sanitized_subject_line\\":\\"%f\\", \\"commit_notes\\":\\"\\", \\"verification_flag\\":\\"%G?\\", \\"signer\\":\\"%GS\\", \\"signer_key\\":\\"%GK\\", \\"author\\": {   \\"name\\":\\"%aN\\",   \\"email\\":\\"%aE\\",   \\"date\\":\\"%aD\\"}, \\"commiter\\": {   \\"name\\":\\"%cN\\",   \\"email\\":\\"%cE\\",   \\"date\\":\\"%cD\\"  }}," --date=format:"%d-%m-%Y"';



module.exports = cmd;



