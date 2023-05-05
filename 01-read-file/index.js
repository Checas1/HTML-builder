const { stdout } = process;
const path = require('path');
const fs = require('fs');

const reader = fs.createReadStream(path.join(__dirname, 'text.txt'));
reader.on('data', (read) => {
  const strData = read.toString();
  stdout.write(strData);
  process.exit();
});
reader.on('error', (error) => {
  stdout.write(error.message);
  process.exit();
});
