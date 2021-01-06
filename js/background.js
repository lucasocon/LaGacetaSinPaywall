function blockRequest(details) {
  return {
    cancel: true
  };
}

function blockLoadForWall(details) {
  var loadForWallUrl = 'https://www.lagaceta.com.ar/usuarios/load_form_loginwall/';
  var mockedUrl = 'https://run.mocky.io/v3/7fb18513-d553-480c-84cc-f279532d452e';

  if(details.url.includes(loadForWallUrl)) {
    return {
      redirectUrl: mockedUrl
    };
  }
}

function startBlocking() {
  if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }

  var paywallUrls = ['https://libs.lavoz.com.ar/paywall/latest/pw.js'];
  var loadForWallUrls = ['*://www.lagaceta.com.ar/usuarios/load_form_loginwall/*'];

  try {
    chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
      urls: paywallUrls
    }, ['blocking']);

    chrome.webRequest.onBeforeRequest.addListener(blockLoadForWall, {
      urls: loadForWallUrls
    }, ['blocking']);
  } catch (e) {
    console.error(e);
  }
}

startBlocking();
