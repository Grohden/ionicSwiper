import * as R from 'ramda';
import {isFinalIndex, toInstances} from '../functional.core';
import {SWIPER_DESTROY_EVENT} from '../swiper.events';

const clearAllControllers = R.pipe(R.values, R.forEach(i => {
    i.controller.control = [];
}));

const isDestroyed = R.prop('destroyed');

export const serviceName = 'SwiperSelectionService';

/**
 * @ngdoc service
 * @name ionic.swiper.SwiperSelectionService
 *
 * @description
 * The swiper selection service manages a **swipe synchronization between selection** of swiper containers.
 *
 * @requires $rootScope
 * @requires ionic.swiper.SwiperService
 */
export /* @ngInject */  function SwiperSelectionService($rootScope, SwiperService) {
    'use strict';

    const _self = this;
    let selectedList = {};


    function createControllersAsCircularLinkedList(list) {
        return R.values(list).forEach((instance, index, array) => {
            const putUnderInstanceControl = R.curryN(2, (adjust, i) => {
                instance.controller.control = array[i + adjust];
            });

            R.cond([
                [isFinalIndex(array), putUnderInstanceControl(-1)],
                [R.equals(0), putUnderInstanceControl(1)],
                [
                    R.T, i => {
                        const added = [array[i - 1], array[i + 1]];

                        instance.controller.control = added;

                        return added;
                    }
                ]
            ])(index);
        });
    }

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#getInstanceById
     * @methodOf ionic.swiper.SwiperService
     *
     * @description
     * Returns a swiper instance from the selected list
     *
     * @param {Number | String} containerId containerId associated with swiper instance
     *
     * @return {Object| undefined} Found instance or nothing
     */
    _self.getInstanceById = R.prop(R.__, selectedList);

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperSelectionService#getSelection
     * @methodOf ionic.swiper.SwiperSelectionService
     *
     * @description
     * Returns the current selection list
     *
     * @return {Object} current selection list
     */
    _self.getSelection = function () {
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
     * @return {Object} an empty array
     */
    _self.clearSelection = function () {
        clearAllControllers(selectedList);

        selectedList = {};

        return selectedList;
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
    _self.putInSelection = R.unless(
        R.compose(R.isNil, SwiperService.getInstanceById),
        containerId => {
            selectedList[containerId] = SwiperService.getInstanceById(containerId);
            createControllersAsCircularLinkedList(selectedList);
        }
    );

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
    _self.removeFromSelection = R.unless(
        R.compose(R.isNil, R.prop(R.__, selectedList)),
        containerId => {
            R.pipe(
                SwiperService.getInstanceById,
                R.unless(isDestroyed, instance => {
                    instance.controller.control = [];
                })
            )(containerId);

            Reflect.deleteProperty(selectedList, containerId);
            createControllersAsCircularLinkedList(selectedList);
        }
    );

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
    _self.toggleToSelection = R.ifElse(
        R.compose(R.isNil, _self.getInstanceById),
        R.compose(R.T, _self.putInSelection),
        R.compose(R.F, _self.removeFromSelection)
    );

    $rootScope.$on(SWIPER_DESTROY_EVENT, (event, containerId) => {
        _self.removeFromSelection(containerId);
    });
}