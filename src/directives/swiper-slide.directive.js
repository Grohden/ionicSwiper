import {directiveName as containerName} from './swiper-container.directive';
import {cond, equals} from 'ramda';
import {SWIPER_CONTAINER_STATE_UPDATE} from '../swiper.events';

export const directiveName = 'swiperSlide';

/**
 * @ngdoc directive
 * @name ionic.swiper.directive:swiperSlide
 * @restrict 'A'
 *
 * @description
 * This directive asks the controller to create swiper slides.
 *
 */
export /* @ngInject */ function SwiperSlideDirective() {
    'use strict';
    return {
        restrict: 'A',
        require:`^^${containerName}`,
        link: function ($scope, $element, $attr, $ctrl) {
            const swiperItem = $attr[directiveName] || 'center';
            const slideAdder = $ctrl.addSlide($element);

            $scope.$on(SWIPER_CONTAINER_STATE_UPDATE, (event, enableSwiper) => {
                if(!enableSwiper && swiperItem === 'center'){
                    $ctrl.slideToElement($element[0]);
                }
            });

            cond([
                [equals('left'), slideAdder.toLeft],
                [equals('right'), slideAdder.toRight],
                [equals('center'), slideAdder.toCenter]
            ])(swiperItem);
        }
    };
}