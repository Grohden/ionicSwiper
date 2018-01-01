import {__, compose, isNil, keys, merge, prop, unless} from 'ramda';
import Swiper from 'swiper';
import {findIsMoved} from '../functional.core';
import {SWIPER_DESTROY_EVENT} from '../swiper.events';


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
// eslint-disable-next-line max-statements,max-params
export /* @ngInject */ function SwiperService($rootScope, $q, $timeout, SwiperConfigurations) {
    'use strict';

    const _self = this;
    const swiperInstances = {};
    const configs = merge(SwiperConfigurations);

    $rootScope.$on(SWIPER_DESTROY_EVENT, (event, containerId) => {
        _self.deleteInstanceById(containerId);
    });

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#getInstanceById
     * @methodOf ionic.swiper.SwiperService
     *
     * @description
     * Deletes and destroy an instance of swiper
     *
     * @param {Number | String} containerId containerId associated with swiper instance
     *
     * @return {Boolean | Any } if the id was deleted from instances list, or, if the id doesn't exist in list, returns the given argument.
     */
    _self.deleteInstanceById = unless(
        compose(isNil, prop(__, swiperInstances)),
        containerId => {
            const instance = _self.getInstanceById(containerId);

            instance.destroy();

            return Reflect.deleteProperty(swiperInstances, containerId);
        }
    );

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#getInstanceById
     * @methodOf ionic.swiper.SwiperService
     *
     * @description
     * Returns a single swiper instance if it exists
     *
     * @param {Number | String} containerId containerId associated with swiper instance
     *
     * @return {Object| undefined} Found instance or nothing
     */
    _self.getInstanceById = prop(__, swiperInstances);

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#getInstances
     * @methodOf ionic.swiper.SwiperService
     *
     * @description
     * Returns all the instances managed by this service
     *
     * @return {Object} All instances managed by this service
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
        return Boolean(keys(swiperInstances).length);
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
     * @param {Object} [instanceConfigs] configs to merge
     * @description
     * Creates the swiper instance in an async way
     *
     * @return {Promise} Promise to be resolved when instance is created
     */
    _self.createInstanceAsync = function (containerId, $element, instanceConfigs) {
        const deferred = $q.defer();

        $timeout(() => deferred.resolve(_self.createInstance(containerId, $element, instanceConfigs)));

        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperService#createInstance
     * @methodOf ionic.swiper.SwiperService
     *
     * @param {Number} containerId container id to manage this instance
     * @param {HTMLElement} $element swiper container
     * @param {Object} [instanceConfigs] configs to merge
     *
     * @description
     * Creates the swiper instance in an sync way
     *
     * @return {Swiper} Swiper instance
     */
    _self.createInstance = function (containerId, $element, instanceConfigs) {
        const instance = new Swiper($element, _self.getSwiperDefaultConfig(instanceConfigs));

        swiperInstances[containerId] = instance;

        return instance;
    };
}