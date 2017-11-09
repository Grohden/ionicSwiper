import {directiveName} from "./swiper.container.directive";

const unless = require('ramda/src/unless');
const equals = require('ramda/src/equals');
const findIndex = require('ramda/src/findIndex');
const eqPointer = (f) => (s) => f === s;

export const controllerName = 'SwiperContainerController';
export const controllerAsName = 'spcCtrl';

/**
 * @ngdoc controller
 * @name ionic.swiper:SwiperContainerController
 * @alias tskCtrl
 *
 * @description
 * Swiper container controller that exposes some functions
 *
 * @require $element
 *
 **/
export function SwiperContainerController($element, $scope, $attrs, SwiperService) {
    'ngInject';

    const _self = this;
    const swiperInstance = SwiperService.createInstance($scope.$id, $element);

    //Destroy swiper instance, which calls SwiperService on destroy function
    $scope.$on('$destroy', swiperInstance.destroy);

    //exposes scope id as container id
    $scope.containerId = $scope.$id;

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
        const index = findIndex(eqPointer($element))(swiperInstance.slides);

        unless(equals(-1), swiperInstance.slideTo(index));
        return _self;
    }
}
