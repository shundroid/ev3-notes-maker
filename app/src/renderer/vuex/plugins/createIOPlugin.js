export const NEW_FILE = Symbol("new-file");

export class IOPlugin {
  constructor(fs, path) {
    this.fs = fs;
    this.path = path;
    this.plugin = store => {
      store.subscribe(mutation => {
        if (mutation.type === "setDirectory") {
          this.openTwoFiles(mutation.payload).then(files => {
            if (files === NEW_FILE) {
              store.dispatch("opened", {
                keys: [],
                lengths: []
              });
            } else {
              store.dispatch("opened", files);
            }
          }, error => {
            throw error;
          });
        } else if (mutation.type === "save") {
          this.saveTwoFiles(store.state.currentDirectory, store.state.notes).then(() => {
            store.dispatch("saved");
          }, error => {
            throw error;
          });
        }
      });
    };
  }
  openTwoFiles(directory) {
    return new Promise((resolve, reject) => {
      if (this.fs.existsSync(this.getKeysFile(directory)) &&
          this.fs.existsSync(this.getLengthsFile(directory))) {
        Promise.all([this.openFile(this.getKeysFile(directory)),
                    this.openFile(this.getLengthsFile(directory))]).then(files => {
          try {
            const notes = this.toNotes(files[0], files[1]);
            resolve(notes);
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
  saveTwoFiles(directory, notes) {
    const { keys, lengths } = this.fromNotes(notes);
    return Promise.all([
      this.saveFile(this.getKeysFile(directory), keys.join("\r\n")),
      this.saveFile(this.getLengthsFile(directory), lengths.join("\r\n"))
     ]);
  }
  getKeysFile(directory) {
    return this.path.join(directory, "keys.rtf");
  }
  getLengthsFile(directory) {
    return this.path.join(directory, "lengths.rtf");
  }
  openFile(file) {
    return new Promise((resolve, reject) => {
      this.fs.readFile(file, "utf8", (error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }
  saveFile(file, data) {
    return new Promise((resolve, reject) => {
      this.fs.writeFile(file, data, error => {
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
  toNotes(keyText, lengthText) {
    const keys = keyText.split("\r\n");
    const lengths = lengthText.split("\r\n");
    const notes = [];
    if (keys.length !== lengths.length) {
      throw new Error("The length of keys doesn't equal the length of lengths.");
    }
    keys.forEach((key, index) => {
      if (isNaN(key)) {
        throw new Error("The key is not a number. index: " + index);
      }
      if (isNaN(lengths[index])) {
        throw new Error("The length is not a number. index: " + index);
      }
      notes.push({
        key: parseFloat(key),
        length: parseFloat(lengths[index]),
        uniqueKey: index
      });
    });
    return notes;
  }
  fromNotes(notes) {
    const keys = [];
    const lengths = [];
    notes.forEach(note => {
      keys.push(note.key);
      lengths.push(note.length);
    });
    return { keys, lengths };
  }
}

export default function createOpenPlugin(fs, path) {
  const plugin = new IOPlugin(fs, path);
  return plugin.plugin;
}
