const createSlideDirective = (SwiperConfigurations)=>{
    const { slideClass } = SwiperConfigurations;
    return {
        restrict:'E',
        template: `<ion-item class="${slideClass}" ng-transclude></ion-item>`,
        replace: 'element',
        transclude:true
    };
};

export const centralSwipeDirective = 'centralSwiper';
export /* @ngInject */ function IonicCentralSwipe(SwiperConfigurations){
    return createSlideDirective(SwiperConfigurations);
}

export const leftSwipeDirective = 'leftSwiper';
export /* @ngInject */ function IonicLeftSwipe(SwiperConfigurations){
    return createSlideDirective(SwiperConfigurations);
}

export const rightSwipeDirective = 'rightSwiper';
export /* @ngInject */ function IonicRightSwipe(SwiperConfigurations){
    return createSlideDirective(SwiperConfigurations);
}