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

        //SecondsToDate
        app.filter('secondsToDateTime', [function() {
            return function(seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        }])
    }
)();