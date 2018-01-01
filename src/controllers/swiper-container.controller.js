import {directiveName} from '../directives/swiper-container.directive';
import {SWIPER_CONTAINER_STATE_UPDATE, SWIPER_DESTROY_EVENT} from '../swiper.events';
import {equals, prop, unless} from 'ramda';
import {eqPointer} from '../functional.core';

export const controllerName = 'SwiperContainerController';
export const controllerAsName = 'spcCtrl';


/**
 * @ngdoc controller
 * @name ionic.swiper.controller:SwiperContainerController
 * @alias spcCtrl
 *
 * @description
 * Swiper container controller that exposes some functions to swiperContainer directive and
 * its children
 *
 * @requires $parse
 * @requires $rootScope
 * @requires $element
 * @requires $scope
 * @requires $attrs
 * @requires $timeout
 * @requires ionic.swiper.SwiperService
 * @requires ionic.swiper.SwiperConfigurationsProvider
 */
export /* @ngInject */ function SwiperContainerController($parse, $rootScope, $element, $scope, $attrs, $timeout, SwiperService, SwiperConfigurations) {
    'use strict';

    const _self = this;
    const swiperPromise = SwiperService.createInstanceAsync($scope.$id, $element);

    const {noSwipingClass} = SwiperConfigurations;

    // exposes scope id as container id
    $scope.containerId = $scope.$id;

    /**
     * @ngdoc method
     * @name ionic.swiper.controller:SwiperContainerController#addSlide
     * @methodOf ionic.swiper.controller:SwiperContainerController
     *
     * @param {HTMLElement} slideElement swiper container
     *
     * @description
     * Returns an swiper instance adder
     *
     * @return {Object} toLeft,toRight,toCenter functions to add the element
     */
    _self.addSlide = function (slideElement) {
        return {
            toLeft: () => swiperPromise.then(swiper => {
                swiper.prependSlide(slideElement);
            }),
            toRight: () => swiperPromise.then(swiper => {
                swiper.appendSlide(slideElement);
            }),
            toCenter: () => swiperPromise.then(swiper => {
                swiper.appendSlide(slideElement);
            })
        };
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.controller:SwiperContainerController#callUpdate
     * @methodOf ionic.swiper.controller:SwiperContainerController
     *
     * @description
     * Calls swiper update function
     *
     * @return {spcCtrl} instance for chain calls
     */
    _self.callUpdate = function () {
        swiperPromise.then(swiper => swiper.update());

        return _self;
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.controller:SwiperContainerController#slideToElement
     * @methodOf ionic.swiper.controller:SwiperContainerController
     *
     * @param {HTMLElement} targetElement element to find index in slides
     * @description
     * Calls swiper slideTo method with zero delay
     *
     * @return {spcCtrl} instance for chain calls
     */
    _self.slideToElement = function (targetElement) {
        swiperPromise.then(swiper => {
            const index = Reflect.apply(Array.findIndex, prop('slides')(swiper), eqPointer(targetElement));

            unless(equals(-1), () => {
                swiper.slideTo(index, 0);
            })(index);
        });

        return _self;
    };

    const swiperObserver = $attrs.$observe(directiveName, interpolated => {
        const enableSwiper = $parse(interpolated)();

        $scope.$broadcast(SWIPER_CONTAINER_STATE_UPDATE, enableSwiper);

        if (enableSwiper) {
            $attrs.$removeClass(noSwipingClass);
        } else {
            $attrs.$addClass(noSwipingClass);
        }
    });

    const classObserver = $attrs.$observe(
        'class',
        () => $timeout(_self.callUpdate)
    );

    $scope.$on('$destroy', () => {
        swiperObserver();
        classObserver();
        $rootScope.$emit(SWIPER_DESTROY_EVENT, $scope.containerId);
    });

}