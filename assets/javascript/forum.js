$( document ).ready(function() {

    var config = {
        apiKey: "AIzaSyA_PG1mk0sWlcIOU1E5BAA0EVDHEdqvlmI",
        authDomain: "ccgproject1-d5fba.firebaseapp.com",
        databaseURL: "https://ccgproject1-d5fba.firebaseio.com",
        projectId: "ccgproject1-d5fba",
        storageBucket: "ccgproject1-d5fba.appspot.com",
        messagingSenderId: "747652704036"
      };
      firebase.initializeApp(config);



var mainmessagearr = []
console.log(mainmessagearr)
replynum = 0


$(".sendbtnprim").on('click', function(event){
    event.preventDefault()
    replynum++
   
    var name = $("#name-input").val().trim();
    var message = $("#message-input").val().trim();
    
    var chatmessage = $("<div class='conformess bard'>"+
                        "<p>"+ name + "</p>"+
                        "<p>" + message+ "</p>"+
                        "<div id='replymess' data-renum="+replynum+"></div>"+
                        "<div id='replyform' id='replyfo"+replynum+"' data-renum="+replynum+"></div>"+
                        "<button id='replytbn" + replynum +"'data-renum="+replynum+">Reply</button>"+
                        "</div>")
    
    $(".formess").append(chatmessage)
    mainmessagearr.push(chatmessage)


    $("#replytbn"+replynum).on('click', function(event){
        event.preventDefault()
        // console.log($(this).parent().find("#replyform"))

        var replyform = $(  "<div class='conformess'>"+
                            "<form>"+
                            "<div class='form-group' style='width: 50%'>"+
                            "<label for='replyname-input'></label>"+
                            "<input type='name' class='form-control' id='replyname-input' placeholder='Display Name'>"+
                            "</div>"+
                            "<div class='form-group' style='width: 75%'>"+
                            "<label for='replymessage-input'></label>"+
                            "<textarea class='form-control' id='replymessage-input' rows='3' placeholder='Message'></textarea>"+
                            "</div>"+
                            "<button class='replysendbtn' data-renum="+replynum+">Send</button>"+
                            "</form>"+
                            "</div>)")

        $($(this).parent().find("#replyform")).html(replyform) 
        // console.log(this)

        $(".replysendbtn").on('click', function(event){
            event.preventDefault()
            replyname = $("#replyname-input").val().trim()
            replymessage = $("#replymessage-input").val().trim()
            
            var chatreplymess = $("<div class='conformess f"+replynum+"'>"+
                                "<p>"+ replyname + "</p>"+
                                "<p>" + replymessage+ "</p>"+
                                "</div>")
            $($(this).parentsUntil(".bard").parent().find("#replymess")).append(chatreplymess)
            // $($(this).parentsUntil(".bard").parent().find("#replymess")).append(chatreplymess)
            console.log($(this).parentsUntil(".bard").parent().find("#replymess"))
        })
    })

})


});


