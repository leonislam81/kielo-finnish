(function(){
  "use strict";
  const installButton=document.getElementById("install-app");
  const connectionLabel=document.getElementById("connection-label");
  const toast=document.getElementById("toast");
  let installPrompt=null;
  let toastTimer=0;
  let offlineReady=false;
  const installed=()=>window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===true;
  function announce(message){
    if(!toast)return;
    toast.textContent=message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer=window.setTimeout(()=>toast.classList.remove("visible"),3600);
  }
  function updateConnection(){
    const offline=!navigator.onLine;
    document.documentElement.classList.toggle("is-offline",offline);
    if(connectionLabel)connectionLabel.textContent=offline?"Offline · Finland time available":offlineReady?"Lessons ready offline":"Finland · Europe/Helsinki";
  }
  updateConnection();
  window.addEventListener("online",updateConnection);
  window.addEventListener("offline",updateConnection);
  if(installButton){
    if(installed())installButton.hidden=true;
    window.addEventListener("beforeinstallprompt",event=>{
      event.preventDefault();
      installPrompt=event;
      installButton.dataset.promptAvailable="true";
    });
    window.addEventListener("appinstalled",()=>{
      installPrompt=null;
      installButton.hidden=true;
      announce("Kielo is installed and ready for your next Finnish session.");
    });
    installButton.addEventListener("click",async()=>{
      if(installPrompt){
        const prompt=installPrompt;
        installPrompt=null;
        await prompt.prompt();
        const choice=await prompt.userChoice;
        if(choice.outcome==="accepted")installButton.hidden=true;
        return;
      }
      if(installed()){
        installButton.hidden=true;
        return;
      }
      const isApple=/iphone|ipad|ipod/i.test(navigator.userAgent);
      announce(isApple?"On iPhone or iPad, tap Share, then Add to Home Screen.":"Open your browser menu and choose Install Kielo or Add to Home Screen.");
    });
  }
  if("serviceWorker" in navigator&&/^https?:$/.test(location.protocol)){
    navigator.serviceWorker.register("./sw.js",{scope:"./",updateViaCache:"none"})
      .then(registration=>{
        if(navigator.onLine)registration.update().catch(()=>{});
        return navigator.serviceWorker.ready;
      })
      .then(()=>{offlineReady=true;document.documentElement.classList.add("offline-ready");updateConnection();})
      .catch(()=>{});
  }
})();
