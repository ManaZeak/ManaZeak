class Utils {
  constructor() {}

  precisionRound(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}

export default Utils
