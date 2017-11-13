describe('SwiperSelectionService', function() {
    let $provide;
    let SwiperService;
    let SwiperSelectionService;

    beforeEach(module('ionic.swiper'));

    //beforeEach(angular.mock.module(function(_$provide_) {
    //    $provide = _$provide_;
    //}));

    beforeEach(function() {
        inject(function($injector) {
            SwiperService = $injector.get('SwiperService');
            SwiperSelectionService = $injector.get('SwiperSelectionService');
        });
    });

    it('should put an swiper instance in selection list', () => {
    });

    it('should remove an swiper instance in selection list', () => {
    });

    it('should put an swiper instance in selection list', () => {
    });

    it('should put an swiper instance in selection list', () => {
    });

});