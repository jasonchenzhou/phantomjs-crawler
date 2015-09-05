function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 8000, 
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                var res = testFx();
                if(res !=false){
                    console.log("title: " + res.title);
                    console.log(res.comments);
                }
                condition = (res !== false);
            } else {
                if(!condition) {
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 2000); 
};




var page = require('webpage').create();


page.open("http://www.thestar.com/news/federal-election.html", function(status){
    console.log("wow");
    if(status !== "success"){
        console.log("Unable to access network");
    }else{
        var res = page.evaluate(function(){        //should return here!!!!!
            var links = [];
            var tem = document.getElementsByClassName("headline");
            var tem2 = document.getElementsByClassName("thumbnail");
            //console.log(document.getElementsByClassName("pinnableHref")[0].href;
            for(var i=0; i<tem.length; i++){
               // console.log(tem[i].getElementsByTagName("a")[0].href);
                links.push(tem[i].getElementsByTagName("a")[0].href);
            }   
            for(var i=0; i<tem2.length; i++){
               // console.log(tem[i].getElementsByTagName("a")[0].href);
                //links.push(tem2[i].getElementsByTagName("a")[0].href);
                links.push(tem2[i].href);
            }  
          
            return links;  
           // return tem;
        });
        
        for(var i=0; i<res.length; i++){
            console.log(res[i]);
        }


       // parseOnePage(res[3]);
/*
        var busy = false;
        var i = 0;
        var process = setInterval(function(){
            if(!busy){
                busy = true;
               // console.log("~~~~~~~~~~~~~~~~~~~~");
               // console.log(res[i]);
                parseOnePage(res[i]);
                if(++i === res.length) clearInterval(process);
                busy = false;
            }
        }, 5000);   */
    }
});

/*
function parseOnePage(url){
    console.log("start parse " + url);
    page.open(url, function (status) {
    // Check for page load success
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
console.log("here!!");
        waitFor(function() {
            page.viewportSize = {width: 4800,height: 80000};
            return page.evaluate(function() {
                if(document.getElementsByClassName("show_comments_link").length >= 1){
                  //  var button = document.getElementsByClassName("show_comments_link");
                  //  button.click();
console.log("11");
                    var btn = document.getElementsByClassName("show_comments_link")[0].getBoundingClientRect();
                    return btn;
                  //  page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);

          

                   // var cmt = document.getElementsByClassName("vf-comment-html")[0];
                   // return cmt;

/*
                    var cmts = [];
                    var title = document.getElementsByClassName("article-headline")[0].h1.textContent;
                    var comments = document.getElementsByClassName("vf-comment-html");
                    for(var i=0; i<comments.length; i++){
                        cmts.push(comments[i].textContent);
                    }
                    return{
                        title: title,
                        comments: cmts
                    } 
 
                }else
                    return false;  
            });
        }, function(rect) {           //get things here!!!!
           // console.log()
           console.log("finishe parse " + url);

        });        
    }
    });
}*/
