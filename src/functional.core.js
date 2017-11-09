import {equals, find, findIndex, map, path, pipe, propEq} from 'ramda'

/*
 * This file contains common functions that may be used in the project
 */

export const findIsMoved = find(path(['instance', 'touchEventsData', 'isMoved']));
export const containerIdEq = propEq('containerId');
export const findIndexForContainerId = pipe(containerIdEq, findIndex);
export const findForContainerId = pipe(containerIdEq, find);
export const toInstances = map(x => x.instance);

//TODO:Adopt ramda instead of lambdas.
export const isFinalIndex = (array) => equals(array.length - 1);
export const isFirstIndex = (array) => equals(0);