function main(msg) {
  chrome.runtime.sendMessage({
    type: 'notification',
    options: {
      title: 'Hello',
      message: msg
    }
  });
}

main('World');
