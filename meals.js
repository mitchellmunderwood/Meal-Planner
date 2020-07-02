var meal_modal = $("#modal1");
var meal_select = $("#meal_select");
var meal_add_textEl = $("#meal_add_text");
var meal_modal_cancel = $("#meal_modal_cancel");
var meal_box_lists = $("#meal_box_lists");
var meals = [];

$("#meal_modal_open").on("click", function () {
  meal_modal.css("display", "block");
});

$("#meal_modal_close").on("click", function () {
  meal_modal.css("display", "none");
  makeNewMix();
  clearMealSelect();
});

$("#meal_modal_cancel").on("click", function () {
  meal_modal.css("display", "none");
  clearMealSelect();
});

$("#meal_box_lists").on("click", function (event) {
  event.stopPropagation();
  var text = event.target.innerHTML;
  var array = text.split(",");
  var new_array = [];
  for (i = 0; i < array.length; i++) {
    new_array.push(array[i].trim());
  }
  var new_text = new_array.join(",");
  mealPull(new_text);
});

meal_add_textEl.keydown(function (event) {
  var name = meal_add_textEl.val();
  console.log("hi");
  if (event.key === "Enter" && name !== "") {
    meal_select.append(createMealItem(name));
    meal_add_textEl.val("");
  }
});

function createMealItem(name) {
  var span = $("<span>").text(name);
  var input = $("<input>")
    .attr("type", "checkbox")
    .attr("class", "filled-in")
    .attr("value", name);
  var label = $("<label>");
  var p = $("<p>").attr("class", "meal_item");
  label.append(input, span);
  p.append(label);
  return p;
}

function clearMealSelect() {
  $("input[type='checkbox']").prop("checked", false);
}

function makeNewMix() {
  var selected_meals = [];
  $.each($("input[type='checkbox']:checked"), function () {
    selected_meals.push($(this).val());
  });
  console.log("new mix made", selected_meals);
  createMealList(selected_meals);
}

function createMealList(array) {
  var div = $("<div>").text(array.join(", ")).attr("class", "ingredient_list");
  console.log(div);
  meal_box_lists.append(div);
}

function mealPull(text) {
  queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + text;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log("raw api data", response);
    var response_length = response.meals.length - 1;
    var limit = 9;
    if (response_length < 9) {
      limit = response_length;
    } else {
      limit = 9;
    }
    meals = [];
    for (i = 0; i <= limit; i++) {
      meals.push(mealParse(response.meals[i]));
    }
    console.log("meals", meals);
    mealRender();
  });
}

function mealParse(object) {
  var new_object = {};
  new_object.name = object.strMeal;
  new_object.img = object.strMealThumb;
  new_object.id = object.idMeal;
  return new_object;
}

function mealRender() {
  $("#ingredient_box_meal").empty();
  for (i = 0; i < meals.length; i++) {
    var drink_item = meals[i];
    var new_drink = makeColumn("col s12 m12", "fade-left").append(
      makeCard().append(makeCardImage(drink_item.img, drink_item.name))
    );
    $("#ingredient_box_meal").append(new_drink);
  }
}

function makeRow() {
  return $("<div>").attr("class", "row");
}

function makeColumn(class_string, data_aos) {
  return $("<div>").attr("class", class_string).attr("data-aos", data_aos);
}

function makeCard() {
  return $("<div>").attr("class", "card");
}

function makeCardImage(drink_img, drink_title) {
  var div = $("<div>").attr("class", "card-image");
  var img = $("<img>").attr("src", drink_img);
  var span = $("<span>")
    .attr("class", "card-title")
    .text(drink_title)
    .attr("style", "background:black;");
  return div.append(img, span);
}
