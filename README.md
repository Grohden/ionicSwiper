# Ionic v1 Swiper

If you're looking for an angular wrapper for swiper you can find it [here](https://github.com/ksachdeva/angular-swiper).

My version of angular swiper is focused on **ionic v1**, since ionic v1 lists doesn't support swipes for both sides i wrote this
'simple' wrappers for Swiper (which seems to be the one used in ionic 2)
to support this.

## Install

`npm install ionic-swiper`

## Demo

An demo is available [here](https://codepen.io/Grohden/full/EbjWBe/) and on the demo folder.

## API Documentation

API Documentation is available [here](https://grohden.github.io/ionicSwiper/)

## Usage

You just need to import the `swiper.bundle.js` in  the HTML like this:

```html
<link type="text/css" href="swiper.css"/>
<script type="text/javascript" src="swiper.bundle.js"></script>
<script type="text/javascript">
    angular.module('yourModule',['ionic.swiper']);
</script>
```

Or if you use **webpack** you can use like this:

```javascript
import {moduleName as ionicSwiperModule} from 'ionic-swiper';

angular.module('yourModule',[ionicSwiperModule]);

//and import the .css your module generates in your html.
```

**You can import the module like that, but you'll need to use these two in your webpack:**

* babel-plugin-angularjs-annotate
* extract-text-webpack-plugin

### Usage example

Below is the latest way to use this lib:

```html
<ionic-swiper ng-repeat="i in [1,2,3]"
              center-on-disable="{{ true || 'disable default center on disable behavior'}}"
              is-swipable="{{ true || 'some prop to watch' }}"
              left-swiper="{{:: true || 'or any prop that evaluate to a boolean' }}"
              right-swiper="{{:: true || 'or any prop that evaluate to a boolean' }}">
    <!-- containerId is available inside this context -->
            
    <!-- Left transclude is optional -->
    <left-swiper class="side-item">
        Left
    </left-swiper>
    
    <!-- Central transclude is required -->
    <central-swiper class="central-item">
       Central {{:: containerId}}
    </central-swiper>
    
    <!-- Right transclude is optional -->
    <right-swiper class="side-item">
        Right
    </right-swiper>
</ionic-swiper>
```

Below is a simple usage on html **with the old way** i wrote this:

```html
<div
    swiper-container="{{ true }}"
    class="swiper-container" 
    ng-repeat="item in ctrl.items">
  <!-- containerId is available inside this context -->

  <div class="swiper-wrapper">
            <ion-item class="swiper-slide" swiper-slide="center">
              This swiper container id is {{:: containerId }}
            </ion-item>

            <!--By the way, the html nodes order matters! -->
            <ion-item class="swiper-slide" swiper-slide="left">
                Left Button
            </ion-item>

            <ion-item class="swiper-slide" swiper-slide="right">
                Right Button
            </ion-item>
    </div>
</div>
```

Note: Most of the swiper management is done by using an id, this id is exposed by `swiperContainer` directive as `containerId` as shown in the example.

#### Default configurations 

You can **override** the default configurations for swiper with

`SwiperConfigurationsProvider` on the config phase
like the shown on below:

```javascript
config.$inject = ['SwiperConfigurationsProvider'];
function config(SwiperConfigurationsProvider) {
    'use strict';
    SwiperConfigurationsProvider.useAsDefaultConfigs({
        resistanceRatio: 0.3
    })
}
```

## Issues

My implementation seems to not work properly with ionic's `collection-repeat`,
it works partially, but for some items swiper seems to get a 'free swipe mode'.

There are some problems with ionic list scroll **on browser mode**, it seems that swiper take the 'drag'/scroll event to itself.

## Development

`npm install` should setup everything to dev env.
then you can run `npm start` and `npm run watch` and start the development

To make the dist build, you should run `npm build`, if every test pass,
then you can use the dist bundle.

## Notes

* I'm not spending too much time in this lib, so, if you find a bug or have a suggestion, you can fork, open an issue or send a PR to me :D

* I did'nt wrote directives with templates to give a better control over html structure, so you need the
*swiper-container*, *swiper-wrapper* and *swiper-slides* classes and nodes.

* I'm using **Ramda** to get a better functional approach.

* **Swiper is a SLIDE lib**, so there are some limitations in this lib..
