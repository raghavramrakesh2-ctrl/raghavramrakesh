(() => {
 const cfg=window.PIXELNEST_CONFIG||{};const $=id=>document.getElementById(id);
 setTimeout(()=>{const i=$("intro");if(i)i.classList.add("done");},2100);
 function tick(){const d=Math.max(0,new Date(cfg.gtaVIDate||"2026-11-19T00:00:00").getTime()-Date.now());const vals=[Math.floor(d/86400000),Math.floor(d/3600000)%24,Math.floor(d/60000)%60,Math.floor(d/1000)%60];["days","hours","minutes","seconds"].forEach((id,i)=>{const e=$(id);if(e)e.textContent=String(vals[i]).padStart(i?2:3,"0");});}
 tick();setInterval(tick,1000);const y=$("year");if(y)y.textContent=new Date().getFullYear();
})();