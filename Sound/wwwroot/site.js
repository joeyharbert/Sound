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
        $.each(data, function(key, item) {
          //const tr = $("<audio controls>")
           //   .append($("<source />", {src: item.url, type:"audio/wav"}))
            //  .append($("</audio>"));
            //tr.appendTo(tBody);
            const button = "<button onclick=\"playSound('" + item.url + "')\">" + item.title + "</button>";
            innerHTML += button;
            
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