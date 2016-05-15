(
    function(){
      "use strict";
        var app = angular.module("Scoota",
            [
                "app.constant",
                "app.routes",
                "app.mediaplayer",
                "app.common",
                "app.directives",
                "ngSanitize"
            ]
        );

        //UcFirst
        app.filter('capitalize',
            function(){
                return function(input){
                    return (!!input) ? input.charAt(0).toUpperCase()+input.substr(1).toLowerCase() : "";
                }
            }
        );
    }
)();