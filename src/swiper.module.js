import {SwiperConfigurationsProvider, providerName} from './swiper.configs.provider';

import {serviceName as swiperService, SwiperService} from './services/swiper.service';
import {serviceName as swiperSelectionService, SwiperSelectionService} from './services/swiper.selection.service';

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

// noinspection ES6UnusedImports
import SwiperDefaultStyles from 'swiper/dist/css/swiper.min.css';

export const moduleName = 'ionic.swiper';

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

