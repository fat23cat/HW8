(function($) {
  $.fn.myPlugin = function(options) {
    var settings = $.extend({
      cities: ["Omsk", "Norilsk", "Minsk", "London"],
      direction: "up"
    }, options);
    var cities = settings.cities;
    var direction = settings.direction;

    if (!Array.isArray(cities)) {
      return console.log("Wrong cities: cities isn't array");
    }
    if (direction != "up" && direction != "down") {
      return console.log('Wrong direction: only "up" or "down"');
    }
    if ($("ul").data("applied") !== "true") {
      $("ul").data("applied", "true");

      $("li").on("click", function() {
        if (direction == "up" && $(this).prevAll().length > 0) {
          $(this).slideUp(500, replace).slideDown(500);
        } else if (direction == "down" && $(this).nextAll().length != 0) {
          $(this).slideUp(500, replace).slideDown(500);
        }

        function replace() {
          if (direction == "up") {
            $(this).insertBefore($("ul").find(':first-child'));
          } else if (direction == "down") {
            $(this).insertAfter($("ul").find(':last-child'));
          }
        };
      });

      return $("li").each(function(i, elem) {
        var text = $(elem).text();
        var lowerText = text.toLowerCase();
        var settLength = cities.length;
        for (var j = 0; j < settLength; j++) {
          if (lowerText.indexOf(cities[j].toLowerCase()) >= 0) {
            $.ajax({
              type: "GET",
              url: "https://api.openweathermap.org/data/2.5/weather?q=" + cities[j] + "&appid=2b400fcfbb9667f0b901ace06cbaba0d&units=metric",
              success: function(data) {
                $(elem).text(text + " || " + Math.round(data.main.temp) + "°C" + " in " + data.name + ", by the way");
              },
              error: function() {
                console.log("GET request didn't execute");
              }
            });
          }
        }
      });
    } else {
      console.log("myPlugin has already applied");
    }
  };
})(jQuery);
