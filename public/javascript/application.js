data1 = '';
function coolFunction(o1,o2){
    console.log(o1);
    console.log(o2);
    linkMe = "#" + o2;
    $(linkMe).append("<iframe src='http://www.wunderground.com" + o1 + "'> \
                <p>Your browser does not support iFrames</p> \
              </iframe>");
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
          data.RESULTS[i].name = data.RESULTS[i].name.replace(/[^a-z0-9]/gi,'');
          var linkStr = "<a href='#' onclick='javascript:coolFunction(";
            linkStr += '"' + data.RESULTS[i].l + '","'+data.RESULTS[i].name+'"' +")'"+'>';
            linkStr += data.RESULTS[i].name + "</a><br><div id='"+data.RESULTS[i].name+"'></div>";
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
    var requestUrl = "http://autocomplete.wunderground.com/aq?query=" + query;
    timerhandle = setTimeout(function(){callAPI(requestUrl)}, 1500);
  });



})
  