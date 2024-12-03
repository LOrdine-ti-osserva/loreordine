document.addEventListener('DOMContentLoaded', () => {
    // Inizializza EmailJS
    emailjs.init("UF2Ys3VHJV91X5qrk");

    const textBlocks = document.querySelectorAll('.text-block');
   
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };
   
    const handleScroll = () => {
        textBlocks.forEach(block => {
            if (isInViewport(block)) {
                block.classList.add('visible');
            }
        });
    };
   
    window.addEventListener('scroll', handleScroll);
    handleScroll();
});

function openContactForm() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeContactForm() {
    document.getElementById('contactModal').style.display = 'none';
}

function submitContactForm(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Invio in corso...';

    const templateParams = {
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    emailjs.send('service_jbbq85s', 'template_ygyqc89', templateParams)
        .then(() => {
            showMessage('Messaggio inviato con successo!', 'success');
            closeContactForm();
            event.target.reset();
        })
        .catch((error) => {
            showMessage('Si è verificato un errore. Riprova più tardi.', 'error');
            console.error('FAILED...', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Invia';
        });
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
   
    setTimeout(() => {
        messageDiv.classList.add('fadeOut');
        setTimeout(() => messageDiv.remove(), 300);
    }, 2700);
}

window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeContactForm();
    }
}