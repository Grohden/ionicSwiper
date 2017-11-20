import {directiveName as containerName} from './swiper.container.directive';
import {cond, equals} from 'ramda';
import {SWIPER_CONTAINER_STATE_UPDATE} from "./swiper.events";

export const directiveName = 'swiperSlide';

/**
 * @ngdoc directive
 * @name SwiperSlide
 *
 * @description
 * This directive asks the controller to create swiper slides.
 *
 * @param {SwiperConfigurations} SwiperConfigurations
 */
export /* @ngInject */ function SwiperSlideDirective(SwiperConfigurations) {
    'use strict';
    const slideClass = SwiperConfigurations.slideClass;
    const noSwipingClass = SwiperConfigurations.noSwipingClass;

    return {
        restrict: 'A',
        require:`^^${containerName}`,

        /**
         * @param {$rootScope.Scope} $scope
         * @param {$element} $element
         * @param {$attr} $attr
         * @param {SwiperContainerController} $ctrl
         * */
        link: function ($scope, $element, $attr, $ctrl) {
            const swiperItem = $attr[directiveName] || 'center';
            const slideAdder = $ctrl.addSlide($element);

            $attr.$addClass(slideClass);

            $scope.$on(SWIPER_CONTAINER_STATE_UPDATE, (event, enableSwiper) => {
                if(swiperItem === 'center'){
                    $ctrl.slideToElement($element[0]);
                }
            });

            cond([
                [equals('left'), slideAdder.toLeft],
                [equals('right'), slideAdder.toRight],
                [equals('center'), slideAdder.toRight]
            ])(swiperItem);
        }
    };
}