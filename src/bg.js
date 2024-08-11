const global = new Map();
readDir('res/data').then((d) => global.set('data', d));

chrome.runtime.onMessage.addListener(({ method, args }, _, send) => {
    switch (method) {
        case 'data':
            send(global.get('data'));
            break;
        case 'greeting':
            send(args);
            break;
        case 'notification':
            const { type = 'basic', level = 'none', title, message } = args;
            chrome.notifications.create({
                type,
                iconUrl: `res/icons/${level}.svg`,
                title,
                message
            });
            break;
        default:
            send({
                error: 'unknown method'
            });
    }
});
