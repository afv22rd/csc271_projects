// The form is displayed in a modal after the user clicks on the "Sell Your Car" button.

// The form has the following initial fields:
// - Name (text input)
// - Email (email input)
// - Phone (tel input)
// - Make (dropdown)
// - Model (dropdown)
// - Mileage (dropdown)
// - Condition (radio buttons: New / Used)

// Interactive form to receive an offer

// 1 First question: What is the condition of your vehicle?
// Radio buttons: New / Used

// If New: Next question is about an estimated last service date, since is implied that the vehicle already has a clean title.
// Then the submit button is enabled.

// If Used: Next question is about the title.

// 2 Second question: Do you have a title?
// Radio buttons: Yes / No

// If No: The user is not eligible for an offer and the submit button is disabled with a message indicating that they can't receive an offer without a title.

// If Yes: Next question is about the condition of the title.

// 3 Third question: Is the title clean, rebuilt or salvage?
// Radio buttons: Clean / Rebuilt / Salvage

// If salvage: The user is not eligible for an offer and the submit button is disabled with a message indicating that they can't receive an offer with a salvage title.

// If clean: The user is eligible for an offer, and then they are prompted with the next question of the estimated last service date, then the submit button is enabled.

// If rebuilt: The user is eligible for an offer, but they are prompted with an additional question about the reason for the rebuilt title.

// 4 Fourth question: What was the reason for the rebuilt title?
// Radio buttons: Fire / Accident / Flood

// If Fire or Flood: The user is not eligible for an offer and the submit button is disabled with a message indicating that they can't receive an offer with a rebuilt title due to fire or flood damage.

// If Accident: The user is eligible for an offer, but they are prompted with an additional question about the airbags.

// 5 Fifth question: Were the airbags deployed during the accident?
// Radio buttons: Yes / No

// If Yes: The user is not eligible for an offer and the submit button is disabled with a message indicating that they can't receive an offer with a rebuilt title due to an accident with deployed airbags.
// If No: The user is eligible for an offer, and then they are prompted with the next question of the estimated last service date. Then the submit button is enabled.

// So the user is eligible for an offer if:
// - The vehicle is new
// - The vehicle is used and has a clean title
// - The vehicle is used and has a rebuilt title due to an accident without deployed airbags

// The user is not eligible for an offer if:
// - The vehicle is used and (doesn't have a title or has a salvage title)
// - The vehicle is used and has a rebuilt title due to fire or flood damage or (due to an accident and the airbags were deployed)
// - The vehicle is used and the service date is more than a year old

// The form is only submitted if the user is eligible for an offer. After the form is submitted, a summary of the vehicle details is displayed with the eligibility status and the contact information of the user.

