import {directiveName as containerName} from './swiper.container.directive';
import equals from "ramda/src/equals";
import ifElse from 'ramda/src/ifElse';

export const directiveName = 'swiperSlide';


/**
 * @ngdoc directive
 * @name swiper.angular#SwiperSlideDirective
 * @description
 * Diretiva que cria itens na instancia do controler pai do swiped
 *
 */
export function SwiperSlideDirective() {
    'ngInject';

    return {
        restrict: 'A',
        require:`^^${containerName}`,
        link: function ($scope, $element, $attr, $ctrl) {
            const swiperItem = $attr[directiveName];
            const add = $ctrl.addSlide($element);

            $element.addClass('swiper-slide');
            if(swiperItem !== 'center' && !$ctrl.willUseSwiper){
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