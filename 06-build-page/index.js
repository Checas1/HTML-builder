const path = require('path');
const fs = require('fs');

async function directoryCopy() {
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
}

async function mergeStyle() {
  let commonStyle = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'style.css')
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

async function assetsCopy() {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

async function fontsCopy() {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets', 'fonts'),
    { recursive: true },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  const filesDirectory = await fs.promises.readdir(
    path.join(__dirname, 'assets', 'fonts'),
    {
      withFileTypes: true,
    }
  );
  for (let item of filesDirectory) {
    fs.promises.copyFile(
      path.join(path.join(__dirname, 'assets', 'fonts'), item.name),
      path.join(
        path.join(__dirname, 'project-dist', 'assets', 'fonts'),
        item.name
      )
    );
  }
}

async function imgCopy() {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets', 'img'),
    { recursive: true },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  const filesDirectory = await fs.promises.readdir(
    path.join(__dirname, 'assets', 'img'),
    {
      withFileTypes: true,
    }
  );
  for (let item of filesDirectory) {
    fs.promises.copyFile(
      path.join(path.join(__dirname, 'assets', 'img'), item.name),
      path.join(
        path.join(__dirname, 'project-dist', 'assets', 'img'),
        item.name
      )
    );
  }
}

async function svgCopy() {
  fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets', 'svg'),
    { recursive: true },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  const filesDirectory = await fs.promises.readdir(
    path.join(__dirname, 'assets', 'svg'),
    {
      withFileTypes: true,
    }
  );
  for (let item of filesDirectory) {
    fs.promises.copyFile(
      path.join(path.join(__dirname, 'assets', 'svg'), item.name),
      path.join(
        path.join(__dirname, 'project-dist', 'assets', 'svg'),
        item.name
      )
    );
  }
}

async function htmlCreate() {
  let array = [];
  let sampleFile = await fs.promises.readFile(
    path.join(__dirname, 'template.html'),
    'utf8'
  );
  const tags = sampleFile.match(/\{\{[\w\s]+\}\}/g);
  tags.forEach((tag) => {
    const componentFile = path.join(
      path.join(__dirname, 'components'),
      `${tag.slice(2, -2)}.html`
    );
    array.push(
      new Promise((resolve, reject) => {
        fs.readFile(componentFile, 'utf8', (err, componentHTML) => {
          if (err) {
            reject(err);
          } else {
            resolve({ tag, componentHTML });
          }
        });
      })
    );
  });
  const results = await Promise.all(array);
  results.forEach(({ tag, componentHTML }) => {
    sampleFile = sampleFile.replace(tag, componentHTML);
  });

  await fs.promises.writeFile(
    path.join(path.join(__dirname, 'project-dist'), 'index.html'),
    sampleFile,
    'utf-8'
  );
}

(async function () {
  await directoryCopy();
  await mergeStyle();
  await assetsCopy();
  await fontsCopy();
  await imgCopy();
  await svgCopy();
  await htmlCreate();
})();