document.addEventListener("DOMContentLoaded", function() {
    // Declare all the radio buttons and sections

    // Vehicle condition radio buttons
    const vehicleConditionRadios = document.getElementsByName("vehicleCondition");
    // Title availability radio buttons and section
    const titleAvailableRadios = document.getElementsByName("titleAvailable");
    const titleAvailableSection = document.querySelector(".title-available-section");
    // Title condition radio buttons and section
    const titleConditionRadios = document.getElementsByName("titleCondition");
    const titleConditionSection = document.querySelector(".title-condition-section");
    // Rebuilt reason radio buttons and section
    const rebuiltReasonRadios = document.getElementsByName("rebuiltReason");
    const rebuiltReasonSection = document.querySelector(".rebuilt-reason-section");
    // Airbags radio buttons and section
    const airbagsRadios = document.getElementsByName("airbagsQuestion");
    const airbagsSection = document.querySelector(".airbags-section");
    // Service date section and input
    const serviceDateSection = document.querySelector(".service-date-section");
    const serviceDateInput = document.getElementById("service-date");
    // Submit and confirm button
    const submitButton = document.querySelector("#submitOfferButton");
    const confirmButton = document.getElementById("acceptOffer")
    // Offer summary modal
    const offerModalContent = document.getElementById("offerModalBodyContent");
    
    // Hide all conditionals at the beginning
    resetForm();
  
    // Add event listeners to the vehicle condition radio buttons
    for (let i = 0; i < vehicleConditionRadios.length; i++) {
        vehicleConditionRadios[i].addEventListener("change", handleVehicleConditionChange);
    }
    // Is the vehicle new or used?
    function handleVehicleConditionChange() {
        const isNew = document.getElementById("is-new").checked;
    
        if (isNew) {
            // If vehicle is new, show only the service date section and enable the submit button
            hideSections();
            showSections([serviceDateSection]);
            // Show the service date section and add an event listener to the service date input
            serviceDateInput.addEventListener("change", function() {
                // Enable the submit button if a date is selected
                if (serviceDateInput.value !== "Select an estimated date") {
                submitButton.disabled = false;
                } else {
                submitButton.disabled = true;
                }
            });
        } else {
            // If vehicle is used, show the title availability section
            hideSections();
            titleAvailableSection.classList.remove("d-none");
        }
    }
  
    // Add event listener to the title availability radio buttons
    for (let i = 0; i < titleAvailableRadios.length; i++) {
        titleAvailableRadios[i].addEventListener("change", handleTitleAvailableChange);
    }
    // Do you have a title or no? 
    function handleTitleAvailableChange() {
        const hasTitle = document.getElementById("title-true").checked;
    
        if (!hasTitle) {
            // If no title, disable submit button
            hideSections();
            titleAvailableSection.classList.remove("d-none");
            submitButton.disabled = true;
        } else {
            // If has title, show the title condition section
            titleConditionSection.classList.remove("d-none");
        }
    }
  
    // Add event listener to the title condition radio buttons
    for (let i = 0; i < titleConditionRadios.length; i++) {
        titleConditionRadios[i].addEventListener("change", handleTitleConditionChange);
    }
    // Is the title clean, rebuilt, or salvage?
    function handleTitleConditionChange() {
        const isClean = document.getElementById("clean-title").checked;
        const isRebuilt = document.getElementById("rebuilt-title").checked;

        if (isClean) {
            // If title is clean, show the service date section
            hideSections();
            showSections([titleAvailableSection, titleConditionSection, serviceDateSection]);
            serviceDateInput.addEventListener("change", function() {
                // Enable the submit button if a date is selected
                if (serviceDateInput.value !== "Select an estimated date") {
                submitButton.disabled = false;
                } else {
                submitButton.disabled = true;
                }
            });
        } else if (isRebuilt) {
            // If title is rebuilt, show the rebuilt reason
            hideSections();
            showSections([titleAvailableSection, titleConditionSection, rebuiltReasonSection]);
            submitButton.disabled = true;
        } else {
            // Salvage title, disable submit button
            hideSections();
            showSections([titleAvailableSection, titleConditionSection]);
            submitButton.disabled = true;
        }
    }

    // Add event listener to the rebuilt reason radio buttons
    for (let i = 0; i < rebuiltReasonRadios.length; i++) {
        rebuiltReasonRadios[i].addEventListener("change", handleRebuiltReasonChange);
    }
    // What was the reason for the rebuilt title?
    function handleRebuiltReasonChange() {
        const isAccident = document.getElementById("reasonAccident").checked;

        if (!isAccident) {
            // If reason is fire or flood, disable submit button
            hideSections();
            showSections([titleAvailableSection, titleConditionSection, rebuiltReasonSection]);
            submitButton.disabled = true;
        } else {
            // If reason is accident, show the airbags section
            hideSections();
            showSections([titleAvailableSection, titleConditionSection, rebuiltReasonSection, airbagsSection]);
        }
    }

    // Add event listener to the airbags radio buttons
    for (let i = 0; i < airbagsRadios.length; i++) {
        airbagsRadios[i].addEventListener("change", handleAirbagsChange);
    }
    // Were the airbags deployed during the accident?
    function handleAirbagsChange() {
        const airbagsDeployed = document.getElementById("airbagsYes").checked;

        if (airbagsDeployed) {
            // If airbags were deployed, disable submit button
            hideSections();
            showSections([titleAvailableSection, titleConditionSection, rebuiltReasonSection, airbagsSection]);
            submitButton.disabled = true;
        } else {
            // If airbags were not deployed, show the service date section
            hideSections();
            showSections([titleAvailableSection, titleConditionSection, rebuiltReasonSection, airbagsSection, serviceDateSection]);
            serviceDateInput.addEventListener("change", function() {
                if (serviceDateInput.value !== "Select an estimated date") {   
                    submitButton.disabled = false;
                } else {
                    submitButton.disabled = true;
                }
            });
        }
    }
  
    // Function to hide all conditionals
    function hideSections() {
        // Array with all sections
        const sections = [
            titleAvailableSection,
            titleConditionSection,
            rebuiltReasonSection,
            airbagsSection,
            serviceDateSection
        ];
        // Loop thru all sections and add the d-none class to hide
        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.add("d-none");
        }
        // Disable the submit button
        submitButton.disabled = true;
    }

    // Function to show specific sections. Takes an array as parameter with sections to show
    function showSections(sections) {
        for (let i = 0; i < sections.length; i++) {
            sections[i].classList.remove("d-none");
        }
    }

    // Functions to clear the selections and reset the form
    function clearSelections() {
        const allRadioButtons = document.querySelectorAll('input[type="radio"]');
        allRadioButtons.forEach(radio => {
            radio.checked = false;
        });
        serviceDateInput.value = "Select an estimated date";
    }
    function resetForm() {
        clearSelections();
        hideSections();
    }

    // Reset form when the modal user closes the modal


    // Add content to offer summary modal
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        // Form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const make = document.getElementById("make").value;
        const model = document.getElementById("model").value;
        const mileage = document.getElementById("mileage").value;

        // Form selections data
        const vehicleCondition = document.querySelector('input[name="vehicleCondition"]:checked');
        const titleCondition = document.querySelector('input[name="titleCondition"]:checked');
        const rebuiltReason = document.querySelector('input[name="rebuiltReason"]:checked');
        const airbagsQuestion = document.querySelector('input[name="airbagsQuestion"]:checked');
        const serviceDate = serviceDateInput.options[serviceDateInput.selectedIndex];

        let offerSummary = `<p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                            <p><strong>Make:</strong> ${make}</p>
                            <p><strong>Model:</strong> ${model}</p>
                            <p><strong>Mileage:</strong> ${mileage}</p>`;

        // Add info to the offer summary
        // If the vehicle is new, add the condition and clean title
        // Add vehicle condition information
        if (vehicleCondition) {
            offerSummary += `<p><strong>Vehicle Condition:</strong> ${vehicleCondition.value === "true" ? "New" : "Used"}</p>`;
            if (vehicleCondition.value === "false") {
                // Add title condition for used vehicles
                if (titleCondition) {
                    offerSummary += `<p><strong>Title:</strong> ${titleCondition.value}</p>`;

                    // If title is rebuilt, add rebuilt reason
                    if (titleCondition.value === "Rebuilt" && rebuiltReason) {
                        offerSummary += `<p><strong>Rebuilt Reason:</strong> ${rebuiltReason.value}</p>`;

                        // If rebuilt reason is accident, add airbags question
                        if (rebuiltReason.value === "Accident" && airbagsQuestion) {
                            offerSummary += `<p><strong>Airbags Deployed?</strong> ${airbagsQuestion.value === "true" ? "Yes" : "No"}</p>`;
                        }
                    }
                }
            } else if (vehicleCondition.value === "true") {
                // New vehicles always have a clean title
                offerSummary += `<p><strong>Title:</strong> Clean</p>`;
            }
        }

        // Add service date if selected
        if (serviceDateInput.value !== "Select an estimated date") {
            offerSummary += `<p><strong>Service Date:</strong> ${serviceDate.text}</p>`;
        }
        // Add the offer summary to the modal content
        offerModalContent.innerHTML = offerSummary;

        // Submit form
        const offerForm = document.querySelector("#sell-form-modal form");
        confirmButton.addEventListener("click", function() {
            offerForm.submit();
            resetForm();
        });
    });
    // Reset form when modal is closed using both modals close buttons
    const modalCloseButtons = document.getElementsByClassName("btn-close");
    for (let i = 0; i < modalCloseButtons.length; i++) {
        modalCloseButtons[i].addEventListener("click", function() {
            resetForm();
        });
    }
});
// Still need to add bootstrap alert when the user can't submit the form to receive an offer