const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`http://localhost:3000/weather/${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                const displayElements = [document.getElementById('city'), document.getElementById('description'), document.getElementById('temperature'), document.getElementById('time'), document.getElementById('weatherImg')]
                displayElements[0].textContent = data.city
                displayElements[1].textContent = data.description
                displayElements[2].textContent = `${data.temperature}°`
                displayElements[3].textContent = (data.daytime) ? 'Daytime' : 'Nighttime'
                displayElements[4].src = data.imageUrl
                console.log(data.city)
                console.log(data.description)
                console.log(data.temperature)
                console.log(data.daytime)
                console.log(data.imageUrl)
            }
        })
    })

    weatherForm.reset()
})