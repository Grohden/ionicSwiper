import ifElse from 'ramda/src/ifElse';
import map from 'ramda/src/map';
import range from 'ramda/src/range';

export const controllerName = 'AppController';
export /* @ngInject */ function AppController (SwiperService, SwiperSelectionService){
    'use strict';

    const _self = this;

    _self.items = map(x => ({id:x}), range(1,25));

    _self.handleHold = function(selectHolder, containerId){
        console.log(containerId);
        return ifElse(
            SwiperService.isInMove,
            () => {
                console.log('move');
                return false;
            },
            () => {
                console.log('hold');
                selectHolder.isSelected = SwiperSelectionService.toggleToSelection(containerId);
                return selectHolder.isSelected;
            }
        )();
    };


}