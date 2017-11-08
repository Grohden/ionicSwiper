const findIndex = require('ramda/src/findIndex');
const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');
const path = require('ramda/src/path');
const unless = require('ramda/src/unless');
const equals = require('ramda/src/equals');
const pipe = require('ramda/src/pipe');

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

    const _self = this;
    const swiperInstances = [];
/*
var SwiperService = angular.element(document.body).injector().get('SwiperService');
var instances = exposedInstances();
instances[1].controller.control = instances[0];
instances[0].controller.control = instances[1];
instances.forEach(i => i.update())
*/
    window.exposedInstances = () => swiperInstances.map( i => i.instance);

    _self.getSwiperDefaultConfig = function(extend){
        return angular.extend({
            slidesPerView: 'auto',
            resistanceRatio: 0.5,
            slideToClickedSlide: true,
            spaceBetween: 2,
            mousewheel:true,
            preventClicks: true
        }, extend || {});
    };
    _self.multipleSelection = (function(){
        let selectedList = [];
        return {
            get(){
              return selectedList;
            },
            put(x){
                selectedList.push(x);
            },
            clear(){
                selectedList = [];
            }
        };
    }());
    
    _self.instanceForId = function(scopeId){
        //TODO: faz sentido ter o register?
        return {
            register(instance){
                return swiperInstances.push({scopeId, instance});
            },
            remove(){
                return pipe(
                    findIndex(propEq('scopeId', scopeId)),
                    unless(equals(-1), index => swiperInstances.splice(index,1))
                )(swiperInstances);
            }
        };
    };
    
    _self.isInMove = function(){
        return find(path(['instance','touchEventsData','isMoved']), swiperInstances);
    };
    
}