import getFrequency from "@lib/getFrequency";

export class PlayPlugin {
  constructor(audioCtx) {
    this.audioCtx = audioCtx;
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0.1;
    this.gainNode.connect(this.audioCtx.destination);
    this.timeoutId = null;
    this.currentOsc = null;
    this.plugin = store => {
      store.subscribe(mutation => {
        if (mutation.type === "play") {
          const it = this.generateSequence(store.state.notes);
          const tick = () => {
            const note = it.next();
            if (!note.done) {
              this.timeoutId = setTimeout(tick, note.value.length * 500);
            } else {
              store.dispatch("played");
            }
          };
          tick();
        } else if (mutation.type === "stop") {
          this.stop();
        }
      });
    }
  }
  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
      this.currentOsc.stop();
    }
  }
  generateSequence = function* (notes) {
    for (let note of notes) {
      this.currentOsc = this.audioCtx.createOscillator();
      this.currentOsc.connect(this.gainNode);
      this.currentOsc.type = "square";
      this.currentOsc.frequency.value = getFrequency(note.key);
      this.currentOsc.start();
      yield note;
      this.currentOsc.stop();
    }
  }
}

export default function createPlayPlugin(audioCtx) {
  return new PlayPlugin(audioCtx).plugin;
}
