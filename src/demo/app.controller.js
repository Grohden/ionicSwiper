import ifElse from 'ramda/src/ifElse';
import map from 'ramda/src/map';
import range from 'ramda/src/range';

export const controllerName = 'AppController';
export class AppController {
    /* @ngInject */
    constructor(SwiperService){
        Object.assign(this, {SwiperService});
        this.items = map(x => ({id:x}), range(1,100));
    }
    handleHold(item){
        ifElse(
            this.SwiperService.isInMove,
            () => console.log('move', item),
            () => console.log('hold', item)
        )();
    }
}