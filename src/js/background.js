chrome.runtime.onMessage.addListener((data) => {
  if (data.type === 'notification') {
    data.options.type = 'basic';
    data.options.iconUrl = 'resources/icon.png';

    chrome.notifications.create(data.options);
  }
});
