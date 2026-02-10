// Small front-end behaviour for PHALENDROME site

// Set year in footer (handle all possible year element IDs)
const yearIds = ['year', 'year2', 'year3', 'year4'];
const currentYear = new Date().getFullYear();
yearIds.forEach(id => {
  const el = document.getElementById(id);
  if(el) el.textContent = currentYear;
});

const form = document.getElementById('contactForm');
if(form){
  const fields = { name: form.querySelector('[name="name"]'), email: form.querySelector('[name="email"]'), message: form.querySelector('[name="message"]') };
  
  function validateField(field) {
    if(!field) return true;
    
    let isValid = true;
    let errorMsg = '';
    const fieldValue = field.value.trim();
    
    if(field.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = fieldValue === '' || emailRegex.test(fieldValue);
      errorMsg = 'Please enter a valid email address';
      if(fieldValue === '') {
        isValid = false;
        errorMsg = 'Email is required';
      }
    } else if(field.hasAttribute('required')) {
      isValid = fieldValue !== '';
      errorMsg = 'This field is required';
    }
    
    const existingError = field.parentNode?.querySelector('.field-error');
    if(!isValid) {
      field.classList.add('is-invalid');
      if(!existingError) {
        const err = document.createElement('div');
        err.classList.add('field-error');
        err.textContent = errorMsg;
        field.parentNode.appendChild(err);
      } else {
        existingError.textContent = errorMsg;
      }
    } else {
      field.classList.remove('is-invalid');
      if(existingError) existingError.remove();
    }
    
    return isValid;
  }
  
  // Real-time field validation
  Object.values(fields).forEach(field => {
    if(field) {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => validateField(field));
    }
  });

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const message = form.querySelector('[name="message"]')?.value.trim();
    const result = document.getElementById('result');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validate all fields before submission
    Object.values(fields).forEach(field => {
      if(field) validateField(field);
    });
    
    if(!name || !email || !message){
      result.textContent = 'Please complete all required fields.';
      result.style.color = '#d9534f';
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      result.textContent = 'Please enter a valid email address.';
      result.style.color = '#d9534f';
      return;
    }

    // Disable button while sending
    submitBtn.disabled = true;
    result.style.color = '';
    result.textContent = 'Sending...';

    const endpoint = form.dataset.endpoint && form.dataset.endpoint.includes('{your-form-id}') ? null : form.dataset.endpoint;

    if(endpoint){
      try{
        const payload = {name, email, phone, message};
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if(res.ok){
          result.style.color = 'green';
          result.textContent = 'Message received. We will be in touch shortly.';
          form.reset();
        } else {
          const data = await res.json().catch(()=>null);
          throw new Error((data && data.error) ? data.error : 'Submission failed');
        }
      } catch(err){
        result.style.color = '#d9534f';
        result.textContent = 'There was an error sending the message; opening your email client as a fallback.';
        // fallback to mailto
        const subject = encodeURIComponent('Website inquiry from ' + name);
        const body = encodeURIComponent(message + '\n\nContact: ' + name + ' | ' + phone + ' | ' + email);
        window.location.href = `mailto:you@phalendromesolutions.co.za?subject=${subject}&body=${body}`;
      }
    } else {
      // No endpoint set - use mailto fallback
      result.textContent = 'Opening your email client...';
      const subject = encodeURIComponent('Website inquiry from ' + name);
      const body = encodeURIComponent(message + '\n\nContact: ' + name + ' | ' + phone + ' | ' + email);
      window.location.href = `mailto:you@phalendromesolutions.co.za?subject=${subject}&body=${body}`;
    }

    submitBtn.disabled = false;
  });
}

/* Theme handling and dynamic showcase */
(function(){
  // Placeholder for future theme implementation
})();
