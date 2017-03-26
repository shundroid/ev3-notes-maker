export default function getFrequency(number) {
  return 440 * Math.pow(2, (number - 9) / 12);
}
