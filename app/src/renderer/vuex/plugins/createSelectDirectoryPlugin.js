export default function createSelectDirectoryPlugin(dialog) {
  return store => {
    store.subscribe(mutation => {
      if (mutation.type === "selectDirectory") {
        dialog.showOpenDialog(null, {
          properties: ["openDirectory"],
          title: "Select a directory",
          defaultPath: "."
        }, directoryNames => {
          if (directoryNames) {
            store.dispatch("setDirectory", directoryNames[0]);
          }
        });
      }
    });
  };
}
