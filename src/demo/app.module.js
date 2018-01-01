import {AppController, controllerName}  from './app.controller.js';
import {moduleName as SwiperModule} from '../swiper.module';
import {config} from './app.config';

// noinspection ES6UnusedImports
import DemoSCSS from './demo.css';
import SwiperCSS from '../../node_modules/swiper/dist/css/swiper.min.css';

angular
    .module('ionicApp', [SwiperModule, 'ionic'])
    .config(config)
    .controller(controllerName, AppController);


