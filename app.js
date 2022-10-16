import fs from 'fs';
import pkg from 'jsonpath';
let bookmarks = fs.readFileSync(
  'C:/Users/Asus/AppData/Local/Vivaldi/User Data/Default/Bookmarks',
  'utf-8'
);
bookmarks = JSON.parse(bookmarks);
bookmarks = pkg.query(bookmarks, `$..[?(@.type=="url")]`);
bookmarks = `const bookmarks = ${JSON.parse(
  JSON.stringify(JSON.stringify(bookmarks))
)};
text.addEventListener('keyup', () => {
  let urls = '', i = bookmarks.length, txt = text.value.toUpperCase();
  if (txt.length) {
    while (i--) {
      if (
        bookmarks[i].url.toUpperCase().includes(txt) ||
        bookmarks[i].name.toUpperCase().includes(txt) ||
        bookmarks[i].meta_info?.Nickname?.toUpperCase().includes(txt)
      ) {
        urls += '<br><a href="';
        urls += bookmarks[i].url;
        urls += '" rel="noreferrer noopener nofollow"';
        urls += 'tabindex="0" target="_blank">';
        urls += bookmarks[i].name;
        urls += '</a><br>';
      }
    }
  }
  links.innerHTML = urls;
});`;
fs.writeFileSync('js.js', bookmarks, 'utf-8');
