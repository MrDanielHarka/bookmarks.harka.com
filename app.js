import fs from 'fs';
import { bookmarksToJSON } from 'bookmarks-to-json';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jp = require('jsonpath');

const content = fs.readFileSync('C:/Users/Asus/Documents/b.html', 'utf-8');
const options = {
  formatJSON: true,
  spaces: 2,
};

let jsonBookmarks = JSON.parse(bookmarksToJSON(content, options));

// let jsonBookmarks = JSON.parse(
//   fs.readFileSync('./../html-to-json/bookmarks.json', 'utf-8')
// );

// console.log(jsonBookmarks);

let names = jp.query(jsonBookmarks, `$..[?(@.type=="link")]`);

// console.log(names);

names = `const bookmarks = ${JSON.parse(JSON.stringify(JSON.stringify(names)))};
text.addEventListener('keyup', () => {
  let urls = '', i = bookmarks.length, txt = text.value.toUpperCase();
  if (txt.length) {
    while (i--) {
      if (
        bookmarks[i].url.toUpperCase().includes(txt) ||
        bookmarks[i].title.toUpperCase().includes(txt)
      ) {
        urls += '<br><a href="';
        urls += bookmarks[i].url;
        urls += '" rel="noreferrer noopener nofollow"';
        urls += 'tabindex="0" target="_blank">';
        urls += bookmarks[i].title;
        urls += '</a><br>';
      }
    }
  }
  links.innerHTML = urls;
});`;

fs.writeFileSync('js.js', names, 'utf-8', (err) => {
  if (err) {
    throw err;
  }
});
