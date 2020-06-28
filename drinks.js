// HTML Objects
var drink_modal = $("#modal1");
var drinks_modal_cancel = $("#drinks_modal_cancel");
var spirit_select = $("#spirit_select");
var spirit_add_textEl = $("#spirit_add_text");
var drink_box_lists = $("#drink_box_lists")

// Data Objects
var drinks = [];

// Event Handlers
$("#drinks_modal_open").on("click", function () {
    drink_modal.css("display", "block");
})

$("#drinks_modal_close").on("click", function () {
    drink_modal.css("display", "none");
    makeNewMix();
    clearSpiritSelect();

})

$("#drinks_modal_cancel").on("click", function () {
    drink_modal.css("display", "none");
    clearSpiritSelect();
})

$("#drink_box_lists").on("click", function (event) {
    event.stopPropagation();
    var text = event.target.innerHTML;
    var array = text.split(",");
    var new_array = [];
    for (i = 0; i < array.length; i++) {
        new_array.push(array[i].trim());
    }
    var new_text = new_array.join(",");
    drinkPull(new_text);
})

spirit_add_textEl.keydown(function (event) {

    var name = spirit_add_textEl.val();
    if (event.key === 'Enter' && name !== "") {
        spirit_select.append(createSpiritItem(name));
        spirit_add_textEl.val("");
    }
});

// functions

// modal and drink mix list functions
function createSpiritItem(name) {
    var span = $("<span>").text(name);
    var input = $("<input>").attr("type", "checkbox").attr("class", "filled-in").attr("value", name);
    var label = $("<label>");
    var p = $("<p>").attr("class", "spirit_item");
    label.append(input, span);
    p.append(label);
    return p
}

function clearSpiritSelect() {
    $("input[type='checkbox']").prop("checked", false)
}

function makeNewMix() {
    var selected_spirits = [];
    $.each($("input[type='checkbox']:checked"), function () {
        selected_spirits.push($(this).val());
    });
    console.log("new mix made", selected_spirits);
    createMixList(selected_spirits);
}

function createMixList(array) {
    var div = $("<div>").text(array.join(", ")).attr("class", "mix_list");
    // console.log(div);
    drink_box_lists.append(div);
}

// supporting HTML Object functions

function makeRow() {
    return $("<div>").attr("class", "row")
}

function makeColumn(class_string, data_aos) {
    return $("<div>").attr("class", class_string).attr("data-aos", data_aos);
}

function makeCard() {
    return $("<div>").attr("class", "card")
}

function makeCardImage(drink_img, drink_title) {
    var div = $("<div>").attr("class", "card-image");
    var img = $("<img>").attr("src", drink_img)
    var span = $("<span>").attr("class", "card-title").text(drink_title).attr("style", "background:black;");
    return div.append(img, span);
}

