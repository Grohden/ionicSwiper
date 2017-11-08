import {AppController, controllerName}  from './app.controller.js';
import { moduleName as SwiperModule } from '../swiper.module';
import DemoSCSS from './demo.css';

angular
    .module('AppModule', [SwiperModule])
    .controller(controllerName, AppController);


