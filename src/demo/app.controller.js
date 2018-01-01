import * as R from 'ramda';

export const controllerName = 'AppController';
export /* @ngInject */ function AppController ($timeout, $scope, SwiperService, SwiperSelectionService){
    'use strict';

    const _self = this;

    _self.items = R.map(x => ({id: x}), R.range(1, 25));

    _self.handleHold = function(selectHolder, containerId){
        console.log(containerId);

        return R.ifElse(
            SwiperService.isInMove,
            R.F,
            () => {
                selectHolder.isSelected = SwiperSelectionService.toggleToSelection(containerId);

                return selectHolder.isSelected;
            }
        )();
    };

    _self.randomIf = function (id) {
        if (_self.randomIf[id]){
            return _self.randomIf[id];
        }
        const rand = Math.random() * 10 > 5;

        _self.randomIf[id] = rand;

        return rand;
    };

    _self.reload = function(){
        _self.items = [];

        $timeout(() => {
            _self.items = R.map(x => ({id: x}), R.range(1, 25));
            $scope.$broadcast('scroll.refreshComplete');
        }, 200);
    };


}