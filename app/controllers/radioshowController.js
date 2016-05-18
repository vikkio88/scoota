(function () {
    "use strict";

    angular.module("Scoota")
        .controller(
            "RadioshowController",
            [
                "Common",
                "$scope",
                "$stateParams",
                "$sce",
                "ngAudio",
                RadioshowController
            ]);

    function RadioshowController(Common,
                                 $scope,
                                 $stateParams,
                                 $sce,
                                 ngAudio) {
        var vm = this;
        vm.show = null;
        $scope.loadTrust = function (src) {
            $sce.trustAsResourceUrl(src);
            return ngAudio.load(src);
        };
        vm.loadTrust = $scope.loadTrust;
        vm.selectItem = function (items) {
            if (this.toSelect > items.length || this.toSelect < 0) return items[0];
            var item = items[this.toSelect];
            item.pos =this.toSelect;
            return item;
        };

        vm.stopChangePodcast= function(podcast){
            this.selected.audio.stop();
            this.selected = podcast;
            this.selected.audio = this.loadTrust(podcast.link);
        };
        vm.selected = {};
        vm.toSelect = parseInt($stateParams.podcast);
        vm.toSelect = isNaN(vm.toSelect) ? 0 : vm.toSelect;
        vm.position = parseInt($stateParams.position);
        vm.position = isNaN(vm.position) ? 0 : vm.position;
        console.log(vm.position);

        $scope.collapsed = true;
        $scope.current = true;

        //Material Icons
        $scope.chevronDown = 'expand_more';
        $scope.chevronUp = 'expand_less';
        $scope.play= 'play_circle_filled';
        $scope.pause = 'pause_circle_filled';
        $scope.volumeOff = 'volume_off';
        $scope.volumeUp = 'volume_up';

        vm.loadNext = function (pos) {
            this.position = pos+1;
            this.stopChangePodcast(this.selectItem(this.show.channel.item));
        };
        vm.loadPrev = function (pos) {
            this.position = pos-1;
            this.stopChangePodcast(this.selectItem(this.show.channel.item));
        };

        Common.Get
        (
            "radios/" + $stateParams.radioName + "/shows/" + $stateParams.showName
        ).then(
            function (data) {
                if (Common.isDebug()) console.log(data.data);
                vm.show = data.data;
                vm.selected = vm.selectItem(vm.show.channel.item);
                $sce.trustAsResourceUrl(vm.selected.link);
                vm.selected.audio = ngAudio.load(vm.selected.link);
                vm.selected.audio.currentTime = Number(vm.position);
            },
            function (data) {
                console.log(data);
            }
        );
    }

})();