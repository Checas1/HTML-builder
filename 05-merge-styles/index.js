const fs = require('fs');
const path = require('path');

async function mergeStyle() {
  let commonStyle = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'bundle.css')
  );
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
            const readableStream = fs.createReadStream(
              path.join(__dirname, 'styles', file.name)
            );
            readableStream.pipe(commonStyle);
          }
        }
      });
    }
  );
}

mergeStyle();
