const path = require('path');
const fs = require('fs');

async function directoryCopy() {
  await fs.promises.rm(path.join(__dirname, 'files-copy'), {
    recursive: true,
    force: true,
  });
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
  const filesDirectory = await fs.promises.readdir(
    path.join(__dirname, 'files'),
    {
      withFileTypes: true,
    }
  );
  for (let item of filesDirectory) {
    fs.promises.copyFile(
      path.join(path.join(__dirname, 'files'), item.name),
      path.join(path.join(__dirname, 'files-copy'), item.name)
    );
  }
}
directoryCopy();
