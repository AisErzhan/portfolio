(function() {
    emailjs.init("7aptHHGNl2E8MqTkZ");
  })();
  
  const form = document.getElementById('contact-form');
  const submited = document.querySelector('.contacts__form__submited')
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submited.classList.add('active')
    
    emailjs.sendForm('service_fxmh7i9', 'template_w19ihkf', this)
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
        Object.entries(inputEffect).forEach(([key, { id, inpId }]) => {
          if (key !== 'date') {
            const display = document.getElementById(id);
            if (display) display.textContent = '';
          }
        });
  
      }, (error) => {
        alert("Failed to send message. Try again later.");
        console.error(error);
      });
  });
  const formBack = document.getElementById('form-back')
  formBack.addEventListener('click', () => {
    submited.classList.remove('active')
  })
  