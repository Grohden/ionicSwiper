export const centralSwipeDirective = 'centralSwiper';
export /* @ngInject */ function IonicCentralSwipe(){
    return {
        restrict:'E',
        template: '<ion-item class="swiper-slide" ng-transclude></ion-item>',
        replace: 'element',
        transclude:true
    };
}

export const leftSwipeDirective = 'leftSwiper';
export /* @ngInject */ function IonicLeftSwipe(){
    return {
        restrict:'E',
        template: '<ion-item class="swiper-slide" ng-transclude></ion-item>',
        replace: 'element',
        transclude:true
    };
}

export const rightSwipeDirective = 'rightSwiper';
export /* @ngInject */ function IonicRightSwipe(){
    return {
        restrict:'E',
        template: '<ion-item class="swiper-slide" ng-transclude></ion-item>',
        replace: 'element',
        transclude:true
    };
}