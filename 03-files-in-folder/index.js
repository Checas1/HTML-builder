const { stdout } = process;
const path = require('path');
const fs = require('fs');

const directory = path.join(__dirname, 'secret-folder');

async function checkHolder() {
  const directoryFiles = await fs.promises.readdir(directory);
  directoryFiles.forEach((file) => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (error, stat) => {
      if (stat.isFile()) {
        const fileName = path.parse(file).name;
        const extName = path.extname(file).slice(1);
        const sizeFile = stat.size / 1024;
        stdout.write(fileName + ' - ' + extName + ' - ' + sizeFile + 'kb\n');
      }
    });
  });
}
checkHolder();
