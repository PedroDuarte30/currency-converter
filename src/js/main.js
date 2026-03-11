const converterForm = document.getElementById('converter-form');
const amountInput = document.getElementById('amount');
const sourceCurrency = document.getElementById('source-currency');
const targetCurrency = document.getElementById('target-currency');
const resultDisplay = document.getElementById('result-display');

const apiKey = 'c8c0a97dfdd08724ee2dacc9';

async function convertCurrency() {
    const amount = amountInput.value;
    const from = sourceCurrency.value;
    const to = targetCurrency.value;

    if (!amount || amount <= 0) {
        resultDisplay.innerText = "";
        return;
    }

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    try {
        resultDisplay.style.opacity = "0.5";

        const response = await fetch(url);
        const data = await response.json();

        if(data.result === "success") {
            const rate = data.conversion_rates[to];
            const total = (amount * rate).toFixed(2);

            const formattedAmount = Number(amount).toLocaleString('pt-PT', {style: 'currency', currency: from});
            const formattedTotal = Number(total).toLocaleString('pt-PT', {style: 'currency', currency: to});

            resultDisplay.innerText = `${formattedAmount} = ${formattedTotal}`;
            resultDisplay.style.opacity = "1";
        }
    } catch (error) {
        console.log("Conversion error:", error);
        resultDisplay.innerText = "Connection error";
    }
}

amountInput.addEventListener('input', convertCurrency);

sourceCurrency.addEventListener('change', () => {
    updateFlag(sourceCurrency.value, sourceFlag);
    convertCurrency();
});

targetCurrency.addEventListener('change', () => {
    updateFlag(targetCurrency.value, targetFlag);
    convertCurrency();
});

converterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    convertCurrency();
});

const sourceFlag = document.getElementById('source-flag');
const targetFlag = document.getElementById('target-flag');

const countryMap = {
    "EUR": "PT", // Portugal
    "USD": "US", // EUA
    "GBP": "GB", // Reino Unido
    "BRL": "BR", // Brasil
    "JPY": "JP"  // Japão
};

function updateFlag(currencyCode, flagElement) {
    let countryCode = countryMap[currencyCode] || currencyCode.slice(0, 2);
    flagElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}


sourceCurrency.addEventListener('change', () => updateFlag(sourceCurrency.value, sourceFlag));
targetCurrency.addEventListener('change', () => updateFlag(targetCurrency.value, targetFlag));

updateFlag(sourceCurrency.value, sourceFlag);
updateFlag(targetCurrency.value, targetFlag);

const swapBtn = document.getElementById('swap-btn');

swapBtn.addEventListener('click', () => {
    const tempValue = sourceCurrency.value;

    sourceCurrency.value = targetCurrency.value;
    targetCurrency.value = tempValue;

    updateFlag(sourceCurrency.value, sourceFlag);
    updateFlag(targetCurrency.value, targetFlag);

    converterForm.dispatchEvent(new Event('submit'));

    convertCurrency();
})

