var maleRadioEl = $("#male_radio");
var femaleRadioEl = $("#female_radio");
var weightEl = $("#weight");
var drinkNumEl = $("#drinkNum");
var drinkTimeEl = $("#drinkTime");
var submit_btnEl = $("#submit_btn");
var resultsEl = $("#results");
var resultsHeaderEl = $("#results_header");
var resultsBacEl = $("#results_bac");

submit_btnEl.on("click", function (event) {
  event.preventDefault();
    unsetPrior();
    unsetWarning();
  var gender;
  if (maleRadioEl[0].checked) {
    gender = "male";
  } else if (femaleRadioEl[0].checked) {
    gender = "female";
  }

  var weight = weightEl.val();
  var drinkNum = drinkNumEl.val();
  var drinkTime = drinkTimeEl.val();

  if (inputCheck(maleRadioEl, femaleRadioEl, weight,drinkNum,drinkTime)) {
      var score = BACcalc(gender, weight, drinkNum, drinkTime);
      BACreturn(score);
  } else {
      setWarning();
  }
  clearForm();
});

function inputCheck(maleRadioEl, femaleRadioEl, weight, drinkNum, drinkTime) {
    if (isNaN(weight)) {return false}
    if (isNaN(drinkNum)) {return false}
    if (isNaN(drinkTime)) {return false}
    if (maleRadioEl[0].checked && femaleRadioEl[0].checked) {return false}
    return true;
}

function setWarning() {
    resultsEl.append("<div class='alert alert-danger' role='alert'>The form was filled out incorrectly.</div>")
}

function unsetWarning() {
    $(".alert").remove();
}

function unsetPrior() {
    resultsBacEl.text("");
    resultsHeaderEl.text("");
}

function clearForm() {
    maleRadioEl.prop("checked",false);
    femaleRadioEl.prop("checked",false);
    weightEl.val("");
    drinkNumEl.val("");
    drinkTimeEl.val("");
}

function BACcalc(gender, weight, drinks, time) {
  var r;
  if (gender === "male") {
    r = 3.75;
  } else {
    r = 4.7;
  }
  var num = parseFloat(((drinks * r) / weight - 0.017 * time).toFixed(2));
  if (num <= 0.01) {
    num = 0.0;
  }
  return num;
}

function BACreturn(num) {
    if (isNaN(num)) {return};
    resultsBacEl.text(num + "%");

        if (num >= 0.08) {
            resultsHeaderEl.text("Don't Drive! You are legally intoxicated");
        } else if (num > 0.05 && num < 0.08) {
            resultsHeaderEl.text("You're just OK to drive, but be careful.");
        } else {
            resultsHeaderEl.text("You're good to drive!");
        }
}