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

const provinces = {
  "Ontario": "Ontario Health Premium may apply.",
  "British Columbia": "Lower middle-income tax brackets.",
  "Alberta": "Flat provincial tax rate.",
  "Quebec": "Higher taxes; RRSP deductions are valuable.",
  "Manitoba": "Higher top marginal rates.",
  "Saskatchewan": "Education and caregiver credits available.",
  "Nova Scotia": "Highest marginal tax rates.",
  "New Brunswick": "Middle-income relief credits.",
  "Newfoundland and Labrador": "Recent tax increases.",
  "Prince Edward Island": "Lower brackets, higher consumption taxes.",
  "Yukon": "Low territorial tax rates.",
  "Northwest Territories": "Among the lowest taxes.",
  "Nunavut": "Lowest income tax rates."
};

// Populate province dropdown
Object.keys(provinces).forEach(p => {
  const option = document.createElement("option");
  option.value = p;
  option.textContent = p;
  provinceSelect.appendChild(option);
});

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
