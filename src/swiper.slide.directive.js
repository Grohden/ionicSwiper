import {directiveName as containerName} from './swiper.container.directive';
import equals from "ramda/src/equals";
import ifElse from 'ramda/src/ifElse';

export const directiveName = 'swiperSlide';


/**
 * @ngdoc directive
 * @name swiper.angular#SwiperItemDirective
 * @description
 * Diretiva que cria itens na instancia do controler pai do swiped
 *
 */
export function SwiperItemDirective() {
    'ngInject';

    return {
        restrict: 'A',
        require:`^^${containerName}`,
        link: function ($scope, $element, $attr, $ctrl) {
            const swiperItem = $attr[directiveName];
            $element.addClass('swiper-slide');
            
            if(swiperItem !== 'center' && !$ctrl.isSwiper){
                $element.addClass('ng-hide');
            }

            ifElse(
                equals('left'),
                () => $ctrl.prependToSwiper,
                () => $ctrl.appendToSwiper
            )(swiperItem)($element);
        }
    };
}