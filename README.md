Full Stack BootCamp

API Project I

# Capital-City-Goofballs
Michelle Chen
Luis Morneo
Juan Carlos Salas
Nare Baghumyan

This application assists users to become more cognitive in their health. There are four main features which can take advantage of including searching for recipes, findind nutritional stats, looking up locations on a map, and sharing ideas in a forum.

# RECIPE PAGE
The recipe page uses the Edemam Recipe Search API to look up recipes based on the user's inputs. The code concatenantes all the ingredients the user inputs with the API link to send the request. The AJAX then returns the information in an objects which the code disects for the necesary information. 

The page will display at most 10 different recipes. With each recipe will be an image, the recipe name, the number of total ingredients needed, the amount of servings, and the link to the full recipe. To the right of each listing will be a table that displays the total amounts of various nutrition stats as well as how much the quantity is in percentage against the suggested daily quantity. 

When a user does a new search, the prior results will resset and the new results will take their place.

# Nutrition Fact Page
This page uses the Edamam Nutrition Analysis API to grab information for every item the user inputs. The user will input the quantity and food item, one at a time, and the API will respond with several nutrition statistics. These numnbers will be displayed in DOM in an organizes table. For every ingredient the user inputs, the new item will be added to the top, and the total numebr of each column will be added in a specifi row at the bottom.
  
There is also one last item that calculates the daily percentage of each category compared to the suggested daily allowance. The reset button will allow the user to erase all information and start their search and calculations again.

# Map Page
TWith this page, we decided to use Google Maps API - Places library. The map is going to populate at page load. The API comes with a search box inside the map. We customize the search box to be outside of the map to be more user friendly. 

Features included in the map are:
Search results will populate as markers on the map, as well as a list on the right of the map
Clicking on a marker will display a popup window to display details of the location
Clicking on a business will display a popup window on the map to display the details of that location
Driving dirctions will bring user to Google map search page 
Features considered in the future:
Driving directions will be on the map search page
Business phone, hours, reviews will be included on the search results.

# Form Page
This page uses firebase to store data and retrive it dynamically in order to creat a forum where a user can ask questions or state their facts/oppinions in regards to health

Features include 
seting a display name and message to become a message shown on page 
users can reply to any message or question asked 
replys are stored and placed under their respective questions


