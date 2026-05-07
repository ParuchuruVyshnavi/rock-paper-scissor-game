

const profileInput =
  document.getElementById(
    "profile-pic"
  );

const preview =
  document.getElementById(
    "preview"
  );



if(profileInput) {

  profileInput.addEventListener(
    "change",
    function() {

      const reader =
        new FileReader();

      reader.onload = function(e) {

        preview.src =
          e.target.result;

      };

      reader.readAsDataURL(
        this.files[0]
      );

    }
  );

}



function verifyEmail() {

  const email =
    document.getElementById(
      "reg-email"
    ).value;

  if(email.includes("@")) {

    alert(
      "📧 Verification Successful!"
    );

    localStorage.setItem(
      "emailVerified",
      true
    );

  }

  else {

    alert(
      "❌ Invalid Email"
    );

  }

}



function register() {

  const username =
    document.getElementById(
      "reg-username"
    ).value;

  const email =
    document.getElementById(
      "reg-email"
    ).value;

  const password =
    document.getElementById(
      "reg-password"
    ).value;

  const confirmPassword =
    document.getElementById(
      "confirm-password"
    ).value;

  const verified =
    localStorage.getItem(
      "emailVerified"
    );

  if(!verified) {

    alert(
      "Verify Email First!"
    );

    return;

  }

  if(password !== confirmPassword) {

    alert(
      "❌ Passwords Do Not Match!"
    );

    return;

  }

  localStorage.setItem(
    "username",
    username
  );

  localStorage.setItem(
    "email",
    email
  );

  localStorage.setItem(
    "password",
    password
  );

  localStorage.setItem(
    "profilePic",
    preview.src
  );

  alert(
    "✅ Registration Successful!"
  );

  window.location.href =
    "index.html";

}

function login() {

  const username =
    document.getElementById(
      "login-username"
    ).value;

  const password =
    document.getElementById(
      "login-password"
    ).value;

  const savedUsername =
    localStorage.getItem(
      "username"
    );

  const savedPassword =
    localStorage.getItem(
      "password"
    );

  if(
    username === savedUsername &&
    password === savedPassword
  ) {

    alert(
      "🎮 Login Successful!"
    );

    window.location.href =
      "game.html";

  }

  else {

    alert(
      "❌ Invalid Credentials"
    );

  }

}