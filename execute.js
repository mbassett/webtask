var sys = require('sys')

//use exec and sys.puts to log to console

var exec = require('child_process').exec;

module.exports = function (context, cb) {
    cmd = (context.data.cmd || 'ls -al /usr/bin');
    console.log('IP Address of container is:')
    exec('curl curlmyip.com');
    console.log('Output of command: ',cmd);
    exec(cmd, puts);
    console.log('Complete');
    cb(null, 'Connect to logs.  add/manipulate urlencoded commands via &cmd=command');

    function puts(error, stdout, stderr) { sys.puts(stdout) }
}
