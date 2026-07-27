(() => {
  const form = document.querySelector("#support-form");
  const submitButton = document.querySelector("#submit-button");
  const status = document.querySelector("#form-status");
  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (!form || !submitButton || !status) {
    return;
  }

  const endpoint = form.getAttribute("action") || "";
  const isConfigured = !endpoint.includes("REPLACE_WITH_FORM_ID");

  if (!isConfigured) {
    submitButton.disabled = true;
    submitButton.textContent = "Form setup required";
    status.className = "form-status error";
    status.textContent = "The support form has not been connected yet.";
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      status.className = "form-status success";
      status.textContent = "Thanks—your support request was sent.";
    } catch {
      status.className = "form-status error";
      status.textContent = "We couldn’t send the request. Please try again in a moment.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send request";
    }
  });
})();
