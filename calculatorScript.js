
let arrayNumber =[];
let collectNumberToDisplay = "";
let displayTwo = "";
let result = 0; 
let resetAfter = true;;

$(document).ready(function() {

    $(".class-number").on("click", getNumber);
    $(".class-sign").on("click", getSign);
    $("#clear").on("click", clearDisplay);
    $("#equals").on("click", showCalculation);

    let displayNumber = window.document.getElementById("display");

    function getNumber(e) {
        const number = e.target.textContent;
        collectNumberToDisplay += number;
        displayTwo += parseInt(number);
        $("#display").text(collectNumberToDisplay);

        if(notAllowStartWithZero(collectNumberToDisplay) || resetAfter === false) {
            collectNumberToDisplay = "";
            displayTwo = "";
            resetAfter = true;   
        } else {
            $("#display").text(collectNumberToDisplay);; 
            $("#display-two").text(displayTwo);
        }
    }

    function notAllowStartWithZero(e) {
        const zero = e.toString().split(" ");
        if(zero[0] === "0") {
            return true;
        }
    }

    function notAllowStartWithSign(e) {
        const zero = e.toString().split(" ");
        if(zero[0] === "+" || zero[0] === "-" || zero[0] === "/" || zero[0] === "x") {
            return true;
        }
    }

    function getSign(e) {
        const sign = e.target.textContent;
        collectNumberToDisplay += sign;
        if(notAllowStartWithSign(collectNumberToDisplay)) {
            collectNumberToDisplay = "";
            displayTwo = "";
        }
        else {
            arrayNumber.push(displayTwo);
            $("#display").text(collectNumberToDisplay);
            $("#display-two").text(sign);
            arrayNumber.push(sign);
            displayTwo = "";
            resetAfter = true;
        }
    }

    function clearDisplay() {
        collectNumberToDisplay = "";
        displayTwo ="";
        arrayNumber = [];
        $("#display").text(0);
        $("#display-two").text(0);
    }

    function showCalculation() {
        arrayNumber.push(displayTwo);
        
            multiplication();
            division();
            addTakeway();

        const finalResult = "=" + arrayNumber; 

        $("#display").text(finalResult);
        $("#display-two").text(arrayNumber);
        collectNumberToDisplay = arrayNumber;
        displayTwo = arrayNumber;
        arrayNumber = [];
        result = 0;
        resetAfter = false;
    }

    function addTakeway() {
        const getSigns = getAllPlusTakeAwaysigns(arrayNumber);
        const getNumbers = getAllNumbers(arrayNumber);
        const trueOrFalse = plusAndSubtraction(arrayNumber);
        let i = 0;
        result = 0;
        if(!trueOrFalse) {
            for (let index = 0; index < getNumbers.length; index++) {
                if(index === 0) {
                    result = parseInt(getNumbers[0]);
                }
                else {
                    if(arrayNumber[getSigns[i]] === "+") {
                        result += parseInt(getNumbers[index]);
                        i++;
                    } else {
                        if(arrayNumber[getSigns[i]] === "-") {
                            result -= parseInt(getNumbers[index]);
                            i++;
                        }   
                    }
                }
            }
        }
        
        if(i > 0) {
            arrayNumber = [];
            arrayNumber =  result;
        }
    }

    function plusAndSubtraction(array) {
        for (let index = 0; index < array.length; index++) {
            const sign = array[index];
            if(/[/x]/.test(sign)) {
                return true;
            }
        }
    }

    function findHowManyMultiplication(array) {
        const howManyMultiplication =[];
        for (let index = 0; index < array.length; index++) {
            const sign = array[index];
            if(/[x]/.test(sign)) {
                howManyMultiplication.push(index);
            }
        }
        return howManyMultiplication;
    }

    function multiplication() {
        let math =[];
        let canLoop = true;
        const i = findHowManyMultiplication(arrayNumber).length;
        for (let indexTwo = 0; indexTwo < i; indexTwo++) {
            for (let index = 0; index < arrayNumber.length; index++) {
                if(arrayNumber[index] === "x" && canLoop) {
                    let firstNumber = index;
                    let secondNumber = index;  
                    const sum = parseInt(arrayNumber[firstNumber -= 1]) *  parseInt(arrayNumber[secondNumber += 1]);
                    math[firstNumber] = sum;
                    index = secondNumber;
                    canLoop = false;
                }
                else {
                    math.push(arrayNumber[index]);
                    if(index === arrayNumber.length -1) {
                        if(indexTwo < findHowManyMultiplication(arrayNumber).length -1) {
                            arrayNumber = [];
                            arrayNumber = math;
                            math = [];
                        }
                    }
                }
            }
            canLoop = true;
        }
        if(math.length > 0) {
            arrayNumber = [];
            arrayNumber =  math;
            math =[];
        }
    }

    function findHowManyDivision(array) {
        const howManyDivision =[];
        for (let index = 0; index < array.length; index++) {
            const sign = array[index];
            if(/[/]/.test(sign)) {
                howManyDivision.push(index);
            }
        }
        return howManyDivision;
    }

    function division() {
        let math =[];
        let canLoop = true;
        const i = findHowManyDivision(arrayNumber).length;

        for (let indexTwo = 0; indexTwo < i; indexTwo++) {
            for (let index = 0; index < arrayNumber.length; index++) {
                if(arrayNumber[index] === "/" && canLoop) {
                    let firstNumber = index;
                    let secondNumber = index;  
                    const sum = parseInt(arrayNumber[firstNumber -= 1]) /  parseInt(arrayNumber[secondNumber += 1]) ;
                    math[firstNumber] = sum;
                    index = secondNumber;
                    canLoop = false;
                }
                else {
                    math.push(arrayNumber[index]);
                    if(index === arrayNumber.length -1) {
                        if(indexTwo < findHowManyDivision(arrayNumber).length -1) {
                            arrayNumber = [];
                            arrayNumber = math;
                            math = [];
                        }
                    }
                }
            }
            canLoop = true;
        }

        if(math.length > 0) {
            arrayNumber = [];
            arrayNumber =  math;
            math =[];
        }
        
    }

    function getAllPlusTakeAwaysigns(arr) {
        let signPosition = [];
        for (let index = 0; index < arr.length; index++) {
            const sign = arr[index];
            if(/[-+/x]/.test(sign)) {
                signPosition.push(index);
            }
        }
        return signPosition;
    }
    function getAllNumbers(arr) {
        let numberPositionPosition = [];
        for (let index = 0; index < arr.length; index++) {
            const allNumber = arr[index];
            if(allNumber === "x" || allNumber === "/" || allNumber === "-" ||  allNumber === "+") {
                
            }
            else {
                numberPositionPosition.push(parseInt(allNumber));
            }
        }
        return numberPositionPosition;
    }
});
