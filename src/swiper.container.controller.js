
const unless = require('ramda/src/unless');
const equals = require('ramda/src/equals');
const findIndex = require('ramda/src/findIndex');

/**
 * @ngdoc controller
 * @name swiper.angular:SwiperContainerController
 * @alias tskCtrl
 *
 * @description
 * Controler de um container do swiper
 *
 * @require $element
 *
 **/

export function SwiperContainerController($element, $scope, $attrs, SwiperService) {
    'ngInject';

    const _self = this;
    const serviceRegister = SwiperService.instanceForId($scope.$id);
    const swiperInstance = new Swiper($element, SwiperService.getSwiperDefaultConfig());

    _self.isSwiper = $scope.$eval($attrs.swiperContainer);
    _self.appendToSwiper = function (slideElement) {
        swiperInstance.appendSlide(slideElement);
        return _self;
    };

    _self.callUpdate = function () {
        swiperInstance.update();
        return _self;
    };

    _self.prependToSwiper = function (slideElement) {
        swiperInstance.prependSlide(slideElement);
        return _self;
    };

    _self.getSlidesLength = function () {
        return swiperInstance.slides.length;
    };

    _self.slideToElement = function ($element) {
        const index = findIndex(
            //Se é o mesmo PONTEIRO
            (e) => e === $element
        )(swiperInstance.slides);

        unless(equals(-1), swiperInstance.slideTo(index));
        return _self;
    };

    (function init(){
        serviceRegister.register(swiperInstance);
        $scope.$on('$destroy', serviceRegister.remove);
    }());
}

export const controllerName = 'SwiperContainerController';