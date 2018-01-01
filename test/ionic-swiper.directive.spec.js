describe('SwiperService', () => {
    beforeEach(module('ionic.swiper'));

    // This is more from the container directive
    it('should register the container in the service', inject(($compile, $rootScope, SwiperService) => {
        const el = $compile(`
        <ionic-swiper>
            <central-swiper> Test </central-swiper>
        </ionic-swiper>
        `)($rootScope.$new());

        $rootScope.$apply();

        const instances = Object.values(SwiperService.getInstances());

        expect(instances.length).toBe(1);
    }));

    it('Should create the slides', inject(($compile, $rootScope, SwiperService) => {
        const el = $compile(`
            <ionic-swiper is-swipable="true"
                          left-swiper="true"
                          right-swiper="true">
                <left-swiper class="side-item">
                    Left
                </left-swiper>
                <central-swiper class="central-item">
                   Central {{:: containerId}}
                </central-swiper>
                <right-swiper class="side-item">
                    Right
                </right-swiper>
            </ionic-swiper>
        `)($rootScope.$new());

        $rootScope.$apply();

        const {containerId} = el.scope();
        const instance = SwiperService.getInstanceById(containerId);
        const {slides} = instance;

        expect(slides.length).toBe(3);
    }));


});

