const unless = require('ramda/src/unless');
const equals = require('ramda/src/equals');
const findIndex = require('ramda/src/findIndex');
const eqPointer = (f) => (s) => f === s;

/**
 * @ngdoc controller
 * @name swiper.angular:SwiperContainerController
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
    const swiperInstance = SwiperService.createInstance($scope.id, $element);

    _self.willUseSwiper = $scope.$eval($attrs.swiperContainer);

    _self.addSlide = function(slideElement){
        return {
            toLeft: () =>  swiperInstance.prependSlide(slideElement),
            toRight: () => swiperInstance.appendSlide(slideElement)
        }
    };

    _self.callUpdate = function () {
        swiperInstance.update();
        return _self;
    };

    _self.getSlidesLength = function () {
        return swiperInstance.slides.length;
    };

    _self.slideToElement = function ($element) {
        const index = findIndex(eqPointer($element))(swiperInstance.slides);

        unless(equals(-1), swiperInstance.slideTo(index));
        return _self;
    };

    (function init(){
        $scope.$on('$destroy', swiperInstance.destroy);
    }());
}

export const controllerName = 'SwiperContainerController';