export /* @ngInject */ function config(SwiperConfigurationsProvider) {
    'use strict';

    SwiperConfigurationsProvider.useAsDefaultConfigs({
        resistanceRatio: 0.3
    });

}