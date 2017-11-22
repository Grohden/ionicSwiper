import {complement, cond, equals, forEach, ifElse, isNil, pipe, T, unless, path} from 'ramda';
import {findForContainerId, findIndexForContainerId, isFinalIndex, toInstances} from '../functional.core';
import {SWIPER_DESTROY_EVENT} from '../swiper.events';

const clearAllControllers = pipe(toInstances,forEach( i => i.controller.control = []));
const isDestroyed = path(['instance','destroyed']);
export const serviceName = 'SwiperSelectionService';

/**
 * @ngdoc service
 * @name ionic.swiper.SwiperSelectionService
 *
 * @description
 * The swiper selection service manages a **swipe synchronization between selection** of swiper containers.
 *
 * @requires $rootScope
 * @requires SwiperService
 */
export /* @ngInject */  function SwiperSelectionService($rootScope, SwiperService) {
    'use strict';

    const _self = this;
    let selectedList = [];

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperSelectionService#getSelection
     * @methodOf ionic.swiper.SwiperSelectionService
     *
     * @description
     * Returns the current selection list
     *
     * @return {Array} current selection list
     */
    _self.getSelection = function() {
        return selectedList;
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperSelectionService#clearSelection
     * @methodOf ionic.swiper.SwiperSelectionService
     *
     * @description
     * Clear synchronized swiper instances from the list and de-synchronize them
     *
     * @return {Array} an empty array
     */
    _self.clearSelection = function() {
        clearAllControllers(selectedList);
        return (selectedList = []);
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperSelectionService#putInSelection
     * @methodOf ionic.swiper.SwiperSelectionService
     *
     * @param {Number} containerId container id associated with instance
     *
     * @description Put an instance for swiper in selection mode, synchronizing
     * its swipes
     */
    _self.putInSelection = function(containerId){
        pipe(
            findForContainerId(containerId),
            unless(isNil, foundItem =>{
                selectedList.push(foundItem);
                createControllersAsCircularLinkedList(selectedList);
            })
        )(SwiperService.getInstances());
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperSelectionService#removeFromSelection
     * @methodOf ionic.swiper.SwiperSelectionService
     *
     * @param {Number} containerId container id associated with instance
     *
     * @description Removes an instance for swiper in selection mode, synchronizing
     * its swipes
     */
    _self.removeFromSelection = function(containerId){
        pipe(
            findIndexForContainerId(containerId),
            unless(equals(-1), index => {
                unless(isDestroyed, w => w.instance.controller.control = [])(selectedList[index]);
                selectedList.splice(index, 1);
                createControllersAsCircularLinkedList(selectedList);
            })
        )(selectedList);
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperSelectionService#toggleToSelection
     * @methodOf ionic.swiper.SwiperSelectionService
     *
     * @param {Number} containerId container id associated with instance
     *
     * @description Removes or put an instance for swiper in selection mode, synchronizing
     * its swipes
     *
     * @returns {Boolean} return if was added or removed
     */
    _self.toggleToSelection = function(containerId) {
        const isInList = pipe(findForContainerId(containerId), complement(isNil));
        return ifElse(
            isInList,
            () => {
                _self.removeFromSelection(containerId);
                return false;
            },
            () => {
                _self.putInSelection(containerId);
                return true;
            }
        )(selectedList);
    };

    function createControllersAsCircularLinkedList(selectedList){
        return toInstances(selectedList).forEach((instance, index, array) => {
                const putUnderInstanceControl = (adjust) => i => instance.controller.control = array[i + (adjust)];

                cond([
                    [isFinalIndex(array), putUnderInstanceControl(-1)],
                    [equals(0), putUnderInstanceControl(1)],
                    [T, i => {
                        const added = [array[i - 1], array[i + 1]];
                        return (instance.controller.control = added);
                    }]
                ])(index);
            }
        );
    }

    $rootScope.$on(SWIPER_DESTROY_EVENT, function(event,containerId){
        _self.removeFromSelection(containerId);
    });
}