import {SwiperConfigurationsProvider, providerName} from './SwiperConfigsProvider';

import {serviceName as swiperService, SwiperService} from './services/SwiperService';
import {serviceName as swiperSelectionService, SwiperSelectionService} from './services/SwiperSelectionService';


import {directiveName as containerDirective, SwiperContainerDirective} from './directives/swiper-container.directive';
import {directiveName as itemDirective, SwiperSlideDirective} from './directives/swiper-slide.directive';
import {directiveName as focusDirective, SwiperRequireFocusDirective} from './directives/swiper-require-focus.directive';
import {directiveName as ionicSwiperDirective, IonicSwiperDirective} from './directives/ionic-swiper.directive';
import {
    centralSwipeDirective, IonicCentralSwipe,
    leftSwipeDirective, IonicLeftSwipe,
    rightSwipeDirective, IonicRightSwipe
} from './directives/ionic-swiper.slides.directives';

import {SwiperContainerController, controllerName as scCtrl} from './controllers/swiper-container.controller';

export const moduleName = 'ionic.swiper';

/**
 * @ngdoc overview
 * @name ionic.swiper
 * @description This module was created to add swipe to both sides in ionic v1
 *
 */
angular
    .module(moduleName, [])
    .provider   (providerName,           SwiperConfigurationsProvider)
    .service    (swiperService,          SwiperService)
    .service    (swiperSelectionService, SwiperSelectionService)
    .directive  (containerDirective,     SwiperContainerDirective)
    .directive  (itemDirective,          SwiperSlideDirective)
    .directive  (focusDirective,         SwiperRequireFocusDirective)

    .directive  (ionicSwiperDirective,   IonicSwiperDirective)
    .directive  (centralSwipeDirective,  IonicCentralSwipe)
    .directive  (leftSwipeDirective,     IonicLeftSwipe)
    .directive  (rightSwipeDirective,    IonicRightSwipe)

    .controller (scCtrl,                 SwiperContainerController);

