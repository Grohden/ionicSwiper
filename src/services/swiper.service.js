import {
    equals,
    merge,
    pipe,
    unless
} from 'ramda';
import Swiper from 'swiper';
import {
    findIndexForContainerId,
    findIsMoved
} from '../functional.core';
import {
    SWIPER_DESTROY_EVENT
} from '../swiper.events';


export const serviceName = 'SwiperService';

/**
 * @ngdoc service
 * @name ionic.swiper.SwiperService
 *
 * @description
 * The swiper service manages swiper instances
 *
 * @requires $rootScope
 * @requires $q
 * @requires $timeout
 * @requires ionic.swiper.SwiperConfigurationsProvider
 */
export /* @ngInject */ function SwiperService($rootScope, $q, $timeout, SwiperConfigurations) {
    'use strict';

    const _self = this;
    const swiperInstances = [];
    const configs = merge(SwiperConfigurations);

    $rootScope.$on(SWIPER_DESTROY_EVENT, function (event, containerId) {
        pipe(
            findIndexForContainerId(containerId),
            unless(equals(-1), index => {
                swiperInstances[index].instance.destroy();
                swiperInstances.splice(index, 1);
            })
        )(swiperInstances);
    });

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#getInstances
     * @methodOf ionic.swiper.SwiperService
     *
     * @description
     * Returns all the instances managed by this service
     *
     * @return {Array} All instances managed by this service
     */
    _self.getInstances = function () {
        return swiperInstances;
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#hasInstances
     * @methodOf ionic.swiper.SwiperService
     *
     * @description
     * Return if this service contains managed instances
     *
     * @return {Boolean} if this service contains managed instances
     */
    _self.hasInstances = function(){
        return !!swiperInstances.length;
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#getSwiperDefaultConfig
     * @methodOf ionic.swiper.SwiperService
     *
     * @param {Object} [extend] object to merge with configs
     * @description
     * Return default used swiper configurations, merged with ones
     * provided to SwiperConfigsProvider
     *
     * @return {Object} Swiper configurations including ones provided by SwiperConfigsProvider
     */
    _self.getSwiperDefaultConfig = function (extend) {
        return configs(extend || {});
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#isInMove
     * @methodOf ionic.swiper.SwiperService
     *
     * @description
     * Return if there's an swiper instance being moved by user
     *
     * @return {Swiper | undefined} The instance being moved
     */
    _self.isInMove = function () {
        return findIsMoved(swiperInstances);
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#createInstanceAsync
     * @methodOf ionic.swiper.SwiperService
     *
     * @param {Number} containerId container id to manage this instance
     * @param {HTMLElement} $element swiper container
     * @param {Object} [configs] configs to merge
     * @description
     * Creates the swiper instance in an async way
     *
     * @return {Promise} Promise to be resolved when instance is created
     */
    _self.createInstanceAsync = function (containerId, $element, configs) {
        const deferred = $q.defer();

        $timeout(() => deferred.resolve(
            _self.createInstanceSync(containerId, $element, configs)
        ));

        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#createInstanceSync
     * @methodOf ionic.swiper.SwiperService
     *
     * @param {Number} containerId container id to manage this instance
     * @param {HTMLElement} $element swiper container
     * @param {Object} [configs] configs to merge
     *
     * @description
     * Creates the swiper instance in an sync way
     *
     * @return {Swiper} Swiper instance
     */
    _self.createInstanceSync = function (containerId, $element, configs) {
        const instance = new Swiper($element, _self.getSwiperDefaultConfig(configs));
        swiperInstances.push({
            containerId,
            instance
        });
        return instance;
    };
}