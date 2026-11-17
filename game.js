(()=>{
const $=id=>document.getElementById(id);
if(!window.THREE){$('ui').className='on';$('ui').innerHTML='<h1>Internet needed</h1><small>3D engine load nahi hua. Internet on karke page reload karo.</small>';return}
const T=THREE,LN=3;
let S={best:0,coins:0,mute:0,name:'',col:0,hb:0,boards:[0],bsel:0,up:{}};try{Object.assign(S,JSON.parse(localStorage.mdash2||'{}'))}catch(e){}
S.up=Object.assign({mag:0,boot:0,jet:0,hov:0,x2:0},S.up);
const save=()=>{try{localStorage.mdash2=JSON.stringify(S)}catch(e){}};
const OUT=[['#e63946','#1d3557'],['#2a9d8f','#e9c46a'],['#f4a261','#264653'],['#9b5de5','#f15bb5']],PUC={mag:'#e63946',x2:'#2a9d8f',jet:'#9b5de5',boot:'#f4a261',jp:'#ffd23f',hov:'#ff4fd8'},PUI={mag:'🧲',x2:'2x',jet:'🚀',boot:'👟',jp:'💰',hov:'🛹'},PN={mag:'MAGNET!',x2:'DOUBLE SCORE!',jet:'ROCKET!',boot:'SUPER JUMP!',jp:'JACKPOT!',hov:'HOVERBOARD!'};
let AC;function snd(f,d=.08,t='square',v=.04){if(S.mute)return;try{AC=AC||new(window.AudioContext||webkitAudioContext)();const o=AC.createOscillator(),q=AC.createGain();o.type=t;o.frequency.value=f;q.gain.value=v;q.gain.exponentialRampToValueAtTime(.001,AC.currentTime+d);o.connect(q);q.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
const BD=[['Classic','#ff4fd8',0],['Mint','#3ddc97',120],['Sky Blue','#4cc9f0',250],['Sunset','#ff9e00',400],['Flame','#ff3d00',650],['Neon Lime','#c6ff00',900],['Royal','#7b2ff7',1300],['Galaxy','#3a0ca3',1900],['Gold','#ffd700',2800],['Diamond','#b9f2ff',4000]],UC=[100,250,500,900,1500],HBP=60,DB={mag:[10,2],boot:[10,2],jet:[6,1],hov:[20,4],x2:[10,2]},dur=(k,l)=>DB[k][0]+DB[k][1]*l;
const MS=[['Collect {n} coins in one run','coins',30],['Score {n} points in one run','score',800],['Grab {n} power-ups in one run','pu',3]];
const mis=()=>{const i=S.mi||0,m=MS[i%3],n=m[2]*(1+(i/3|0));return{t:m[0].replace('{n}',n),k:m[1],n}};
const vib=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(e){}};
let mi=0,mt=null;const SCL=[0,3,5,7,10,12,10,7],BS=[110,110,131,147];
function music(){if(mt)return;mt=setInterval(()=>{if(!g.run||g.pause||S.mute)return;snd(220*Math.pow(2,SCL[mi%8]/12),.14,'triangle',.025);if(mi%4==0)snd(BS[(mi>>2)%4],.3,'sawtooth',.03);mi++},170)}
// ---- renderer / scene ----
const R=new T.WebGLRenderer({canvas:$('c'),antialias:true});R.setPixelRatio(Math.min(devicePixelRatio,2));R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;
const sc=new T.Scene(),cam=new T.PerspectiveCamera(62,1,.1,220);
function rs(){R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}addEventListener('resize',rs);rs();
const cv=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);return c};
let sk=cv(8,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);[[0,'#120a35'],[.3,'#7a3a8a'],[.48,'#e8946f'],[1,'#ffcf8a']].forEach(a=>g.addColorStop(a[0],a[1]));x.fillStyle=g;x.fillRect(0,0,w,h)});
sc.background=new T.CanvasTexture(sk);sc.fog=new T.Fog('#e8946f',30,125);
sc.add(new T.HemisphereLight('#ffd6c0','#2a2a50',.95));
const sun=new T.DirectionalLight('#fff0d0',1.15);sun.position.set(9,22,12);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-16,right:16,top:30,bottom:-30,near:1,far:70});sc.add(sun);
const sunD=new T.Mesh(new T.CircleGeometry(14,32),new T.MeshBasicMaterial({color:'#fff1c4',fog:false}));sunD.position.set(30,24,-190);sc.add(sunD);
// ground
const gt=new T.CanvasTexture(cv(512,512,(x)=>{x.fillStyle='#4b4b58';x.fillRect(0,0,512,512);for(let i=0;i<2500;i++){x.fillStyle=Math.random()<.5?'#5d5d6b':'#3a3a46';x.fillRect(Math.random()*512,Math.random()*512,3,3)}
 for(const c of[85,256,427]){x.fillStyle='#5a3f26';for(let i=0;i<4;i++)x.fillRect(c-64,i*128+20,128,26);x.fillStyle='#c9ced8';x.fillRect(c-35,0,8,512);x.fillRect(c+27,0,8,512)}}));
