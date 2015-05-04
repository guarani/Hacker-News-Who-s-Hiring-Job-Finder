/*function resetDefaultSuggestion() {
    chrome.omnibox.setDefaultSuggestion({
        description: "hn: Search Hacker News' Who's Hiring" 
    }); 
}
resetDefaultSuggestion();
*/


chrome.omnibox.onInputEntered.addListener(
    function(text) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {text: text});
        });
    }
);


//chrome.omnibox.onInputEntered.addListener(function(text) {
/*
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        alert(request.text);
        // Chrome 20+
    });
*/
    //console.log('sendMessage');
    //chrome.runtime.sendMessage({'text': 'apple pies'});

    /*
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
            alert('second ' + response);
        });
    });
    */
//});
