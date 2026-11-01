(() => {
 const $=id=>document.getElementById(id);
 // Reaction test
 let waitTimer=null,startAt=0,state="idle",best=null;
 const box=$("reactionBox"),start=$("reactionStart"),result=$("reactionResult");
 if(start)start.onclick=()=>{clearTimeout(waitTimer);state="waiting";box.className="reaction-box waiting";box.textContent="WAIT FOR GREEN…";result.textContent="Don't click too early!";start.disabled=true;waitTimer=setTimeout(()=>{state="ready";startAt=performance.now();box.className="reaction-box ready";box.textContent="CLICK NOW!";start.disabled=false;},1200+Math.random()*3000);};
 if(box)box.onclick=()=>{if(state==="waiting"){clearTimeout(waitTimer);state="idle";box.className="reaction-box";box.textContent="TOO SOON!";result.textContent="False start. Try again.";start.disabled=false;}else if(state==="ready"){const ms=Math.round(performance.now()-startAt);best=best===null?ms:Math.min(best,ms);state="idle";box.className="reaction-box";box.textContent="NICE REFLEX!";result.textContent=`Reaction: ${ms} ms · Best: ${best} ms`;}};
 // Memory pairs
 const symbols=["🎮","🚗","👾","⚡","🏆","🕹️"];let cards=[],flipped=[],matched=[],moves=0,lock=false;
 function setupMemory(){cards=[...symbols,...symbols].sort(()=>Math.random()-.5);flipped=[];matched=[];moves=0;lock=false;renderMemory();}
 function renderMemory(){const board=$("memoryBoard");if(!board)return;board.innerHTML=cards.map((s,i)=>`<button class="memory-card ${matched.includes(i)?"matched":""}" data-i="${i}" aria-label="Memory card ${i+1}">${flipped.includes(i)||matched.includes(i)?s:"?"}</button>`).join("");$("memoryResult").textContent=`Moves: ${moves} · Pairs: ${matched.length/2}/6`;}
 $("memoryBoard")?.addEventListener("click",e=>{const b=e.target.closest("[data-i]");if(!b||lock)return;const i=Number(b.dataset.i);if(flipped.includes(i)||matched.includes(i))return;flipped.push(i);if(flipped.length===2){moves++;const [a,c]=flipped;if(cards[a]===cards[c]){matched.push(a,c);flipped=[];renderMemory();if(matched.length===12)$("memoryResult").textContent=`You won in ${moves} moves! GG!`;return;}lock=true;renderMemory();setTimeout(()=>{flipped=[];lock=false;renderMemory();},750);}else renderMemory();});
 $("memoryReset")?.addEventListener("click",setupMemory);setupMemory();
 // Click rush
 let rushScore=0,rushTime=15,rushInterval=null;const target=$("rushTarget"),stage=$("rushStage");
 function moveTarget(){if(!target||!stage)return;const maxX=Math.max(0,stage.clientWidth-58),maxY=Math.max(0,stage.clientHeight-58);target.style.left=Math.random()*maxX+"px";target.style.top=Math.random()*maxY+"px";}
 $("rushStart")?.addEventListener("click",()=>{clearInterval(rushInterval);rushScore=0;rushTime=15;$("rushResult").textContent="Score: 0";$("rushHint").textContent="GO!";$("rushStart").disabled=true;moveTarget();rushInterval=setInterval(()=>{rushTime--;$("rushHint").textContent=`${rushTime}s left`;if(rushTime<=0){clearInterval(rushInterval);$("rushHint").textContent="ROUND OVER";$("rushResult").textContent=`Final score: ${rushScore} · GG!`;$("rushStart").disabled=false;}},1000);});
 target?.addEventListener("click",()=>{if($("rushStart").disabled){rushScore++;$("rushResult").textContent=`Score: ${rushScore}`;moveTarget();}});
})();