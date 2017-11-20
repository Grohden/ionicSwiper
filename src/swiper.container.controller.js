import { directiveName } from "./swiper.container.directive";
import { SWIPER_CONTAINER_STATE_UPDATE, SWIPER_DESTROY_EVENT } from "./swiper.events";
import { equals, findIndex, pipe, prop, unless } from 'ramda';
import { eqPointer } from "./functional.core";
import { SwiperConfigurationsProvider } from "./swiper.configs.provider";

export const controllerName = 'SwiperContainerController';
export const controllerAsName = 'spcCtrl';


/**
 * @ngdoc controller
 * @name SwiperContainerController
 * @alias tskCtrl
 *
 * @description
 * Swiper container controller that exposes some functions
 *
 *
 **/
export /* @ngInject */ function SwiperContainerController($parse, $rootScope, $element, $scope, $attrs, SwiperService, SwiperConfigurations) {
    'use strict';

    const _self = this;
    const swiperPromise = SwiperService.createInstance($scope.$id, $element);

    const noSwipingClass = SwiperConfigurations.noSwipingClass;

    //exposes scope id as container id
    $scope.containerId = $scope.$id;

    const swiperObserver = $attrs.$observe(directiveName, (interpolated) => {
        const enableSwiper = $parse(interpolated)();

        $scope.$broadcast(SWIPER_CONTAINER_STATE_UPDATE, enableSwiper);

        if (enableSwiper) {
            $attrs.$removeClass(noSwipingClass);
        } else {
            $attrs.$addClass(noSwipingClass);
        }
    });

    $scope.$on('$destroy', () => {
        swiperObserver();
        $rootScope.$emit(SWIPER_DESTROY_EVENT, $scope.containerId);
    });

    _self.addSlide = function (slideElement) {
        return {
            toLeft: () => swiperPromise.then(swiper => {
                swiper.prependSlide(slideElement);
                swiper.slidePrev(len - 1);
            }),
            toRight: () => swiperPromise.then(swiper => {

                swiper.appendSlide(slideElement);
            })
        }
    };

    _self.callUpdate = function () {
        swiperInstance.update();
        return _self;
    };

    _self.slideToElement = function ($element) {
        swiperPromise.then(swiper => {
            const index = Array.prototype.findIndex.call(
                prop('slides')(swiper),
                eqPointer($element),
            );

            unless(equals(-1), index => {
                swiper.slideTo(index, 0)
            })(index);
        });

        return _self;
    }
}
