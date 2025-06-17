import Mixpanel from 'mixpanel';

const mixpanel = Mixpanel.init('YOUR_MIXPANEL_TOKEN');

export function trackServerEvent(eventName: string, properties: any) {
    if (process.env.NODE_ENV === 'development') return;

    mixpanel.track(eventName, properties);
}