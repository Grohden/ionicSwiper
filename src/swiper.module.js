import {SwiperService, serviceName as swiperService} from './swiper.service';
import {SwiperSelectionService, serviceName as swiperSelectionService} from './swiper.selection.service';
import {SwiperContainerDirective, directiveName as containerDirective} from './swiper.container.directive';
import {SwiperSlideDirective, directiveName as itemDirective} from './swiper.slide.directive';
import {SwiperRequireFocusDirective, directiveName as focusDirective} from './swiper.require-focus.directive';
import {SwiperContainerController, controllerName as scCtrl} from './swiper.container.controller';

// noinspection ES6UnusedImports
import SwiperDefaultStyles from 'swiper/dist/css/swiper.min.css';

export const moduleName = 'ionic.swiper';
angular
    .module(moduleName, [])
    .service    (swiperService,          SwiperService)
    .service    (swiperSelectionService, SwiperSelectionService)
    .directive  (containerDirective,     SwiperContainerDirective)
    .directive  (itemDirective,          SwiperSlideDirective)
    .directive  (focusDirective,         SwiperRequireFocusDirective)
    .controller (scCtrl,                 SwiperContainerController);

