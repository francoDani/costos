const wholeSellers = [
    {
        name: "Carlos",
        company: 'Coca-Cola',
        phone: "381-1234567"
    },
    {
        name: "Santiago",
        company: 'Arcor',
        phone: "381-1234567"
    },
    {
        name: "Luciano",
        company: 'Pepsico',
        phone: "381-1234567"
    },
    {
        name: "Mirta",
        company: 'Cadbury',
        phone: "381-1234567"
    },
    {
        name: "juli",
        company: "juMignaniMakeup",
        phone: "381-6782369"
    },
]

let table = document.querySelector(".whole-table__body");
let home = document.querySelector(".container")
let stage = "home"
let errorMsgForBlank = "Debes completar todos los campos";

let newSeller = (element) =>{
    for (i=0; i<element.length; i++){
        let newSeller = "<tr>" + "<td>" + element[i].company + "</td>"+ "<td>" + element[i].name + "</td>" + "<td>" + element[i].phone + "</td>"+ "</tr>";
        table.innerHTML += newSeller;
    }
};

newSeller(wholeSellers)

let withTaxSection = document.querySelector(".container-with-tax");
let withoutTaxSection = document.querySelector(".container-wout-tax");

function activeSection(section){
    let activeElement = document.querySelector("." + section);
    activeElement.classList.toggle("active")
    switch (section) {
        case "container-with-tax":
            stage ="withTax"
            console.log(stage)
            if (withoutTaxSection.classList.contains("active")){                
                withoutTaxSection.classList.remove("active");                
            }            
            break;
        case "container-wout-tax":
            stage = "withoutTax";
            if (withTaxSection.classList.contains("active")){
                withTaxSection.classList.remove("active");
                
            }
            
        case "container":
            console.log(stage)
            stage = "home";
        default:            
            break;
    }
};

let cleanSections = () =>{
    if (withTaxSection.classList.contains("active")){
        withTaxSection.classList.remove("active");
    }     
    if (withoutTaxSection.classList.contains("active")){
        withoutTaxSection.classList.remove("active");
    }
}


let calculatePrice = () =>{
    let invoiceWithTax = document.querySelector("#invoice-amount-wt");
    let invoiceWithTaxBatch = document.querySelector("#product-amount-wt");
    let estimatedGain = document.querySelector("#estimate-gain-wt");
    let unitPrice = document.querySelector ("#unit-price-wt-span");
    let estimatedPrice = document.querySelector ("#stimate-price-wt-span");    
    let errorM = document.querySelector ("#error-with-tax");

    if ((invoiceWithTax.value == "") || (invoiceWithTaxBatch.value == "") || (estimatedGain.value == "")){
        errorM.innerHTML = errorMsgForBlank;
    }else if(invoiceWithTax.value < 0 && invoiceWithTaxBatch.value < 0 && estimatedGain.value < 0) {
        errorM.innerHTML = "Los valores ingresados no pueden ser negativos";        
    }else if (invoiceWithTax.value != " " && invoiceWithTaxBatch.value != " " && estimatedGain.value !=" "){
        let result = (invoiceWithTax.value/invoiceWithTaxBatch.value);
        let resultWithAdd = ((result / 100 * estimatedGain.value)+result);
        unitPrice.innerHTML = "$" + result.toFixed(2);
        estimatedPrice.innerHTML = "$" + resultWithAdd.toFixed(2);
        errorM.innerHTML = "";
        invoiceWithTax.focus();
    }
    invoiceWithTax.value = "";
    invoiceWithTaxBatch.value ="";
    estimatedGain.value="";
}
let taxes = 0;
let calculateTax = () =>{
    let invoiceTotal = document.querySelector("#invoice-total");
    let invoiceSubtotal = document.querySelector("#invoice-subtotal");
    let taxAmount = document.querySelector("#tax-amount-span");
    let error = document.querySelector("#error-calculate-tax");
    if (invoiceTotal.value == "" || invoiceSubtotal.value == ""){
        error.innerHTML = errorMsgForBlank;
    }else{taxes = invoiceTotal.value / invoiceSubtotal.value;

        taxes = taxes.toFixed(2);
    
        taxAmount.innerHTML = "%" + taxes;
        error.innerHTML ="";
    }
    invoiceTotal.value = "";
    invoiceSubtotal.value = "";
}

let calculatePriceWT = () =>{
    let batchAmount = document.querySelector("#batch-amount");
    let productAmount = document.querySelector("#product-amount");
    let estimatedGainWT = document.querySelector("#estimate-gain");
    let unitPriceSpan = document.querySelector("#unit-price-span");
    let stimatePrice = document.querySelector("#stimate-price-span");
    let error = document.querySelector("#error-msg-in-price");

    if (batchAmount.value == "" || productAmount.value == "" || estimatedGainWT.value == "" || taxes == 0){
        error.innerHTML = errorMsgForBlank;
    }else{
        let batchAmountWithTaxes = batchAmount.value * taxes;
        let unitPriceWithTaxes = batchAmountWithTaxes / productAmount.value;
        let sellPrice = (unitPriceWithTaxes / 100 * estimatedGainWT.value) + unitPriceWithTaxes;
        sellPrice.toFixed(2);
        unitPriceWithTaxes.toFixed(2);

    
    unitPriceSpan.innerHTML = "$" + unitPriceWithTaxes.toFixed(2);
    stimatePrice.innerHTML = "$" + sellPrice.toFixed(2);

    batchAmount.value = "";
    productAmount.value = "";
    estimatedGainWT.value = "";
    error.innerHTML = "";
    batchAmount.focus();
    }
    
}




window.addEventListener("keydown", (event) =>{
    if (event.key == "Enter"){
        switch (stage) {
            case "withTax":
                calculatePrice();
                break;           
                        
            default:
                break;
        }
        
    }
})
