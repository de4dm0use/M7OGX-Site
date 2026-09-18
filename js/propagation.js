const fallback={sfi:142,sunspots:128,kp:2,aIndex:null,solarWind:null};
const fallbackBands=[["80m",48,"Night"],["40m",78,"Good"],["30m",82,"Good"],["20m",94,"Excellent"],["17m",88,"Excellent"],["15m",70,"Fair"],["12m",56,"Variable"],["10m",43,"Variable"]];

function metric(label,value,suffix=""){
  return `<div class="metric"><small>${label}</small><strong>${value ?? "—"}${suffix}</strong></div>`;
}

function render(d){
  const data={...fallback,...d};
  document.getElementById("metrics").innerHTML=[
    metric("Solar Flux",data.sfi),
    metric("Sunspots",data.sunspots),
    metric("Kp Index",data.kp),
    metric("Solar Wind",data.solarWind," km/s")
  ].join("");

  document.getElementById("bands").innerHTML=fallbackBands.map(([band,score,label])=>`
    <div class="band"><strong>${band}</strong>
      <div class="bar"><i style="width:${score}%"></i></div>
      <span>${label} · estimate</span>
    </div>`).join("");

  document.getElementById("updated").textContent=data.updated
    ? `NOAA · ${new Date(data.updated).toLocaleString()}`
    : "Prototype conditions";
}

fetch("data/space-weather.json",{cache:"no-store"})
  .then(r=>r.ok?r.json():Promise.reject())
  .then(render)
  .catch(()=>render(fallback));
