// var modal = document.getElementById("myModal");
      
// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// btn.onclick = function() {
//   modal.style.display = "block";
//   event.preventDefault();
// }

$(document).ready(function () {
    $("form").submit(function (event) {
      var request;
      $(".help-block ").remove();
      var order = {
        name: $("#name").val(),
        email: $("#email").val(),
        address: $("#address").val(),
        size: $("#size").val(),
        kind: $("#kind").val(),
      };
       validation(order);
  
      event.preventDefault();
    });
     });


$("#placeOrder").click(function (event) 
  {
      var order = {
        name: $("#name").val(),
        email: $("#email").val(),
        address: $("#address").val(),
        size: $("#size").val(),
        kind: $("#kind").val(),
      };
      response(order);
  });

$(".close").click(function (event){
     
  $("#myModal").css("display", "none");
 });

 
$("#orderEmail").click(function (event) {
  // var Email = prompt("Email should  be verified in Aws account in order to recieve email","satwinder47@outlook.com")
  alert("Email should be verified in AWS SES account in order to send email. My account is in Sandbox mode. So right know by default emails are sent to satwinder47@outlook.com. Press ok to send email. ")
  var order = {
    name: $("#name").val(),
    email: $("#email").val(),
    address: $("#address").val(),
    size: $("#size").val(),
    kind: $("#kind").val(),
  };
  Email(order);
});

$("#findOrder").click(function (event) {
  var order = prompt("Enter name to find your order");
  // var order = {
  //   name: $("#name").val()
  // };
  console.log(order);
  find(order);
});



  
function response( order){
                const data = JSON.stringify(order);
            $.ajax({
              type: "POST",
              dataType: "json",
              url:"https://3g7mx1pky5.execute-api.ca-central-1.amazonaws.com/dev/order",
              data: data,
              crossDomain:true,
              success: function(response) {
                // var name = item.name;
                    var text = JSON.stringify(response);
                    console.log(response);
                    alert(text);
        
              },error: function(response) {
                    obj = JSON.parse(response.responseText);
                    $("#error").addClass("has-error");
                    $("#error").append(obj);
              }
        });
  }


function validation(order){
    if (order.name.length == '') {
            
      $("#fname").addClass("has-error");
      $("#fname").append(
        '<div class="help-block">' + "Name is required" + "</div>"
      );
    }

    if (order.email.length == '') {
      $("#femail").addClass("has-error");
      $("#femail").append(
        '<div class="help-block">' + "Email is required" + "</div>"
      );
    }

    if (order.address.length == '') {

      $("#faddress").addClass("has-error");
      $("#faddress").append(
        '<div class="help-block">' + "Address is required" + "</div>"
      );
    }
   else {
    $("#myModal").css("display", "block");
    orderDetails();
  }
}
 
function orderDetails(){
    var name = $("#name").val();
     var   email = $("#email").val();
     var   address = $("#address").val();
     var   size = $("#size").val();
      var  kind = $("#kind").val();
    $("#table-name").append(name);
    $("#table-email").append(email);
    $("#table-address").append(address);
    $("#table-size").append(size);
    $("#table-kind").append(kind);
  }

function Email(order){
  const data = JSON.stringify(order);
  $.ajax({
    type: "POST",
    dataType: "json",
    url:"https://3g7mx1pky5.execute-api.ca-central-1.amazonaws.com/dev/email",
    data: data,
    crossDomain:true,
    success: function(response) {
          var text = JSON.stringify(response);
         
          alert(text);

    },error: function(response) {
          obj = JSON.parse(response.responseText);
          $("#error").addClass("has-error");
          $("#error").append(obj);
    }
});

}

function find( order){
  // const data = JSON.stringify(order);
  const data = order;
$.ajax({
type: "POST",
dataType: "json",
url:"https://3g7mx1pky5.execute-api.ca-central-1.amazonaws.com/dev/find",
data: data,
crossDomain:true,
success: function(response) {
  var text = JSON.stringify(response);
  // console.log(response);
  // console.log(response.orderDate);
      // const text = JSON.parse(item);
      // var text = JSON.parse(response);
    //  $("#error").addClass("has-error");
      // $("#error").append(response);
      alert(text);

},error: function(response) {
      obj = JSON.parse(response.responseText);
      $("#error").addClass("has-error");
      $("#error").append(obj);
}
});
}