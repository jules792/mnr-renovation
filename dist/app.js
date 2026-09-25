const menu=document.querySelector('.menu');const nav=document.querySelector('.navlinks');
function setMenu(open){menu?.setAttribute('aria-expanded',String(open));nav?.classList.toggle('open',open);const label=menu?.querySelector('.menu-label');if(label)label.textContent=open?'Fermer':'Menu'}
menu?.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
nav?.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('click',e=>{if(menu?.getAttribute('aria-expanded')==='true'&&!e.target.closest('header'))setMenu(false)});
matchMedia('(min-width:651px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus()}});
document.querySelectorAll('.compare input').forEach(input=>input.addEventListener('input',()=>{input.closest('.compare').style.setProperty('--position',input.value+'%');input.setAttribute('aria-valuetext',input.value+' % de la photo avant')}));
document.querySelectorAll('[data-project-filter]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const value=link.dataset.projectFilter;document.querySelectorAll('[data-project-filter]').forEach(x=>{x.classList.toggle('active',x===link);x.setAttribute('aria-current',x===link?'true':'false')});document.querySelectorAll('.project').forEach(p=>p.hidden=value!=='Tous'&&p.dataset.category!==value)}));
const contactForm=document.querySelector('#contact-form');
if(contactForm&&new URLSearchParams(location.search).get('envoye')==='1'){
 const status=document.querySelector('#form-status');
 status.textContent='Merci, votre demande a bien été envoyée à Quentin.';
 status.focus?.();
 history.replaceState({},'',location.pathname);
}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.sectionhead,.step').forEach(el=>{el.classList.add('scroll-reveal');observer.observe(el)})}
