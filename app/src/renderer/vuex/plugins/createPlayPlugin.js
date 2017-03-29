import getFrequency from "@lib/getFrequency";

export class PlayPlugin {
  constructor(audioCtx) {
    this.audioCtx = audioCtx;
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = 0.1;
    this.gainNode.connect(this.audioCtx.destination);
    this.timeoutId = null;
    this.currentOsc = null;
    this.previewOsc = null;
    this.plugin = store => {
      store.subscribe(mutation => {
        if (mutation.type === "play") {
          const it = this.generateSequence(store.state.notes);
          const tick = () => {
            const item = it.next();
            if (!item.done) {
              const [index, note] = item.value;
              store.dispatch("updatePlayingNoteIndex", index);
              this.timeoutId = setTimeout(tick, note.length * 500);
            } else {
              store.dispatch("played");
            }
          };
          tick();
        } else if (mutation.type === "stop") {
          this.stop();
        } else if (mutation.type === "startPreviewKey") {
          this.startPreview(getFrequency(mutation.payload));
        } else if (mutation.type === "stopPreviewKey") {
          this.stopPreview();
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
  startPreview(frequency) {
    if (this.previewOsc) this.stopPreview();
    this.previewOsc = this.audioCtx.createOscillator();
    this.previewOsc.connect(this.gainNode);
    this.previewOsc.type = "square";
    this.previewOsc.frequency.value = frequency;
    this.previewOsc.start();
  }
  stopPreview() {
    if (this.previewOsc) {
      this.previewOsc.stop();
      this.previewOsc = null;
    }
  }
  generateSequence = function* (notes) {
    if (this.previewOsc) this.stopPreview();
    let index = 0;
    for (let note of notes) {
      this.currentOsc = this.audioCtx.createOscillator();
      this.currentOsc.connect(this.gainNode);
      this.currentOsc.type = "square";
      this.currentOsc.frequency.value = getFrequency(note.key);
      this.currentOsc.start();
      yield [index++, note];
      this.currentOsc.stop();
    }
  }
}

export default function createPlayPlugin(audioCtx) {
  return new PlayPlugin(audioCtx).plugin;
}
