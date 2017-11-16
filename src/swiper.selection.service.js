import {complement, cond, equals, forEach, ifElse, isNil, pipe, T, unless, path} from 'ramda'
import {findForContainerId, findIndexForContainerId, isFinalIndex, toInstances} from "./functional.core";
import {SWIPER_DESTROY_EVENT} from "./swiper.events";

const clearAllControllers = pipe(toInstances,forEach( i => i.controller.control = []));
const isDestroyed = path(['instance','destroyed']);
export const serviceName = 'SwiperSelectionService';

/**
 * @ngdoc service
 * @name SwiperSelectionService
 * @requires $rootScope
 * @requires SwiperService
 *
 * @description
 * Swiper selection service to handle list item selections
 **/
export /* @ngInject */  function SwiperSelectionService($rootScope, SwiperService) {
    'use strict';

    const _self = this;
    let selectedList = [];

    $rootScope.$on(SWIPER_DESTROY_EVENT, function(event,containerId){
        _self.removeFromSelection(containerId);
    });

    _self.get = function() {
        return selectedList;
    };

    _self.clear = function() {
        clearAllControllers(selectedList);
        return selectedList = [];
    };

    _self.putInSelection = function(containerId){
        pipe(
            findForContainerId(containerId),
            unless(isNil, foundItem =>{
                selectedList.push(foundItem);
                createControllersAsCircularLinkedList(selectedList);
            })
        )(SwiperService.getInstances());
    };

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
                ])(index)
            }
        )
    }

}