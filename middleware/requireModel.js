/**
 * Loads a model from the models object
 * @param models The models object
 * @param modelName The name of the model to load
 * @returns {*} The model
 */
function requireModel(models, modelName) {
  if (models && models[modelName]) {
    return models[modelName];
  }
  throw new TypeError(`${modelName} required`);
}

module.exports = requireModel;
