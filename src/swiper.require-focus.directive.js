import {directiveName as containerName} from './swiper.container.directive';

SwiperRequireFocusDirective.$inject = ['$timeout'];

/**
 * @ngdoc directive
 * @name swiper.angular#SwiperItemDirective
 * @description
 * Diretiva que cria itens na instancia do controler pai do swiped
 *
 */
export function SwiperRequireFocusDirective($timeout) {
    return {
        restrict: 'A',
        priority:550,
        require:`^^${containerName}`,
        link: function ($scope, $element, $attr, $ctrl) {
            $timeout(() => $ctrl.slideToElement($element[0]));
        }
    };
}


export const directiveName = 'swiperRequireFocus';