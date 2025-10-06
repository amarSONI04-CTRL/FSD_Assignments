// Wait for DOM to load
window.onload = function () {
  // 1️⃣ Access elements using getElementById
  const heading = document.getElementById("mainHeading");
  heading.innerHTML = "Welcome to JavaScript & jQuery Demo Page";

  // 2️⃣ Access elements using getElementsByTagName
  const paragraphs = document.getElementsByTagName("p");
  paragraphs[0].style.color = "blue";
  paragraphs[0].innerHTML = "This text and color were changed using JavaScript.";

  // 3️⃣ Access elements using getElementsByClassName
  const infoElements = document.getElementsByClassName("info");
  infoElements[0].style.position = "relative";
  infoElements[0].style.left = "0px";

  // 4️⃣ Change image source on button click
  const imageBtn = document.getElementById("changeImageBtn");
  const image = document.getElementById("demoImage");
  imageBtn.onclick = function () {
    image.src = "https://via.placeholder.com/200x150/4CAF50/FFFFFF?text=New+Image";
  };

  // 5️⃣ Add a text node and attach it
  const addTextBtn = document.getElementById("addTextBtn");
  const deleteTextBtn = document.getElementById("deleteTextBtn");
  const parentNode = document.getElementById("parentNode");
  let textNode;

  addTextBtn.onclick = function () {
    textNode = document.createTextNode("This is a dynamically added text node!");
    parentNode.appendChild(textNode);
  };

  // 6️⃣ Delete a node
  deleteTextBtn.onclick = function () {
    if (textNode) {
      parentNode.removeChild(textNode);
      textNode = null;
    }
  };
};

// 🌟 jQuery Section 🌟
$(document).ready(function () {
  // 7️⃣ Change button text using jQuery
  $("#jqueryBtn").click(function () {
    $(this).text("Clicked!");
  });

  // 8️⃣ Set background-image using jQuery CSS property
  $("body").css("background-image", "linear-gradient(to right, #e0eafc, #cfdef3)");

  // 9️⃣ Access HTML form data using jQuery
  $("#formSubmit").click(function () {
    const username = $("#username").val();
    const email = $("#email").val();

    if (username === "" || email === "") {
      alert("Please fill all form fields.");
    } else {
      alert(`Form Data:\nUsername: ${username}\nEmail: ${email}`);
    }
  });

  // 🔟 Add attribute using jQuery
  $("#demoImage").attr("title", "Hover text added using jQuery");
});
