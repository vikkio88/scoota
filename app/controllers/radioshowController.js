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
                RadioshowController
            ]);

    function RadioshowController(
        Common,
        $scope,
        $stateParams,
        $sce
    ) {
        var vm = this;
        vm.show = null;

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
        $scope.playPodcast= function () {
            var audio = document.getElementById("podcastPl");
            audio.load();
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
            },
            function (data) {
                console.log(data);
            }
        );
    }

})();