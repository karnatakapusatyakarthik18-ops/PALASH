const { spawn } = require('child_process');
const path = require('path');

const exe = path.join(__dirname, '../release/win-unpacked/PALASH Vani.exe');
console.log('Launching:', exe);

const child = spawn(exe, [], {
  detached: true,
  stdio: 'ignore'
});

child.unref();
console.log('Successfully launched PALASH Vani Desktop (PID:', child.pid, ')');
