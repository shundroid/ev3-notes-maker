export default function createSelectDirectoryPlugin() {
  return store => {
    store.subscribe(mutation => {
      switch (mutation.type) {
      case "selectDirectory":
        break;
      }
    });
  };
}
