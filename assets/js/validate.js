// -----------------------------
// FORM VALIDATION SCRIPT
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    const inputs = form.querySelectorAll("input, textarea, select");

    // Attach real-time validation
    inputs.forEach(input => {
      input.addEventListener("input", () => validateField(input));
    });

    // Handle form submit
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent actual submission
      let valid = true;
      let messages = [];

      inputs.forEach(input => {
        const result = validateField(input);
        if (!result.isValid) {
          valid = false;
          messages.push(result.message);
        }
      });

      let msgBox = form.querySelector(".form-messages");
      if (!msgBox) {
        msgBox = document.createElement("div");
        msgBox.className = "form-messages";
        form.prepend(msgBox);
      }

      if (!valid) {
        msgBox.className = "form-messages error";
        msgBox.innerHTML = messages.map(msg => `<p>${msg}</p>`).join("");
      } else {
        msgBox.className = "form-messages loading";
        msgBox.innerHTML = "<p>Submitting...</p>";

        setTimeout(() => {
          msgBox.className = "form-messages success";
          msgBox.innerHTML = "<p>Your form has been submitted successfully!</p>";

          // Clear inputs
          inputs.forEach(input => {
            if (input.tagName.toLowerCase() === "select") {
              input.selectedIndex = 0;
            } else {
              input.value = "";
            }
            clearError(input);
          });
        }, 1500);
      }
    });
  });

  // -----------------------------
  // Field Validation Function
  // -----------------------------
  function validateField(input) {
    const value = input.value.trim();
    const name = input.getAttribute("name");
    let isValid = true;
    let message = "";

    // Required check
    if (input.hasAttribute("required") && value === "") {
      highlightError(input);
      isValid = false;
      message = `${capitalize(name)} is required.`;
    }

    // Email check
    else if (input.type === "email" && value !== "" && !validateEmail(value)) {
      highlightError(input);
      isValid = false;
      message = "Please enter a valid email address.";
    }

    // Phone check (7–15 digits only)
    else if (input.type === "tel" && value !== "" && !/^[0-9]{7,15}$/.test(value)) {
      highlightError(input);
      isValid = false;
      message = "Phone number must be 7–15 digits.";
    }

    // If valid
    else if (value !== "") {
      markSuccess(input);
    } else {
      clearError(input);
    }

    return { isValid, message };
  }

  // -----------------------------
  // Helper Functions
  // -----------------------------
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function highlightError(input) {
    input.classList.add("error");
    input.classList.remove("success");
  }

  function clearError(input) {
    input.classList.remove("error");
    input.classList.remove("success");
  }

  function markSuccess(input) {
    input.classList.add("success");
    input.classList.remove("error");
  }
});
