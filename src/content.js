function send(method, args = {}) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            {
                method,
                args
            },
            (resp) => {
                if (resp && resp.error) {
                    reject(resp.error);
                } else {
                    resolve(resp);
                }
            }
        );
    });
}

send('data')
    .then(console.log.bind(console))
    .catch((e) => send('notification', { title: 'Error', message: e }));
