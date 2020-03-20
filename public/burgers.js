$(function() {
  $(".delburger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(function() {
      console.log("deleted id ", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-burger").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newQuote = {
      burger_name: $("#burgers")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newQuote
    }).then(function() {
      console.log("created new burgers");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".update-burger").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var updatedBurger = {
      burger_name: $("#burger")
        .val()
        .trim()
    };

    var id = $(this).data("id");

    // Send the POST request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: updatedBurger
    }).then(function() {
      console.log("updated burger");
      // Reload the page to get the updated list
      location.assign("/");
    });
  });
});
