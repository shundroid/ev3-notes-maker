export const NEW_FILE = Symbol("new-file");

export class OpenPlugin {
  constructor(fs, path) {
    this.fs = fs;
    this.path = path;
    this.plugin = store => {
      store.subscribe(mutation => {
        if (mutation.type === "setDirectory") {
          this.openTwoFiles(mutation.payload).then(files => {
            if (files === NEW_FILE) {
              store.dispatch("openFile", {
                keys: [],
                lengths: []
              });
            } else {
              store.dispatch("openFile", files);
            }
          }, error => {
            throw error;
          });
        }
      });
    }
  }
  openTwoFiles(directory) {
    return new Promise((resolve, reject) => {
      if (this.fs.exists(this.getKeysFile(directory)) &&
          this.fs.exists(this.getLengthsFile(directory))) {
        Promise.all(this.openFile(this.getKeysFile(directory)),
                    this.openFile(this.getLengthsFile(directory))).then(files => {
          try {
            const keys = this.parse(files[0]);
            const lengths = this.parse(files[1]);
            if (keys.length !== lengths.length) {
              throw new Error("The length of keys doesn't equal the length of lengths.");
            }
            resolve({ keys, lengths });
          } catch (error) {
            reject(error);
          }
        }, error => {
          reject(error);
        });
      } else {
        resolve(NEW_FILE);
      }
    });
  }
  getKeysFile(directory) {
    return this.path.join(directory, "keys.rtf");
  }
  getLengthsFile(directory) {
    return this.path.join(directory, "lengths.rtf");
  }
  openFile(file) {
    return new Promise((resolve, reject) => {
      this.fs.readFile(file, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }
  parse(text) {
    return text.split("\r\n").map(item => {
      if (isNaN(item)) {
        throw new Error("item is not a number. item: " + item);
      }
      return parseFloat(item);
    });
  }
}

export default function createOpenPlugin(fs, path) {
  const plugin = new OpenPlugin(fs, path);
  return plugin.plugin;
}
