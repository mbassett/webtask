var execsync = require('child_process').execSync;

// snag precompiled netcat and nmap
// run nmap scan of &host=a.b.c.d

// missing some libs for nmap precompiled
//[12:35:09.639Z]  INFO wt: linux-vdso.so.1 (0x00007fff2939d000)
//[12:35:09.640Z]  INFO wt:
//    libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3 (0x00007f91a35f0000)
//    	libpcap.so.0.8 => not found
//    	libssl.so.1.0.0 => /usr/lib/x86_64-linux-gnu/libssl.so.1.0.0 (0x00007f91a338f000)
//    	libcrypto.so.1.0.0 => /usr/lib/x86_64-linux-gnu/libcrypto.so.1.0.0 (0x00007f91a2f94000)
//    	liblua5.2.so.0 => not found
//    	liblinear.so.1 => not found
//    	libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007f91a2c88000)
//    	libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f91a2987000)
//    	libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007f91a2770000)
//    	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f91a23c7000)
//    	libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f91a21aa000)
//    	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f91a1fa5000)
//    	/lib64/ld-linux-x86-64.so.2 (0x000055724f1be000)
//[12:35:09.640Z]  INFO wt: Complete
//[12:35:48.423Z]  INFO wt: webtask container recycled



module.exports = function (context, cb) {
    cb(null, 'Connect to logs. ');
    cmd = 'wget https://www.dropbox.com/s/u0my5zl9lelhiv8/stuff.tar.bz?dl=0 -O /tmp/stuff.tar.bz'
    execsync(cmd, {stdio:[0,1,2]} );
    cmd = 'cd /tmp; tar xjvf stuff.tar.bz'
    execsync(cmd, {stdio:[0,1,2]});
    cmd = 'cd /tmp && ldd nmap';
    execsync(cmd, {stdio:[0,1,2]} );
    console.log('Complete');
}
