$( document ).ready(function() {
    // console.log(document)
    $('#mart').remove()
    var config = {
        apiKey: "AIzaSyA_PG1mk0sWlcIOU1E5BAA0EVDHEdqvlmI",
        authDomain: "ccgproject1-d5fba.firebaseapp.com",
        databaseURL: "https://ccgproject1-d5fba.firebaseio.com",
        projectId: "ccgproject1-d5fba",
        storageBucket: "ccgproject1-d5fba.appspot.com",
        messagingSenderId: "747652704036"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

    var replynum = 0;
    var name = "";
    var message = "";
   
    var form = document.getElementById('formone')
    var fart = form.outerHTML

    
      $(".sendbtnprim").on('click', function(event){
        event.preventDefault();
        replynum++;
    
        name = $("#name-input").val().trim();
        message = $("#message-input").val().trim();
        document.getElementById('mart').remove()



        $(".formess").append(   "<div class='conformess bard'>"+
                                "<p>"+ name + "</p>"+
                                "<p>" + message+ "</p>"+
                                "<div id='replymess'></div>"+
                                "<div id='replyform'></div>"+
                                "<button class='replybtn' data-renum='"+replynum+"'>Reply</button>"+
                                "</div>")
          $('#mart').remove()

        var form = document.getElementById('formone')
        var domelement = form.outerHTML

        database.ref().set({
            domelement: domelement,
        })
    });
    $(document).on('click',".replybtn", function(event){
        event.preventDefault();
        $('#mart').remove()

        ocument.getElementById('mart').remove()

        // console.log("hi");
        var replyform = $(  "<div class='conformess' id='mart'>"+
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
        // console.log(this)
        replyname = $("#replyname-input").val().trim();
        replymessage = $("#replymessage-input").val().trim();

        replybob = "<div class='conformess bard'>"+
                    "<p>"+replyname + "</p>"+
                    "<p>" +replymessage+ "</p>"+
                    "</div>"
        

        $($(this).parentsUntil(".bard").parent().find("#replymess")).append(replybob);
        $('#mart').remove()
        ocument.getElementById('mart').remove()
        var form = document.getElementById('formone');
        var domelement = form.outerHTML

        $('#mart').remove() 
        document.getElementById('mart').remove()
        
        database.ref().set({
            domelement: domelement,
        })
        
        $('#mart').remove()
        document.getElementById('mart').remove()
        
    })

    database.ref().on("value", function(snapshot){
        $("#formone").replaceWith($(snapshot.val().domelement))
        $('#mart').remove()

        document.getElementById('mart').remove()
    })
    document.getElementById('mart').remove()
    $('#mart').remove()
 

    })
    $('#mart').remove()

});
