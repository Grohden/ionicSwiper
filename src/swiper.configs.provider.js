
export const providerName = 'SwiperConfigurations';

/**
 * @ngdoc service
 * @name ionic.swiper.SwiperConfigurationsProvider
 *
 * @description
 * Swiper default configs provider
 */
export /* @ngInject */ function SwiperConfigurationsProvider() {
    'use strict';

    const _self = this;
    let defaultConfigurations = {
        slideClass: 'swiper-slide',
        noSwipingClass: 'swiper-no-swiping',

        slidesPerView: 'auto',
        resistanceRatio: 0.5,
        slideToClickedSlide: false,
        spaceBetween: 2,
        mousewheel: false,
        preventClicks: true,
        controller: {
            control: []
        },
    };

    /**
     * @ngdoc method
     * @name ionic.swiper.SwiperConfigurationsProvider#useAsDefaultConfigs
     * @methodOf ionic.swiper.SwiperConfigurationsProvider
     *
     * @param {Object} configurations swiper configurations object to extend defaults
     *
     * @description
     * Extends the default configurations for swiper to be used by ionic.swiper module
     */
    _self.useAsDefaultConfigs = function(configurations){
        defaultConfigurations = angular.extend(defaultConfigurations, configurations);
    };

    _self.$get = function configFactory(){
        return defaultConfigurations;
    };
}

