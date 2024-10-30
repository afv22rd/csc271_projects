// Array of usernames
const usernames = ["Alice", "Bob", "Charlie"];
// Array of review dates
const reviewDates = ["2024-10-30", "2024-10-31", "2024-11-01"];
// Array of reviews
const reviews = ["Amazing movie! A must-watch.", "It was okay, not my favorite.", "I didn't like it much."];
// Array of ratings
const ratings = [5, 3, 2];

// Select all review card elements
const reviewCards = document.querySelectorAll(".review-card");
// Loop through each card to update its content with review information
for (let index = 0; index < reviewCards.length; index++) {
	// Select the current review card
	const card = reviewCards[index];
	// Select the current review rating element
	const reviewRating = card.querySelector(".review-rating");
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
	// Set the review rating element's text to display the generated stars
	reviewRating.textContent = stars;
	// Set the review rating element's attribute to current rating from the array
	reviewRating.setAttribute("data-rating", ratings[index]);

	// Select the current review username element
	const reviewUsername = card.querySelector(".review-username");
	// Set its text to the username from the array and add a space to separate it from the date
	reviewUsername.firstChild.textContent = usernames[index] + " ";
	// Select current review date element
	const reviewDate = card.querySelector(".review-date");
	// Set its markup to the date from the array
	reviewDate.textContent = reviewDates[index];
	// Select the current review text element
	const reviewText = card.querySelector(".review-text");
	// Set its text to the review text from the array
	reviewText.textContent = reviews[index];
}



// Get the dropdown element for filtering ratings by its ID
var filterDropdown = document.getElementById('rating-filter');

// Add an event listener to the dropdown that triggers when the selected option changes
filterDropdown.addEventListener('change', function() {
   	
   	// Store the currently selected rating from the dropdown
    var selected_rating = filterDropdown.value;

	// Loop through each review card
	for (let index = 0; index < reviewCards.length; index++) {
		// Select the current review rating element
		const reviewRating = reviewCards[index].querySelector(".review-rating");
		// Get its rating attribute value
		const cardRating = reviewRating.getAttribute("data-rating");

		// Check if the selected rating is 'All' or matches the card's rating
		if (selected_rating === 'All' || selected_rating == cardRating) {
			reviewCards[index].style.display = 'block'; // Display the card
		} else {
			reviewCards[index].style.display = 'none'; // Hide the card
		}
	}
});



