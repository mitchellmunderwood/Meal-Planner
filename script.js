var maleRadioEl = $("#male_radio");
var femaleRadioEl = $("#female_radio");
var weightEl = $("#weight");
var drinkNumEl = $("#drinkNum");
var drinkTimeEl = $("#drinkTime");
var submit_btnEl = $("#submit_btn");
var resultsEl = $("#results");
var resultsHeaderEl = $("#results_header");
var resultstextEl = $("#results_text");
var resultsBacEl = $("#results_bac");

submit_btnEl.on("click", function (event) {
  event.preventDefault();

  var gender;
  if (maleRadioEl[0].checked) {
    gender = "male";
  } else if (femaleRadioEl[0].checked) {
    gender = "female";
  }

  var weight = weightEl.val();
  var drinkNum = drinkNumEl.val();
  var drinkTime = drinkTimeEl.val();

  var score = BACcalc(gender, weight, drinkNum, drinkTime);
  console.log(score);
  BACreturn(score);
});

function BACcalc(gender, weight, drinks, time) {
  var r;
  if (gender === "male") {
    r = 0.68;
  } else {
    r = 0.55;
  }
  var num = parseFloat(
    ((drinks * 15) / (weight * 454 * r)) * 100 - time * 0.015
  ).toFixed(2);
  if (num <= 0.01) {
    num = 0.0;
  }
  return num;
}

function BACreturn(num) {
  if (num >= 0.08) {
    resultsHeaderEl.text("Stop Drinking!");
    resultstextEl.text("You are legally intoxicted");
    resultsBacEl.text(num + "%");
  } else if (num > 0.05 && num < 0.08) {
    resultsHeaderEl.text("Slow Down");
    resultstextEl.text(
      "You are not legally intoxicted, but you are approaching the limit"
    );
    resultsBacEl.text(num + "%");
  } else {
    resultsHeaderEl.text("You're doing fine");
    resultstextEl.text(
      "You aren't close to being intoxicated. But keep an eye on things"
    );
    resultsBacEl.text(num + "%");
  }
}
