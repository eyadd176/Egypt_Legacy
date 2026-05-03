/*==============================change theme=======================*/
function toggleTheme() {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.getElementById('theme-icon').textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('theme-icon').textContent = '🌙';
  }
});


/*============================================login page=======================================*/
function showRegister() {
  document.querySelector('.login-form').style.display = 'none';
  document.querySelector('.register-form').style.display = 'block';
}

function showLogin() {
  document.querySelector('.register-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
}

function validateLogin() {
    let email=document.getElementById('lemail').value;
    let pass=document.getElementById('lpass').value;
    if (email == '') {
        alert('please enter your email');
        return false;
    }
    if (!email.includes('@')) {
        alert('email is not valid');
        return false;
    }
    if (pass == '') {
        alert('please enter your password');
        return false;
    }
    if (pass.length < 8) {
        alert('password is too short');
        return false;
    }
    sessionStorage.setItem('userEmail', email);
    return true;
}

function validateRegister() {
    let name=document.getElementById('name').value;
    let email=document.getElementById('remail').value;
    let pass=document.getElementById('rpass').value;
    let cpass=document.getElementById('cpass').value;

    if (name == '') {
        alert('please enter your name');
        return false;
    }
    if (email == '') {
        alert('please enter your email');
        return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
        alert('please enter a valid email');
        return false;
    }
    if (pass == '') {
        alert('please enter a password');
        return false;
    }
    if(pass.length < 8) {
        alert('password must be at least 6 characters');
        return false;
    }
    if (pass != cpass) {
        alert('passwords do not match');
        return false;
    }
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    alert('account created! you can login now');
    showLogin();
    return true;
}

/*======================================home page============================================*/
document.addEventListener("DOMContentLoaded", () =>
    {
    const content = document.querySelector('.main-content');
    content.style.opacity = "0";
    content.style.transition = "opacity 2s ease-in-out, transform 1.5s ease-out";
    content.style.transform = "translateY(20px)"; 
    setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
    }, 500);
});

/*=================================================payment page===========================================*/
function calcPrice() {
    var type = document.getElementById("type").value;
    var place = document.getElementById("place").value;
    var count = document.getElementById("count").value;

    var egypt = [40, 50, 30, 20, 25, 300, 15, 35];
    var arab= [150, 200, 100, 75, 125, 550, 50, 175];
    var foreign = [350, 400, 250, 200, 300, 800, 150, 300];
    var student =[20, 25, 15, 10, 10, 100, 5, 20];

    var index = Number(place);
    var price = 0;

    if (type == "egypt")        price = egypt[index];
    else if (type == "arab")    price = arab[index];
    else if (type == "foreign") price = foreign[index];
    else if (type == "student") price = student[index];

    document.getElementById("price").innerHTML = "Price: " + (price * count) + " EGP";
}

function togglePayment() {
    var m = document.getElementById("method").value;

    document.getElementById("cardBox").style.display = "none";
    document.getElementById("vodafoneBox").style.display = "none";

    if (m == "card") {
        document.getElementById("cardBox").style.display = "block";
    }
    if (m == "vodafone") {
        document.getElementById("vodafoneBox").style.display = "block";
    }
}

function checkReady() {
    var type = document.getElementById("type").value;
    var place = document.getElementById("place").value;
    var m =document.getElementById("method").value;
    var date=document.getElementById("visitDate").value;

    var extraReady = true;

    if (m == "card") {
        var card = document.getElementById("card").value;
        var cvv  = document.getElementById("cvv").value;
        if (card == "" || cvv == "") {
            extraReady = false;
        }
    }

    if (m == "vodafone") {
        var phone = document.getElementById("phone").value;
        if (phone == "") {
            extraReady = false;
        }
    }

    if (type && place && m && date && extraReady) {
        document.getElementById("payBtn").disabled = false;
    } else {
        document.getElementById("payBtn").disabled = true;
    }
}

function validateForm() {
    var type =document.getElementById("type").value;
    var place =document.getElementById("place").value;
    var m =document.getElementById("method").value;
    var date=document.getElementById("visitDate").value;

    if (type == "") {
        alert("choose a visitor type first!");
        return;
    }

    if (place == "") {
        alert("choose a museum!");
        return;
    }

    if (m == "") {
        alert("choose a payment method!");
        return;
    }

    if (m == "card") {
        var card=document.getElementById("card").value;
        var cvv =document.getElementById("cvv").value;

        if (card == "") {
            alert("enter your card number!");
            return;
        }
        if (card.length < 16) {
            alert("card number is too short!");
            return;
        }
        if (cvv == "") {
            alert("enter your CVV!");
            return;
        }
    }

    if (m == "vodafone") {
        var phone = document.getElementById("phone").value;
        if (phone == "") {
            alert("enter your phone number!");
            return;
        }
        if (phone.length<11) {
            alert("phone number is not valid!");
            return;
        }
    }
    if (date == "") {
        alert("choose a visit date!");
        return;
    }
    localStorage.setItem('bookedMuseum', place);
    localStorage.setItem('visitDate', date);
    localStorage.setItem('visitorType', type);

    document.getElementById("loading").style.display = "block";

    setTimeout(function() {
        document.getElementById("loading").style.display = "none";
        document.getElementById("msg").style.display = "block";
    }, 1500);
}

function resetForm() {
    setTimeout(function() {
        document.getElementById("payBtn").disabled = true;
        document.getElementById("loading").style.display = "none";
        document.getElementById("msg").style.display = "none";
        document.getElementById("price").innerHTML = "Price: 0 EGP";
        document.getElementById("cardBox").style.display = "none";
        document.getElementById("vodafoneBox").style.display = "none";
    }, 10);
}


/*===========================contact us page===========================*/

      function toggleTextarea() {
        let otherRadio = document.getElementById("Other");
        let textarea = document.getElementById("otherText");
        if (otherRadio.checked) {
          textarea.disabled = false;
          textarea.focus();
        } else {
          textarea.disabled = true;
          textarea.value = "";
        }
      }

      function validateForm() {
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let reasonSelected = document.querySelector(
          'input[name="Reason"]:checked',
        );
        let otherText = document.getElementById("otherText").value.trim();

        if (name === "") return alert("Please enter your name.");
        if (email === "") return alert("Please enter your email.");
        if (!reasonSelected) return alert("Please choose a reason.");
        if (reasonSelected.value === "Other" && otherText === "")
          return alert("Please describe your issue.");

        alert("✔ Your message has been sent successfully!");
        document.getElementById("contactForm").submit();
      }

      function toggleTextarea() {
        let otherRadio = document.getElementById("Other");
        let textarea = document.getElementById("otherText");

        if (otherRadio.checked) {
          textarea.disabled = false;
          textarea.focus();
        } else {
          textarea.disabled = true;
          textarea.value = "";
        }
      }

      function validateForm() {
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let reasonSelected = document.querySelector(
          'input[name="Reason"]:checked',
        );
        let otherText = document.getElementById("otherText").value.trim();

        if (name === "") {
          alert("Please enter your name.");
          return;
        }

        if (email === "") {
          alert("Please enter your email.");
          return;
        }
        if (!reasonSelected) {
          alert("Please choose a reason.");
          return;
        }

        if (reasonSelected.value === "Other" && otherText === "") {
          alert("Please describe your issue in the text area.");
          return;
        }
   
        alert("✔ Your message has been sent successfully!");
        document.getElementById("contactForm").submit();
      }
    