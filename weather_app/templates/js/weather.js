const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch(`http://localhost:3000/weather/${location}`).then((response) => {
        response.json().then((data) => {
            const displayElements = [document.getElementById('city'), document.getElementById('description'), document.getElementById('temperature'), document.getElementById('time'), document.getElementById('weatherImg')]
            if (data.error) {
                displayElements[0].textContent = data.error
                displayElements[1].textContent = ''
                displayElements[2].textContent = ''
                displayElements[3].textContent = ''
                displayElements[4].src = ''
            } else {
                displayElements[0].textContent = data.city
                displayElements[1].textContent = data.description
                displayElements[2].textContent = `${data.temperature}°`
                displayElements[3].textContent = (data.daytime) ? 'Daytime' : 'Nighttime'
                displayElements[4].src = data.imageUrl
            }
        })
    })

    weatherForm.reset()
})