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

    function RadioshowController(
        Common,
        $scope,
        $stateParams,
        $sce,
        ngAudio
    ) {
        var vm = this;
        vm.show = null;
        $scope.loadTrust = function(src) {
            $sce.trustAsResourceUrl(src);
            return ngAudio.load(src);
        };

        vm.selected = {};
        Common.Get
        (
            "radios/" + $stateParams.radioName + "/shows/" + $stateParams.showName
        ).then(
            function (data) {
                if (Common.isDebug()) console.log(data.data);
                vm.show = data.data;
                vm.selected = vm.show.channel.item[0];
                console.log('selected', vm.selected);
                $sce.trustAsResourceUrl(vm.selected.link);
                vm.selected.audio = ngAudio.load(vm.selected.link);
            },
            function (data) {
                console.log(data);
            }
        );
    }

})();