
var currentInput;
var textValue;
var userClickedBtn = [];
var resultList = [];
var finalResult;

var divide = $(".divide").attr("id");
var subtract = $(".subtract").attr("id");
var multiply = $(".multiply").attr("id");
var sqRoot = $(".sq-root").attr("id");
var point = $(".point").attr("id");

$(".btn").click(function (event) {
    var userSelectedBtn = $(event.target).attr("id");
    animatePress(userSelectedBtn);
})



$(".other-btns").click(function (event) {
    var userSelectedBtn = $(event.target).attr("id");
    animatePress(userSelectedBtn);
})



$("img").click(function (event) {
        var userSelectedBtn = $(event.target).attr("text");
        // animatePress(userSelectedBtn);
})



$(".btn, .symbols").click(function(event){
    var userChosenBtn = $(event.target).attr("id");
    if(userChosenBtn === "plus"){
        userChosenBtn = "+";
    }
    else if(userChosenBtn === "modulas"){
        userChosenBtn = "%";
    }
    updateInput(userChosenBtn);
})

document.querySelector(".switch").addEventListener("click" , function(){
    document.querySelector(".switch").classList.toggle("switch-off");
    document.querySelector(".switch").classList.toggle("switch-on");
})

$(".trash, #trash-img").click(function(){
    currentInput = "";
    document.getElementById("entered-text").value = "";
})



$(".clear, #clear-img").click(function(){
    textValue = currentInput.slice(0 , currentInput.length-1);
    updateInput(textValue);
    document.getElementById("entered-text").value = textValue;
})


$("#equal-to").click(function(){
    
    document.getElementById("entered-text").value = result(currentInput) + "=";
})


function updateInput(selectedBtn){
    currentInput = document.getElementById("entered-text").value
    document.getElementById("entered-text").value = currentInput+selectedBtn;
}



function animatePress(currentBtn){
    $("#"+currentBtn).addClass("pressed");
    setTimeout(function(){
        $("#"+currentBtn).removeClass("pressed");
    }, 100)
}

function result(currentInput){
    var startingIndex = 0;
    var endingIndex;
    var hasNumber = /\d/;
    var cal = currentInput;
    for(var i = 0; i< cal.length ; i++){
        if(hasNumber.test(cal[i])){
        endingIndex = i+1;
        }else {
            resultList.push(Number(cal.slice(startingIndex , endingIndex)));
            startingIndex = i + 1;
            resultList.push(cal[i]);
        }
    }
    resultList.push(Number(cal.slice(startingIndex , )));
    console.log("ResultList list : " + resultList);

    checkDots();
    var resultListLength = resultList.length;
    for (var i = 0;i< resultListLength; i++){
        checkRoot();
        checkMultiply();
        checkDivide();
        checkAddSubtract();
    }
    finalResult = resultList[0];
    resultList = [];
    return finalResult;
}

function checkDots(){
    for(var j = 0; j < resultList.length ; j++){
        if(resultList[j] === point){
            var element1 = resultList[j-1];
            var operator = resultList[j];
            var element2 = resultList[j+1];
            var tempCal = element1 + element2 / 10**(element2.toString().length);
            resultList.splice(j+1 , 1);
            resultList.splice(j , 1);
            resultList[j-1] = tempCal;
            // console.log("Number in decimal : " + tempCal);
        }
    }
}

function checkMultiply(){
    for(var j = 0; j < resultList.length; j++){
        if(resultList[j] === multiply){
            var element1 = resultList[j-1];
            var operator = resultList[j];
            var element2 = resultList[j+1];
            var tempCal = element1*element2;
            resultList.splice(j+1 , 1);
            resultList.splice(j , 1);
            resultList[j-1] = tempCal;
            // console.log("reuslt : " + tempCal);
        } 

    }
}

function checkDivide(){
    for(var j = 0; j < resultList.length ; j++){
        if(resultList[j] === divide){
            var element1 = resultList[j-1];
            var operator = resultList[j];
            var element2 = resultList[j+1];
            var tempCal = element1/element2;
            resultList.splice(j+1 , 1);
            resultList.splice(j , 1);
            resultList[j-1] = tempCal;
            // console.log("reuslt : " + tempCal);
        }
    }
}

function checkAddSubtract(){
    for(var j = 0; j < resultList.length  ; j++){
        if(resultList[j] === "+"){
            var element1 = resultList[j-1];
            var operator = resultList[j];
            var element2 = resultList[j+1];
            var tempCal = element1+element2;
            resultList.splice(j+1 , 1);
            resultList.splice(j , 1);
            resultList[j-1] = tempCal;
            // console.log("reuslt : " + tempCal);
        } else if(resultList[j] === subtract){
            var element1 = resultList[j-1];
            var operator = resultList[j];
            var element2 = resultList[j+1];
            var tempCal = element1-element2;
            resultList.splice(j+1 , 1);
            resultList.splice(j , 1);
            resultList[j-1] = tempCal;
            // console.log("reuslt : " + tempCal);
        }
    }
}

function checkRoot(){
    
    for(var j = 0; j < resultList.length; j++){
        if(resultList[j] === sqRoot){
            var element1 = resultList[j-1];
            var operator = resultList[j];
            var element2 = resultList[j+1];
            var tempCal = Math.sqrt(element2);
            resultList.splice(j+1 , 1);
            resultList.splice(j , 1);
            resultList[j-1] = tempCal;
            // console.log("reuslt : " + tempCal);
        } 

    }
}