$(document).ready(function(){
  var timerhandle;
  var callAPI = function(url){
    $.ajax({
      dataType: "jsonp",
      jsonp: "cb",
      url: url
    }).then(function(data){
        console.log("API called");
        $("#gen-cities").empty();
        for(var i = 0; i < data.RESULTS.length; i++){
          $("<a href='http://www.wunderground.com" + data.RESULTS[i].l + "'>" + data.RESULTS[i].name + "</a><br>").appendTo("#gen-cities");
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
  