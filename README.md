# Ionic v1 Swiper

If you're looking for an angular wrapper for swiper you can find it [here](https://github.com/ksachdeva/angular-swiper).

My version of angular swiper is focused on **ionic v1**, since ionic v1 lists does'nt support swipes for both sides i wrote this
'simple' wrappers for Swiper (which seems to be the one used in ionic 2)
to support this.

## Demo

A prototype demo is available [here](https://codepen.io/Grohden/pen/EbjWBe) and on the demo folder

##Usage

You just need to import the `swiper.bundle.js` in  the HTML like this:
```html
<script type="text/javascript" src="swiper.bundle.js"></script>
<script type="text/javascript">
    angular.module('yourModule',['swiper.angular']);
</script>
```


Or if you use **webpack** you can use like this:
```javascript
import {moduleName as angularSwiperModule} from 'angularSwiper/src/swiper.module';

angular.module('yourModule',[angularSwiperModule]);
```

##Issues

My implementation seems to not work properly with ionic's `collection-repeat`,
it works partially, but for some items swiper seems to get a 'free swipe mode'.

##Development

`yarn install` should setup everything to dev env.
then you can run `npm start` and start the development

To make the dist build, you should run `npm build`, if every test pass,
then you can use the dist bundle.

## Notes

* I'm using **Ramda** to get a better functional approach.

* **Swiper is a SLIDE lib**, so there are some limitations in this lib..

* There are some problems with ionic list scroll **on browser mode**, it seems that swiper take the 'drag'/scroll event to itself.
