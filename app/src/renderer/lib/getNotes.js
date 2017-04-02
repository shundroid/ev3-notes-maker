export const notes = {
  "whole-note": { length: 1, label: "Whole Note" },
  "dotted-half-note": { length: 0.75, label: "Dotted half note" },
  "half-note": { length: 0.5, label: "Half note" },
  "dotted-quarter-note": { length: 0.375, label: "Dotted quarter note" },
  "quarter-note": { length: 0.25, label: "Quarter note" },
  "dotted-eighth-note": { length: 0.1875, label: "Dotted eighth note" },
  "eighth-note": { length: 0.125, label: "Eighth note" }
};

export function getValueAndLabel() {
  return Object.keys(notes).map(noteName => {
    return { value: noteName, label: notes[noteName].label };
  });
}

export function getNote(length) {
  for (let note in notes) {
    if (notes[note].length === length) {
      return note;
    }
  }
  throw new Error(`A note of the length(${length}) was not found.`);
}

export function getLength(note) {
  if (!notes[note]) {
    throw new Error(`The note(${note}) was not found.`);
  }
  return notes[note].length;
}