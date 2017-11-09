import ifElse from 'ramda/src/ifElse';
import map from 'ramda/src/map';
import range from 'ramda/src/range';

export const controllerName = 'AppController';
export function AppController (SwiperService, SwiperSelectionService){
    'ngInject';
    const _self = this;

    _self.items = map(x => ({id:x}), range(1,100));

    _self.handleHold = function(item, containerId){
        console.log(containerId);
        return ifElse(
            SwiperService.isInMove,
            () => {
                console.log('move');
                return false;
            },
            () => {
                console.log('hold');
                SwiperSelectionService.toggleToSelection(containerId);
                return true;
            }
        )();
    };


}