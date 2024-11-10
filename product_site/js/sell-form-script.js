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
            showSections([titleAvailableSection]);
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
            showSections([titleAvailableSection]);
            submitButton.disabled = true;
        } else {
            // If has title, show the title condition section
            showSections([titleConditionSection]);
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
  
    // Function to hide or show sections
    function toggleSections(sections, action) {
        for (let i = 0; i < sections.length; i++) {
            if (action === "hide") { // if input is hide, add the class d-none to the section
                sections[i].classList.add("d-none");
            } else if (action === "show") { // if input is show, remove the class d-none from the section
                sections[i].classList.remove("d-none");
            }
        }
    }

    // Function to hide all sections and disable the submit button
    function hideSections() {
        const sections = [ // Array of all sections
            titleAvailableSection,
            titleConditionSection,
            rebuiltReasonSection,
            airbagsSection,
            serviceDateSection
        ];
        // Hide all sections and disable the submit button
        toggleSections(sections, "hide"); 
        submitButton.disabled = true;
    }

    // Function to show sections that are needed 
    function showSections(sections) {
        // Call the toggleSections function to show the sections
        toggleSections(sections, "show");
    }

    // Functions to clear the selections and reset the form
    function clearSelections() {
        // Select all radio buttons
        const allRadioButtons = document.querySelectorAll('input[type="radio"]');
        // Loop thru all radio buttons and uncheck them
        for (let i = 0; i < allRadioButtons.length; i++) {
            allRadioButtons[i].checked = false;
        }
        // Reset the service date input
        serviceDateInput.value = "Select an estimated date";
    }

    // Function to reset the form
    function resetForm() {
        clearSelections();
        hideSections();
    }

    // Function to calculate the offer
    function calculateOffer(mileage, condition, titleCondition, rebuiltReason, airbagsDeployed) {
        let baseValue = 20000; // Base value for the vehicle
        let depreciation = 0.1 // Base depreciation 
        let conditionMultiplier = condition === "New" ? 1.2 : 1.0; // Multiplier for condition
        let titleMultiplier = 1.0; // Multiplier for title condition
        let rebuiltMultiplier = 1.0; // Multiplier for rebuilt reason
        let airbagsMultiplier = 1.0; // Multiplier for airbags deployment

        // Adjust mileage depreciation
        if (mileage == "150,001") {
            depreciation = 0.45;
        } 
        else if (mileage == "125,000") {
            depreciation = 0.40;
        } 
        else if (mileage == "100,000") {
            depreciation = 0.35;
        } 
        else if (mileage == "75,000") {
            depreciation = 0.30;
        } 
        else if (mileage == "40,000") {
            depreciation = 0.25;
        } 
        else if (mileage == "10,000") {
            depreciation = 0.2;
        }

        // Adjust title multiplier
        if (titleCondition === "Rebuilt") {
            titleMultiplier = 0.8;
        }

        // Adjust rebuilt reason multiplier
        if (rebuiltReason === "Accident") {
            rebuiltMultiplier = 0.9;
        } 

        // Adjust airbags multiplier
        if (airbagsDeployed) {
            airbagsMultiplier = 0.85;
        }

        // Calculate final offer value
        let offerValue = baseValue * (1 - depreciation) * conditionMultiplier * titleMultiplier * rebuiltMultiplier * airbagsMultiplier;
        return offerValue.toFixed(2); // Return as a string with 2 decimal places
    }

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
    
        // Default values for condition parameters
        const condition = vehicleCondition && vehicleCondition.value === "true" ? "New" : "Used"; // If vehicleCondition is true, then the vehicle is new, if false it is used
        const titleCond = titleCondition ? titleCondition.value : "Clean"; // If titleCondition is true, then the title is clean, if false it is rebuilt
        const rebuilt = rebuiltReason ? rebuiltReason.value : null; // If rebuiltReason is true, then the reason is accident, if false it is fire or flood
        const airbagsDeployed = airbagsQuestion && airbagsQuestion.value === "true"; // If airbagsQuestion is true, then the airbags were deployed, if false they were not
    
        // Calculate offer value
        const estimatedOffer = calculateOffer(mileage, condition, titleCond, rebuilt, airbagsDeployed);
    
        // Build offer summary with calculated offer
        let offerSummary = `<p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone}</p>
                            <p><strong>Make:</strong> ${make}</p>
                            <p><strong>Model:</strong> ${model}</p>
                            <p><strong>Mileage:</strong> ${mileage}</p>
                            <p><strong>Estimated Offer:</strong> $${estimatedOffer}</p>`;
    
        // Additional details based on conditions
        if (vehicleCondition) {
            offerSummary += `<p><strong>Vehicle Condition:</strong> ${condition}</p>`;
            if (condition === "Used" && titleCond) {
                offerSummary += `<p><strong>Title:</strong> ${titleCond}</p>`;
                if (titleCond === "Rebuilt" && rebuilt) {
                    offerSummary += `<p><strong>Rebuilt Reason:</strong> ${rebuilt}</p>`;
                    if (rebuilt === "Accident" && airbagsQuestion) {
                        offerSummary += `<p><strong>Airbags Deployed?</strong> ${airbagsQuestion.value === "true" ? "Yes" : "No"}</p>`;
                    }
                }
            } else if (condition === "New") {
                offerSummary += `<p><strong>Title:</strong> Clean</p>`;
            }
        }
    
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