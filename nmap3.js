var execsync = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require('fs');

var target_exists = false;

function file_exist(path) {
    try {
       fs.accessSync(path, fs.F_OK);
       return true;
    } catch (e) { return false; };
}


function nmap_callback() {
  cmd = 'cat /data/io/nmap-3.log';
  execsync(cmd, {stdio:[0,1,2]});
}

module.exports = function (context, cb) {
    cb(null, 'Connect to logs.   Make sure to tickle the weburl to keep the container open or use nmap.py');
    //in order to create the nmap binary i used the netcat webtask to download and compile nmap, then copy it out w/ netcat
    //server:  nc -l -p 9999 | tar xvfp -
    //client:  tar cpf - /data/io/nmap-build | nc -w 3 1.2.3.4 9999

    if (!(file_exist('/data/io/stuff.tar.bz'))) {
        cmd = 'wget https://www.dropbox.com/s/u0my5zl9lelhiv8/stuff.tar.bz?dl=0 -O /data/io/stuff.tar.bz';
        execsync(cmd, {stdio:[0,1,2]} );
        cmd = 'cd /data/io/; tar xjvf stuff.tar.bz'
        execsync(cmd, {stdio:[0,1,2]});
    }

    try {
      if (context.data.target)
          target_exists = true;
    } catch (e) { };

    if (target_exists) {
        // if we do this as a blocking task the webtask controls will kill the long running process, so we'll do it non blocking and read the log via callback
        cmd = 'cd /data/io/ && ./nmap -vv -Pn -sT '+ context.data.target + ' -p' + context.data.ports + ' > /data/io/nmap-3.log 2>&1';
        console.log('launching ' + cmd);
        exec(cmd, nmap_callback);
    }
    console.log('Complete');
}
