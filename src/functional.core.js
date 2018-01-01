import {add, curry, equals, find, findIndex, map, path, pipe, length, propEq, compose, values, pluck} from 'ramda';

/*
 * This file contains common functions that may be used in the project
 */

export const findIsMoved = find(path(['instance', 'touchEventsData', 'isMoved']));
export const containerIdEq = propEq('containerId');
export const findIndexForContainerId = compose(findIndex, containerIdEq);
export const findForContainerId = compose(find, containerIdEq);
export const toInstances = compose(pluck('instance'), values);
export const isFinalIndex = compose(equals, add(-1), length);
export const eqPointer = curry((f, s) => f === s);
