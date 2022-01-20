let weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {
    document.querySelector('.loading').style.display = "block"
    document.querySelector('.error-section').style.display = "none"
    document.querySelector('.weather-card').style.display = "none"
    e.preventDefault()
    let location = document.getElementById('location').value
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((responseData) => {
            if (responseData.error) {
                document.querySelector('.error-section p').innerHTML = responseData.error;
                document.querySelector('.error-section').style.display = "block"
            } else {
                let weatherHtml = `<img src="${responseData.icon}" alt="icon">
                <p>${responseData.forecast}</p>`
                const weatherCard = document.querySelector('.weather-card')
                weatherCard.innerHTML = weatherHtml
                weatherCard.style.display = "flex"
            }
            document.querySelector('.loading').style.display = "none"

        })
    })
})