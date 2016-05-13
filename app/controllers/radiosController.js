(
    function() {
        "use strict";

        angular.module("Scoota")
            .controller(
                "RadiosController",
                [
                    "Common",
                    "$scope",
                    "$stateParams",
                    RadiosController
                ]);

        function RadiosController(
            Common,
            $scope,
            $stateParams
        )
        {
            var vm = this;
            vm.radios = null;

            Common.Get
            (
                "radios"
            ).then(
               function(data){
                    if(Common.isDebug()) console.log(data.data);
                    vm.radios = data.data;
                },
                function(data){
                    console.log(data);
                }
            );
        }

    }
)();