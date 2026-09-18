const svg=document.getElementById("world"), clock=document.getElementById("clock");
const NS="http://www.w3.org/2000/svg";
function el(tag,attrs={}){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);return e}
function project(lon,lat){return [(lon+180)/360*1000,(90-lat)/180*500]}
function draw(){
  const now=new Date(), utc=now.getUTCHours()+now.getUTCMinutes()/60;
  const subsolarLon=180-utc*15;
  const day=el("path",{d:"M0 0H1000V500H0Z",class:"day"});
  svg.replaceChildren(day);
  // Approximate terminator: declination varies through the year.
  const dayOfYear=Math.floor((Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate())-Date.UTC(now.getUTCFullYear(),0,0))/86400000);
  const decl=23.44*Math.sin((2*Math.PI/365)*(dayOfYear-81));
  const pts=[];
  for(let lat=-89;lat<=89;lat+=2){
    const x=subsolarLon+Math.acos(Math.max(-1,Math.min(1,-Math.tan(lat*Math.PI/180)*Math.tan(decl*Math.PI/180))))*180/Math.PI;
    pts.push(project(((x+180)%360)-180,lat));
  }
  const path="M"+pts.map(p=>p.join(",")).join(" L");
  svg.appendChild(el("path",{d:path,class:"terminator"}));
  // Night overlay is approximated as the opposite side of the terminator.
  const nightPts=pts.map(([x,y])=>[x,y]);
  const npath="M0 0L"+nightPts.map(p=>p.join(",")).join(" L")+"L1000 500L0 500Z";
  svg.insertBefore(el("path",{d:npath,class:"night"}),svg.children[1]);
  // simple latitude/longitude grid
  for(let lat=-60;lat<=60;lat+=30){const a=project(-180,lat),b=project(180,lat);svg.appendChild(el("line",{x1:a[0],y1:a[1],x2:b[0],y2:b[1],class:"gridline"}))}
  for(let lon=-150;lon<=150;lon+=30){const a=project(lon,-90),b=project(lon,90);svg.appendChild(el("line",{x1:a[0],y1:a[1],x2:b[0],y2:b[1],class:"gridline"}))}
  const [sx,sy]=project(-1.5,52.5);svg.appendChild(el("circle",{cx:sx,cy:sy,r:6,class:"station-dot"}));
  clock.textContent=now.toUTCString();
}
draw();setInterval(draw,60000);
