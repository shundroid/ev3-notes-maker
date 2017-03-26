import getFrequency from "@lib/getFrequency";

export class PlayPlugin {
  constructor() {
    this.audioCtx = new AudioContext();
    this.plugin = store => {
      store.subscribe(mutation => {
        if (mutation.type === "play") {
          this.play(store.state.notes).then(() => {
            // TODO: Finished
          });
        }
      });
    }
  }
  play(notes) {
    return notes.map(note => {
      return () => {
        return new Promise(resolve => {
          const osc = this.audioCtx.createOscillator();
          osc.connect(this.audioCtx.destination);
          osc.type = "square";
          osc.frequency.value = getFrequency(note.key);
          osc.start();
          setTimeout(() => {
            osc.stop();
            resolve();
          }, note.length * 500);
        });
      };
    }).reduce((previous, current) => {
      return previous.then(current);
    }, Promise.resolve());
  }
}

export default function createPlayPlugin() {
  return new PlayPlugin().plugin;
}