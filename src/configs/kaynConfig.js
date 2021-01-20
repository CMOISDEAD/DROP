const { Kayn, REGIONS } = require('kayn')

const config = [
    {
        region: REGIONS.NORTH_AMERICA,
        apiURLPrefix: 'https://%s.api.riotgames.com',
        locale: 'en_US',
        debugOptions: {
            isEnabled: true,
            showKey: false,
        },
        requestOptions: {
            shouldRetry: true,
            numberOfRetriesBeforeAbort: 3,
            delayBeforeRetry: 1000,
            burst: false,
            shouldExitOn403: false,
        },
        cacheOptions: {
            cache: null,
            timeToLives: {
                useDefault: false,
                byGroup: {},
                byMethod: {},
            },
        },
    }
]

module.exports = config[0]