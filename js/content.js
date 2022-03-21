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
let totalOrders = [];
let totalOrderPrice = 0;
let totalPrice = 0;
let total = 0;
let price = 0;
let cPrice = 0;

//calculate all items total
let allItemsTotal = () => {};

//Calculate total after delivery choice
let getWholeTotal = () => {};

//Pizza Constructor function
function Pizza(name, size, crust, number, toppings, total) {
  this.name = name;
  this.size = size;
  this.crust = crust;
  this.number = number;
  this.toppings = toppings;
  this.total = total;
}

//add item click event
$("#add").click((e) => {
  e.preventDefault();

  $("#loc-form").trigger("reset");

  //get order form details
  let flavour = $("#flavor option:selected").val();
  let size = $("#size  option:selected").val();
  let crust = $("#crust option:selected").val();
  let number = $("#quantity").val();

  if (size == "" || crust == "" || number == "") {
    alert("please enter All the  details");
  } else if (flavour == "0") {
    alert("please Choose a flavour");
  } else if (crust == "0") {
    alert("please Choose a crust");
  } else if (size == "0") {
    alert("please choose a size");
  } else if (toppings.length === 0) {
    alert("Please choose atleast one crust");
  } else {
    //get calculate total price
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

      return total;
    };

    //pizza order instance
    var pizzaOrder = new Pizza(flavour, size, crust, number, toppings);

    //array containing orders total
    totalOrders.push(pizzaOrder.calculateTotal(size, crust, number, toppings));

    //calculate total price of items without delivery charge
    allItemsTotal = () => {
      for (let i = 0; i < totalOrders.length; i++) {
        totalOrderPrice += totalOrders[i];
      }

      console.log(totalOrders);
      totalOrders.length = 0;
      return totalOrderPrice;
    };

    //append
    $("#orders").append(`
<tr>
<td id="pname">${pizzaOrder.name}</td>
<td id="psize">${pizzaOrder.size}</td>
<td id="pcrust">${pizzaOrder.crust}</td>
<td id="ptopping">${pizzaOrder.toppings.join(",")}</td>
<td id="total">${pizzaOrder.calculateTotal(size, crust, number, toppings)}</td>
</tr>
`);
    $("#total-price").text(allItemsTotal());

    $("#checkout").fadeIn(1000);
    $("table").fadeIn(1000);
  }
});

//checkout button even listener
$("#checkout").click((e) => {
  e.preventDefault();

  //hide table and order form on checkout clicked
  $("#add").fadeOut(1000);
  $("table").fadeOut(1000);
  $(".order-form").fadeOut(1000);
  $(".output").slideUp(2000).fadeIn(1000);
  $("#checkout").fadeOut(1000);
});

//show location form based on radio button for delivery
$("input[name='mod']").on("change", () => {
  //show enter location form

  if ($("input[name='mod']:checked").val() == "pick") {
    document.getElementById("pick-d").style.display = "none";
  } else {
    document.getElementById("pick-d").style.display = "flex";
  }
});

$("#complete").click((e) => {
  e.preventDefault();

  let userName = $("#nm").val();
  let userLocation = $("#loc").val();
  let userPhone = $("#tel").val();
  console.log(userName + userPhone + userLocation);

  //show confimation message
  let showConfirm = () => {
    // hide output container
    $(".output").hide();
    alert("order received");

    //show summmary
    $(".summary").fadeIn(1000);
  };
  //get total based on delivery or not
  getWholeTotal = () => {
    totalPrice = 0;
    if ($("input[name='mod']:checked").val() == "home") {
      if (userName == "" || userLocation == "" || userPhone == "") {
        if (userName == "") {
          alert("Please enter a name");
        } else if (userPhone == "") {
          alert("Please enter a Phone Number to allow us to contact you");
        } else {
          alert("Please enter a Delivery location");
        }
      } else {
        totalPrice = 200 + allItemsTotal();
        showConfirm();
      }
    } else {
      totalPrice = allItemsTotal();
      showConfirm();
    }

    return totalPrice;
  };
  console.log(userName + userPhone + userLocation);
  if (userName != "" && `userLocation` != "") {
    $(".s-name").text(`Thank you ${userName} for ordering with us.
    Your Order of Kshs. ${getWholeTotal()} inclusive of delivery charge of Kshs.200 has been received and will be delivered
    at ${userLocation}`);
  } else {
    $(".s-name").text(
      `Thank you for ordering with us.Your Order of Kshs${getWholeTotal()} has been received`
    );
  }
});

$("#sum-button").click((e) => {
  //reset location form

  //show order form
  $("#add").fadeIn(1000);
  $(".order-form").fadeIn(1000);

  //clear orders-table data
  $("#orders").empty();

  //clear order form
  $("#order-fm").trigger("reset");

  //hide summary container
  $(".summary").fadeOut(1000);

  window.location.reload();
});

// keep track of current toppings
$("input[name='top']").on("change", () => {
  //clear array every time toppings change
  toppings.length = 0;
  $.each($("input[name='top']:checked"), function () {
    toppings.push($(this).val());
    console.log(toppings);
  });
});
