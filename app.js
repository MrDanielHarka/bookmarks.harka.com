import fs from 'fs';
import pkg from 'jsonpath';
let bookmarks = fs.readFileSync(
  'C:/Users/Asus/AppData/Local/Vivaldi/User Data/Default/Bookmarks'
);
fs.writeFileSync('Bookmarks.bak', bookmarks, 'utf-8');
bookmarks = JSON.parse(bookmarks);
bookmarks = pkg.query(bookmarks, `$..[?(@.type=="url")]`);
bookmarks = JSON.parse(JSON.stringify(bookmarks));
for (let bookmark of bookmarks) {
  bookmark.date_added ? delete bookmark.date_added : 0;
  bookmark.date_last_used ? delete bookmark.date_last_used : 0;
  bookmark.guid ? delete bookmark.guid : 0;
  bookmark.id ? delete bookmark.id : 0;
  bookmark.type ? delete bookmark.type : 0;
  bookmark.meta_info?.Description ? delete bookmark.meta_info.Description : 0;
  bookmark.meta_info?.Thumbnail ? delete bookmark.meta_info.Thumbnail : 0;
  if (bookmark.meta_info && Object.keys(bookmark.meta_info).length === 0) {
    delete bookmark.meta_info;
  }
}
bookmarks = JSON.parse(JSON.stringify(JSON.stringify(bookmarks)));
bookmarks = `const bookmarks = ${bookmarks};
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
