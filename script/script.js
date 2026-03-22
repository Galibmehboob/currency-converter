console.log('Hey Developer');

const countryList = {
    AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM",
    ANG: "AN", AOA: "AO", AQD: "AQ", ARS: "AR", AUD: "AU",
    AZN: "AZ", BAM: "BA", BBD: "BB", BDT: "BD", XOF: "BE",
    BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN",
    BOB: "BO", BRL: "BR", BSD: "BS", NOK: "BV", BWP: "BW",
    BYR: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", XAF: "CF",
    CHF: "CH", CLP: "CL", CNY: "CN", COP: "CO", CRC: "CR",
    CUP: "CU", CVE: "CV", CYP: "CY", CZK: "CZ", DJF: "DJ",
    DKK: "DK", DOP: "DO", DZD: "DZ", ECS: "EC", EEK: "EE",
    EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ", FKP: "FK",
    GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI",
    GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK",
    HNL: "HN", HRK: "HR", HTG: "HT", HUF: "HU", IDR: "ID",
    ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR", ISK: "IS",
    JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG",
    KHR: "KH", KMF: "KM", KPW: "KP", KRW: "KR", KWD: "KW",
    KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK",
    LRD: "LR", LSL: "LS", LTL: "LT", LVL: "LV", LYD: "LY",
    MAD: "MA", MDL: "MD", MGA: "MG", MKD: "MK", MMK: "MM",
    MNT: "MN", MOP: "MO", MRO: "MR", MTL: "MT", MUR: "MU",
    MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ",
    NAD: "NA", XPF: "NC", NGN: "NG", NIO: "NI", NPR: "NP",
    NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG",
    PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA",
    RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA",
    SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE", SGD: "SG",
    SKK: "SK", SLL: "SL", SOS: "SO", SRD: "SR", STD: "ST",
    SVC: "SV", SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ",
    TMT: "TM", TND: "TN", TOP: "TO", TRY: "TR", TTD: "TT",
    TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US",
    UYU: "UY", UZS: "UZ", VEF: "VE", VND: "VN", VUV: "VU",
    YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW",
};

const dropDown = document.querySelectorAll('.dropDown select');
const btn = document.querySelector('form button')
const fromCur = document.getElementById('from')
const toCur = document.getElementById('to')
let msg = document.getElementById('finalMsg')

// Populate dropdowns
for (let select of dropDown) {
    for (let curCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = curCode;
        newOption.value = curCode;

        if (select.name === "from" && curCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && curCode === "BDT") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    // Update flag on change
    select.addEventListener("change", (event) => {
        let curCode = event.target.value;
        let countryCode = countryList[curCode];
        let img = event.target.parentElement.querySelector('img');
        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    });
}


// Button click -> fetch conversion
btn.addEventListener("click", async (event) => {
    event.preventDefault();

    let amount = document.getElementById('amountEx').value;
    if (!amount || amount < 1) amount = 0;

    const getURl = `https://latest.currency-api.pages.dev/v1/currencies/${fromCur.value.toLowerCase()}.json`;
    let response = await fetch(getURl);
    let data = await response.json();

    let rate = data[fromCur.value.toLowerCase()][toCur.value.toLowerCase()];
    let finalAmount = amount * rate;

    msg.innerText = `${amount}-${fromCur.value} = ${finalAmount.toFixed(2)}-${toCur.value}`

    console.log(`Converted Amount: ${finalAmount.toFixed(2)}`);
});