var results;
var current;
var previousBackgroundColor;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        results = [];
        current = undefined;

        // Get all the job offer comments.
        var comments = document.getElementsByClassName('athing');

        // A function to clear the current search.
        function clearSearch() {
            for (var i = 0; i < results.length; i++) {

                // Clear the background color.
                results[i].style.backgroundColor = previousBackgroundColor;

                // Clear the bolded keywords.
                results[i].innerHTML = results[i].innerHTML.replace(/\<b\>|\<\/b\>/g, '')

                // Remove the key event handlers.
                document.onkeydown = undefined;
            }
        }

        // Save the default background color once and only once.
        if (previousBackgroundColor === undefined) {
            previousBackgroundColor = comments[0].style.backgroundColor;
        } else {
            clearSearch();
        }

        // Get the search keyword list.
        var keywords = request.text.split(' ');

        for (var i = 0; i < comments.length; i++) {
            var keywordsMatched = 0;
            for (var j = 0; j < keywords.length; j++) {
                if (comments[i].innerText.toLowerCase().indexOf(keywords[j].toLowerCase()) > -1) {
                    keywordsMatched++;
                }
            }
            if (keywordsMatched === keywords.length) {
                comments[i].style.backgroundColor = "#CEE3F6";

                for (var j = 0; j < keywords.length; j++) {
                    comments[i].innerHTML = comments[i].innerHTML.replace(new RegExp(keywords[j], 'gi'), '<b>' + keywords[j] + '</b>');
                }
                
                results.push(comments[i]);
            }
        }

        function goToNext() {
            current++;
            if (current === results.length - 1) {
                current = 0;
            }
            results[current].scrollIntoView();
        }

        function goToPrevious() {
            current--;
            if (current < 0) {
                current = results.length - 1;
            }
            results[current].scrollIntoView();
        }

        // Allow navigation through the results via the arrow and Enter keys.
        document.onkeydown = function(e) {

            e = e || window.event;
        
            // If Up arrow, go to previous result.
            // Else if Down arrow, go to next result.
            if (e.keyCode == '38') {
                goToPrevious();
            } else if (e.keyCode == '40' || e.keyCode == '13') {
                goToNext();
            }
            // If Escape, clear search.
            else if (e.keyCode == '27') {
                clearSearch();
            }
        };

        // Go to the first result found.
        if (results.length === 0) {
            alert('No results.');
        } else {
            current = 0;
            goToNext();
        }
    }
);