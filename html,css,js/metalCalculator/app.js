document.getElementById("calculateBtn").addEventListener("click", async () => {
  const metal = document.getElementById("metal").value;       // XAU, XAG, XPT
  const weight = document.getElementById("weight").value;     // in grams
  const currency = document.getElementById("currency").value; // INR, USD, EUR
  const resultEl = document.getElementById("result");

  if (!weight || weight <= 0) {
    resultEl.textContent = "⚠️ Please enter a valid weight.";
    return;
  }

  try {
    const response = await fetch(`https://www.goldapi.io/api/${metal}/${currency}`, {
      headers: { "x-access-token": "goldapi-3o7yq19mfxhnrgg-io" } // your API key
    });

    const data = await response.json();
    console.log(data); // check fetched data

    if (data && data.price) {
      const GRAMS_PER_OUNCE = 31.1035;
      const pricePerGram = data.price / GRAMS_PER_OUNCE;      // convert per gram
      const totalValue = (pricePerGram * weight).toFixed(2);
      resultEl.textContent = `✅ ${weight}g of ${metal} = ${currency} ${totalValue}`;
    } else {
      resultEl.textContent = "⚠️ Unable to fetch price. Try again later.";
    }
  } catch (error) {
    console.error(error);
    resultEl.textContent = "❌ Error fetching price. Check API or internet.";
  }
});

// Reset button
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("weight").value = "";
  document.getElementById("result").textContent = "";
});
