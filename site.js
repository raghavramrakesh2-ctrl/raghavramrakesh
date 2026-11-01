(() => {
 const $=id=>document.getElementById(id),cfg=window.PIXELNEST_CONFIG||{};
 const valid=cfg.firebase&&cfg.firebase.apiKey&&!String(cfg.firebase.apiKey).startsWith("PASTE_")&&cfg.firebase.projectId&&!String(cfg.firebase.projectId).startsWith("YOUR-");
 let auth=null,db=null,user=null,mode="login";
 const msg=(id,t)=>{const e=$(id);if(e)e.textContent=t;};
 if(valid&&window.firebase){try{if(!firebase.apps.length)firebase.initializeApp(cfg.firebase);auth=firebase.auth();db=firebase.firestore();window.pixelnest={auth,db,get user(){return user;},isRegistered(){return !!user&&!user.isAnonymous;},requireAccount(){if(!user||user.isAnonymous){openAuth();msg("authMessage","Sign in or create an account to use this feature.");return false;}return true;}};}catch(e){console.warn("Firebase setup:",e);}}
 else{window.pixelnest={auth:null,db:null,user:null,isRegistered:()=>false,requireAccount:()=>{openAuth();return false;}};}
 function openAuth(){const m=$("authModal");if(m)m.hidden=false;}
 const open=$("loginOpen");if(open)open.onclick=openAuth;
 const close=$("authClose");if(close)close.onclick=()=>{$("authModal").hidden=true;};
 const guest=$("guestContinue");if(guest)guest.onclick=()=>{$("authModal").hidden=true;msg("authMessage","You're browsing as a guest. Have fun!");};
 const tabs=document.querySelectorAll(".tab");tabs.forEach(b=>b.onclick=()=>{mode=b.dataset.mode;tabs.forEach(x=>x.classList.toggle("active",x===b));$("authSubmit").textContent=mode==="login"?"LOGIN →":"CREATE ACCOUNT →";});
 const form=$("authForm");if(form)form.onsubmit=async e=>{e.preventDefault();if(!auth){msg("authMessage","Firebase is not configured. Check config.js.");return;}const email=$("authEmail").value.trim(),pass=$("authPassword").value;msg("authMessage","Connecting…");try{if(mode==="signup")await auth.createUserWithEmailAndPassword(email,pass);else await auth.signInWithEmailAndPassword(email,pass);$("authModal").hidden=true;}catch(err){msg("authMessage",friendly(err));}};
 const google=$("googleLogin");if(google)google.onclick=async()=>{if(!auth){msg("authMessage","Firebase is not configured.");return;}try{await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());$("authModal").hidden=true;}catch(e){msg("authMessage",friendly(e));}};
 const logout=$("logoutBtn");if(logout)logout.onclick=async()=>{if(auth)await auth.signOut();};
 function friendly(e){return ({"auth/email-already-in-use":"That email already has an account. Try Login.","auth/weak-password":"Use at least 6 characters.","auth/invalid-email":"Enter a valid email address.","auth/user-not-found":"No account found. Create one first.","auth/wrong-password":"Incorrect password.","auth/invalid-credential":"Email or password is incorrect.","auth/operation-not-allowed":"Enable Email/Password in Firebase Authentication."})[e.code]||e.message;}
 if(auth)auth.onAuthStateChanged(u=>{user=u;window.pixelnest.user=u;const label=$("userLabel");if(label)label.textContent=u?(u.displayName||u.email||"PLAYER"):"GUEST";if(open)open.hidden=!!u;if(logout)logout.hidden=!u;const admin=$("adminOpen");if(admin)admin.hidden=!(u&&(cfg.adminUIDs||[]).includes(u.uid));window.dispatchEvent(new Event("pixelnest:ready"));});
 else{const label=$("userLabel");if(label)label.textContent="GUEST";window.dispatchEvent(new Event("pixelnest:ready"));}
 const ham=$("hamburger"),nav=$("nav");if(ham&&nav)ham.onclick=()=>nav.classList.toggle("open");
 if(nav)nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
 const admin=$("adminOpen"),adminModal=$("adminModal");if(admin&&adminModal)admin.onclick=()=>adminModal.hidden=false;
 const adminClose=$("adminClose");if(adminClose&&adminModal)adminClose.onclick=()=>adminModal.hidden=true;
 const af=$("adminForm");if(af)af.onsubmit=async e=>{e.preventDefault();if(!db||!user||(cfg.adminUIDs||[]).indexOf(user.uid)<0){msg("adminMessage","Admin access denied.");return;}try{await db.collection("articles").add({category:$("adminCategory").value,title:$("adminTitle").value.trim(),excerpt:$("adminExcerpt").value.trim(),body:$("adminBody").value.trim(),date:new Date().toISOString().slice(0,10),readTime:"COMMUNITY POST",createdAt:firebase.firestore.FieldValue.serverTimestamp(),author:user.uid});msg("adminMessage","Published! Refresh the News page to see it.");af.reset();}catch(e){msg("adminMessage","Publish failed: "+e.message);}};
})();