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
