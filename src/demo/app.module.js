import {AppController, controllerName}  from './app.controller.js';
import { moduleName as SwiperModule } from '../swiper.module';
import {config} from './app.config';

// noinspection ES6UnusedImports
import DemoSCSS from './demo.css';

angular
    .module('ionicApp', [SwiperModule, 'ionic'])
    .config(config)
    .controller(controllerName, AppController);


