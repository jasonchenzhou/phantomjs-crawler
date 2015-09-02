function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 8000, 
        start = new Date().getTime(),
        condition = false,
       // i = 1;
        interval = setInterval(function() {
         // page.render("page"+i+".png");
           // i++;
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled

                var res = testFx();
                if(res !=false){
                    console.log(res.title);
                    console.log(res.comments);
                }
              //  console.log("~~~~~~~~~~~~~~~~~~~~~~~");

                condition = (res !== false);
                //condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 2000); 
};


var page = require('webpage').create();
//var cheerio = require('cheerio');

// Open Twitter on 'sencha' profile and, onPageLoad, do...
page.open("http://www.cbc.ca/news/politics/federal-leaders-focus-on-pledges-to-help-canadian-families-1.3197398", function (status) {
    // Check for page load success
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
      //  page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
        // Wait for 'signin-dropdown' to be visible
        waitFor(function() {
            page.viewportSize = {width: 4800,height: 80000};
            // Check in the page if a specific element is now visible
            return page.evaluate(function() {
                if(document.getElementsByClassName("vf-comment-thread").length >= 1){
                   // var res = [];
                    var cmts = [];
                    //return document.getElementsByClassName("vf-comment-html")[0].textContent;
                    var title = document.getElementsByClassName("story-title").textContent;
                    var comments = document.getElementsByClassName("vf-comment-html");
                    for(var i=0; i<comments.length; i++){
                        cmts.push(comments[i].textContent);
                    }
                    return{
                        title: title,
                        comments: cmts
                    } 
                   // return $('vf-comment-thread')[0].html();
                //    $ = cheerio.load(document.body.innerHTML);
                //    return $(".vf-comment-html")[0].textContent;
                }else
                    return false;
            });
        }, function() {
           console.log("The sign-in dialog should be visible now.");
           phantom.exit();
        });        
      //  });
    }
});