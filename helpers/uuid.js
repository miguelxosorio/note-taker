// Immediately export a function that generates a string of random numbers and letters.
// I'm using this to generate a unique series of letters and numbers and using it as a unique id for the note entries
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);