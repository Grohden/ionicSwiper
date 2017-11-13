import {equals, merge, pipe, unless} from 'ramda'
import Swiper from 'swiper';
import {findIndexForContainerId, findIsMoved} from "./functional.core";
import {SWIPER_DESTROY_EVENT} from "./swiper.events";


export const serviceName = 'SwiperService';

/**
 * @ngdoc service
 * @name ionic.swiper:SwiperService
 *
 * @description
 * Swiper instances management service
 **/
export /* @ngInject */ function SwiperService($rootScope, SwiperConfigurations) {
    'use strict';

    const _self = this;
    const swiperInstances = [];
    const configs = merge(SwiperConfigurations);

    $rootScope.$on(SWIPER_DESTROY_EVENT, function(event, containerId){
        pipe(
            findIndexForContainerId(containerId),
            unless(equals(-1), index => {
                swiperInstances[index].instance.destroy();
                swiperInstances.splice(index, 1);
            })
        )(swiperInstances);
    });

    _self.getInstances = function(){
        return swiperInstances;
    };

    _self.getSwiperDefaultConfig = function (extend) {
        return configs(extend || {});
    };

    _self.isInMove = function () {
        return findIsMoved(swiperInstances);
    };

    _self.createInstance = function (containerId, $element) {
        const instance = new Swiper($element, _self.getSwiperDefaultConfig());
        swiperInstances.push({containerId, instance});
        return instance;
    };
}