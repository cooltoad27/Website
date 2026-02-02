const incomeInput = document.getElementById("income");
const rrspInput = document.getElementById("rrsp");
const fhsaInput = document.getElementById("fhsa");
const frequency = document.getElementById("frequency");
const provinceSelect = document.getElementById("province");

const federalTaxEl = document.getElementById("federalTax");
const provincialTaxEl = document.getElementById("provincialTax");
const totalTaxEl = document.getElementById("totalTax");
const netPayEl = document.getElementById("netPay");
const tipsText = document.getElementById("tipsText");
const frequencyLabel = document.getElementById("frequencyLabel");

const provinces = {
  "Ontario": "Ontario Health Premium may apply at higher income levels.",
  "British Columbia": "Lower middle-income provincial tax brackets.",
  "Alberta": "Flat provincial income tax rate.",
  "Quebec": "Higher overall taxes; RRSP deductions are especially valuable.",
  "Manitoba": "Higher marginal tax rates at upper income levels.",
  "Saskatchewan": "Education and caregiver credits may apply.",
  "Nova Scotia": "Among the highest marginal tax rates in Canada.",
  "New Brunswick": "Middle-income relief credits available.",
  "Newfoundland and Labrador": "Recent changes to provincial tax rates.",
  "Prince Edward Island": "Lower tax brackets but higher consumption taxes.",
  "Yukon": "Relatively low territorial income tax rates.",
  "Northwest Territories": "Among the lowest overall income taxes.",
  "Nunavut": "Lowest personal income tax rates in Canada."
};

// Populate province dropdown
Object.keys(provinces).forEach(p => {
  const option = document.createElement("option");
  option.value = p;
  option.textContent = p;
  provinceSelect.appendChild(option);
});

// Default province
provinceSelect.value = "Ontario";

function calculate() {
  const income = Number(incomeInput.value) || 0;
  const rrsp = Number(rrspInput.value) || 0;
  const fhsa = Number(fhsaInput.value) || 0;

  const taxableIncome = Math.max(0, income - rrsp - fhsa);

  const federalTax = taxableIncome * 0.15;
  const provincialTax = taxableIncome * 0.08;
  const totalTax = federalTax + provincialTax;
  const netPay = income - totalTax;

  const divisor =
    frequency.value === "monthly" ? 12 :
    frequency.value === "biweekly" ? 26 :
    frequency.value === "weekly" ? 52 : 1;

  const label =
    frequency.value === "monthly" ? "(Monthly)" :
    frequency.value === "biweekly" ? "(Bi-Weekly)" :
    frequency.value === "weekly" ? "(Weekly)" : "(Annual)";

  frequencyLabel.textContent = label;

  federalTaxEl.textContent = format(federalTax / divisor);
  provincialTaxEl.textContent = format(provincialTax / divisor);
  totalTaxEl.textContent = format(totalTax / divisor);
  netPayEl.textContent = format(netPay / divisor);

  tipsText.textContent = provinces[provinceSelect.value];
}

function format(num) {
  return "$" + num.toLocaleString("en-CA", { maximumFractionDigits: 2 });
}

document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", calculate);
});

document.getElementById("toggleAdvanced").addEventListener("click", () => {
  document.getElementById("advanced").classList.toggle("hidden");
});

calculate();
