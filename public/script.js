const PAYSTACK_PUBLIC_KEY = "pk_test_9625ff8989faf87ed3783bebee099deb4ff4ce33";
const PRICES = {
  USD: { symbol: "$",   amount: 20,    display: "20" },
  NGN: { symbol: "₦",  amount: 33000, display: "33,000" },
  GHS: { symbol: "GH₵",amount: 310,   display: "310" },
  EUR: { symbol: "€",  amount: 18.40, display: "18.40" }
};
let selected = { code: "USD", symbol: "$", amount: 20 };

function updatePrices(currency) {
  const d = PRICES[currency];
  document.getElementById("priceDisplay").textContent = d.display;
  document.querySelector(".currency-symbol").textContent = d.symbol;
  document.getElementById("buySymbol").textContent = d.symbol;
  document.getElementById("buyAmount").textContent = d.display;
  document.getElementById("payBtnText").textContent = `⚡ Buy Now — ${d.symbol}${d.display}`;
  document.getElementById("valueToday").textContent = `${d.symbol}${d.display}`;
  selected = { code: currency, symbol: d.symbol, amount: d.amount };
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      document.querySelectorAll(`.pill[data-currency="${pill.dataset.currency}"]`).forEach(p => p.classList.add("active"));
      updatePrices(pill.dataset.currency);
    });
  });

  document.querySelectorAll(".scroll-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(btn.getAttribute("href"))?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  document.getElementById("payBtn").addEventListener("click", () => {
    const email = prompt("Enter your email address to receive your receipt:");
    if (!email || !email.includes("@")) { alert("Please enter a valid email."); return; }
    const paystackCurrency = selected.code === "EUR" ? "USD" : selected.code;
    const paystackAmount = selected.code === "EUR" ? 20 : selected.amount;
    PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(paystackAmount * 100),
      currency: paystackCurrency,
      ref: "EAB-" + Date.now(),
      callback: async function(response) {
        document.getElementById("loadingOverlay").classList.add("show");
        try {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference })
          });
          const data = await res.json();
          document.getElementById("loadingOverlay").classList.remove("show");
          if (data.success) {
            document.getElementById("modalEmail").textContent = data.customerEmail ? `Receipt: ${data.customerEmail}` : "";
            document.getElementById("downloadBtn").onclick = () => { window.location.href = `/api/download/${data.downloadToken}`; };
            document.getElementById("downloadModal").classList.add("show");
          } else {
            alert("Verification failed. Save your reference: " + response.reference + " and contact support.");
          }
        } catch(err) {
          document.getElementById("loadingOverlay").classList.remove("show");
          alert("Network error. Save reference: " + response.reference);
        }
      },
      onClose: function() {}
    }).openIframe();
  });
});

function toggleFaq(el) {
  const ans = el.nextElementSibling;
  const open = el.classList.contains("open");
  document.querySelectorAll(".faq-q.open").forEach(q => { q.classList.remove("open"); q.nextElementSibling.classList.remove("open"); });
  if (!open) { el.classList.add("open"); ans.classList.add("open"); }
}
