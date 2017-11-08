import {SwiperContainerDirective, directiveName as containerDirective} from './swiper.container.directive';
import {SwiperContainerController, controllerName as scCtrl} from './swiper.container.controller';
import {SwiperItemDirective, directiveName as itemDirective} from './swiper.slide.directive';
import {SwiperRequireFocusDirective, directiveName as focusDirective} from './swiper.require-focus.directive';
import {SwiperService, serviceName} from './swiper.service';

require('swiper/dist/css/swiper.min.css');

export const moduleName = 'swiper.angular';

angular
    .module(moduleName, [])
    .service    (serviceName,       SwiperService)
    .directive  (containerDirective,SwiperContainerDirective)
    .directive  (itemDirective,     SwiperItemDirective)
    .directive  (focusDirective,    SwiperRequireFocusDirective)
    .controller (scCtrl,            SwiperContainerController);

