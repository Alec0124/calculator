//global variables - heldValue, heldOperation, and nextValue

let heldValue = null;
let heldOperation = null;
let nextValue = null;

//global functions

const showValue = (location, value) => {
//in the given location, prints given value
//location is a string repesenting element class;
    if (value === null) {
        $(location).text('') 
    } else if (location === '.next-value' || location === '.held-value') {
         $(location).text(Number(value));
    } else {
        $(location).text(value);
    }

}
const updateDisplay = () => {
    //prints all values in matching locations
    showValue('.next-value', nextValue);
    showValue('.held-value', heldValue);
    showValue('.next-operation', heldOperation);
}

//Click Handlers

$('.digits button').click(function() {
//adds button clicked to display
    let thisText = $(this).text();
    if(nextValue === null) nextValue = "0";

    //test if period pressed and exist; if so do nothing
    if (nextValue.includes('.') && thisText === '.') {
        //   do nothing  
    } else { 
        //if next value is 0; replace the 0 with key pressed, unless . pressed
        if(nextValue === '0') {
            thisText != '.' ? nextValue = thisText : nextValue += thisText;
        } else {
            //if none of above, add to string
            nextValue += thisText;
        }
        
    }
    
    updateDisplay();
})


$('.operations button').click(function() {
    let thisText = $(this).text();
    if (nextValue === null) {
        //do nothing
    } else {
        if (heldValue === null && heldOperation === null) {
            heldValue = nextValue;
        } else {
            let realOperation = heldOperation;
            if (heldOperation === '×') {realOperation = '*'};
            if (heldOperation === '−') {realOperation = '-'};
            if (heldValue === null) {heldValue = '0'}
            let equation = `${heldValue} ${realOperation} ${nextValue}`
            let output = eval(equation);
            heldValue = output;
        }
        nextValue = null;
    }
    //if equals sign pressed, clear operation
    thisText === '=' ? heldOperation = null : heldOperation = thisText;
    updateDisplay();
})

$('.clear-all').click(function() {
    //clears all values to null
    heldValue = null;
    nextValue = null;
    heldOperation = null;
    updateDisplay();
})

$('.clear-entry').click(function() {
    //clears nextValue's value
    nextValue = null;
    updateDisplay();
})

$('.square-root').click(function(){
    if (heldValue === null && nextValue === null) {
        //do nothing
    } else {
        if (heldValue === null) {
            heldValue = nextValue;
            nextValue = null;
        }
        //can add better functionality here, which would be..
        //if held value and next value and held operation are not null; perform math operation; store result in held value and clear held operation and next value;
        heldValue = heldValue ** 0.5;
        heldOperation = null; 
    }
    updateDisplay();
})

$('.plus-minus').click(function(){
    nextValue = String(Number(nextValue) * -1);
    updateDisplay();
})

//Not sure what the inverse button should actually do. like 10 / 2 inverse should be 5? because 10 / 5 would be 2? Feel like I could make this button work if I was given some examples.