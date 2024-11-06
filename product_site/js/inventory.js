document.addEventListener('DOMContentLoaded', () => {
    // Vehicle inventory data
    const vehicles = [
        {
            model: "2014 Mercedes-Benz E-Class",
            trim: "E350 4MATIC",
            mileage: "60k Miles",
            price: "$20,000",
            image: "./images/2014_e350.jpeg",
            imageAlt: "2014 Mercedes-Benz E-Class",
            review: "https://www.youtube.com/embed/OUBVZ9ZasGs?si=IhNcYJaVOfICI3FO"
        },
        {
            model: "2017 Honda Accord",
            trim: "Touring V6",
            mileage: "90k Miles",
            price: "$15,000",
            image: "./images/2017_accord.jpg",
            imageAlt: "2017 Honda Accord Touring V6",
            review: "https://www.youtube.com/embed/gcVsZE1_ynw?si=qPdgnZ2QfwIHp1hK"
        },
        {
            model: "2019 Toyota Camry",
            trim: "XSE V6",
            mileage: "110k Miles",
            price: "$15,000",
            image: "./images/2019_camry.jpg",
            imageAlt: "2019 Toyota Camry XSE V6",
            review: "https://www.youtube.com/embed/jT5biRzLgzw?si=gFzwbwvQ5t9bY853"
        },
        {
            model: "2020 Honda Accord",
            trim: "2.0T Sport",
            mileage: "90k Miles",
            price: "$23,000",
            image: "./images/2020_accord.jpg",
            imageAlt: "2020 Honda Accord 2.0T Sport",
            review: "https://www.youtube.com/embed/TmihZPj0Vlg?si=NHFJ7XVbafEEnWIZ"
        }
    ];

    // Select the inventory container
    const inventoryContainer = document.querySelector('.row-cols-1');
    // Loop thru all vehicles and populate the inventory section using innerHTML
    for (let i = 0; i < vehicles.length; i++) {
        const vehicle = vehicles[i];
        const vehicleCard = `
            <div class="col">
                <div class="card shadow-sm">
                    <div class="car-img inventory-${i + 1}">
                        <svg class="bd-placeholder-img card-img-top" alt="${vehicle.imageAlt}" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"></svg>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${vehicle.model}</h5>
                        <p>${vehicle.trim} | ${vehicle.mileage}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="card-title">${vehicle.price}</h5>
                        </div>
                    </div>
                </div>
            </div>
        `;
        inventoryContainer.innerHTML += vehicleCard;
        // Select the current vehicle image and set the background image
        const vehicleImage = document.querySelector(`.inventory-${i + 1}`);
        // Add the background image to the vehicle card using CSS 
        vehicleImage.style.backgroundImage = `url("${vehicle.image}")`;
    }

    // Using a while loop because we want to iterate thru all reviews cards
    const vehicleModel = document.querySelectorAll('#review-cards .card-title'); // Review vehicle model
    const vehicleTrim = document.querySelectorAll('#review-cards .card-text'); // Review vehicle trim
    const reviewVideos = document.querySelectorAll('#review-cards iframe'); // Reviewe video review
    let i = 0;
    while (i < reviewVideos.length) {
        // Add vehicle review data to review cards and video URL
        reviewVideos[i].src = vehicles[i].review;
        vehicleModel[i].textContent = vehicles[i].model;
        vehicleTrim[i].textContent = vehicles[i].trim;
        i++;
    }

     // Using a for loop to iterate thru all cards and add hover effects
     const cards = document.querySelectorAll('.card');
    
     for (let i = 0; i < cards.length; i++) {
         const card = cards[i];
         // Add hover effect to card when mouse enters and leaves
         card.addEventListener('mouseenter', () => {
             card.style.transform = 'translateY(-5px)';
             card.style.transition = 'transform 0.3s ease';
         });
         
         card.addEventListener('mouseleave', () => {
             card.style.transform = 'translateY(0)';
         });
     }
});