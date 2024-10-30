/* TO DO:

    - Create an array to hold the title of your favorite movie, URL for movie poster, your rating, and synopsis.

    - Select the movie image element.
    - Set its link to the movie poster link from the array. 
    - Set its alt text to the movie title from the array.

    - Select the movie name element.
    - Set its text to the movie title from the array.

    - Select the movie description element.
    - Set its text to the movie synopsis from the array.

    - Select the movie rating element.
    - Create a variable that will hold the filled and empty stars. 
    - Loop to generate star symbols based on the rating:
        - If current counter is less than your rating, then add "★".
        - Otherwise, add "☆".
    - Set the movie rating element's text to display the generated stars. 

*/

// Array of favorite movie information
const favoriteMovie = ["Scarface", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vintagemovieposters.co.uk%2Fwp-content%2Fuploads%2F2023%2F02%2FIMG_0861-scaled.jpeg&f=1&nofb=1&ipt=879b293e8a4db1c27a993b04db58c7968d15da67d17aa22ce36a10f1f8db7fbb&ipo=images", 5, "Scarface (1983) follows the rise and fall of Tony Montana, a ruthless Cuban immigrant who climbs to the top of Miami’s drug trade. Arriving in the U.S. with nothing, Tony uses his ambition and brutality to gain power, eventually becoming a wealthy but paranoid drug lord. His violent ascent and self-destructive obsession with power, however, lead to betrayal and a dramatic downfall. The film, directed by Brian De Palma and starring Al Pacino, explores themes of ambition, greed, and the corrupting influence of unchecked power."];
// Select the movie image element
const moviePoster = document.querySelector(".movie-image");
// Set its link to the movie poster link from the array
moviePoster.src = favoriteMovie[1];
// Set its alt text to the movie title from the array
moviePoster.alt = favoriteMovie[0];
// Select the movie name element
const movieName = document.querySelector(".movie-name");
// Set its text to the movie title from the array
movieName.textContent = favoriteMovie[0];
// Select the movie description element
const movieDescription = document.querySelector(".description");
// Set its text to the movie synopsis from the array
movieDescription.textContent = favoriteMovie[3];
// Select the movie rating element
const movieRating = document.querySelector(".rating");
// Create a variable that will hold the filled and empty stars
let stars = "";
// Loop to generate star symbols based on the rating
for (let i = 0; i < 5; i++){
    if (i < favoriteMovie[2]) {
        stars += "★"; // Filled star
    } else {
        stars += "☆"; // Empty star
    }
}
// Set the movie rating element's text to display the generated stars
movieRating.textContent = stars;
