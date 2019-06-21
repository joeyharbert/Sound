const uri = "api/sound";
let sounds = null;
function getCount(data) {
  const el = $("#counter");
  let name = "sound";
  if (data) {
    if (data > 1) {
      name = "sounds";
    }
    el.text(data + " " + name);
  } else {
    el.text("No " + name);
  }
}

$(document).ready(function() {
  getData();
});

function getData() {
  $.ajax({
    type: "GET",
    url: uri,
    cache: false,
    success: function(data) {
      const tBody = document.getElementById("sounds");

      $(tBody).empty();

      getCount(data.length);
        var innerHTML = "";
        var i = 0;
        $.each(data, function(key, item) {
            const rowCount = 6;
            const openRow = "<tr>"
            const closeRow = "</tr>"
            const openCell = "<td>"
            const closeCell= "</td>"
            const button = "<button class=\"sound " + item.type + "\"onclick=\"playSound('" + item.url + "')\">" + item.title + "</button>";
            var line = ""
            // if i is divisible by the number of cells in a row it is the start of a row
            if (i%rowCount === 0) {
                line += openRow;
            }

            //add button
            line = openCell + button + closeCell;

            // if i + 1 is divisible by the number of cells in a row it is the end of a row
            if ((i + 1) % rowCount === 0) {
                line += closeRow
            }
            innerHTML += line;       
            i++;
        });
        tBody.innerHTML = innerHTML;

        sounds = data;
    }
  });
}

function playSound(url) {
    console.log(url);
    var audio = new Audio(url);
    audio.play();
}