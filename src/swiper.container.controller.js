import {directiveName} from "./swiper.container.directive";
import {SWIPER_DESTROY_EVENT} from "./swiper.events";
import {equals, findIndex, pipe, prop, unless} from 'ramda';
import {eqPointer} from "./functional.core";

export const controllerName = 'SwiperContainerController';
export const controllerAsName = 'spcCtrl';

/**
 * @ngdoc controller
 * @name SwiperContainerController
 * @alias tskCtrl
 * @requires $rootScope
 * @requires $element
 * @requires $scope
 * @requires $attrs
 * @requires SwiperService
 *
 * @description
 * Swiper container controller that exposes some functions
 *
 *
 **/
export /* @ngInject */ function SwiperContainerController($rootScope, $element, $scope, $attrs, SwiperService) {
    'use strict';

    const _self = this;
    const swiperInstance = SwiperService.createInstance($scope.$id, $element);

    //exposes scope id as container id
    $scope.containerId = $scope.$id;

    //Destroy swiper instance, which calls SwiperService on destroy function
    $scope.$on('$destroy', () => {
        $rootScope.$emit(SWIPER_DESTROY_EVENT, $scope.containerId);
    });



    _self.willUseSwiper = $scope.$eval($attrs[directiveName]);

    _self.addSlide = function(slideElement){
        return {
            toLeft: () =>  swiperInstance.prependSlide(slideElement),
            toRight: () => swiperInstance.appendSlide(slideElement)
        }
    };

    _self.callUpdate = function() {
        swiperInstance.update();
        return _self;
    };

    _self.getSlidesLength = function() {
        return swiperInstance.slides.length;
    };

    _self.slideToElement = function($element) {
        pipe(
            prop('slides'),
            findIndex(eqPointer($element)),
            unless(equals(-1), swiperInstance.slideTo)
        )(swiperInstance);
        return _self;
    }
}
