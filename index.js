/* eslint-disable no-param-reassign */
import { getOptions } from 'loader-utils';
module.exports = function (content) {
  const options = getOptions(this);
  const loaderReg = {
    server: {
      beginReg: /\/\/\s*(only\s*)?client\s*js\s*begin/,
      endReg: /\/\/\s*(only\s*)?client\s*js\s*end/,
    },
    client: {
      beginReg: /\/\/\s*(only\s*)?server\s*js\s*begin/,
      endReg: /\/\/\s*(only\s*)?server\s*js\s*end/,
    },
  };
  return splitOnlyLoader(content, options.isServer ? loaderReg.server : loaderReg.client);
};

// client js begin
// client js end
// server js begin
// server js end

function splitOnlyLoader(content, { beginReg, endReg }) {
  let finish = false;
  let tempContent = '';

  while (!finish) {
    const begin = content.search(beginReg);
    const end = content.search(endReg);

    if (begin === -1 || end === -1) break;

    if (begin > end) {
      this.emitError(new Error('js end comments in front of begin comments'));
    } else if (end > begin) {
      tempContent += content.slice(0, begin);
      content = content.slice(end + content.match(endReg)[0].length);
    } else {
      finish = true;
    }
  }

  tempContent += content;

  return tempContent;
}
