export default function createSelectDirectoryPlugin(dialog) {
  return store => {
    store.subscribe(mutation => {
      if (mutation.type === "selectDirectory") {
        dialog.showOpenDialog(null, {
          properties: ["openDirectory"],
          title: "Select a directory",
          defaultPath: "."
        }, (folderNames) => {
          /* eslint-disable no-console */
          console.log(folderNames);
        });
      }
    });
  };
}
