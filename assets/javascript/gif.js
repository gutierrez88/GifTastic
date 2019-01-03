var sportTeams = ["duke basketball", "dallas cowboys", "la lakers", "san diego padres", "colorado avalanch", "usc football", "oklahoma state football"];


function buttonGen() {
    $("#searchTeam").empty();

    for (var i = 0; i < sportTeams.length; i++) {

        //creating my new buttons
        var a = $("<button>");
        
        //adding my class attributes style and text for my buttons needed for searching
        a.addClass("teams btn btn-transparent text-light btn-sm");
        a.attr("data-name", sportTeams[i]);
        a.css("margin","10px")
        a.text(sportTeams[i]);

        //adding the button to the searchTeam div in the html
        $("#searchTeam").append(a);
    };
};

buttonGen();

$("#submitbtn").on("click", function(event){
    //turning off the original intention for the submit button
    event.preventDefault();

    //adding the new team entered by the user to the array and rerunning the button generator function
    var addTeam = $("#nameInput").val().trim();
    sportTeams.push(addTeam);
    buttonGen();
});



$(document).on("click",".teams", function(){
   
    $(".results").empty();

    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=Zt5D0Wjk7gYFB2fVpKH8KXysPwnOhyCt&limit=10&trending";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);

        var results = response.data;

        

        for ( var i=0; i < results.length; i++) {
            var imgStill = results[i].images.original_still.url
            var imgGif = results[i].images.original.url
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var sportGif = $("<img>");

            sportGif.addClass("gif");
            gifDiv.css("margin-bottom","20px");
            gifDiv.css("margin-right","20px");
            sportGif.css("max-width","250px");
            gifDiv.css("float","left");
            sportGif.attr("src", results[i].images.original_still.url);
            gifDiv.append(p);
            gifDiv.append(sportGif);

            sportGif.attr("data-still", imgStill);
            sportGif.attr("data-animate", imgGif);
            sportGif.attr("data-state", "still");

            $(".results").append(gifDiv);
        };

        $(".gif").on("click", function () {
           
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };

        });
    });
});