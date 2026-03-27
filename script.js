document.addEventListener('DOMContentLoaded',function(){
  // year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // mobile nav
  const nav=document.getElementById('siteNav');
  const btn=document.getElementById('navToggle');
  if(btn && nav){
    btn.addEventListener('click',()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  // Lightbox gallery
  const galleryImgs = Array.from(document.querySelectorAll('.gallery img'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbOverlay = document.getElementById('lbOverlay');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let currentIndex = -1;

  function openLightbox(index){
    if(index < 0 || index >= galleryImgs.length) return;
    currentIndex = index;
    const img = galleryImgs[index];
    lbImage.src = img.src;
    lbImage.alt = img.alt || '';
    const cap = img.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lbCaption.textContent = cap;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function showIndex(i){
    if(i<0) i = galleryImgs.length-1;
    if(i>=galleryImgs.length) i = 0;
    openLightbox(i);
  }

  galleryImgs.forEach((img, idx)=>{
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', ()=> openLightbox(idx));
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbOverlay?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', ()=> showIndex(currentIndex-1));
  lbNext?.addEventListener('click', ()=> showIndex(currentIndex+1));

  document.addEventListener('keydown', (e)=>{
    if(lightbox.classList.contains('show')){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') showIndex(currentIndex-1);
      if(e.key === 'ArrowRight') showIndex(currentIndex+1);
    }
  });

  // Header solid on scroll
  const header = document.querySelector('.site-header');
  function checkHeader(){
    if(!header) return;
    if(window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  checkHeader();
  window.addEventListener('scroll', checkHeader, {passive:true});

  // download spec (simple sample)
  const dl = document.getElementById('downloadSpec');
  if(dl){
    dl.addEventListener('click',()=>{
      const spec = `FarmerBlocks Spec\n- Modules: Block20, Block40\n- Power: 220V/110V options\n- Water recirculation: yes\n- Lighting: LED controllable`;
      const blob = new Blob([spec],{type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='farmerblocks-spec.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    });
  }

  // simple contact validation
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      const email = form.querySelector('input[type=email]');
      if(email && !email.checkValidity()){ e.preventDefault(); alert('Please enter a valid email'); }
    });
  }
});
