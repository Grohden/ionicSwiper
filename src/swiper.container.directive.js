import {
    controllerName,
    controllerAsName
} from './swiper.container.controller';

/**
 * @ngdoc directive
 * @name ionic.swiper#SwiperContainerDirective
 * @description
 * An wrapper directive for swiper container
 *
 */
export function SwiperContainerDirective($timeout) {
    'ngInject';

    return {
        restrict: 'A',
        controller: controllerName,
        controllerAs: controllerAsName,
        link: function ($scope, $element, $attr, $ctrl) {
    
            const classObserver = $attr.$observe(
                'class',
                () => $timeout($ctrl.callUpdate)
            );
    
            $scope.$on('$destroy', () => classObserver());
        }
    };
}

export const directiveName = 'swiperContainer';