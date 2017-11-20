describe('SwiperService', function() {
    let compile;
    let scope;
    let directiveElem;

    beforeEach(module('ionic.swiper'));

    //This is more from the container directive
    it('should register the container in the service', inject(function($compile, $rootScope, SwiperService){
        const el = $compile('<div swiper-container="true"></div>')($rootScope.$new());
        $rootScope.$apply();

        expect(SwiperService.getInstances().length).toBe(1);
    }));

    it('Should create the slides', inject(function($compile, $rootScope, SwiperService){
        const el = $compile(`
            <div swiper-container="true" >
                <div class="swiper-wrapper">
                    <div swiper-slide="center"> C </div>
                    <div swiper-slide="right"> R </div>
                    <div swiper-slide="left"> L </div>
                </div>
            </div>`)($rootScope.$new());
        $rootScope.$apply();

        const containerId = el.scope().containerId;

        const slides =  SwiperService.getInstances()[0].instance.slides;
        expect(slides.length).toBe(3);
    }));


});

