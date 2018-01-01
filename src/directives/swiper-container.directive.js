import {
    controllerName,
    controllerAsName
} from '../controllers/swiper-container.controller';

export const directiveName = 'swiperContainer';

/**
 * @ngdoc directive
 * @name ionic.swiper.directive:swiperContainer
 * @restrict 'A'
 *
 * @description
 * An wrapper directive for swiper container
 *
 */
export /* @ngInject */ function SwiperContainerDirective() {
    'use strict';

    return {
        restrict: 'A',
        controller: controllerName,
        controllerAs: controllerAsName
    };
}