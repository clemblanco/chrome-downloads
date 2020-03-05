var updateBadge = function (number) {
    if (number > 0) {
        chrome.browserAction.setBadgeBackgroundColor({ color: [110, 110, 110, 255] });
        chrome.browserAction.setBadgeText({ text: `${number}` });
    } else {
        chrome.browserAction.setBadgeBackgroundColor({ color: [110, 110, 110, 0] });
        chrome.browserAction.setBadgeText({ text: "" });
    }
};

var getNumberActiveDownloads = function (callback) {
    callback = callback || function() {};

    chrome.downloads.search({ state: "in_progress", limit: 0 }, function (items) {
        callback(items.length);
    });
};

(function init() {
    getNumberActiveDownloads(function (number) {
        updateBadge(number);
    });

    chrome.browserAction.onClicked.addListener(function () {
        chrome.tabs.create({ "url": "chrome://downloads/" });
    });

    chrome.downloads.onChanged.addListener(function () {
        getNumberActiveDownloads(function (number) {
            updateBadge(number);
        });
    });
})();
