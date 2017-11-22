import ifElse from 'ramda/src/ifElse';
import map from 'ramda/src/map';
import range from 'ramda/src/range';

export const controllerName = 'AppController';
export /* @ngInject */ function AppController ($timeout, $scope, SwiperService, SwiperSelectionService){
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

    _self.randomIf = function (id) {
        if(_self.randomIf[id]){
            return _self.randomIf[id];
        } else {
            const rand = Math.random() * 10 > 5;
            return (_self.randomIf[id] = rand);
        }
    };

    _self.reload = function(){
        _self.items = [];

        $timeout(()=>{
            _self.items = map(x => ({id:x}), range(1,25));
            $scope.$broadcast('scroll.refreshComplete');
        }, 200);
    };


}