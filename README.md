# Ionic v1 Swiper

If you're looking for an angular wrapper for swiper you can find it [here](https://github.com/ksachdeva/angular-swiper).

My version of angular swiper is focused on **ionic v1**, since ionic v1 lists does'nt support swipes for both sides i wrote this
'simple' wrappers for Swiper (which seems to be the one used in ionic 2)
to support this.

## Install

`npm install ionic-swiper`

## Demo

An demo is available [here](https://grohden.github.io/ionicSwiper/) and on the demo folder

## Usage

You just need to import the `swiper.bundle.js` in  the HTML like this:
```html
<link type="text/css" href="swiper.css"/>
<script type="text/javascript" src="swiper.bundle.js"></script>
<script type="text/javascript">
    angular.module('yourModule',['swiper.angular']);
</script>
```


Or if you use **webpack** you can use like this:
```javascript
import {moduleName as angularSwiperModule} from 'angularSwiper/src/swiper.module';

angular.module('yourModule',[angularSwiperModule]);

//and import the .css your module generates in your html.
```

**You can import the module like that, but you'll need to use these two in your webpack:**
* babel-plugin-angularjs-annotate
*  extract-text-webpack-plugin

### Provided interfaces

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
Please note that for now, you should not override the *beforeDestroy* 
event, since its used to detect when to remove swiper instances from the provided services.

#### SwiperService

The swiper service manages swiper instances, below is a list of exposed functions:

| Exposed Function                                    	| Description                                                                                                                                                             	|
|-----------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| SwiperService.getInstances()                        	| returns all registered swiper instances.                                                                                                                                	|
| SwiperService.getSwiperDefaultConfig(extend)        	| returns the default swiper configurations (including ones set in config phase)                                                                                          	|
| SwiperService.isInMove()                            	| if the user is moving the swiper container (this is useful for make a on hold select using `onHold` ionic directive)                                                    	|
| SwiperService.createInstance(containerId, $element) 	| creates a swiper instances using default configs and keeping track of the instance, you probably should not use this, it should only be used by the module controllers. 	|

#### SwiperSelectionService

The swiper selection service manages a **swipe synchronization between selection** of swiper containers.

| Exposed Function                                         	| Description                                                                                                  	|
|---------------------------------------------------------	|--------------------------------------------------------------------------------------------------------------	|
| SwiperSelectionService.get()                            	| returns all the current selection synchronized swiper instances                                              	|
| SwiperSelectionService.clear()                          	| removes all the selected instances controllers and clears the selected list                                  	|
| SwiperSelectionService.putInSelection(containerId)      	| Put the id associated swiper instance in the selection list and sincronizes the swipe                        	|
| SwiperSelectionService.removeFromSelection(containerId) 	| Removes the id associated swiper instance from selection and remove swipe synchronization                    	|
| SwiperSelectionService.toggleToSelection(containerId)   	| Uses internally `putInSelection` and `removeFromSelection`, checking if the provided id is in selection list 	|

#### Exposed properties in scope

Most of the swiper management is done by using an id, this id is exposed by `swiperContainer` directive
used example:
```html
<div 
    swiper-container="true"
    class="swiper-container" 
    ng-repeat="item in ctrl.items">
  <!-- containerId is available inside this context -->

  <div class="swiper-wrapper">
            <ion-item swiper-slide="center">
              This swiper container id is {{:: containerId }}
            </ion-item>
            <ion-item class="side-item" swiper-slide="right">
                Right Button
            </ion-item>
            <ion-item class="side-item" swiper-slide="left">
                Left Button
            </ion-item>
    </div>
</div>
```

## Issues

My implementation seems to not work properly with ionic's `collection-repeat`,
it works partially, but for some items swiper seems to get a 'free swipe mode'.

There are some problems with ionic list scroll **on browser mode**, it seems that swiper take the 'drag'/scroll event to itself.


## Development

`yarn install` should setup everything to dev env.
then you can run `npm start` and start the development

To make the dist build, you should run `npm build`, if every test pass,
then you can use the dist bundle.

## Notes

* I'm using **Ramda** to get a better functional approach.

* **Swiper is a SLIDE lib**, so there are some limitations in this lib..

