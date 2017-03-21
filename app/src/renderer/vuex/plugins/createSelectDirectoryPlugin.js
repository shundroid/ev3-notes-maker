module.exports = function createSelectDirectoryPlugin(dialog) {
  return store => {
    store.subscribe(mutation => {
      switch (mutation.type) {
      case "selectDirectory":
        break;
      }
    });
  };
}

function createDirectory(dialog) {
  return new Promise(resolve => {
  });
}