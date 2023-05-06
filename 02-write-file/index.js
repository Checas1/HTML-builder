const { exit, stdout, stdin } = process;
const path = require('path');
const fs = require('fs');

fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Напишите текст:\n');
stdin.on('data', (text) => {
  const currentText = text.toString().trim();
  if (currentText == 'exit') {
    exit();
  } else {
    fs.appendFile(path.join(__dirname, 'text.txt'), `${text}`, (err) => {
      if (err) {
        throw err;
      }
    });
  }
});

process.on('SIGINT', () => {
  exit();
});

process.on('exit', () => {
  stdout.write('Всего хорошего, удачи!\n');
});
