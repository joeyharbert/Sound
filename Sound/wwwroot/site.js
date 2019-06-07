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
      const tBody = $("#sounds");

      $(tBody).empty();

      getCount(data.length);

        $.each(data, function(key, item) {
          const tr = $("<audio controls>")
              .append($("<source />", {src: item.url, type:"audio/wav"}))
              .append($("</audio>"));
        tr.appendTo(tBody);
      });

      sounds = data;
    }
  });
}


// TRYNA FIGURE OUT HOW TO MAKE AUDIO PLAY