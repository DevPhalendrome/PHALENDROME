(function(){
  'use strict';

  document.querySelectorAll('[id^="year"]').forEach(function(el){
    if(el) el.textContent = new Date().getFullYear();
  });

  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .stag').forEach(function(el){
    obs.observe(el);
  });

  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.faq-item');
      var active = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(function(i){ i.classList.remove('active'); });
      if(!active) item.classList.add('active');
    });
  });

  var toggle = document.querySelector('.nav-toggle');
  var overlay = document.querySelector('.mobile-overlay');

  if(toggle && overlay){
    toggle.addEventListener('click', function(){
      var open = overlay.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  var form = document.getElementById('contactForm');
  if(form){
    var f = {
      name: form.querySelector('[name="name"]'),
      email: form.querySelector('[name="email"]'),
      message: form.querySelector('[name="message"]')
    };

    function validate(field){
      if(!field) return true;
      var val = field.value.trim();
      var ok = true;
      var msg = '';

      if(field.name === 'email'){
        if(!val){ ok = false; msg = 'Email is required'; }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)){ ok = false; msg = 'Please enter a valid email'; }
      } else if(field.hasAttribute('required')){
        if(!val){ ok = false; msg = 'This field is required'; }
      }

      var err = field.parentNode.querySelector('.field-error');
      if(!ok){
        field.classList.add('is-invalid');
        if(!err){
          var e = document.createElement('span');
          e.className = 'field-error';
          e.textContent = msg;
          field.parentNode.appendChild(e);
        } else { err.textContent = msg; }
      } else {
        field.classList.remove('is-invalid');
        if(err) err.remove();
      }
      return ok;
    }

    Object.keys(f).forEach(function(k){
      var field = f[k];
      if(field){
        field.addEventListener('blur', function(){ validate(field); });
        field.addEventListener('input', function(){ if(field.classList.contains('is-invalid')) validate(field); });
      }
    });

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      var name = (f.name && f.name.value.trim()) || '';
      var email = (f.email && f.email.value.trim()) || '';
      var phone = (form.querySelector('[name="phone"]') && form.querySelector('[name="phone"]').value.trim()) || '';
      var message = (f.message && f.message.value.trim()) || '';
      var result = document.getElementById('result');
      var btn = form.querySelector('button[type="submit"]');

      Object.keys(f).forEach(function(k){ if(f[k]) validate(f[k]); });

      if(!name || !email || !message){
        if(result){ result.textContent = 'Please complete all required fields.'; result.style.color = '#EF4444'; }
        return;
      }

      btn.disabled = true;
      if(result){ result.textContent = 'Sending...'; result.style.color = ''; }

      var ep = form.dataset.endpoint;

      if(ep && ep.indexOf('{your-form-id}') === -1){
        try {
          var res = await fetch(ep, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: name, email: email, phone: phone, message: message })
          });
          if(res.ok){
            if(result){ result.textContent = 'Message received. We\'ll be in touch shortly.'; result.style.color = '#10B981'; }
            form.reset();
          } else { throw new Error('fail'); }
        } catch(_){
          if(result) result.textContent = 'Opening your email client...';
          window.location.href = 'mailto:phalendrome@outlook.com?subject=' + encodeURIComponent('Website inquiry from ' + name) + '&body=' + encodeURIComponent(message + '\n\nContact: ' + name + ' | ' + phone + ' | ' + email);
        }
      } else {
        if(result) result.textContent = 'Opening your email client...';
        window.location.href = 'mailto:phalendrome@outlook.com?subject=' + encodeURIComponent('Website inquiry from ' + name) + '&body=' + encodeURIComponent(message + '\n\nContact: ' + name + ' | ' + phone + ' | ' + email);
      }
      btn.disabled = false;
    });
  }

  var header = document.querySelector('.site-header');
  if(header){
    window.addEventListener('scroll', function(){
      header.style.borderBottomColor = window.pageYOffset > 50 ? 'rgba(255,255,255,0.1)' : 'transparent';
    }, { passive: true });
  }
})();
