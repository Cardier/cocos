if (CC_JSB && cc.runtime) {
  cc.LoaderLayer.setUseDefaultSource(false);
  cc.Dialog.setUseDefaultSource(false);
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = {
  getRandomInt: getRandomInt
};
