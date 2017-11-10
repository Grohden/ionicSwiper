
export const providerName = 'SwiperConfigurations';

/**
 * @ngdoc provider
 * @name ionic.swiper.SwiperConfigurationsProvider
 *
 * @description
 * Default swiper configurations provider.
 *
 */
export /* @ngInject */ function SwiperConfigurationsProvider() {
    'use strict';

    const _self = this;
    let defaultConfigurations = {
        slidesPerView: 'auto',
        resistanceRatio: 0.5,
        slideToClickedSlide: false,
        spaceBetween: 2,
        mousewheel: false,
        preventClicks: true,
        controller: {
            control: []
        }
    };

    _self.useAsDefaultConfigs = function(configurations){
        defaultConfigurations = angular.extend(defaultConfigurations, configurations);
    };

    _self.$get = function configFactory(){
        return defaultConfigurations;
    };
}

