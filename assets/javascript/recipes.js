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

                // Appends all the divs to wrapper div
                var infoRow = $("<div>").addClass("infoRow row").append(mediaWrap);
                $("#recipeWrap").append(infoRow);
            }

            for (let i = 0; i < response.hits.length; i++) {
                
                var yield = response.hits[i].recipe.yield

                var test = response.hits[i].recipe.totalDaily.ENERC_KCAL.quantity

                // Use .round()
                console.log(test/yield + "%")

                var test1 = response.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity

                console.log(test1/yield + "g")
                
            }


        
        });

    })

})