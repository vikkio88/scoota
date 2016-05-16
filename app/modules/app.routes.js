(
    function() {
        "use strict";
        var app_routes = angular.module("app.routes",
            [
                "ui.router",
                "ncy-angular-breadcrumb"
            ]
        );

        app_routes.config(
            [
                "$stateProvider",
                "$urlRouterProvider",
                "$locationProvider",
                function(
                    $stateProvider,
                    $urlRouterProvider,
                    $locationProvider
                )
                {
                    /*
                    Unfortunately laravel router makes this unable to work
                    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    });
                    */

                    //Hashbang
                    $locationProvider.hashPrefix("!");

                    $urlRouterProvider.otherwise("/radios");

                    $stateProvider
                    //radio
                        .state("radios",
                            {
                                url:"/radios",
                                templateUrl: "app/views/radios/radiosView.html",
                                controller: "RadiosController as vm",
                                ncyBreadcrumb: {
                                    label: 'Radios'
                                }
                            }
                        )
                //radio Show
                        .state("radioShow",
                            {
                                url:"/radios/:radioName/shows/:showName?podcast&position",
                                templateUrl: "app/views/radios/radioshowView.html",
                                controller: "RadioshowController as vm",
                                ncyBreadcrumb: {
                                    parent: 'radios',
                                    label: 'Show Details'
                                }
                            }
                        );
                }]
        );

    }
)();