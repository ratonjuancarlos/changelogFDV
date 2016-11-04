'use strict';

        let gitLog = 'git log '
        let gitLogGrep = ' --grep="\' into \'develop\'" --grep="Merged in " '
        let gitLogSince = ' --since=2.months '
        // let gitLogSince = ''

        let gitLogPretty = ' --pretty=format:"{ &#34;date&#34;: &#34;%ad&#34;, &#34;commit&#34;: &#34;%H&#34;,%n  &#34;abbreviated_commit&#34;: &#34;%h&#34;,%n  &#34;tree&#34;: &#34;%T&#34;,%n  &#34;abbreviated_tree&#34;: &#34;%t&#34;,%n  &#34;parent&#34;: &#34;%P&#34;,%n  &#34;abbreviated_parent&#34;: &#34;%p&#34;,%n  &#34;refs&#34;: &#34;%D&#34;,%n   &#34;subject&#34;: &#34;%s&#34;,%n  &#34;sanitized_subject_line&#34;: &#34;%f&#34;,%n  &#34;commit_notes&#34;: &#34;%N&#34;,%n  &#34;verification_flag&#34;: &#34;%G?&#34;,%n  &#34;signer&#34;: &#34;%GS&#34;,%n  &#34;signer_key&#34;: &#34;%GK&#34;,%n  &#34;author&#34;: {%n    &#34;name&#34;: &#34;%aN&#34;,%n    &#34;email&#34;: &#34;%aE&#34;,%n    &#34;date&#34;: &#34;%aD&#34;%n  },%n  &#34;commiter&#34;: {%n    &#34;name&#34;: &#34;%cN&#34;,%n    &#34;email&#34;: &#34;%cE&#34;,%n    &#34;date&#34;: &#34;%cD&#34;%n  }%n}," '
        let gitLogDateFormat = ' --date=format:%d-%m-%Y '


var cmd = gitLog + gitLogGrep + gitLogSince + gitLogPretty + gitLogDateFormat;


module.exports = cmd;
