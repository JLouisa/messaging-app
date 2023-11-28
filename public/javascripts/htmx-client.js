// // htmx-client.js
// document.addEventListener("htmx:response", function (event) {
//   const xhr = event.detail.xhr;
//   console.log("Response Status Code:", xhr.status);

//   // Check if the response indicates an authentication failure (X-Authentication-Failure header or 401 status code)
//   const authenticationFailure = xhr.getResponseHeader("X-Authentication-Failure");
//   console.log("Authentication Failure Header:", authenticationFailure);

//   if (authenticationFailure === "true" || xhr.status === 401) {
//     // Redirect to the login page or handle as needed
//     console.log("Redirecting to login");
//     alert("Testing1");
//     window.location.href = "/login";
//   }
// });

// document.addEventListener("htmx:response", function (event) {
//   const xhr = event.detail.xhr;
//   if (xhr.status === 401 || xhr.status === 403) {
//     // Redirect to the login page or handle as needed
//     alert("Testing2");
//     window.location.href = "/login";
//   }
// });

// document.addEventListener("htmx:responseError", function (event) {
//   const xhr = event.detail.xhr;
//   if (xhr.status === 401 || xhr.status === 403) {
//     // Redirect to the login page or handle as needed
//     alert("Testing3");
//     window.location.href = "/login";
//   }
// });

document.addEventListener("htmx:response", function (event) {
  const xhr = event.detail.xhr;
  console.log("Response Status Code:", xhr.status);
  console.log("HX-Redirect Header:", xhr.getResponseHeader("HX-Redirect"));

  if (xhr.status === 401 || xhr.getResponseHeader("HX-Redirect") === "/login") {
    console.log("Redirecting to login");
    window.location.href = "/login";
  }
});

document.addEventListener("htmx:response", function (event) {
  // Handle successful responses
  const xhr = event.detail.xhr;
  console.log("Response Status Code:", xhr.status);
  console.log("HX-Redirect Header:", xhr.getResponseHeader("HX-Redirect"));

  if (xhr.status === 401 || xhr.getResponseHeader("HX-Redirect") === "/login") {
    console.log("Redirecting to login");
    window.location.href = "/login";
  }
});

document.addEventListener("htmx:responseError", function (event) {
  // Handle response errors
  const xhr = event.detail.xhr;

  if (xhr.status === 401) {
    console.log("Authentication error, redirecting to login");
    window.location.href = "/login";
  } else {
    // Handle other types of errors as needed
    console.error("Unexpected error:", xhr.status, xhr.statusText);
  }
});
