import fs from 'fs';
import pkg from 'jsonpath';
import { bookmarksToJSON } from 'bookmarks-to-json';
let bookmarks = fs.readFileSync('C:/Users/Asus/Documents/b.html', 'utf-8');
bookmarks = JSON.parse(bookmarksToJSON(bookmarks));
bookmarks = pkg.query(bookmarks, `$..[?(@.type=="link")]`);
bookmarks = `const bookmarks = ${JSON.parse(
  JSON.stringify(JSON.stringify(bookmarks))
)};
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
fs.writeFileSync('js.js', bookmarks, 'utf-8');
fs.unlinkSync('C:/Users/Asus/Documents/b.html');
