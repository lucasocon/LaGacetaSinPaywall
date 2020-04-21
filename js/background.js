function blockRequest(details) {
  console.log("Blocked: ", details.url);
  return {
    cancel: true
  };
}

function startBlocking() {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }

  var urls = ['https://libs.lavoz.com.ar/paywall/latest/pw.js'];

  try{
    chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
      urls: urls
    }, ['blocking']);
  } catch (e) {
    console.error(e);
  }
}

startBlocking();
