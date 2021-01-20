<?php

namespace App\Support\Services;


use Exception;
use GuzzleHttp\Client;

class ReCaptcha
{
    public  $config = 'services.google.recaptcha.';
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => config($this->config . 'base_uri'),
        ]);
    }

    /**
     * Send a verify request to google, and return the response body if successfully verified
     *
     * @param string $token
     * @param string $action
     * @return array|bool|mixed
     */
    public function verify(string $token, string $action)
    {
        $body = [
            'form_params' => [
                'response' => $token,
                'remoteip' => $_SERVER['REMOTE_ADDR'],
                'secret'   => config($this->config . 'secret'),
            ],
        ];

        try {

            $response = $this->client->post('siteverify', $body);
            $body     = json_decode($response->getBody()->getContents());

        } catch (Exception $e) {
            return false;
        }

        if ($response->getStatusCode() !== 200
            || $body->success !== true
            || $body->action !== $action) {
            return false;
        }

        return $body;
    }

}
