//navigation

$(".show-menu").click(() => {
  $("nav").toggle();
  $(".show-menu").toggle();
});

$(".tog-nav").click(() => {
  $("nav").toggle();
  $(".show-menu").toggle();
});

//contact form validation

const notEmpty = (name, email, message) => {
  name == "" && email == "" && message
    ? alert("Please fill the fields")
    : name == ""
    ? alert("name cannot be empty")
    : email == ""
    ? alert("email cannot be empty")
    : message == ""
    ? alert("message cannot be empty")
    : validateEmail(email);
};

const validateEmail = (email) => {
  var validEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validEmail)) {
    alert("Please enter a valid email");
  }
};

//Email Validation
$("#submit-btn").click((e) => {
  //to prevent the form from reloading

  e.preventDefault();
  let name = $("#name").val();
  let email = $("#email").val();
  let message = $("#msg").val();

  // validate emails

  if(name != "" && email != "" && message != "") {
    alert("We have received your message");
     $("#contact-form").trigger("reset");
  
  } else {
    notEmpty(name, email, message);
  }
});
