'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformResult = [];
  const changedState = { ...state };

  for (const action of actions) {
    if (action.hasOwnProperty('type') && action.type === 'clear') {
      const keys = Object.keys(changedState);

      for (const key of keys) {
        delete changedState[key];
      }
    }

    if (action.hasOwnProperty('type') && action.type === 'addProperties') {
      Object.assign(changedState, action.extraData);
    }

    if (action.hasOwnProperty('type') && action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete changedState[key];
      }
    }

    transformResult.push({ ...changedState });
  }

  return transformResult;
}
module.exports = transformStateWithClones;
