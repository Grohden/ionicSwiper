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
 * Service de gerenciamento do swiper
 **/
export function SwiperService($rootScope) {
    'ngInject';

    const _self = this;
    const swiperInstances = [];

    //Maybe use a provider to make this more dynamic?
    const configs = merge({
        slidesPerView: 'auto',
        resistanceRatio: 0.5,
        slideToClickedSlide: true,
        spaceBetween: 2,
        mousewheel: true,
        preventClicks: true,
        controller: {
            control: []
        }
    });

    $rootScope.$on(SWIPER_DESTROY_EVENT, function(event, containerId){
        pipe(
            findIndexForContainerId(containerId),
            //TODO: handle deletion from selected!
            unless(equals(-1), index => swiperInstances.splice(index, 1))
        )(swiperInstances);
    });

    _self.getInstances = function(){
        return swiperInstances;
    };

    _self.isInMove = function () {
        return findIsMoved(swiperInstances);
    };
    _self.getSwiperDefaultConfig = function (extend) {
        return configs(extend || {});
    };
    _self.createInstance = function (containerId, $element) {
        const instance = new Swiper($element, this.getSwiperDefaultConfig({
            on: {
                beforeDestroy() {
                    $rootScope.$emit(SWIPER_DESTROY_EVENT, (containerId));
                }
            }
        }));
        swiperInstances.push({containerId, instance});
        return instance;
    };
}