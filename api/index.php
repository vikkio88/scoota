<?php
require_once("../vendor/autoload.php");

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$api = new \Slim\App($c);

$api->get('/ping', function ($request, $response, $args) {
    $jsonResp = json_encode(
        [
            "status" => "service up",
            "message" => "in a bottle",
            "config" => \App\Lib\Helpers\Config::get("config1.stuff")
        ]
    );
    return \App\Lib\Helpers\Responder::getJsonResponse($jsonResp, $response);
});

$api->get('/radios', function ($request, $response, $args) {
    $json = json_encode(\App\Lib\Helpers\Config::get('feeds.radios'));
    return \App\Lib\Helpers\Responder::getJsonResponse($json, $response);
});


$api->get('/radios/{radioName}/shows/{showName}', function ($request, $response, $args) {
    $feed = new \App\Lib\Helpers\RadioFeedGateway;
    return \App\Lib\Helpers\Responder::getJsonResponse(
        $feed->getJsonFeed($args),
        $response
    );

});

$api->run();