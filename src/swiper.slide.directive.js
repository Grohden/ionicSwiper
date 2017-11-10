import {directiveName as containerName} from './swiper.container.directive';
import {equals, ifElse} from 'ramda';

export const directiveName = 'swiperSlide';

/**
 * @ngdoc directive
 * @name ionic.swiper#SwiperSlideDirective
 *
 * @description
 * This directive asks the controller to create swiper slides.
 */
export /* @ngInject */ function SwiperSlideDirective() {
    'use strict';

    return {
        restrict: 'A',
        require:`^^${containerName}`,
        link: function ($scope, $element, $attr, $ctrl) {
            const swiperItem = $attr[directiveName];
            const add = $ctrl.addSlide($element);

            //TODO: this class should be dynamic!
            $element.addClass('swiper-slide');
            if(!$ctrl.willUseSwiper && swiperItem !== 'center'){
                $element.addClass('ng-hide');
            }

            ifElse(
                equals('left'),
                add.toLeft,
                add.toRight
            )(swiperItem);
        }
    };
}