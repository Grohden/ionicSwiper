const findIndex = require('ramda/src/findIndex');
const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');
const path = require('ramda/src/path');
const unless = require('ramda/src/unless');
const equals = require('ramda/src/equals');
const pipe = require('ramda/src/pipe');
const merge = require('ramda/src/merge');

export const serviceName = 'SwiperService';

/**
 * @ngdoc service
 * @name swiper.angular:SwiperService
 *
 * @description
 * Service de gerenciamento do swiper
 **/
export function SwiperService() {
    'ngInject';

    const findIsMoved = find(path(['instance','touchEventsData','isMoved']));
    const swiperInstances = [];
    let selectedList = [];

    //Maybe use a provider to make this dynamic?
    const configs = merge({
        slidesPerView: 'auto',
        resistanceRatio: 0.5,
        slideToClickedSlide: true,
        spaceBetween: 2,
        mousewheel:true,
        preventClicks: true
    });

    window.exposedInstances = () => swiperInstances.map( i => i.instance);

    return {
        isInMove(){
            return findIsMoved(swiperInstances);
        },
        getSwiperDefaultConfig(extend){
            return configs(extend || {});
        },
        createInstance(scopeId, $element){
            const instance = new Swiper($element, this.getSwiperDefaultConfig({
                on:{
                    beforeDestroy(){
                        return pipe(
                            findIndex(propEq('scopeId', scopeId)),
                            unless(equals(-1), index => swiperInstances.splice(index, 1))
                        )(swiperInstances);
                    }
                }
            }));

            swiperInstances.push({scopeId, instance});
            return instance;
        },
        multipleSelection: {
            get(){
                return selectedList;
            },
            put(x){
                return selectedList.push(x);
            },
            clear(){
                return selectedList = [];
            }
        }
    }
}