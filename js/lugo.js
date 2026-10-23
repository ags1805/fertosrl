/* Cambiar este valor si LUGO confirma otro WhatsApp. */
const NUMBER = '5491158938142';
const SERVICES={general:'un proyecto de construcción o refacción',mantenimiento:'mantenimiento', 'obra-seca':'obra en seco', publicos:'refacción en espacios públicos', viviendas:'refacción de vivienda', otro:'otro tipo de trabajo'};
function waUrl(service, location=''){
  const label=SERVICES[service]||SERVICES.general;
  const place=(location||'').trim();
  const text=`Hola, buen día. Vi la web de LUGO Construcciones y quisiera solicitar una cotización por ${label}.${place?` La obra sería en ${place}.`:''} ¿Podemos conversar?`;
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}
const select=document.getElementById('tipo');
const locationInput=document.getElementById('ubicacion');
const quoteLink=document.getElementById('cotizarLink');
function refreshLinks(){
  document.querySelectorAll('[data-wa-service]').forEach(link=>{
    const isQuote=link.id==='cotizarLink';
    const service=isQuote?(select.value||'general'):link.dataset.waService;
    const location=isQuote?(locationInput.value||''):'';
    link.href=waUrl(service,location);
    link.target='_blank';
    link.rel='noopener noreferrer';
  });
}
refreshLinks();
select.addEventListener('change',refreshLinks);
locationInput.addEventListener('input',refreshLinks);
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.getElementById('menu');
const toggle=document.getElementById('menuToggle');
function closeMenu(){menu.classList.remove('is-open');toggle.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=!menu.classList.contains('is-open');menu.classList.toggle('is-open',open);toggle.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(window.innerWidth>780)closeMenu();});

// Medición de clics a WhatsApp en el contenedor de Tag Manager existente, si está instalado.
document.querySelectorAll('[data-wa-service]').forEach(link => {
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'lugo_whatsapp_click',
      servicio: link.id === 'cotizarLink' ? select.value : link.dataset.waService,
      origen: link.dataset.waSource || 'sin_origen'
    });
  });
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
