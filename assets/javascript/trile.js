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
      var messagekey = firebase.database().ref(replynum)
      console.log(messagekey)

    var replynum = 0;
    var name = "";
    var message = "";
    var bigguess= "";

    $(".sendbtnprim").on('click', function(event){
        event.preventDefault();
        replynum++;
    
        name = $("#name-input").val().trim();
        message = $("#message-input").val().trim();

        bigguess =  "<div class='conformess bard'>"+
                    "<p>"+name+ "</p>"+
                    "<p>"+message+ "</p>"+
                    "<div id='replymess'></div>"+
                    "<div id='replyform'></div>"+
                    "<button class='replybtn' data-renum='"+replynum+"'>Reply</button>"+
                    "</div>"

                    
                    replyname = $("#replyname-input").val().trim()
                    replymessage = $("#replymessage-input").val().trim()
                    
                    secondguess = "<div class='conformess bard'>"+
                    "<p>"+ replyname + "</p>"+
                    "<p>" + replymessage+ "</p>"+
                    "</div>"
                    
                    $(".replysendbtn").on('click', function(event){
                        event.preventDefault();
                        console.log(this)
                        // $($(this).parentsUntil(".bard").parent().find("#replymess")).append(secondguess)
                    })
                    
                    // dataRef.ref().push({
                    //     bigguess: bigguess,
                    // });
    });

    dataRef.ref().on("child_added", function(childSnapshot) {
        // console.log(childSnapshot.val().name);
        // console.log(childSnapshot.val().message);
        $(".formess").append(childSnapshot.val().bigguess)
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

    
    $(".replysendbtn").on('click', function(event){
        event.preventDefault();
        console.log(this)
        // $($(this).parentsUntil(".bard").parent().find("#replymess")).append(secondguess)
        replyname = $("#replyname-input").val().trim()
        replymessage = $("#replymessage-input").val().trim()
        
        secondguess = "<div class='conformess bard'>"+
                        "<p>"+ replyname + "</p>"+
                        "<p>" + replymessage+ "</p>"+
                        "</div>"

        
                        
        dataRef.ref().push({
        bigguess: bigguess,
        });
    })
    
    // $(document).on('click',".replysendbtn", function(event){
    //     event.preventDefault();
    //     console.log(this)
    //     replyname = $("#replyname-input").val().trim()
    //     replymessage = $("#replymessage-input").val().trim()
        
    //     dataRef.ref().push({
    //         replyname: replyname,
    //         replymessage: replymessage
    //     })

    // })

    // dataRef.ref(replynum).on("child_added", function(childSnapshot) {


    //     $().append("<div class='conformess bard'>"+
    //     "<p>"+ childSnapshot.val().replyname + "</p>"+
    //     "<p>" + childSnapshot.val().replymessage+ "</p>"+
    //     "</div>")
    // })

    
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
