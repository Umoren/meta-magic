import { configureAutoTrack } from 'aws-amplify/analytics';

export function setupAnalytics() {
    configureAutoTrack({
        enable: true,
        type: 'pageView',
        options: {
            appType: 'singlePage',
            urlProvider: () => {
                return window.location.pathname;
            }
        }
    });
}