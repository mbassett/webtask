var sync = require('child_process').execSync;

module.exports = function (context, cb) {
    cmd = (context.data.cmd || 'ls -al /usr/bin');
    cb(null, 'Connect to logs.  add/manipulate urlencoded commands via &cmd=command');
    console.log('IP Address of container is:')
    sync('curl curlmyip.com', {stdio:[0,1,2]});
    console.log('Output of command: ',cmd);
    sync(cmd, {stdio:[0,1,2]});
    // something kills the box before the timeout, but it definitely blocks for a while
    // needs investigation
    sync('python -c \'import time;time.sleep(5000)\'', {stdio:[0,1,2]});
    console.log('Complete');
}
