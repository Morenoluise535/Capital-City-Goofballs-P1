$(document).ready(function () {

    var ingredients;

    $("#submitButton").on("click", function () {
        event.preventDefault();

        var queryInput= "";

        // Grabs value from form in DOM
        ingredientInputs = $("#ingredients").val();

        // Splits the string into an array to remove any commas
        ingredientsArray = ingredientInputs.split(",")
        
        // Trims any spaces through the array
        for (var i = 0; i < ingredientsArray.length; i++) {
            ingredientsArray[i] = ingredientsArray[i].trim();
        }
        
        // Concatenates the array back to a string with '+' between words
        for (var i = 0; i < ingredientsArray.length; i++) {
            queryInput += ingredientsArray[i] + "+";
        }

        // replace any remaining spaces with +
        queryInput = queryInput.replace(" ","+")

        // removes the last + after the last word
        queryInput = queryInput.substr(0, queryInput.length-1)

        var queryURL = "https://api.edamam.com/search?q="+queryInput+"&app_id=6b0324d3&app_key=3a606f433e9b0ab6ab0dcfb1607380ba";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .then(function(response) {

            $(".infoRow").html("");

            for (let i = 0; i < response.hits.length; i++) {

          
                // Grabs and preps all the different info from API
                var recipeName = response.hits[i].recipe.label
                var image = $("<img class='foodImage align-self-center mr-3' src=" + response.hits[i].recipe.image + " alt='Generic placeholder'> </img>")
                var servings = $("<p class='servings'>Number of Servings: " + response.hits[i].recipe.yield + "</p>");
                var ingredients = $("<p class='ingredients'>Number of ingredients: " + response.hits[i].recipe.ingredients.length + "</p>");
                var link = $("<a href=" + response.hits[i].recipe.url + " target='_blank'>Get Cooking!</a>")     
                var healthLabelsArrray = response.hits[i].recipe.healthLabels.join(", ")
                var dietLabelsArrray = response.hits[i].recipe.dietLabels.join(", ")
                var dietaryLabels = "";

                // If statement adds dietLabelsArrray to healthLabelsArrray if it has elements, otherwise it just uses healthLabelsArrray
                if (dietLabelsArrray.length > 0) {
                    dietaryLabels = healthLabelsArrray + ", " + dietLabelsArrray;
                }
                else{
                    dietaryLabels = healthLabelsArrray
                }
                
                // Stores the above variables to parent divs
                var recipeTitle = $("<h5>").addClass("recipeName mt-0").html(recipeName)
                var mediaBody = $("<div>").addClass("media-body").append(recipeTitle).append(servings).append(labels).append(ingredients).append(link);               
                var media = $("<div>").addClass("media").append(image).append(mediaBody);
                var labels = $("<p class='label'>Dietary Labels: " + dietaryLabels + "</p>");
                var mediaWrap = $("<div>").addClass("mediaWrap col-lg-6").append(media);
    
                // Yield equates to serving size needed to diving totalDaily and totalNutrient values by individual serving size
                var yield = response.hits[i].recipe.yield

                // Calculates the amount of nutrients, divides by yield and rounds them
                var calAmount = response.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity / yield;
                var proteinAmount = response.hits[i].recipe.totalNutrients.PROCNT.quantity / yield;
                var sugarAmountRaw = response.hits[i].recipe.totalNutrients.SUGAR.quantity / yield;
                var fatsAmount = response.hits[i].recipe.totalNutrients.FAT.quantity / yield;
                var sodiumAmount = response.hits[i].recipe.totalNutrients.NA.quantity / yield;

                // Rounds the amountes to a whole number
                calAmount = Math.round(calAmount) + "g";
                proteinAmount = Math.round(proteinAmount) + "g";
                sugarAmount = Math.round(sugarAmountRaw) + "g";
                fatsAmount = Math.round(fatsAmount) + "g";
                sodiumAmount = Math.round(sodiumAmount) + "g";
                
                // Creates various divs to hold information
                var amountHeader = $("<th>").addClass("amountHeader").html("Amount")
                var calGramDiv = $("<td>").addClass("calAmount").html(calAmount)
                var proteinGramDiv = $("<td>").addClass("proteinAmount").html(proteinAmount)
                var sugarGramDiv = $("<td>").addClass("calAmount").html(sugarAmount)
                var fatsGramDiv = $("<td>").addClass("sugarAmount").html(fatsAmount)
                var sodiumGramDiv = $("<td>").addClass("sodiumAmount").html(sodiumAmount)

                // Creates table row and appends all columns
                var amounts = $("<tr>").addClass("amounts").append(amountHeader).append(calGramDiv).append(proteinGramDiv).append(sugarGramDiv).append(fatsGramDiv).append(sodiumGramDiv)

                // Calculates the daily percentage of nutrients, divides by yield, and rounds them
                var calPercent = response.hits[i].recipe.totalDaily.ENERC_KCAL.quantity / yield;
                var proteinPercent = response.hits[i].recipe.totalDaily.PROCNT.quantity / yield;
                var sugarPercent =  (sugarAmountRaw / 30) * 100;
                var fatsPercent = response.hits[i].recipe.totalDaily.FAT.quantity / yield;
                var sodiumPercent = response.hits[i].recipe.totalDaily.NA.quantity / yield;

                console.log(sugarPercent)

                // Rounds the percentages to a whole number
                calPercent = Math.round(calPercent)
                proteinPercent = Math.round(proteinPercent)
                sugarPercent = Math.round(sugarPercent)
                fatsPercent = Math.round(fatsPercent)
                sodiumPercent = Math.round(sodiumPercent)

                // Creates various divs to hold information
                var percentHeader = $("<th>").addClass("percentage").html("Daily %")
                var calPercentDiv = $("<td>").addClass("calPercent").html(calPercent + "%")
                var proteinPercentDiv = $("<td>").addClass("proteinPercent").html(proteinPercent + "%")
                var sugarPercentDiv = $("<td>").addClass("sugarPercent").html(sugarPercent + "%")
                var fatsPercentDiv = $("<td>").addClass("fatsPercent").html(fatsPercent + "%")
                var sodiumPercentDiv = $("<td>").addClass("sodiumPercent").html(sodiumPercent + "%")

                // Creates table row and appends all columns
                var percentages = $("<tr>").addClass("percentages").append(percentHeader).append(calPercentDiv).append(proteinPercentDiv).append(sugarPercentDiv).append(fatsPercentDiv).append(sodiumPercentDiv)
                
                // Appends table row amounts and percentages to tablebody
                var numberWrap = $("<tbody>").addClass("numberWrap").append(amounts).append(percentages)

                // Creates all the table headings each column
                var blank = $("<th>")
                var calHeader = $("<th>").addClass("calHeader").html("Cal")
                var proteinHeader = $("<th>").addClass("proteinHeader").html("Protein")
                var sugarHeader = $("<th>").addClass("sugarHeader").html("Sugar")
                var sodiumHeader = $("<th>").addClass("sodiumHeader").html("Sodium")
                var fatsHeader = $("<th>").addClass("fatsHeader").html("Fats")

                // Appends all the headings to the table heading row
                var headings = $("<tr>").addClass("headings").append(blank).append(calHeader).append(proteinHeader).append(sugarHeader).append(sodiumHeader).append(fatsHeader)
                var headerWrap = $("<thead>").addClass("headerWrap").append(headings)

                // Creates the table and appends both table head and table body
                var table = $("<table>").addClass("table").append(headerWrap).append(numberWrap);
                var tableWrap = $("<div>").addClass("tableWrap col-lg-4 offset-lg-1").append(table)

                // Appends all the content and table divs into the overall wrapper
                var infoRow = $("<div>").addClass("infoRow row").append(mediaWrap).append(tableWrap);
                $("#recipeWrap").append(infoRow)

            }


        
        });

    })

})