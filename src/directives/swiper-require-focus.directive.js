import {directiveName as containerName} from './swiper-container.directive';

export const directiveName = 'swiperRequireFocus';
/**
 * @ngdoc directive
 * @name ionic.swiper.directive:swiperRequireFocus
 * @restrict 'A'
 *
 * @description
 * This directive makes a 'slide to me' request after all the other slides
 * have been added
 * You will probably not use it, because the user can see the sliding transition
 * If you dont want this to happen, you can use the swiper-slide with instructions
 * like swiper-slide="left|right|center"
 *
 * @requires $timeout
 */
export /* @ngInject */ function SwiperRequireFocusDirective($timeout) {
    return {
        restrict: 'A',
        priority:550,
        require:`^^${containerName}`,
        link: function ($scope, $element, $attr, $ctrl) {
            $timeout(() => $ctrl.slideToElement($element[0]));
        }
    };
}


