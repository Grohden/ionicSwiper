import {SwiperService, serviceName} from './swiper.service';
import {SwiperContainerDirective, directiveName as containerDirective} from './swiper.container.directive';
import {SwiperSlideDirective, directiveName as itemDirective} from './swiper.slide.directive';
import {SwiperRequireFocusDirective, directiveName as focusDirective} from './swiper.require-focus.directive';
import {SwiperContainerController, controllerName as scCtrl} from './swiper.container.controller';

// noinspection ES6UnusedImports
import SwiperDefaultStyles from 'swiper/dist/css/swiper.min.css';

export const moduleName = 'swiper.angular';
angular
    .module(moduleName, [])
    .service    (serviceName,       SwiperService)
    .directive  (containerDirective,SwiperContainerDirective)
    .directive  (itemDirective,     SwiperSlideDirective)
    .directive  (focusDirective,    SwiperRequireFocusDirective)
    .controller (scCtrl,            SwiperContainerController);

