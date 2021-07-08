// import HttpError from '@/utils/HttpError';
// import { stringify } from 'query-string';

// eslint-disable-next-line import/prefer-default-export
export const fetchJson = (url, options = {}) => {
    const requestHeaders =
        options.headers ||
        new Headers({
            Accept: 'application/json',
        });
    if (
        !requestHeaders.has('Content-Type') &&
        !(options && options.body && options.body instanceof FormData)
    ) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }

    return fetch(url, { ...options, headers: requestHeaders })
        .then(response =>
            response.text().then(text => ({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text,
            }))
        )
        .then(({ status, headers, body }) => {
            let json;
            try {
                json = JSON.parse(body);
            } catch (e) {
                // not json, no big deal
            }
            return { status, headers, body, json };
        });
};

