const helpForm = document.querySelector('form')
const authorEmail = document.getElementById('email')
const subject = document.getElementById('subject')
const message = document.getElementById('message')

helpForm.addEventListener('submit', (e) => {
    e.preventDefault()

    emailContents = [authorEmail.value, subject.value, message.value]

    console.log(emailContents)

    helpForm.reset()
})