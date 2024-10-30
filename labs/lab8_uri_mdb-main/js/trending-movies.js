// Array of movie titles
const movies = ["Scarface", "Dirty Dancing", "The Purge"];

// Array of movie poster URLs
const posters = ["https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.vintagemovieposters.co.uk%2Fwp-content%2Fuploads%2F2023%2F02%2FIMG_0861-scaled.jpeg&f=1&nofb=1&ipt=879b293e8a4db1c27a993b04db58c7968d15da67d17aa22ce36a10f1f8db7fbb&ipo=images", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Foriginal%2FhIzz9mMPVk4VZb9CXCDRjJSgbWL.jpg&f=1&nofb=1&ipt=7183bc69b1e96f6b1c104869c506695bd9fd7fbff055b85c372ad402424cadec&ipo=images", "https://m.media-amazon.com/images/M/MV5BMTQzNTcwODEyM15BMl5BanBnXkFtZTcwMjM1MDI0OQ@@._V1_.jpg"];
const altText = ["Scarface Movie Poster", "Dirty Dancing Movie Poster", "The Purge Movie Poster"];

// Array of movie HTML links
const links = ["scarface.html", "dirty-dancing.html", "the-purge.html"];

// Array of movie ratings
const ratings = [5, 4, 3];

// Select all movie card elements
const movieCards = document.querySelectorAll(".movie-card");

// Loop through each card to update its content with movie information
for (let index = 0; index < movieCards.length; index++) {
	// Select the current movie card
	const card = movieCards[index];
	// Select the current movie image element
	const moviePoster = card.querySelector(".movie-image");
	// Set its link to the movie poster link from the array
	moviePoster.src = posters[index];
	// Set its alt text to the movie title from the array
	moviePoster.alt = altText[index];

	// Select the current movie link element
	const movieLink = card.querySelector(".movie-link");
	// Set its link to the HTML page for that movie from the array
	movieLink.href = links[index];
	// Set its text to the movie title from the array
	movieLink.textContent = movies[index];

	// Select the current movie rating element
	const movieRating = card.querySelector(".rating");
	// Create a variable that will hold the filled and empty stars
	let stars = "";
	// Loop to generate star symbols based on the rating
	for (let i = 0; i < 5; i++){
		if (i < ratings[index]) {
			stars += "★"; // Filled star
		} else {
			stars += "☆"; // Empty star
		}
	}
	// Set the movie rating element's text to display the generated stars
	movieRating.textContent = stars;
}