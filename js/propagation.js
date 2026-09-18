const data={sfi:142,ssn:128,kp:2,aIndex:7,solarWind:410,bands:[["80m",48,"Night"],["40m",78,"Good"],["30m",82,"Good"],["20m",94,"Excellent"],["17m",88,"Excellent"],["15m",70,"Fair"],["10m",43,"Variable"]]};

const metrics=[
  ["Solar Flux","sfi"],
  ["Sunspots","ssn"],
  ["Kp Index","kp"],
  ["Solar Wind","solarWind"]
];

document.getElementById("metrics").innerHTML=metrics.map(([label,key])=>`<div class="metric"><small>${label}</small><strong>${data[key]}${key==="solarWind"?" km/s":""}</strong></div>`).join("");

document.getElementById("bands").innerHTML=data.bands.map(([band,score,label])=>`
  <div class="band">
    <strong>${band}</strong>
    <div class="bar"><i style="width:${score}%"></i></div>
    <span>${label} · ${score}%</span>
  </div>`).join("");

document.getElementById("updated").textContent="Prototype conditions";
