<?php


namespace App\Lib\Helpers;


/**
 * Class RadioFeedGateway
 * @package App\Lib\Helpers
 */
class RadioFeedGateway
{
    /**
     * @var int
     */
    protected $maxPodcast = 15;

    /**
     * @param $args
     * @return null|string
     */
    private function checkArgsGenerateUrl($args)
    {
        $feeds = Config::get('feeds.radios');
        $default = [
            'radioName' => 'radio2',
            'showName' => '610'
        ];
        $selection = [];
        foreach ($default as $key => $def) {
            if (isset($args[$key]) && !empty($args[$key])) {
                $selection[$key] = $args[$key];
            }
        }

        $radioPosition = array_search($selection['radioName'], array_column($feeds, 'name'));
        $showPosition = null;
        if ($radioPosition !== false) {
            $showPosition = array_search(
                $selection['showName'],
                array_column($feeds[$radioPosition]['shows'], 'name')
            );
        }
        $url = null;
        if ($showPosition !== false) {
            $showCode = $feeds[$radioPosition]['shows'][$showPosition]['code'];
            $url = $feeds[$radioPosition]['baseurl'] . $showCode;
        }
        return $url;
    }

    /**
     * @param $url
     * @return string
     */
    private function getRemoteFeedXml($url)
    {
        return file_get_contents($url);
    }

    /**
     * @param $xml
     * @return string
     */
    private function parseXmlToJson($xml)
    {
        $xml = simplexml_load_string($xml);
        return json_encode(new \SimpleXMLElement($xml->asXML(), LIBXML_NOCDATA));
    }

    /**
     * @param $args
     * @return string
     */
    public function getJsonFeed($args)
    {
        $url = $this->checkArgsGenerateUrl($args);
        $feedXml = $this->getRemoteFeedXml($url);
        return $this->parseXmlToJson($feedXml);
    }

}