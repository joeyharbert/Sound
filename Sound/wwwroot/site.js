const uri = "api/sound";
let sounds = null;


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
        const dropdown = document.getElementById("typedropdown");
        var type = [];

      $(tBody).empty();
        var innerHTML = tableHTML(data, type);

        tBody.innerHTML = innerHTML;

        var dropdownInnerHTML = dropdown.innerHTML;

        for (i = 0; i < type.length; i++) {
            dropdownInnerHTML += "<option value=\"" + type[i] + "\">" + type[i] + "</option>";
        }

        dropdown.innerHTML = dropdownInnerHTML;

        sounds = data;
    }
  });
}

function tableHTML(data, type) {
    var innerHTML = "";
    var i = 0;
    $.each(data, function(key, item) {
        const rowCount = 6;
        const openRow = "<tr>"
        const closeRow = "</tr>"
        const openCell = "<td class=\"sound " + item.type + "\">"
        const closeCell= "</td>"
        const button = "<button onclick=\"playSound('" + item.url + "')\">" + item.title + "</button>";
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

        //add type to type array
        if (!(type.includes(item.type))) {
            type.push(item.type);
        }
    });

    return innerHTML;
}

function playSound(url) {
    console.log(url);
    var audio = new Audio(url);
    audio.play();
}

function changeView() {
    const dropdown = document.getElementById("typedropdown");
    const value = dropdown.value;
    /*
    const soundElements = document.getElementsByClassName("sound");

    for (var i = 0; i < soundElements.length; i++) {
        if (value == "All" || soundElements[i].className.substring(6) == value) {
            soundElements[i].style.display = "";
        } else {
            soundElements[i].style.display = "none";
        }
    } 
    */

    const tBody = document.getElementById("sounds");
    var newSounds = sounds;

    if (value !== "All") {
        newSounds = sounds.filter(sound => sound.type == value);
    }

    tBody.innerHTML = tableHTML(newSounds, []);
}