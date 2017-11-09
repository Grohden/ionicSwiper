import {AppController, controllerName}  from './app.controller.js';
import { moduleName as SwiperModule } from '../swiper.module';

// noinspection ES6UnusedImports
import DemoSCSS from './demo.css';

angular
    .module('ionicApp', [SwiperModule, 'ionic'])
    .controller(controllerName, AppController);


