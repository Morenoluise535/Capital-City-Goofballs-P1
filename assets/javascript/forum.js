$( document ).ready(function() {

var mainmessagearr = []
console.log(mainmessagearr)



$(".sendbtnprim").on('click', function(event){
    event.preventDefault()

    var chatmessage = $("<div class='conformess'>"+
                        "<p>"+ name + "</p>"+
                        "<p>" + message+ "</p>"+
                        "<div class='replymessage'></div>"+
                        "<button class='replybtn'>Reply</button>"+
                        "<div class='replyform'></div>"+
                        "</div>")

    var name = $("#name-input").val().trim();
    var message = $("#message-input").val().trim();


    $(".formess").append(chatmessage)
    mainmessagearr.push(chatmessage)

    console.log(name)
    console.log(message)

    $(".replybtn").on('click', function(){


        console.log("hi")
    })

})


});