gt.wrapS=gt.wrapT=T.RepeatWrapping;gt.repeat.set(1,22);gt.anisotropy=8;
const gm=new T.Mesh(new T.PlaneGeometry(9,220),new T.MeshStandardMaterial({map:gt,roughness:.9}));gm.rotation.x=-Math.PI/2;gm.position.set(0,0,-190+210);gm.position.z=-90;gm.receiveShadow=true;sc.add(gm);
const side=new T.Mesh(new T.PlaneGeometry(120,220),new T.MeshStandardMaterial({color:'#25253a',roughness:1}));side.rotation.x=-Math.PI/2;side.position.set(0,-.05,-90);sc.add(side);
// buildings
const win=(lit)=>new T.CanvasTexture(cv(128,256,(x)=>{x.fillStyle=lit?'#000':'#3b3b5c';x.fillRect(0,0,128,256);for(let r=0;r<10;r++)for(let c=0;c<4;c++){const on=Math.random()<.55;x.fillStyle=lit?(on?'#ffd98a':'#000'):(on?'#2a2a44':'#1b1b2e');x.fillRect(c*32+6,r*25+6,20,15)}}));
const bMat=['#ffffff','#c8b6ff','#9ec5d6'].map(c=>new T.MeshStandardMaterial({color:c,map:win(0),emissiveMap:win(1),emissive:'#ffffff',emissiveIntensity:.7,roughness:.9}));
const bl=[];for(let i=0;i<30;i++){const s=i%2?1:-1,h=12+Math.random()*22,w=6+Math.random()*3,m=new T.Mesh(new T.BoxGeometry(w,h,12),bMat[i%3]);m.position.set(s*(8+w/2+Math.random()*2),h/2,20-Math.floor(i/2)*15);m.castShadow=true;sc.add(m);bl.push(m)}
// speed particles
const NP=140,pa=new Float32Array(NP*3),pg=new T.BufferGeometry();for(let i=0;i<NP;i++){pa[i*3]=(Math.random()-.5)*18;pa[i*3+1]=Math.random()*8;pa[i*3+2]=-Math.random()*60}
pg.setAttribute('position',new T.BufferAttribute(pa,3));const pts=new T.Points(pg,new T.PointsMaterial({color:'#fff',size:.14,transparent:true,opacity:.55,fog:false}));sc.add(pts);
// ---- materials & helpers ----
const M=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.7,metalness:.1},o));
const GC={},geo=(w,h,d)=>GC[w+','+h+','+d]||(GC[w+','+h+','+d]=new T.BoxGeometry(w,h,d));
const bx=(w,h,d,m,x,y,z,p)=>{const o=new T.Mesh(geo(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o};
const stripeT=new T.CanvasTexture(cv(128,32,(x)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?'#f4d35e':'#d62828';x.fillRect(i*16,0,16,32)}}));
const mStripe=M('#ffffff',{map:stripeT}),mGrey=M('#777'),mDark=M('#22222c'),mGlass=M('#5ab4e8',{emissive:'#1b5a8a',emissiveIntensity:.6,roughness:.2,metalness:.5}),mLamp=M('#fff6c0',{emissive:'#fff6c0',emissiveIntensity:1.5}),mWhite=M('#eeeeee'),
 TM=['#3d7ea6','#c44536','#4f772d'].map(c=>M(c,{roughness:.35,metalness:.35})),mGold=M('#ffd23f',{metalness:.8,roughness:.25,emissive:'#aa7700',emissiveIntensity:.5}),gCoin=new T.CylinderGeometry(.42,.42,.1,24);
