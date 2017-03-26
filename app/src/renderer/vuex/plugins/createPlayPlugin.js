import getFrequency from "@lib/getFrequency";

export class PlayPlugin {
  constructor() {
    this.audioCtx = new AudioContext();
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0.1;
    this.gainNode.connect(this.audioCtx.destination);
    this.plugin = store => {
      store.subscribe(mutation => {
        if (mutation.type === "play") {
          const it = this.generateSequence(store.state.notes);
          const tick = () => {
            const note = it.next();
            if (!note.done) {
              setTimeout(tick, note.value.length * 500);
            }
          };
          tick();
        }
      });
    }
  }
  generateSequence = function* (notes) {
    for (let note of notes) {
      const osc = this.audioCtx.createOscillator();
      osc.connect(this.gainNode);
      osc.type = "square";
      osc.frequency.value = getFrequency(note.key);
      osc.start();
      yield note;
      osc.stop();
    }
  }
}

export default function createPlayPlugin() {
  return new PlayPlugin().plugin;
}