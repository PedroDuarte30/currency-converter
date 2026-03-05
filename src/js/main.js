const converterForm = document.getElementById('converter-form');
const amountInput = document.getElementById('amount');
const sourceCurrency = document.getElementById('source-currency');
const targetCurrency = document.getElementById('target-currency');
const resultDisplay = document.getElementById('result-display');

const apiKey = 'c8c0a97dfdd08724ee2dacc9';

converterForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const amount = amountInput.value;
    const from = sourceCurrency.value;
    const to = targetCurrency.value;

    console.log(`A tentar converter ${amount} de ${from} para ${to}...`);

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    try {
        resultDisplay.innerText = "A carregar...";

        const response = await fetch(url);
        console.log("Resposta da API recebida:", response.status);

        const data = await response.json();
        console.log("Dados da API:", data);

        if (data.result === "success") {
            const rate = data.conversion_rates[to];
            const total = (amount * rate).toFixed(2);

            const formattedAmount = Number(amount).toLocaleString('pt-PT', { style: 'currency', currency: from });
            const formattedTotal = Number(total).toLocaleString('pt-PT', { style: 'currency', currency: to });

            resultDisplay.innerText = `${formattedAmount} = ${formattedTotal}`;
        } else {
            resultDisplay.innerText = `Erro da API: ${data['error-type']}`;
            console.error("Erro detalhado:", data);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        resultDisplay.innerText = "Erro de conexão. Verifica a consola.";
    }
});