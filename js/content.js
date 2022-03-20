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

  if (name != "" && email != "" && message != "") {
    alert("We have received your message");
    $("#contact-form").trigger("reset");
  } else {
    notEmpty(name, email, message);
  }
});



//order form

let toppings = [];
let total = 0;
let price = 0;
let cPrice = 0;

function Pizza(name, size, crust, number, toppings,total) {
  this.name = name;
  this.size = size;
  this.crust = crust;
  this.number = number;
  this.toppings = toppings;
  this.total = total;
}
$("#add").click((e) => {
  e.preventDefault();

  let flavour = $("#flavor option:selected").val();
  let size = $("#size  option:selected").val();
  let crust = $("#crust option:selected").val();
  let number = $("#quantity").val();

  //get toppings function
  Pizza.prototype.calculateTotal = function (size, crust, number, toppings) {


    //get price based on size
    switch (size) {
      case "0":
        price = 0;
        break;
      case "small":
        price = 650;
        break;
      case "medium":
        price = 850;
        break;
      case "large":
        price = 1200;
        break;
      default:
        console.log("error");
    }

    //get crust
    switch (crust) {
      case "0":
        cPrice = 0;
        break;
      case "crispy":
        cPrice = 200;
        break;
      case "stuffed":
        cPrice = 500;
        break;
      case "gluten-free":
        cPrice = 700;
        break;
      default:
        console.log("error");
    }

    if (size == "large") {
      totalToppings = 200 * toppings.length;
    } else if (size == "medium") {
      totalToppings = 150 * toppings.length;
    } else {
      totalToppings = 65 * toppings.length;
    }

    total = (price + cPrice + totalToppings) * number;
    // console.log(totalToppings);
    console.log("price", price);
    console.log("crust", cPrice);
    console.log(total);
    return total;
  };

   var pizzaOrder = new Pizza(flavour, size, crust, number, toppings);
  console.log(pizzaOrder);
  console.log(pizzaOrder.calculateTotal(size, crust, number, toppings));

  // console.log(pizzaOrder);
  //console.log(toppings.join(","));

//append
$("#orders").append(`
<tr>
<td id="pname">${pizzaOrder.name}</td>
<td id="psize">${pizzaOrder.size}</td>
<td id="pcrust">${pizzaOrder.crust}</td>
<td id="ptopping">${pizzaOrder.toppings.join(",")}</td>
<td id="total">${pizzaOrder.calculateTotal(size, crust, number, toppings)}</td>
</tr>
`)

$("#checkout").fadeIn(1000);
$("table").fadeIn(1000);


});

$("#checkout").click((e)=>{
  e.preventDefault();
  $("#add").fadeOut(1000);

    
});

$("input[name='mod']").on("change",()=>{
  //show enter location form
  if("input[value = 'home']:checked"){
  
    $(".pick-details").toggleClass("show-form");
  }

  else{
      
    $(".pick-details").toggleClass("show-form");
  }

  $("#complete").click((e)=>{
    e.preventDefault();
    alert("order received")
    $("loc").trigger("reset");
    $(".pick-details").hide();
    $("input[value = 'home']").prop("checked",false);
  })

})







// keep track of current toppings
$("input[name='top']").on("change", () => {
  //clear array every time toppings change
  toppings.length = 0;
  $.each($("input[name='top']:checked"), function () {
    toppings.push($(this).val());
    console.log(toppings);
  });
});
