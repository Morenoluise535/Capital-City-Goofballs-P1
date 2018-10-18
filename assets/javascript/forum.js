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

      var dataRef = firebase.database();

    replynum = 0;

    var name = "";
    var message = "";


    $(".sendbtnprim").on('click', function(event){
        event.preventDefault();
        replynum++;
    
        name = $("#name-input").val().trim();
        message = $("#message-input").val().trim();

        dataRef.ref().push({
            name: name,
            message: message
        });

    });

    dataRef.ref().on("child_added", function(childSnapshot) {
        // console.log(childSnapshot.val().name);
        // console.log(childSnapshot.val().message);
        $(".formess").append(   "<div class='conformess bard'>"+
                                "<p>"+ childSnapshot.val().name + "</p>"+
                                "<p>" + childSnapshot.val().message+ "</p>"+
                                "<div id='replymess'></div>"+
                                "<div id='replyform'></div>"+
                                "<button class='replybtn'>Reply</button>"+
                                "</div>")
    });
    $(document).on('click',".replybtn", function(event){
        event.preventDefault();
        console.log("hi");
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
    });
    
    $(document).on('click',".replysendbtn", function(event){
        event.preventDefault();
        replyname = $("#replyname-input").val().trim()
        replymessage = $("#replymessage-input").val().trim()
        
        dataRef.ref().push({
            replyname: replyname,
            replymessage: replymessage
        })

    })


    
});


// var chatreplymess = $("<div class='conformess f"+replynum+"'>"+
//                     "<p>"+ replyname + "</p>"+
//                     "<p>" + replymessage+ "</p>"+
//                     "</div>")
// $($(this).parentsUntil(".bard").parent().find("#replymess")).append(chatreplymess)
// // $($(this).parentsUntil(".bard").parent().find("#replymess")).append(chatreplymess)
// console.log($(this).parentsUntil(".bard").parent().find("#replymess"))
                    
// $("#replytbn"+replynum).on('click', function(event){
// event.preventDefault()
// // console.log($(this).parent().find("#replyform"))

// var replyform = $(  "<div class='conformess'>"+
//                     "<form>"+
//                     "<div class='form-group' style='width: 50%'>"+
//                     "<label for='replyname-input'></label>"+
//                     "<input type='name' class='form-control' id='replyname-input' placeholder='Display Name'>"+
//                     "</div>"+
//                     "<div class='form-group' style='width: 75%'>"+
//                     "<label for='replymessage-input'></label>"+
//                     "<textarea class='form-control' id='replymessage-input' rows='3' placeholder='Message'></textarea>"+
//                     "</div>"+
//                     "<button class='replysendbtn' data-renum="+replynum+">Send</button>"+
//                     "</form>"+
//                     "</div>)")

// $($(this).parent().find("#replyform")).html(replyform) 
// console.log(this)

// $(".replysendbtn").on('click', function(event){
//     event.preventDefault()
//     console.log($(this).parentsUntil(".bard").parent().find("#replymess"))
    
//     replyname = $("#replyname-input").val().trim()
//     replymessage = $("#replymessage-input").val().trim()

//             dataRef.ref().push({
//                 replyname: replyname,
//                 replymessage: replymessage
//             })

//     })
// });


