const data=[
{call:"GB7NR",rx:"439.4375",tx:"430.4375",offset:"-9.000",mode:"DMR",tone:"CC1",town:"Nottingham",status:"ON AIR"},
{call:"GB7NV",rx:"430.8250",tx:"431.8250",offset:"+1.000",mode:"DMR / D-STAR",tone:"CC1",town:"Nottingham",status:"LISTED"},
{call:"GB3NW",rx:"439.4875",tx:"430.4875",offset:"-9.000",mode:"FM / DMR",tone:"71.9 / CC1",town:"Nottingham",status:"LISTED"},
{call:"GB3NF",rx:"145.6250",tx:"145.0250",offset:"-0.600",mode:"FM / DMR / Fusion",tone:"77.0 / CC3",town:"Nottingham",status:"LISTED"},
{call:"GB3FU",rx:"145.7500",tx:"145.1500",offset:"-0.600",mode:"FM",tone:"71.9",town:"Nottingham",status:"LISTED"},
{call:"GB3TK",rx:"433.0750",tx:"434.0750",offset:"+1.000",mode:"FM",tone:"71.9",town:"Nottingham",status:"LISTED"},
{call:"GB3NM",rx:"433.1750",tx:"434.1750",offset:"+1.000",mode:"FM",tone:"71.9",town:"Nottingham",status:"LISTED"}
];
function render(){const q=document.getElementById("search").value.toLowerCase(),m=document.getElementById("mode").value;const rows=data.filter(r=>(!q||Object.values(r).join(" ").toLowerCase().includes(q))&&(!m||r.mode.includes(m))).map(r=>`<tr><td><b>${r.call}</b></td><td>${r.rx}</td><td>${r.tx}</td><td>${r.offset}</td><td>${r.mode}</td><td>${r.tone}</td><td>${r.status}</td></tr>`).join("");document.getElementById("repeaters").innerHTML=`<table><thead><tr><th>Call</th><th>RX MHz</th><th>TX MHz</th><th>Shift</th><th>Mode</th><th>Access</th><th>Status</th></tr></thead><tbody>${rows||'<tr><td colspan="7">No matches.</td></tr>'}</tbody></table>`};document.getElementById("search").oninput=render;document.getElementById("mode").onchange=render;render();