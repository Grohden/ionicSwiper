import {SWIPER_DESTROY_EVENT} from '../swiper.events';
import {curryN, ifElse, isNil, prop, T} from 'ramda';

export const directiveName = 'ionicSwiper';

const leftSlot = 'leftSwiper';
const centralSlot = 'centralSwiper';
const rightSlot = 'rightSwiper';


/**
 * @ngdoc directive
 * @name ionic.swiper.directive:ionicSwiper
 * @restrict 'E'
 *
 * @description
 * An alternative for swiperContainer using transclude but limited to 3 slides
 *
 * @example
     <example module="demo">
         <file name="index.html">
             <div ng-controller="Ctrl">
                <ionic-swiper>
                    <left-swiper>
                        Some Text
                    </left-swiper>
                    <central-swiper>
                        Some Text
                    </central-swiper>
                    <right-swiper>
                        Some Text
                    </right-swiper>
                </ionic-swiper>
             </div>
         </file>
     </example>
 */
export /* @ngInject */ function IonicSwiperDirective($rootScope, SwiperService) {
    return {
        restrict: 'E',
        replace: true,
        transclude: (function () {
            const slots = {};
            slots[leftSlot] = `?${leftSlot}`;
            slots[centralSlot] = centralSlot;
            slots[rightSlot] = `?${rightSlot}`;
            return slots;
        }()),
        template: function () {
            //@formatter:off
            return [
                '<div class="swiper-container">',
                    '<div class="swiper-wrapper">',
                    '</div>',
                '</div>'
            ].join('');
            //@formatter:on
        },
        link: function ($scope, $element, $attrs, ctrl, transclude) {
            const ifNilTrueElseEval = ifElse(
                isNil,
                T,
                prop => $scope.$eval(prop)
            );
            const isLeftValid = ifNilTrueElseEval(prop(leftSlot, $attrs));
            const isRightValid = ifNilTrueElseEval(prop(rightSlot, $attrs));
            const transcludeTemplate = curryN(3, transclude)(angular.noop, null);

            const swiperWrapper = $element.contents('.swiper-wrapper');
            let initial = 0;

            if (transclude.isSlotFilled(leftSlot) && isLeftValid) {
                initial = 1;
                swiperWrapper.append(
                    transcludeTemplate(leftSlot)
                );
            }

            if (transclude.isSlotFilled(centralSlot)) {
                swiperWrapper.append(
                    transcludeTemplate(centralSlot)
                );
            }

            if (transclude.isSlotFilled(rightSlot) && isRightValid) {
                swiperWrapper.append(
                    transcludeTemplate(rightSlot)
                );
            }

            //Exposes containerId in scope
            $scope.containerId = $scope.$id;

            const swiperInstance = SwiperService.createInstanceSync($scope.containerId, $element[0], {initialSlide: initial});

            //Notify services
            $scope.$on('$destroy', () => {
                $rootScope.$emit(SWIPER_DESTROY_EVENT, $scope.containerId);
            });
        }
    };
}