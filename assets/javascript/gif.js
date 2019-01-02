var sportTeams = ["duke basketball", "dallas cowboys", "la lakers", "san diego padres", "colorado avalanch", "usc football", "oklahoma state football"];


function buttonGen() {
    $("#searchTeam").empty();

    for (var i = 0; i < sportTeams.length; i++) {

        //creating my new buttons
        var a = $("<button>");
        
        //adding my class attributes style and text for my buttons needed for searching
        a.addClass("teams btn btn-dark btn-sm");
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

function showMe(){
    
    var name = $(this).attr("data.name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=Zt5D0Wjk7gYFB2fVpKH8KXysPwnOhyCt&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    });
};

$(document).on("click",".teams", showMe());