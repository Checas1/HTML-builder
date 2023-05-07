const path = require('path');
const fs = require('fs');

let createFile = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css')
);

async function mergeStyle() {
  fs.readdir(
    path.join(__dirname, 'styles'),
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) {
        throw err;
      }
      files.forEach((file) => {
        if (file.isFile()) {
          if (path.extname(file.name).slice(1) == 'css') {
            fs.createReadStream(path.join(__dirname, 'styles', file.name)).pipe(
              createFile
            );
          }
        }
      });
    }
  );
}

mergeStyle();
