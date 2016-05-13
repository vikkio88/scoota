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
    $body = $response->getBody();
    $body->write($jsonResp);

    return $response->withHeader(
        'Content-Type',
        'application/json'
    )->withBody($body);
});

$api->run();