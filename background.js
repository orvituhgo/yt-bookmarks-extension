chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")){
    // get video id after ?
    const queryParameters = tab.url.split("?")[1];
    // get v= parameter of search after "?"
    const urlParameters = new URLSearchParams(queryParameters);
    
    // send a message to contentScripts abou the condition above
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v") // execute search using this parameter
    })
  }
})