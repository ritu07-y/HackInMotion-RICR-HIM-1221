// Select the form and message element
const form = document.querySelector(".learning-form");
const message = document.querySelector("#form-message");

// Run this function when the form is submitted
form.addEventListener("submit", function (event) {

  // Stop the page from reloading
  event.preventDefault();

  // Find all selected subjects
  const selectedSubjects = document.querySelectorAll(
    'input[name="subjects"]:checked'
  );

  // Get the written question
  const question = document.querySelector("#question").value.trim();

  // Check whether a subject is selected
  if (selectedSubjects.length === 0) {
    message.textContent = "Please select at least one subject.";
    message.className = "form-message error";
    return;
  }

  // Check whether a question is written
  if (question === "") {
    message.textContent = "Please write your question.";
    message.className = "form-message error";
    return;
  }

  // Store the selected subject names
  const subjectNames = [];

  selectedSubjects.forEach(function (subject) {
    subjectNames.push(subject.value);
  });

  // Display a success message
  message.textContent =
    "Question submitted for: " + subjectNames.join(", ");

  message.className = "form-message success";

  // Clear the form
  form.reset();
});