
function clearCard(){

  var card = $(".card")
  card.remove();
}

function clearInp() {

  var inp = $(".inp").val(" ");
}

function delCard() {

  var me = $(this);
  var cardId = me.siblings(".id");
  var id = cardId.text();

  $.ajax({

    url: "http://157.230.17.132:3006/todos/"+id,
    method: "DELETE",
    data: {},
    success: function(inData){

      readRes();
    },
    error: function(){}
  });
}

function writeRes(){

  var inp = $(".inp").val();

  $.ajax({

    url: "http://157.230.17.132:3006/todos",
    method: "POST",
    data: {
      text: inp
    },
    success: function(inData){

      readRes()
      clearInp()
    },
    error: function(){}
  });
}

function readRes(){

  clearCard();

  $.ajax({

    url: "http://157.230.17.132:3006/todos",
    method: "GET",
    data: {},
    success: function(inData){

      var wrapper = $(".wrapper");

      var template = $("#card-template").html();
      var compiled = Handlebars.compile(template);

      for (var i = 0; i < inData.length; i++) {
        var data = inData[i];
        var id = data.id;
        var text = data.text;

        var outData = {

          id: id,
          text: text
        }
        var divCard = compiled(outData);
        wrapper.append(divCard);
      }
    },
    error: function(){}
  });
}

function init(){

  readRes();

  $(document).on("click",".x",delCard);

  var btn = $(".btn");
  btn.click(writeRes);
}

$(document).ready(init);
