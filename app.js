const BASE_URL =
    "https://api.apilayer.com/fixer/convert?";
 //"https://api.apilayer.com/fixer/convert?from=NOK&to=INR&amount=1000&apikey=Dpma1c4vi7EQkVBc0ZLObWf9wIHpK5lm";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (code in countryList) {
//     console.log(code);
// }

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected ="selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected ="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" ) {
        alert("Enter an amount to be converted!");
        amount.value = "1";
        amtVal = 1;
    }
        else if( amtVal < 1) {
        amount.value = "1";
        amtVal = 1;
    }

    console.log(fromCurr.value, toCurr.value);
    //const URL = `https://api.apilayer.com/fixer/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}&apikey=Dpma1c4vi7EQkVBc0ZLObWf9wIHpK5lm`;
    const URL = `${BASE_URL}from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}&apikey=Dpma1c4vi7EQkVBc0ZLObWf9wIHpK5lm`;
    let response = await fetch(URL);
    let data = await response.json();
    //console.log(data);
    // console.log(data.result);
    let rate = data.result;

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(amtVal);
    console.log(finalAmount);
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});