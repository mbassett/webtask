var execsync = require('child_process').execSync;

// use execsync for blocking, pass stdin/stdout/stderr to execsync

module.exports = function (context, cb) {
    cmd = (context.data.cmd || 'ls -al /usr/bin');
    cb(null, 'Connect to logs.  add/manipulate urlencoded commands via &cmd=command');
    console.log('IP Address of container is:')
    execsync('curl curlmyip.com', {stdio:[0,1,2]} );
    console.log('Output of command: ',cmd);
    execsync(cmd, {stdio:[0,1,2]} );
    console.log('Complete');

}
