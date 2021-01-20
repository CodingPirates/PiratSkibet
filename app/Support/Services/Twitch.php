<?php

namespace App\Support\Services;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Collection;
use Psr\Http\Message\ResponseInterface;

class Twitch
{
    public const CACHE_KEY = 'twitch_access_token';

    private $clientId;
    private $client;

    public function __construct()
    {
        $this->clientId = config('services.twitch.client_id');
        $accessToken    = $this->getAccessToken();

        $this->client = new Client([
            'base_uri' => 'https://api.twitch.tv/helix/',
            'headers'  => [
                'Authorization' => "Bearer {$accessToken}",
                'Client-ID'     => $this->clientId,
            ],
        ]);
    }

    /////////////////////////
    /// Public Methods
    /////////////////////////

    /**
     * Gets current streams for the provided channel name
     *
     * @param string $channelName
     *
     * @return Collection
     */
    public function getCurrentStreams(string $channelName)
    {
        return $this->makeRequest(
            'GET',
            'streams',
            ['query' => ['user_login' => $channelName]]
        );
    }

    /**
     * @param int $userId
     *
     * @return Collection
     */
    public function getLatestVideos(int $userId, int $limit = 3)
    {
        $limit = max(1, $limit);

        return $this->makeRequest(
            'GET',
            'videos',
            ['query' => [
                'user_id' => $userId,
                'first'   => $limit,
            ]]
        );
    }

    /////////////////////////
    /// Access Token
    /////////////////////////

    /**
     * Gets a new access token, or a cached one if valid
     *
     * @return string A valid Access Token
     * @throws Exception
     */
    private function getAccessToken(): string
    {
        $token = cache(static::CACHE_KEY, null);

        if (!$token || !$this->tokenIsValid($token)) {
            $token = $this->fetchNewAccessToken();
        }

        return $token ?? '';
    }

    /**
     * Checks if token is valid, for at least another 10 minutes
     *
     * @param string $token
     * @return bool
     */
    private function tokenIsValid(string $token): bool
    {
        if (blank($token)) {
            return false;
        }

        try {
            $body = $this->getSuccessfulJsonBody((new Client)->request(
                'GET',
                'https://id.twitch.tv/oauth2/validate',
                ['headers' => ['Authorization' => "OAuth {$token}"]]
            ));

            if (!is_object($body) || !isset($body->expires_in, $body->client_id)) {
                return false;
            }

            // Token is valid at least another 10 minutes
            if ($body->client_id === $this->clientId && $body->expires_in > 600) {
                return true;
            }

        } catch (Exception $e) {
            logger()->error($e->getMessage());
        }

        return false;
    }

    /**
     * Fetches and caches new access token
     *
     * @return string|null
     */
    private function fetchNewAccessToken(): ?string
    {
        try {
            $body = $this->getSuccessfulJsonBody((new Client)->request(
                'POST',
                'https://id.twitch.tv/oauth2/token',
                [
                    'json' => [
                        'grant_type'    => 'client_credentials',
                        'client_id'     => $this->clientId,
                        'client_secret' => config('services.twitch.client_secret'),
                    ],
                ]
            ));

            if (is_object($body) && isset($body->access_token, $body->expires_in)) {
                cache([static::CACHE_KEY => $body->access_token], $body->expires_in);

                return $body->access_token;
            }

        } catch (Exception $e) {
            logger()->error($e->getMessage());
        }

        return null;
    }

    /////////////////////////
    /// Helpers
    /////////////////////////

    /**
     * If a Response with status 200 is provided, returns a body Object. Otherwise null.
     *
     * @param ResponseInterface $response
     *
     * @return object|null
     */
    protected function getSuccessfulJsonBody(ResponseInterface $response): ?object
    {
        $status_code = $response->getStatusCode();

        if ($status_code === 200) {
            $content = $response->getBody()->getContents();

            if (is_string($content)) {
                $data = json_decode($content);

                if ($data && is_object($data)) {
                    return $data;
                }
            }
        }

        return null;
    }

    /**
     * Makes a request with provided client arguments
     *
     * @param mixed ...$args
     * @return Collection
     */
    protected function makeRequest(...$args)
    {
        try {

            $body = $this->getSuccessfulJsonBody($this->client->request(...$args));

            if ($body !== null && isset($body->data) && is_array($body->data) && !empty($body->data)) {
                return collect($body->data);
            }

        } catch (Exception $e) {
            logger()->error($e->getMessage());
        }

        return collect();
    }
}
