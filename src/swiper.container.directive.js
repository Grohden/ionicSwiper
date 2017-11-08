import {
    controllerName
} from './swiper.container.controller';

/**
 * @ngdoc directive
 * @name swiper.angular#SwiperContainerDirective
 * @description
 * Diretiva wrapper da lib swiped
 *
 */
export function SwiperContainerDirective($timeout) {
    'ngInject';
    return {
        restrict: 'A',
        controller: controllerName,
        link: function ($scope, $element, $attr, $ctrl) {
    
            const classWatcher = $attr.$observe(
                'class',
                () => $timeout($ctrl.callUpdate)
            );
    
            $scope.$on('$destroy', () => classWatcher());
        }
    };
}

export const directiveName = 'swiperContainer';