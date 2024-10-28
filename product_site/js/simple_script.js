document.addEventListener("DOMContentLoaded", function() {
    const vehicleYes = document.getElementById("vehicleYes"); // Yes radio button
    const vehicleNo = document.getElementById("vehicleNo"); // No radio button
    const vehicleList = document.getElementById("vehicleCheckboxes"); // Vehicle checkboxes
    const priceRange = document.getElementById("priceRange");

    // Show/hide vehicle list and price range based on user selection
    // If user selects "Yes" for vehicle interest, show vehicle list
    vehicleYes.addEventListener("change", function() {
        if (vehicleYes.checked) {
            vehicleList.style.display = "block";
            priceRange.style.display = "none";
        }
    });

    // If user selects "No" for vehicle interest, show price range
    vehicleNo.addEventListener("change", function() {
        if (vehicleNo.checked) {
            vehicleList.style.display = "none";
            priceRange.style.display = "block";
        }
    });

    // Initialize the appointment modal and summary modal
    const appointmentModal = new bootstrap.Modal(document.getElementById("appointmentModal"));
    const form = document.querySelector("#appointmentModal form");
    const summaryModal = new bootstrap.Modal(document.getElementById("summaryModal"));
    const modalBodyContent = document.getElementById("modalBodyContent");

    form.addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent the form from submitting

        appointmentModal.hide();  // Hide the appointment modal

        // Appt info
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        // Determine vehicle selection or price range
        let appointmentDetails = `<p><strong>Name:</strong> ${name}</p>
                                  <p><strong>Email:</strong> ${email}</p>
                                  <p><strong>Phone:</strong> ${phone}</p>
                                  <p><strong>Date:</strong> ${date}</p>
                                  <p><strong>Time:</strong> ${time}</p>`;

        // Check if the user is interested in specific vehicles
        const isInterestedInVehicle = document.getElementById("vehicleYes").checked;
        if (isInterestedInVehicle) {
            let selectedVehicles = []; // Array to store selected vehicles
            document.querySelectorAll("#vehicleCheckboxes input[type='checkbox']:checked").forEach(checkbox => { // Loop through selected checkboxes
                selectedVehicles.push(checkbox.nextElementSibling.textContent); // Get the vehicle name of each checkbox
            });
            // This will show the number and names of selected vehicles
            // Join selected vehicles to the appointment details. If selectedVehicles is empty, join "None selected"
            appointmentDetails += `<p><strong>Vehicles selected:</strong> ${selectedVehicles.length}<br> ${selectedVehicles.length ? selectedVehicles.join("<br>") : "None selected"}</p>`;
        } else {
            // Get price range value depending on where the bar is set
            const priceRangeValue = document.getElementById("priceRangeBar").value;
            let priceRangeText;
            switch (priceRangeValue) {
                case "0":
                    priceRangeText = "$0 - $5,000";
                    break;
                case "1":
                    priceRangeText = "$5,000 - $10,000";
                    break;
                case "2":
                    priceRangeText = "$10,000 - $15,000";
                    break;
                case "3":
                    priceRangeText = "Default - All vehicles";
                    break;
                case "4":
                    priceRangeText = "$20,000 - $25,000";
                    break;
                case "5":
                    priceRangeText = "$25,000+";
                    break;
            }
            // Add price range to appointment details
            appointmentDetails += `<p><strong>Price Range:</strong> ${priceRangeText}</p>`;
        }

        // Insert appointment details into modal body
        modalBodyContent.innerHTML = appointmentDetails;

        // Show the summary modal
        summaryModal.show();
    });

    // Go Back button action
    document.getElementById("backBtn-summaryModal").addEventListener("click", function() {
        summaryModal.hide(); // Hide the summary modal
        appointmentModal.show(); // Show the appointment modal again
    });

    // Confirm Appointment button action
    document.getElementById("confirmAppointment").addEventListener("click", function() {
        form.submit();  // Submit the form after confirmation
    });

    // Use bootstrap hidden.bs.modal event to reset the form
    appointmentModalElement.addEventListener('hide.bs.modal', function () {
        form.reset(); // Reset all form fields
    });
});