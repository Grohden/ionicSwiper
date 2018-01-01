import {SWIPER_DESTROY_EVENT} from '../swiper.events';
import * as R from 'ramda';
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
 *
 * <strong>center-on-disable</strong> if the directive should slide to
 * central slide when swiper is disabled. This one defaults to true and does not create watcher.
 *
 * @requires $rootScope
 * @requires $parse
 * @requires ionic.swiper.SwiperService
 * @requires ionic.swiper.SwiperConfigurationsProvider
 *
 * @example
 *   <example module="demo">
 *       <file name="index.html">
 *           <div ng-controller="Ctrl">
 *              <ionic-swiper
 *                   center-on-disable="false"
 *                   is-swipable="true"
 *                   left-swiper="true"
 *                   right-swiper="true">
 *
 *                  <left-swiper>
 *                      Some Text
 *                  </left-swiper>
 *                  <central-swiper>
 *                      Some Text
 *                  </central-swiper>
 *                  <right-swiper>
 *                      Some Text
 *                  </right-swiper>
 *              </ionic-swiper>
 *           </div>
 *       </file>
 *   </example>
 */
export /* @ngInject */ function IonicSwiperDirective($rootScope, $parse, SwiperService, SwiperConfigurations) {
    const {noSwipingClass, wrapperClass} = SwiperConfigurations;

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
        template: `
            <div class="swiper-container">
                <div class="${wrapperClass}">
                </div>
            </div>
        `,
        // eslint-disable-next-line max-params,object-shorthand
        link: function ($scope, $element, $attrs, ctrl, transclude) {
            const getAttribute = R.prop(R.__, $attrs);

            const isNilOrEvaluateToTrue = R.pipe(
                getAttribute,
                R.ifElse(
                    R.isNil,
                    R.T,
                    R.unary($scope.$eval)
                ),
                R.always
            );

            const transcludeTemplate = R.curryN(3, transclude)(angular.noop, null);
            const isAppendable = R.both(transclude.isSlotFilled, isNilOrEvaluateToTrue);
            const swiperWrapper = $element.contents(`.${wrapperClass}`);
            const appendWhenValid = R.when(
                isAppendable,
                R.pipe(
                    transcludeTemplate,
                    element => {
                        swiperWrapper.append(element);
                    }
                )
            );

            const initialSlide = R.ifElse(isAppendable, R.always(1), R.always(0))(leftSwipeDirective);

            appendWhenValid(leftSwipeDirective);
            appendWhenValid(centralSwipeDirective);
            appendWhenValid(rightSwipeDirective);

            // Exposes containerId in scope
            $scope.containerId = $scope.$id;

            const swiperInstance = SwiperService.createInstance($scope.containerId, $element[0], {initialSlide});

            $attrs.$observe('isSwipable', R.ifElse(
                interpolated => $parse(interpolated)(),
                () => $attrs.$removeClass(noSwipingClass),
                () => {
                    if (isNilOrEvaluateToTrue('centerOnDisable')()) {
                        swiperInstance.slideTo(initialSlide, 0);
                    }

                    $attrs.$addClass(noSwipingClass);
                }
            ));

            // Notify services
            $scope.$on('$destroy', () => {
                $rootScope.$emit(SWIPER_DESTROY_EVENT, $scope.containerId);
            });
        }
    };
}