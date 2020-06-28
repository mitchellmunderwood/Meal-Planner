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

// drink API pull, populate, and render functions

function drinkPull(text) {
    queryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + text
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log("raw api data", response);
        var response_length = response.drinks.length - 1
        var limit = 9
        if (response_length < 9) {
            limit = response_length;
        }
        drinks = [];
        for (i = 0; i <= limit; i++) {
            drinks.push(drinkParse(response.drinks[i]));
        }
        console.log('parsed api data', drinks);
        drinkRender();
    });
}

function drinkParse(object) {
    var new_object = {};
    new_object.name = object.strDrink;
    new_object.img = object.strDrinkThumb;
    new_object.id = object.idDrink;
    return new_object;
}

function drinkRender() {
    $("#drink_box_cocktails").empty();
    for (i = 0; i < drinks.length; i++) {
        var drink_item = drinks[i];
        if (drink_item.name) {
            var new_drink = makeColumn("col s12 m12", "fade-left").append(makeCard().append(makeCardImage(drink_item.img, drink_item.name)));
            $("#drink_box_cocktails").append(new_drink);
        }
    }

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

