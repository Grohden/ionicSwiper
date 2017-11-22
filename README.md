# Ionic v1 Swiper

If you're looking for an angular wrapper for swiper you can find it [here](https://github.com/ksachdeva/angular-swiper).

My version of angular swiper is focused on **ionic v1**, since ionic v1 lists doesn't support swipes for both sides i wrote this
'simple' wrappers for Swiper (which seems to be the one used in ionic 2)
to support this.

## Install

`npm install ionic-swiper`

## Demo

An demo is available [here](https://grohden.github.io/ionicSwiper/) and on the demo folder.

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

Below is a simple usage on html:

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

### Directives

| Directive            | Description                                                                                                                                                                             |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| swiper-container     | This directive exposes the containerId through scope, and creates the swiper instances using SwiperService It creates an watcher in itself to disable or enable swipe on the container. |
| swiper-slide         | This directive can be used to 'reorder' the slides,  for now the best usage is to call it after the center with the 'left' param, avoiding the flickering                               |
| swiper-require-focus | This one is an 'slide to me when ready', it slides with no animation.                                                                                                                   |

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

#### SwiperService

The swiper service manages swiper instances, below is a list of exposed functions:

| Exposed Function                          | Return  | Description                                                                                                                                                             |
|-------------------------------------------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getInstances()                            | Array   | Returns all registered swiper instances.                                                                                                                                |
| getSwiperDefaultConfig(extend)            | Object  | Returns the default swiper configurations (including ones set in config phase) extending the return object if *extend* param is provided                                |
| isInMove()                                | Boolean | If the user is moving the swiper container (this is useful for make a on hold select using `onHold` ionic directive)                                                    |
| hasInstances()                            | Boolean | If the service contains registered swiper instances                                                                                                                     |
| createInstanceSync(containerId, $element) | Promise | Creates a swiper instances using default configs and keeping track of the instance, you probably should not use this, it should only be used by the module controllers. |

#### SwiperSelectionService

The swiper selection service manages a **swipe synchronization between selection** of swiper containers.

| Exposed Function                                        | Description                                                                                                  |
|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| SwiperSelectionService.getSelection()                   | returns all the current selection synchronized swiper instances                                              |
| SwiperSelectionService.clearSelection()                 | removes all the selected instances controllers and clears the selected list                                  |
| SwiperSelectionService.putInSelection(containerId)      | Put the id associated with swiper instance in the selection list and synchronizes the swipe                   |
| SwiperSelectionService.removeFromSelection(containerId) | Removes the id associated with swiper instance from selection and remove swipe synchronization                |
| SwiperSelectionService.toggleToSelection(containerId)   | Uses internally `putInSelection` and `removeFromSelection`, checking if the provided id is in selection list |

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
