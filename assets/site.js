(function(){
  /* Pestañas de Soluciones */
  var tabs=document.querySelectorAll('.tb');
  tabs.forEach(function(b){b.addEventListener('click',function(){var i=+b.dataset.t;tabs.forEach(function(x,j){x.classList.toggle('on',j===i)});document.querySelectorAll('.pn').forEach(function(x,j){x.classList.toggle('on',j===i)})})});

  /* Menú móvil */
  var bg=document.getElementById('burger'),mp=document.getElementById('mp');
  if(bg&&mp){
    bg.addEventListener('click',function(){var o=mp.classList.toggle('open');bg.classList.toggle('open',o);bg.setAttribute('aria-expanded',o)});
    mp.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mp.classList.remove('open');bg.classList.remove('open');bg.setAttribute('aria-expanded','false')})});
  }

  /* Sección activa en el menú (solo enlaces internos; se saltan las secciones ocultas) */
  var links=[].slice.call(document.querySelectorAll('#nav a[href^="#"]')),
      map=links.map(function(a){return {el:document.querySelector(a.getAttribute('href')),href:a.getAttribute('href')}});
  var acomp=document.getElementById('acompanamiento');if(acomp)map.push({el:acomp,href:'#implementacion'});
  function setActive(){var cur=null,top=-1e9;map.forEach(function(m){if(!m.el||m.el.hidden)return;var t=m.el.getBoundingClientRect().top;if(t<=140&&t>top){top=t;cur=m.href}});links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')===cur)})}
  if(links.length){window.addEventListener('scroll',setActive,{passive:true});setActive()}

  /* Formulario: validación en el cliente + envío real por Web3Forms */
  var form=document.getElementById('contactForm');
  var sel=document.getElementById('activoSelect'),otroWrap=document.getElementById('activoOtroWrap'),otroIn=document.getElementById('activoOtroInput');
  var errNote=document.getElementById('formError'),resetBtn=document.getElementById('formReset');
  function reqFields(){return [].slice.call(form.querySelectorAll('[required]'))}
  function check(inp){var w=inp.closest('.fld'),v=inp.checkValidity();if(w)w.classList.toggle('has-error',!v);return v}
  function toggleOtro(){
    var o=sel.value==='Otro';otroWrap.classList.toggle('open',o);
    if(o){otroIn.setAttribute('required','required');otroIn.focus()}
    else{otroIn.removeAttribute('required');otroIn.value='';otroWrap.classList.remove('has-error')}
  }
  if(form){
    form.addEventListener('input',function(e){if(e.target.matches&&e.target.matches('[required]'))check(e.target)});
    form.addEventListener('blur',function(e){if(e.target.matches&&e.target.matches('[required]'))check(e.target)},true);
    sel.addEventListener('change',toggleOtro);
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var ok=true;reqFields().forEach(function(i){if(!check(i))ok=false});
      if(!ok){var f=form.querySelector('.fld.has-error input,.fld.has-error textarea');if(f)f.focus();return}
      errNote.style.display='none';
      var btn=form.querySelector('button[type="submit"]'),label=btn.innerHTML;
      btn.disabled=true;btn.textContent='Enviando...';
      fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))})
        .then(function(r){return r.json()})
        .then(function(d){if(d.success){form.classList.add('is-success')}else{errNote.style.display='block'}})
        .catch(function(){errNote.style.display='block'})
        .finally(function(){btn.disabled=false;btn.innerHTML=label});
    });
    resetBtn.addEventListener('click',function(){
      form.reset();form.classList.remove('is-success');
      form.querySelectorAll('.fld.has-error').forEach(function(w){w.classList.remove('has-error')});
      toggleOtro();
    });
  }

  /* Botón flotante de WhatsApp: se aparta si taparía el botón de enviar */
  var wa=document.getElementById('waFloat'),waBtn=form?form.querySelector('button[type="submit"]'):null,waTick=false;
  function updateWa(){
    if(!wa||!waBtn)return;
    var a=wa.getBoundingClientRect(),b=waBtn.getBoundingClientRect(),p=14;
    var hit=b.height>0&&!(a.right+p<b.left||a.left-p>b.right||a.bottom+p<b.top||a.top-p>b.bottom);
    wa.classList.toggle('is-away',hit);
  }
  function schedWa(){if(!waTick){waTick=true;requestAnimationFrame(function(){updateWa();waTick=false})}}
  window.addEventListener('scroll',schedWa,{passive:true});window.addEventListener('resize',schedWa);updateWa();
})();
