function ph(el){var d=document.createElement('div');d.className='ph';d.textContent='Add photo: '+el.getAttribute('src');el.replaceWith(d)}
function lg(el){var s=document.createElement('span');s.className='logo';s.setAttribute('aria-hidden','true');s.textContent='PN';el.replaceWith(s)}
function $(i){return document.getElementById(i)}
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
document.addEventListener('DOMContentLoaded',function(){
 var root=document.documentElement,tb=$('theme');
 function setTheme(t){root.setAttribute('data-theme',t);tb.textContent=t==='dark'?'Light mode':'Dark mode';store('pnhs-theme',t)}
 setTheme(store('pnhs-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
 tb.onclick=function(){setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark')};
 if($('list')){
  var items=['PSA birth certificate','Report card (Form 138)','Learner Reference Number (LRN)','Certificate of good moral character','Two 2x2 photos','Parent or guardian valid ID'],done=[];
  try{done=JSON.parse(store('pnhs-chk')||'[]')}catch(e){}
  var draw=function(){
   $('list').innerHTML=items.map(function(t,i){return '<label class="chk"><input type="checkbox" data-i="'+i+'"'+(done.indexOf(i)>-1?' checked':'')+'><span>'+t+'</span></label>'}).join('');
   var n=done.length,p=Math.round(n/items.length*100);$('pf').style.width=p+'%';$('pb').setAttribute('aria-valuenow',p);
   $('pt').textContent=n===items.length?'All documents ready. Visit the registrar.':n+' of '+items.length+' ready';
  };
  $('list').onchange=function(e){var i=+e.target.getAttribute('data-i'),k=done.indexOf(i);if(k>-1)done.splice(k,1);else done.push(i);store('pnhs-chk',JSON.stringify(done));draw()};
  draw();
 }
 if($('ftabs')){
  $('ftabs').onclick=function(e){var b=e.target.closest('.tab');if(!b)return;
   [].forEach.call($('ftabs').children,function(c){c.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');
   var f=b.getAttribute('data-f');[].forEach.call(document.querySelectorAll('.ncard'),function(c){c.hidden=f!=='All'&&c.getAttribute('data-c')!==f})};
 }
 if($('cf')){
  $('cf').onsubmit=function(e){e.preventDefault();
   var s=encodeURIComponent('Message from '+$('n').value),b=encodeURIComponent($('m').value+'\n\nFrom: '+$('n').value+' ('+$('e').value+')');
   $('msg').textContent='Thank you, '+$('n').value+'. Your email app will open so you can send the message.';
   location.href='mailto:parangnhs@example.edu.ph?subject='+s+'&body='+b};
 }
});
