(
    function() {
        "use strict";

        angular.module("Scoota")
            .controller(
                "RadioshowController",
                [
                    "Common",
                    "$scope",
                    "$stateParams",
                    RadioshowController
                ]);

        function RadioshowController(
            Common,
            $scope,
            $stateParams
        )
        {
            var vm = this;
            vm.show = null;

            Common.Get
            (
                "radios/"+$stateParams.radioName+"/shows/"+$stateParams.showName
            ).then(
               function(data){
                    if(Common.isDebug()) console.log(data.data);
                    vm.show = data.data;
                },
                function(data){
                    console.log(data);
                }
            );
        }

    }
)();