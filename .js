const fs = require('fs');
const readline = require('readline');
const Transform = require('stream').Transform;

// Function to convert every third word to uppercase
function toUpperCaseEveryThirdWord() {
  let counter = 1;
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      let text = chunk.toString();
      const words = text.split(' ');

      for (let i = 2; i < words.length; i += 3) {
        words[i] = words[i].toUpperCase();
      }

      text = words.join(' ');
      this.push(text);
      callback();
    }
  });

  return transformStream;
}

// Read the input file
const readableStream = fs.createReadStream('F:\\testProjectUKD\\tests2.txt');
const writableStream = fs.createWriteStream('output.txt');

// Pipe the readable stream through the transform stream and writable stream
readableStream.pipe(toUpperCaseEveryThirdWord()).pipe(writableStream);

