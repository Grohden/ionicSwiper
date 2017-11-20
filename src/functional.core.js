import {add, curry, equals, find, findIndex, map, path, pipe, length, propEq} from 'ramda';

/*
 * This file contains common functions that may be used in the project
 */

export const findIsMoved = find(path(['instance', 'touchEventsData', 'isMoved']));
export const containerIdEq = propEq('containerId');
export const findIndexForContainerId = pipe(containerIdEq, findIndex);
export const findForContainerId = pipe(containerIdEq, find);
export const toInstances = map(x => x.instance);
export const isFinalIndex = pipe(length, add(-1), equals);
export const eqPointer = curry((f, s) => f === s);