function train(G,c){bx(2.6,3.2,14,TM[c],0,1.9,0,G);bx(2.66,.5,14,mDark,0,.28,0,G);bx(2.3,.15,14,mWhite,0,3.55,0,G);bx(2.66,.22,14,mWhite,0,1.45,0,G);bx(2.68,.9,11,mGlass,0,2.55,-.5,G);bx(2.1,1,.06,mGlass,0,2.7,7.02,G);bx(.4,.3,.06,mLamp,-.8,.9,7.03,G);bx(.4,.3,.06,mLamp,.8,.9,7.03,G)}
// ---- player ----
const mS=M('#e63946'),mC=M('#1d3557'),mSk=M('#f1c27d'),mP=M('#2b2d42'),P=new T.Group();sc.add(P);
const pt=(g,m,x,y,z,p)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;(p||P).add(o);return o};
pt(new T.BoxGeometry(.9,1,.5),mS,0,1.45,0);pt(new T.SphereGeometry(.32,18,14),mSk,0,2.25,0);pt(new T.SphereGeometry(.35,18,10,0,6.3,0,1.6),mC,0,2.32,0);pt(new T.BoxGeometry(.45,.07,.32),mC,0,2.3,-.32);pt(new T.BoxGeometry(.7,.8,.3),M('#ffffff',{color:'#333'}),0,1.5,.38);
pt(new T.SphereGeometry(.05,8,8),mP,.12,2.28,-.3);pt(new T.SphereGeometry(.05,8,8),mP,-.12,2.28,-.3);
const lim=(x,y,len,w,m)=>{const g=new T.Group();g.position.set(x,y,0);P.add(g);pt(new T.BoxGeometry(w,len,w),m,0,-len/2,0,g);return g};
const legL=lim(-.22,.95,.95,.3,mP),legR=lim(.22,.95,.95,.3,mP),armL=lim(-.56,1.9,.85,.22,mSk),armR=lim(.56,1.9,.85,.22,mSk);
pt(new T.BoxGeometry(.32,.16,.45),mWhite,0,-.95,-.06,legL);pt(new T.BoxGeometry(.32,.16,.45),mWhite,0,-.95,-.06,legR);
const fl=new T.Mesh(new T.ConeGeometry(.3,1.2,8),new T.MeshBasicMaterial({color:'#ff9f1c'}));fl.rotation.x=Math.PI;fl.position.set(0,.2,.4);P.add(fl);
const RK=new T.Group();[-.25,.25].forEach(x=>{pt(new T.CylinderGeometry(.18,.18,1.1,12),mWhite,x,1.7,.5,RK);pt(new T.ConeGeometry(.18,.4,12),M('#e63946'),x,2.45,.5,RK)});P.add(RK);
const HB=new T.Mesh(geo(1.2,.1,2),M('#ff4fd8',{emissive:'#ff4fd8',emissiveIntensity:.9}));HB.position.y=.05;P.add(HB);
const MG=new T.Mesh(new T.TorusGeometry(1.4,.04,8,40),new T.MeshBasicMaterial({color:'#ff6b6b',transparent:true,opacity:.6}));MG.position.y=1.4;MG.rotation.x=Math.PI/2;P.add(MG);
const gd=new T.Group();pt(geo(.9,1.2,.5),M('#2250b5'),0,1.5,0,gd);pt(new T.SphereGeometry(.32,14,10),mSk,0,2.4,0,gd);pt(new T.SphereGeometry(.35,14,8,0,6.3,0,1.6),M('#142a66'),0,2.45,0,gd);gd.visible=false;sc.add(gd);
const TX2=new T.CanvasTexture(cv(64,64,x=>{x.fillStyle='#2a9d8f';x.fillRect(0,0,64,64);x.fillStyle='#fff';x.font='bold 38px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('2x',32,34)}));
function pk(G,k){const c=PUC[k],mm=M(c,{emissive:c,emissiveIntensity:.7,roughness:.35}),w=M('#fff',{emissive:'#fff',emissiveIntensity:.3});
 pt(new T.TorusGeometry(.85,.05,8,28),mm,0,0,0,G);
 if(k=='mag'){pt(new T.TorusGeometry(.4,.15,10,20,Math.PI),mm,0,.1,0,G);pt(geo(.3,.2,.3),w,-.4,-.05,0,G);pt(geo(.3,.2,.3),w,.4,-.05,0,G)}
 else if(k=='boot'){pt(geo(.5,.3,.9),mm,0,-.2,0,G);pt(geo(.5,.5,.3),mm,0,0,.3,G);pt(geo(.5,.08,.9),w,0,-.38,0,G)}
 else if(k=='jet'){const r=new T.Group();pt(new T.CylinderGeometry(.2,.2,.9,12),w,0,0,0,r);pt(new T.ConeGeometry(.2,.4,12),mm,0,.65,0,r);pt(geo(.5,.2,.05),mm,0,-.3,0,r);pt(geo(.05,.2,.5),mm,0,-.3,0,r);r.rotation.z=-.5;G.add(r)}
 else if(k=='jp')pt(new T.OctahedronGeometry(.55),mm,0,0,0,G);
 else if(k=='hov')pt(geo(1.1,.1,.5),mm,0,0,0,G);
 else G.add(new T.Mesh(new T.PlaneGeometry(.9,.9),new T.MeshBasicMaterial({map:TX2,side:T.DoubleSide})))}
const bn=(t,c)=>{const e=$('bn');e.textContent=t;e.style.color=c||'#ffd23f';e.classList.remove('go');void e.offsetWidth;e.classList.add('go')};
function pick(k){g.pcnt++;bn(PN[k],PUC[k]);if(k=='hov')g.hov=dur('hov',S.up.hov);else if(k=='jp'){g.jp=4;g.coins+=20;g.score+=100;burst(P.position.x,2,0,'g',30,9)}else g.pu[k]=dur(k,S.up[k]);
 if(k=='jet')for(let z=-14;z>-14-g.speed*g.pu.jet;z-=7)for(let l=0;l<3;l++)add('c',l-1,z,{y:4.6})}
const applyBoard=()=>{const b=BD[S.bsel]||BD[0];HB.material.color.set(b[1]);HB.material.emissive.set(b[1]);HB.material.emissiveIntensity=.5+S.bsel*.1;HB.material.metalness=Math.min(1,S.bsel*.1)};
function useHov(){if(!g.run||g.pause||g.hov>0||S.hb<1)return;S.hb--;g.hov=dur('hov',S.up.hov);save();bn('HOVERBOARD!',BD[S.bsel][1]);snd(700,.2,'sine')}
const outfit=()=>{mS.color.set(OUT[S.col][0]);mC.color.set(OUT[S.col][1])};outfit();applyBoard();
const PM={g:M('#ffd23f',{emissive:'#ffaa00',emissiveIntensity:1}),r:M('#ff5a4d',{emissive:'#ff2200',emissiveIntensity:.8}),d:M('#d8cdb8')},PG=new T.BoxGeometry(.14,.14,.14),PP=[];
for(let i=0;i<70;i++){const m=new T.Mesh(PG,PM.g);m.visible=false;sc.add(m);PP.push({m,l:0,vx:0,vy:0,vz:0})}
let pi=0;function burst(x,y,z,k,n,sp){for(let i=0;i<n;i++){const p=PP[pi++%70];p.m.material=PM[k];p.m.position.set(x,y,z);p.vx=(Math.random()-.5)*sp;p.vy=Math.random()*sp;p.vz=(Math.random()-.5)*sp;p.l=.6;p.m.visible=true}}
function updP(dt,v){for(const p of PP)if(p.l>0){p.l-=dt;p.vy-=14*dt;p.m.position.x+=p.vx*dt;p.m.position.y+=p.vy*dt;p.m.position.z+=p.vz*dt+v;p.m.scale.setScalar(Math.max(.1,p.l*1.6));if(p.l<=0)p.m.visible=false}}
const lamps=[];for(let i=0;i<16;i++){const q=i%2?1:-1,G=new T.Group();bx(.2,6,.2,mGrey,0,3,0,G);bx(1.6,.15,.15,mGrey,-q*.7,6,0,G);bx(.6,.2,.4,mLamp,-q*1.4,5.9,0,G);G.position.set(q*5.4,0,20-Math.floor(i/2)*22);sc.add(G);lamps.push(G)}
// ---- game state ----
const g0=()=>({run:0,pause:0,dist:0,speed:16,score:0,coins:0,lane:1,x:0,py:0,vy:0,roll:0,pu:{mag:0,x2:0,jet:0,boot:0},objs:[],last:0,t:0,inv:0,rev:0,jp:0,hov:0,chase:0,pcnt:0,combo:0,comboTimer:0});
let g=g0(),mode='menu',dp=null,shk=0,tab=0;
function newG(run){g.objs.forEach(o=>sc.remove(o.m));g=g0();g.run=run}
function add(t,x,z,o){o=o||{};const G=new T.Group(),e=Object.assign({t,x,z,m:G,L:.5},o);
 if(t=='tr'){train(G,o.c);e.L=14}
 else if(t=='lo'){bx(2.6,.55,.5,mStripe,0,.8,0,G);bx(.16,.8,.16,mGrey,-1.2,.4,0,G);bx(.16,.8,.16,mGrey,1.2,.4,0,G)}
 else if(t=='hi'){bx(.18,2.5,.18,mGrey,-1.25,1.25,0,G);bx(.18,2.5,.18,mGrey,1.25,1.25,0,G);bx(2.6,.7,.3,mStripe,0,1.9,0,G)}
 else if(t=='c'){const m=new T.Mesh(gCoin,mGold);m.rotation.x=Math.PI/2;m.castShadow=true;G.add(m)}
 else pk(G,o.k)
 G.position.set(x*LN,t=='c'?(o.y||1.2):t=='p'?1.6:0,z);sc.add(G);g.objs.push(e)}
function spawn(){const Z=-130;if(g.jp>0){for(let l=0;l<3;l++)for(let i=0;i<10;i++)add('c',l-1,Z-i*2.4);return}const f=Math.random()*3|0;
 for(let l=0;l<3;l++){const x=l-1;
  if(l==f){if(Math.random()<.1)add('p',x,Z,{k:['mag','x2','jet','boot','jp','hov'][Math.random()*6|0]});else if(Math.random()<.75){const ar=Math.random()<.3;for(let i=0;i<6;i++)add('c',x,Z-i*2.4,{y:ar?1.2+Math.sin(i/5*Math.PI)*1.5:1.2})}}
  else if(Math.random()<.65){const r=Math.random();add(r<.45?'tr':r<.75?'lo':'hi',x,Z,{c:Math.random()*3|0})}}}
function crash(big){if(g.hov>0){g.hov=0;g.inv=2.5;shk=.5;burst(P.position.x,1,0,'r',20,8);vib(60);snd(160,.3,'sawtooth',.06);bn('HOVERBOARD SAVED!','#ff4fd8');return}
 if(!big&&g.chase<=0){g.chase=8;g.inv=1.6;g.speed*=.85;shk=.6;burst(P.position.x,1,0,'r',16,7);vib(80);snd(150,.3,'sawtooth',.07);bn('STUMBLE!','#ff5a4d');return}
 g.chase=0;snd(110,.5,'sawtooth',.08);shk=.8;burst(P.position.x,1.2,0,'r',34,10);vib(200);g.run=0;g.nb=(g.score|0)>S.best&&S.best>0;S.best=Math.max(S.best,g.score|0);{const m=mis(),v={coins:g.coins,score:g.score|0,pu:g.pcnt}[m.k];if(v>=m.n){S.mi=(S.mi||0)+1;S.coins+=50;g.mdone=m.t}}S.coins+=g.coins;save();show('over')}
function step(dt){g.t+=dt;if(g.run&&g.pause)return;
 const v=(g.run?g.speed:5)*dt;
 gt.offset.y+=v/10;pts.visible=!!g.run;for(let i=0;i<NP;i++){pa[i*3+2]+=v*1.6;if(pa[i*3+2]>8)pa[i*3+2]=-60}pg.attributes.position.needsUpdate=true;
 for(const b of bl){b.position.z+=v;if(b.position.z>22)b.position.z-=15*15}
 for(const l of lamps){l.position.z+=v;if(l.position.z>24)l.position.z-=8*22}updP(dt,v);
 if(g.run){g.speed=Math.min(38,g.speed+dt*.13);g.dist+=v;g.score+=v*.8*(g.pu.x2>0?2:1);
  for(const k in g.pu)if(g.pu[k]>0)g.pu[k]-=dt;if(g.inv>0)g.inv-=dt;if(g.jp>0)g.jp-=dt;if(g.chase>0)g.chase-=dt;if(g.hov>0){g.hov-=dt;if(g.hov<0)g.hov=0}if(g.roll>0)g.roll-=dt;if(g.comboTimer>0){g.comboTimer-=dt;if(g.comboTimer<=0)g.combo=0;}
  g.x+=(g.lane-1-g.x)*Math.min(1,dt*13);
  if(g.pu.jet>0){g.py+=(4.5-g.py)*Math.min(1,dt*5);g.vy=0}else{g.vy-=32*dt;g.py+=g.vy*dt;if(g.py<=0){if(g.vy<-6)burst(g.x*LN,.1,0,'d',8,4);g.py=0;g.vy=0}}
  if(g.dist-g.last>18+g.speed*.6){g.last=g.dist;spawn()}}
 for(const o of g.objs){o.z+=v;o.m.position.z=o.z;
  if(o.t=='c')o.m.rotation.y+=dt*5;if(o.t=='p'){o.m.rotation.y+=dt*3;o.m.position.y=1.6+Math.sin(g.t*4)*.2}
  if(!g.run)continue;
  if(o.t=='c'&&g.pu.mag>0&&o.z>-25&&o.z<4){o.x+=(g.x-o.x)*Math.min(1,dt*7);o.m.position.x=o.x*LN}
  if(o.dead)continue;const dx=Math.abs(o.x-g.x);
  if(o.t=='c'&&dx<.6&&Math.abs(o.z)<1&&(g.pu.jet>0||g.pu.mag>0||Math.abs(g.py+1.2-(o.y||1.2))<1.7)){o.dead=1;sc.remove(o.m);g.coins++;g.combo=Math.min(25,g.combo+1);g.comboTimer=2.2;g.score+=5*(1+Math.floor(g.combo/5));if(g.combo%5===0)bn('COIN STREAK ×'+(1+Math.floor(g.combo/5)),'#ffd23f');burst(o.m.position.x,o.m.position.y,0,'g',6,5);vib(8);snd(900+g.coins%5*80,.06,'triangle')}
  else if(o.t=='p'&&dx<.6&&Math.abs(o.z)<1.2){o.dead=1;sc.remove(o.m);pick(o.k);burst(o.m.position.x,1.6,0,'g',14,7);vib(20);snd(600,.25,'sine')}
  else if(o.t=='tr'||o.t=='lo'||o.t=='hi'){
   if(dx<.5&&Math.abs(o.z)<o.L/2+.5&&g.pu.jet<=0&&g.inv<=0&&(o.t=='tr'||(o.t=='lo'&&g.py<1.1)||(o.t=='hi'&&g.roll<=0&&g.py<2.3)))return crash(o.t!='lo')}}
 g.objs=g.objs.filter(o=>{if(o.dead)return false;if(o.z>30){sc.remove(o.m);return false}return true})}
function move(d){if(!g.run||g.pause)return;const n=g.lane+d;if(n>=0&&n<3){g.lane=n;snd(300,.05,'sine')}}
function jump(){if(!g.run||g.pause||g.py>.05||g.pu.jet>0)return;g.vy=g.pu.boot>0?17:13.5;if(g.pu.boot>0)burst(g.x*LN,.2,0,'g',10,6);g.roll=0;snd(500,.1,'triangle')}
function roll(){if(!g.run||g.pause||g.pu.jet>0)return;if(g.py>0)g.vy=-22;g.roll=.7;snd(200,.1,'sine')}
addEventListener('keydown',e=>{if(e.target.tagName=='INPUT')return;const k=e.key;
 if(k=='ArrowLeft'||k=='a')move(-1);else if(k=='ArrowRight'||k=='d')move(1);else if(k=='ArrowUp'||k=='w'||k==' ')jump();else if(k=='ArrowDown'||k=='s')roll();else if(k=='h')useHov();else if(k=='p'||k=='Escape')pause();
 if(k.startsWith('Arrow')||k==' ')e.preventDefault()});
let tx=null,ty=null,pointerId=null;const cvs=$('c');
const SWIPE_THRESHOLD=38;
cvs.style.touchAction='none';
cvs.addEventListener('pointerdown',e=>{
 if(tx!==null)return;
 tx=e.clientX;ty=e.clientY;pointerId=e.pointerId;
 try{cvs.setPointerCapture(pointerId)}catch(_){}
});
cvs.addEventListener('pointerup',e=>{
 if(tx===null||e.pointerId!==pointerId)return;
 const dx=e.clientX-tx,dy=e.clientY-ty;
 // One gesture is evaluated exactly once on release. A long swipe can never
 // trigger multiple lane changes from a stream of pointermove events.
 if(Math.max(Math.abs(dx),Math.abs(dy))>=SWIPE_THRESHOLD){
  if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1);
  else if(dy<0)jump();else roll();
 }else{
  const n=performance.now();
  if(n-lastTap<320){useHov();lastTap=0}else{lastTap=n;jump()}
 }
 tx=ty=pointerId=null;
});
let lastTap=0;
const cancelPointer=e=>{if(pointerId===e.pointerId){tx=ty=pointerId=null}};
cvs.addEventListener('pointercancel',cancelPointer);
cvs.addEventListener('lostpointercapture',cancelPointer);
function pause(){if(g.run&&!g.pause){g.pause=1;show('pause')}else if(g.run&&g.pause){g.pause=0;show(0)}}
$('pb').onclick=pause;addEventListener('pagehide',()=>{if(g.run&&g.coins){S.coins+=g.coins;g.coins=0;save()}});document.addEventListener('visibilitychange',()=>{if(document.hidden&&g.run&&!g.pause)pause()});
// ---- render ----
function render(dt){
 const run=g.run&&!g.pause?g.speed/16:(g.run?0:.45),ph=g.t*10*run,air=g.py>.05||g.pu.jet>0;
 legL.rotation.x=air?-.7:Math.sin(ph)*.9;legR.rotation.x=air?.5:-Math.sin(ph)*.9;armL.rotation.x=air?-2.4:-Math.sin(ph)*.9;armR.rotation.x=air?-2.4:Math.sin(ph)*.9;
 P.position.set(g.x*LN,g.py+(air||g.roll>0?0:Math.abs(Math.sin(ph))*.14),0);const rl=g.roll>0;P.scale.setScalar(rl?.7:1);P.rotation.x=rl?-(1-g.roll/.7)*Math.PI*2:0;P.position.y+=rl?.75:0;P.rotation.z=-(g.lane-1-g.x)*.25;P.rotation.y=-(g.lane-1-g.x)*.8;
 P.visible=!(g.inv>0&&((g.t*10)|0)%2);fl.visible=g.pu.jet>0;fl.scale.y=.8+Math.random()*.6;
 const px=g.x*LN,tgt=g.run||g.rev?px*.6:0;cam.position.x+=(tgt-cam.position.x)*Math.min(1,dt*5);lx+=(px*.5-lx)*Math.min(1,dt*6);RK.visible=g.pu.jet>0;HB.visible=!!g.hov;MG.visible=g.pu.mag>0;MG.scale.setScalar(1+Math.sin(g.t*8)*.1);gd.visible=!!g.run&&g.chase>0;if(gd.visible){gd.position.x+=(px-gd.position.x)*.12;gd.position.z=3.4;gd.position.y=Math.abs(Math.sin(g.t*11))*.15}
 cam.position.y=4.8+g.py*.25;cam.position.z=8;shk*=.9;cam.position.x+=(Math.random()-.5)*shk;cam.position.y+=(Math.random()-.5)*shk;
 cam.lookAt(lx,1.8,-12);cam.rotation.z+=(g.lane-1-g.x)*.03;
 cam.fov+=((62+(g.run?(g.speed-16)*.4:0))-cam.fov)*.05;cam.updateProjectionMatrix();
 sunD.position.x=30;R.render(sc,cam);
 $('sc').textContent=g.run?(g.score|0)+(g.combo>=5?'  🔥×'+(1+Math.floor(g.combo/5)):''):'';$('co').textContent=g.run?'🪙 '+g.coins:'';
 $('pu').textContent=g.run?(g.hov>0?'🛹 '+Math.ceil(g.hov)+'\n':S.hb>0?'🛹×'+S.hb+' (double tap)\n':'')+(g.chase>0?'🚔\n':'')+(g.jp>0?'💰\n':'')+Object.keys(g.pu).filter(k=>g.pu[k]>0).map(k=>PUI[k]+' '+Math.ceil(g.pu[k])).join('\n'):''}
// ---- UI ----
function show(m){if(m=='menu'&&!S.name)m='name';const u=$('ui');mode=m;u.className=m?'on':'';$('pb').style.display=m?'none':'';if(!m)return;let h='';
 if(m=='menu')h=`<h1>METRO DASH</h1><div>👤 ${S.name} <button data-a=rename style='padding:2px 10px'>✎</button> · Best ${S.best|0} · 🪙 ${S.coins} · 🛹 ${S.hb}</div><div style="opacity:.9">🎯 ${mis().t}</div><div class=row>${OUT.map((c,i)=>`<button class="dot${i==S.col?' on':''}" data-a=c${i} style="background:linear-gradient(135deg,${c[0]} 50%,${c[1]} 50%)"></button>`).join('')}</div><button class=big data-a=play>PLAY</button><button data-a=shop>🛒 Shop</button><button data-a=mute>Sound: ${S.mute?'OFF':'ON'}</button>`+(dp?'<button data-a=inst style="background:linear-gradient(#ffd23f,#f59e0b);color:#222;font-size:20px">⬇ Install App</button>':'')+`<small>Arrows/WASD/Space on PC · Swipe on phone/tablet · P = pause<br>iPhone: Share → Add to Home Screen</small>`;
 if(m=='shop'){const UP=[['mag','🧲 Magnet'],['boot','👟 Super Boots'],['jet','🚀 Rocket'],['hov','🛹 Hoverboard time'],['x2','2x Score']];
  h=`<h1 style="font-size:38px">SHOP</h1><div>🪙 ${S.coins} · 🛹 in stock: ${S.hb}</div><div class=row><button data-a=tab0>🛹 Hoverboards</button><button data-a=tab1>⚡ Upgrades</button></div><div class=sh>`;
  if(tab==0){h+=`<div class=it><span>🛹 Hoverboard (double-tap / H key to use)</span><button data-a=bh>🪙 ${HBP}</button></div>`;
   BD.forEach((b,i)=>{const o=S.boards.includes(i);h+=`<div class=it><span><i style="display:inline-block;width:46px;height:12px;border-radius:6px;background:${b[1]};vertical-align:middle;box-shadow:0 0 8px ${b[1]}"></i> ${b[0]}</span>`+(o?`<button data-a=bs${i}>${S.bsel==i?'✔ Selected':'Use'}</button>`:`<button data-a=bb${i}>🪙 ${b[2]}</button>`)+`</div>`})}
  else UP.forEach(u=>{const l=S.up[u[0]],mx=l>=5;h+=`<div class=it><span>${u[1]}<br><small>Level ${l}/5 · ${dur(u[0],l)}s${mx?'':' → '+dur(u[0],l+1)+'s'}</small></span>`+(mx?'<b>MAX</b>':`<button data-a=u_${u[0]}>🪙 ${UC[l]}</button>`)+`</div>`});
  h+=`</div><button data-a=menu>◀ Back</button>`}
 if(m=='pause')h=`<h1>PAUSED</h1><button class=big data-a=res>RESUME</button><button data-a=menu>Menu</button>`;
 if(m=='over')h=`<h1>GAME OVER</h1>${g.nb?'<div style="color:#ffd23f;font-size:24px">🏆 NEW BEST!</div>':''}<div>${S.name}<br>Score ${g.score|0} · Best ${S.best|0}<br>🪙 +${g.coins} (total ${S.coins})</div>${g.mdone?'<div style="color:#7dffb0">✅ Mission complete: '+g.mdone+' · +50 🪙</div>':''}`+(!g.rev&&S.coins>=20?'<button data-a=rev>REVIVE 🪙 20</button>':'')+`<button class=big data-a=play>PLAY AGAIN</button><button data-a=shop>🛒 Shop</button><button data-a=menu>Menu</button>`;
 if(m=='name')h=`<h1>WELCOME</h1><div>Apna naam likho / Enter your name</div><input id=nm maxlength=12 value="${S.name||''}" placeholder="Your name"><button class=big data-a=name>OK</button>`;
 u.innerHTML=h;if(m=='name'){const i=$('nm');i.onkeydown=e=>{if(e.key=='Enter')nameOk()};setTimeout(()=>i.focus(),50)}}
function nameOk(){S.name=($('nm').value||'').trim().slice(0,12)||'Player';save();show('menu')}
$('ui').onclick=e=>{const a=e.target.dataset.a;if(!a)return;snd(440,.05);
 if(a[0]=='c'&&a.length==2){S.col=+a[1];outfit();save();show('menu')}
 else if(a=='play'){newG(1);show(0);music()}
 else if(a=='mute'){S.mute^=1;save();show('menu')}
 else if(a=='res'){g.pause=0;show(0)}
 else if(a=='menu'){if(g.run){S.coins+=g.coins;save()}newG(0);show('menu')}
 else if(a=='rev'){S.coins-=20;S.coins+=g.coins;g.coins=0;save();g.run=1;g.rev=1;g.inv=3;g.objs=g.objs.filter(o=>{if(o.z>-45){sc.remove(o.m);return false}return true});g.py=0;show(0)}
 else if(a=='shop'){tab=0;show('shop')}else if(a=='tab0'||a=='tab1'){tab=+a[3];show('shop')}
 else if(a=='bh'){if(S.coins>=HBP){S.coins-=HBP;S.hb++;save();snd(800,.1,'triangle')}show('shop')}
 else if(a[0]=='b'&&a[1]=='b'){const i=+a.slice(2);if(S.coins>=BD[i][2]&&!S.boards.includes(i)){S.coins-=BD[i][2];S.boards.push(i);S.bsel=i;applyBoard();save();snd(800,.1,'triangle')}show('shop')}
 else if(a[0]=='b'&&a[1]=='s'){S.bsel=+a.slice(2);applyBoard();save();show('shop')}
 else if(a.startsWith('u_')){const k=a.slice(2),l=S.up[k];if(l<5&&S.coins>=UC[l]){S.coins-=UC[l];S.up[k]++;save();snd(800,.1,'triangle')}show('shop')}
 else if(a=='name')nameOk();else if(a=='rename')show('name');
 else if(a=='inst'&&dp){dp.prompt();dp=null;show('menu')}};
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;if(mode=='menu')show('menu')});
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
let lx=0,fs=0,fn=0,lowq=0,lt=performance.now();(function loop(n){const dt=Math.min(.05,(n-lt)/1000);lt=n;if(!lowq){fs+=dt;if(++fn==90){if(fs/90>.027){lowq=1;R.setPixelRatio(1);sun.castShadow=false;rs()}fs=fn=0}}step(dt);render(dt);requestAnimationFrame(loop)})(lt);
show('menu');
})();
