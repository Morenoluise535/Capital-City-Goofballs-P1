$(document).ready(function () {

    //Declares and initializes variables needed later
    var caloriesAmount = 0;
    var proteinAmount = 0;
    var sugarAmount = 0;
    var satFatsAmount = 0;
    var monoFatsAmount = 0;
    var polyFatsAmount = 0;
    var sodiumAmount = 0;
    var caloriesPercent = 0;
    var proteinPercent = 0;
    var sugarPercent = 0;
    var satFatsPercent = 0;
    var monoFatsPercent = 0;
    var polyFatsPercent = 0;
    var sodiumPercent = 0;

    $(".table").hide()    

    $("#submitButton").on("click", function (event) { 
        event.preventDefault();
       
        $("#mainComponent").empty();
        
        var queryInputRaw = "";
        
        queryInputRaw = $("#ingredients").val().trim();
        queryInput = queryInputRaw.replace(/ /g,"+")

        var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=bb96e2ef&app_key=3a2f56dfc5a55247b0c4c6b9706a1e99&ingr=" + queryInput;

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {

            var ingredient = queryInputRaw;

            // If statements validate whether specific nutritient stats exists, and resonse accordingly 
            if (response.totalNutrients.ENERC_KCAL){
            var calories = response.totalNutrients.ENERC_KCAL.quantity;
            }
            else {
                calories = 0;
            }

            if (response.totalNutrients.PROCNT) {
                var protein = response.totalNutrients.PROCNT.quantity;
            }
            else {
                protein = 0;
            }

            if (response.totalNutrients.SUGAR) {
                var sugar = response.totalNutrients.SUGAR.quantity;
            }
            else {
                sugar = 0;
            }

            if (response.totalNutrients.FASAT) {
                var satFats = response.totalNutrients.FASAT.quantity;
            }
            else {
                satFats = 0;
            }
            
            if (response.totalNutrients.FAMS) {
                var monoFats = response.totalNutrients.FAMS.quantity;
            }
            else {
                monoFats = 0;
            }

            if (response.totalNutrients.FAPU) {
                var polyFats = response.totalNutrients.FAPU.quantity;
            }
            else {
                polyFats = 0;
            }
            
            if (response.totalNutrients.NA) {
                var sodium = response.totalNutrients.NA.quantity;
            }
            else {
                sodium = 0;
            }
            

            //Creates table columns for each nutrition stat as well as fixes number to two decimal places
            var ingredientDiv = $("<td>").addClass("ingredient trash").html(ingredient);
            var caloriesDiv = $("<td>").addClass("calories").html(calories.toFixed(2));
            var proteinDiv = $("<td>").addClass("protein").html(protein.toFixed(2) + "g");
            var sugarDiv = $("<td>").addClass("sugar").html(sugar.toFixed(2) + "g")
            var satFatsDiv = $("<td>").addClass("satFats").html(satFats.toFixed(2) + "g")
            var monoFatsDiv = $("<td>").addClass("monoFats").html(monoFats.toFixed(2) + "g")
            var polyFatsDiv = $("<td>").addClass("polyFats").html(polyFats.toFixed(2) + "g")
            var sodiumDiv = $("<td>").addClass("sodium").html(sodium.toFixed(2) + "mg")

            //Creates table row and appends all columns, creates tablebody and prepends table row
            var tableRow = $("<tr>").append(ingredientDiv).append(caloriesDiv).append(proteinDiv).append(sugarDiv).append(satFatsDiv).append(monoFatsDiv).append(polyFatsDiv).append(sodiumDiv);
            $("tbody").prepend(tableRow)

            //Uses variables at beginning of js page to track total amount of nutritional specs for every food entered
            caloriesAmount = caloriesAmount + calories;
            proteinAmount = proteinAmount + protein;
            sugarAmount = sugarAmount + sugar;
            satFatsAmount = satFatsAmount + satFats;
            monoFatsAmount = monoFatsAmount + monoFats;
            polyFatsAmount = polyFatsAmount + polyFats;
            sodiumAmount = sodiumAmount + sodium;

            //Grabs specific classes to pass info to as well as limiting number to two decimal places
            $(".calorieAmount").html(caloriesAmount.toFixed(2))
            $(".proteinAmount").html(proteinAmount.toFixed(2) + "g")
            $(".sugarAmount").html(sugarAmount.toFixed(2) + "g")
            $(".satFatsAmount").html(satFatsAmount.toFixed(2) + "g")
            $(".monoFatsAmount").html(monoFatsAmount.toFixed(2) + "g")
            $(".polyFatsAmount").html(polyFatsAmount.toFixed(2) + "g")
            $(".sodiumAmount").html(sodiumAmount.toFixed(2) + "g")

            //Creates and initializes variables to contain nutritional Daily percentage stats
            var caloriesDaily = response.totalDaily.ENERC_KCAL.quantity;
            var proteinDaily = response.totalDaily.PROCNT.quantity;
            var sugarDaily = (sugar / 30) * 100;
            var satFatsDaily = (satFats / 10) * 100;
            var monoFatsDaily = (monoFats / 17) * 100;
            var polyFatsDaily = (polyFats / 8) * 100;
            var sodiumDaily = response.totalDaily.NA.quantity;

            //Uses more variables from top of JS page to count the percentage of daily nutrition for each entry
            caloriesPercent = caloriesPercent + caloriesDaily;
            proteinPercent = proteinPercent + proteinDaily;
            sugarPercent = sugarPercent + sugarDaily;
            satFatsPercent = satFatsPercent + satFatsDaily;
            monoFatsPercent = monoFatsPercent + monoFatsDaily;
            polyFatsPercent = polyFatsPercent + polyFatsDaily;
            sodiumPercent = sodiumPercent + sodiumDaily;

            //Grabs corresponding classes and passes the stat info and limits the number to two decimals
            $(".caloriePercent").html(caloriesPercent.toFixed(2) + "%")
            $(".proteinPercent").html(proteinPercent.toFixed(2) + "%")
            $(".sugarPercent").html(sugarPercent.toFixed(2) + "%")
            $(".satFatsPercent").html(satFatsPercent.toFixed(2) + "%")
            $(".monoFatsPercent").html(monoFatsPercent.toFixed(2) + "%")
            $(".polyFatsPercent").html(polyFatsPercent.toFixed(2) + "%")
            $(".sodiumPercent").html(sodiumPercent.toFixed(2) + "%")

            $(".table").show();



        })    
  
    })

    $("#resetButton").on("click", function() {
        window.location.reload();
    })
   
    $("input").change(function(){

        var test = $("input").val()
        console.log(test)

        $("input").on("click", function (){
            if (test !== ""){
                $("input").val("")
            }
            
        })
    })


})
