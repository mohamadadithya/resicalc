const resistor = document.querySelector('.resistor')
const numOfBandRadios = document.querySelectorAll('.num-of-band')
const thirdSelect = document.querySelector('.input-select.third')
const ppmSelect = document.querySelector('.input-select.ppm')
const valueEls = {
    price: document.querySelector('.value .price'),
    tolerance: document.querySelector('.value .tolerance'),
    ppm: document.querySelector('.value .ppm')
}

let resistorValue = []

const updateValue = () => {
    let splittedValue = resistorValue.join('')
    let actualValue = parseFloat(splittedValue)
    actualValue > 1000 ? actualValue = numFormatter(actualValue, 1) : actualValue
    valueEls.price.innerText = `${actualValue} Ω`
}

const band = {
    first: resistor.querySelector('.first-band'),
    second: resistor.querySelector('.second-band'),
    third: resistor.querySelector('.third-band'),
    multiplier: resistor.querySelector('.multiplier'),
    tolerance: resistor.querySelector('.tolerance'),
    ppm: resistor.querySelector('.ppm')
}

numOfBandRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if(radio.value === '4') {
            thirdSelect.style.display = 'none'
            ppmSelect.style.display = 'none'
            band.third.style.display = 'none'
            band.ppm.style.display = 'none'
        } else if(radio.value === '5') {
            thirdSelect.style.display = 'block'
            ppmSelect.style.display = 'none'
            band.third.style.display = 'block'
            band.ppm.style.display = 'none'
        } else {
            thirdSelect.style.display = 'block'
            ppmSelect.style.display = 'block'
            band.third.style.display = 'block'
            band.ppm.style.display = 'block'
        }
    })
})

const selectInputs = document.querySelectorAll('.color-select')
const bandStrips = document.querySelectorAll('.band')

selectInputs.forEach((input, index) => {
    input.addEventListener('change', function() {
        let color = this.querySelector(':checked').getAttribute('data-color')
        let value = this.value
        bandStrips[index].style.fill = color
        if(index === 4) {
            valueEls.tolerance.innerText = `${value} %`
        } else if(index === 5) {
            valueEls.ppm.innerText = `${value} ppm`
        } else {
            if(resistorValue) {
                resistorValue[index] = value
            } else {
                resistorValue.push(value)
            }
            updateValue()
        }
    })
})

const numFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    let item = lookup.slice().reverse().find((item) => {
      return num >= item.value;
    })
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}