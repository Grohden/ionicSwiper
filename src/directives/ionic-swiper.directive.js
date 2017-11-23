import {SWIPER_DESTROY_EVENT} from '../swiper.events';
import {__, curryN, ifElse, isNil, prop, T} from 'ramda';
import {centralSwipeDirective, leftSwipeDirective, rightSwipeDirective} from './ionic-swiper.slides.directives';

export const directiveName = 'ionicSwiper';


/**
 * @ngdoc directive
 * @name ionic.swiper.directive:ionicSwiper
 * @restrict 'E'
 *
 * @description
 * An alternative for swiperContainer using transclude but limited to 3 slides
 *
 * It has some properties that you can use:
 *
 * <strong>left-swiper</strong> and <strong>right-swiper</strong> are used to validate if, even
 * with transclude slots fullfiled, they should be used as swipable containers. Those
 * options do not create watchers and eval only once, if they are not provided the default value is true.
 *
 * <strong>is-swipable</strong> creates an watcher and updates swiper container with
 * no-swipe-class of swiper (or the custom set in swiper configs provider)

 * <strong>center-on-disable</strong> if the directive should slide to
 * central slide when swiper is disabled. This one defaults to true and does not create watcher.
 *
 * @requires $rootScope
 * @requires $parse
 * @requires ionic.swiper.SwiperService
 * @requires ionic.swiper.SwiperConfigurationsProvider
 *
 * @example
     <example module="demo">
         <file name="index.html">
             <div ng-controller="Ctrl">
                <ionic-swiper
                     center-on-disable="false"
                     is-swipable="true"
                     left-swiper="true"
                     right-swiper="true">

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
export /* @ngInject */ function IonicSwiperDirective($rootScope, $parse, SwiperService, SwiperConfigurations) {
    const { noSwipingClass, wrapperClass} = SwiperConfigurations;

    return {
        restrict: 'E',
        replace: true,
        transclude: (function () {
            const slots = {};
            slots[leftSwipeDirective] = `?${leftSwipeDirective}`;
            slots[centralSwipeDirective] = centralSwipeDirective;
            slots[rightSwipeDirective] = `?${rightSwipeDirective}`;
            return slots;
        }()),
        //@formatter:off
        template: [
            '<div class="swiper-container">',
                `<div class="${wrapperClass}">`,
                '</div>',
            '</div>'
        ].join(''),
        //@formatter:on
        link: function ($scope, $element, $attrs, ctrl, transclude) {
            const ifNilTrueElseEval = ifElse(
                isNil,
                T,
                prop => $scope.$eval(prop)
            );
            const attribute = prop(__, $attrs);
            const isLeftValid = ifNilTrueElseEval(attribute(leftSwipeDirective));
            const isRightValid = ifNilTrueElseEval(attribute(rightSwipeDirective));
            const transcludeTemplate = curryN(3, transclude)(angular.noop, null);

            const swiperWrapper = $element.contents(`.${wrapperClass}`);
            let initial = 0;

            if (transclude.isSlotFilled(leftSwipeDirective) && isLeftValid) {
                initial = 1;
                swiperWrapper.append(
                    transcludeTemplate(leftSwipeDirective)
                );
            }

            if (transclude.isSlotFilled(centralSwipeDirective)) {
                swiperWrapper.append(
                    transcludeTemplate(centralSwipeDirective)
                );
            }

            if (transclude.isSlotFilled(rightSwipeDirective) && isRightValid) {
                swiperWrapper.append(
                    transcludeTemplate(rightSwipeDirective)
                );
            }

            //Exposes containerId in scope
            $scope.containerId = $scope.$id;

            const swiperInstance = SwiperService.createInstanceSync($scope.containerId, $element[0], {initialSlide: initial});

            $attrs.$observe('isSwipable', ifElse(
                interpolated => $parse(interpolated)(),
                () => $attrs.$removeClass(noSwipingClass),
                () => {
                    if(ifNilTrueElseEval(attribute('centerOnDisable'))){
                        swiperInstance.slideTo(initial, 0);
                    }

                    $attrs.$addClass(noSwipingClass);
                }
            ));

            //Notify services
            $scope.$on('$destroy', () => {
                $rootScope.$emit(SWIPER_DESTROY_EVENT, $scope.containerId);
            });
        }
    };
}