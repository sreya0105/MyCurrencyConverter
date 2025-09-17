// Fetch currency list and populate dropdowns
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.frankfurter.app/currencies')
    .then(res => res.json())
    .then(data => {
      const currencies = Object.entries(data);
      const fromSelect = document.getElementById('from-currency');
      const toSelect = document.getElementById('to-currency');

      currencies.forEach(([code, name]) => {
        const optionFrom = document.createElement('option');
        optionFrom.value = code;
        optionFrom.textContent = `${code} - ${name}`;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = code;
        optionTo.textContent = `${code} - ${name}`;
        toSelect.appendChild(optionTo);
      });

      fromSelect.value = 'USD';
      toSelect.value = 'EUR';
    });
});

// Convert currency
function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('from-currency').value;
  const to = document.getElementById('to-currency').value;
  const resultDiv = document.getElementById('result');
  const loader = document.getElementById('loader');

  // Reset result
  resultDiv.classList.remove('show');
  resultDiv.textContent = '';
  loader.style.display = 'block';

  if (!amount || from === to) {
    loader.style.display = 'none';
    resultDiv.textContent = "Please enter a valid amount and select different currencies.";
    resultDiv.classList.add('show');
    return;
  }

  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const converted = data.rates[to];
      loader.style.display = 'none';
      resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
      resultDiv.classList.add('show');
    })
    .catch(() => {
      loader.style.display = 'none';
      resultDiv.textContent = "Failed to fetch conversion.";
      resultDiv.classList.add('show');
    });

}


  