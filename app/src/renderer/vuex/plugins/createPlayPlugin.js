export class PlayPlugin {
  constructor() {
    this.audioCtx = new AudioContext();
    this.plugin = store => {
      store.subscribe(mutation => {
        if (mutation.type === "play") {
          const promises = store.state.notes.map(note => {
            return () => {
              return new Promise(resolve => {
                const osc = this.audioCtx.createOscillator();
                osc.connect(this.audioCtx.destination);
                osc.type = "square";
                osc.frequency.value = 440 * Math.pow(2, (note.key - 9) / 12);
                osc.start();
                setTimeout(() => {
                  osc.stop();
                  resolve();
                }, note.length * 500);
              });
            };
          }).reduce((m, p) => {
            return m.then(p);
          }, Promise.resolve()).then(() => {
            // TODO: Finished
          });
        }
      });
    }
  }
}

export default function createPlayPlugin() {
  return new PlayPlugin().plugin;
}