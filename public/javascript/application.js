data1 = '';
function coolFunction(o1,o2){
    console.log(o1);
    console.log(o2);
    linkMe = "#" + o2;
    
    if ($("#weather").is(":visible")){
      $(linkMe).empty();
    } else {
      $(linkMe).append("<iframe width='560' height='315' src='https://www.wunderground.com" + o1 + "' id='weather'> \
                <p>Your browser does not support iFrames</p> \
              </iframe>");
    }
  }
$(document).ready(function(){
  var timerhandle;
  
  var callAPI = function(url){
    $.ajax({
      dataType: "jsonp",
      jsonp: "cb",
      url: url
    }).then(function(data){
      data1 = data;
        console.log("API called");
        $("#gen-cities").empty();
        for(var i = 0; i < data.RESULTS.length; i++){
          var nonspaced = data.RESULTS[i].name.replace(/[^a-z0-9]/gi,'');
          var linkStr = "<a href='#' onclick='javascript:coolFunction(";
            linkStr += '"' + data.RESULTS[i].l + '","'+nonspaced+'"' +")'"+'>';
            linkStr += data.RESULTS[i].name + "</a><br><div id='"+nonspaced+"'></div>";
          $(linkStr).appendTo("#gen-cities");
          console.log(linkStr);
          console.log(data.RESULTS[i]);
        }
      });
    }
  $("#city").keyup(function(e){
    e.preventDefault();
    clearTimeout(timerhandle);
    var query = $("#city").val();
    var requestUrl = "https://autocomplete.wunderground.com/aq?query=" + query;
    timerhandle = setTimeout(function(){callAPI(requestUrl)}, 1500);
  });



})
  