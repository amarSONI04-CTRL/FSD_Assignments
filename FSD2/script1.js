function validateForm() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  errorMsg.textContent = "";

  // 1️⃣ Check empty fields
  if (!username || !email || !phone || !password || !confirmPassword) {
    errorMsg.textContent = "All fields are required.";
    return false;
  }

  // 2️⃣ Validate Email (letters before @, 3 letters between @ and ., 2-3 letters after .)
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z]{3,}\.[A-Za-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    errorMsg.textContent = "Invalid email format.";
    return false;
  }

  // 3️⃣ Validate Phone (10 digits numeric)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    errorMsg.textContent = "Phone number must be 10 digits and numeric only.";
    return false;
  }

  // 4️⃣ Validate Password (≥7 chars, one capital, one digit, one special from &,$,#,@)
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}$/;
  if (!passwordPattern.test(password)) {
    errorMsg.textContent =
      "Password must be ≥7 chars, with one capital, one digit, and one special (&,$,#,@).";
    return false;
  }

  // 5️⃣ Match Passwords
  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return false;
  }

  alert("Registration successful!");
  return true;
}
