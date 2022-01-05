export default function format(data) {
  let keys = Object.keys(data);

  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  let outcomeX = keys.findIndex((key) => key.split("_")[1] === "X");
  let outcome1X = keys.findIndex((key) => key.split("_")[1] === "1X");
  let outcomeYes = keys.findIndex((key) => key.split("_")[1] === "Yes");
  let outcomeUnder = keys.findIndex((key) => key.split("_")[1] === "Under");

  if (outcomeX >= 0) keys.move(outcomeX, 1);
  if (outcome1X >= 0) keys.move(outcome1X, 0);
  if (outcomeYes >= 0) keys.move(outcomeYes, 0);
  if (outcomeUnder >= 0) keys.move(outcomeUnder, 0);

  let output = {};

  keys.forEach((key) => (output[key] = data[key]));

  return output;
}
