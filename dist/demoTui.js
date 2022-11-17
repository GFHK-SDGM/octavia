"use strict";(()=>{var Ot=Object.create;var tt=Object.defineProperty;var Ut=Object.getOwnPropertyDescriptor;var Dt=Object.getOwnPropertyNames;var Bt=Object.getPrototypeOf,Ft=Object.prototype.hasOwnProperty;var Nt=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Xt=(t,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Dt(e))!Ft.call(t,a)&&a!==r&&tt(t,a,{get:()=>e[a],enumerable:!(i=Ut(e,a))||i.enumerable});return t};var et=(t,e,r)=>(r=t!=null?Ot(Bt(t)):{},Xt(e||!t||!t.__esModule?tt(r,"default",{value:t,enumerable:!0}):r,t));var H=Nt((Fe,K)=>{(function(){"use strict";let t={debug:!1,parse:function(e,r){if(e instanceof Uint8Array)return t.Uint8(e);if(typeof e=="string")return t.Base64(e);if(e instanceof HTMLElement&&e.type==="file")return t.addListener(e,r);throw new Error("MidiParser.parse() : Invalid input provided")},addListener:function(e,r){if(!File||!FileReader)throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");if(e===void 0||!(e instanceof HTMLElement)||e.tagName!=="INPUT"||e.type.toLowerCase()!=="file")return console.warn("MidiParser.addListener() : Provided element is not a valid FILE INPUT element"),!1;r=r||function(){},e.addEventListener("change",function(i){if(!i.target.files.length)return!1;console.log("MidiParser.addListener() : File detected in INPUT ELEMENT processing data..");let a=new FileReader;a.readAsArrayBuffer(i.target.files[0]),a.onload=function(s){r(t.Uint8(new Uint8Array(s.target.result)))}})},Base64:function(e){let r=function(s){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(s=s.replace(/^.*?base64,/,""),s=String(s).replace(/[\t\n\f\r ]+/g,""),!/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/.test(s))throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");s+="==".slice(2-(3&s.length));let l,u="",h,o,c=0;for(;c<s.length;)l=n.indexOf(s.charAt(c++))<<18|n.indexOf(s.charAt(c++))<<12|(h=n.indexOf(s.charAt(c++)))<<6|(o=n.indexOf(s.charAt(c++))),u+=h===64?String.fromCharCode(l>>16&255):o===64?String.fromCharCode(l>>16&255,l>>8&255):String.fromCharCode(l>>16&255,l>>8&255,255&l);return u}(e=String(e));var i=r.length;let a=new Uint8Array(new ArrayBuffer(i));for(let s=0;s<i;s++)a[s]=r.charCodeAt(s);return t.Uint8(a)},Uint8:function(a){let r={data:null,pointer:0,movePointer:function(h){return this.pointer+=h,this.pointer},readInt:function(h){if((h=Math.min(h,this.data.byteLength-this.pointer))<1)return-1;let o=0;if(1<h)for(let c=1;c<=h-1;c++)o+=this.data.getUint8(this.pointer)*Math.pow(256,h-c),this.pointer++;return o+=this.data.getUint8(this.pointer),this.pointer++,o},readStr:function(h){let o="";for(let c=1;c<=h;c++)o+=String.fromCharCode(this.readInt(1));return o},backOne:function(){this.pointer--},readIntVLV:function(){let h=0;if(this.pointer>=this.data.byteLength)return-1;if(this.data.getUint8(this.pointer)<128)h=this.readInt(1);else{let c=[];for(;128<=this.data.getUint8(this.pointer);)c.push(this.readInt(1)-128);var o=this.readInt(1);for(let f=1;f<=c.length;f++)h+=c[c.length-f]*Math.pow(128,f);h+=o}return h}};if(r.data=new DataView(a.buffer,a.byteOffset,a.byteLength),r.readInt(4)!==1297377380)return console.warn("Header validation failed (not MIDI standard or file corrupt.)"),!1;r.readInt(4);let i={};i.formatType=r.readInt(2),i.tracks=r.readInt(2),i.track=[];var a=r.readInt(1),s=r.readInt(1);128<=a?(i.timeDivision=[],i.timeDivision[0]=a-128,i.timeDivision[1]=s):i.timeDivision=256*a+s;for(let h=1;h<=i.tracks;h++){i.track[h-1]={event:[]};var n,l=r.readInt(4);if(l===-1)break;if(l!==1297379947)return!1;r.readInt(4);let o=0,c=!1,f,g;for(;!c&&(o++,i.track[h-1].event[o-1]={},i.track[h-1].event[o-1].deltaTime=r.readIntVLV(),(f=r.readInt(1))!==-1);)if(128<=f?g=f:(f=g,r.movePointer(-1)),f===255){i.track[h-1].event[o-1].type=255,i.track[h-1].event[o-1].metaType=r.readInt(1);var u=r.readIntVLV();switch(i.track[h-1].event[o-1].metaType){case 47:case-1:c=!0;break;case 1:case 2:case 3:case 4:case 5:case 7:case 6:i.track[h-1].event[o-1].data=r.readStr(u);break;case 33:case 89:case 81:i.track[h-1].event[o-1].data=r.readInt(u);break;case 84:i.track[h-1].event[o-1].data=[],i.track[h-1].event[o-1].data[0]=r.readInt(1),i.track[h-1].event[o-1].data[1]=r.readInt(1),i.track[h-1].event[o-1].data[2]=r.readInt(1),i.track[h-1].event[o-1].data[3]=r.readInt(1),i.track[h-1].event[o-1].data[4]=r.readInt(1);break;case 88:i.track[h-1].event[o-1].data=[],i.track[h-1].event[o-1].data[0]=r.readInt(1),i.track[h-1].event[o-1].data[1]=r.readInt(1),i.track[h-1].event[o-1].data[2]=r.readInt(1),i.track[h-1].event[o-1].data[3]=r.readInt(1);break;default:this.customInterpreter!==null&&(i.track[h-1].event[o-1].data=this.customInterpreter(i.track[h-1].event[o-1].metaType,r,u)),this.customInterpreter!==null&&i.track[h-1].event[o-1].data!==!1||(r.readInt(u),i.track[h-1].event[o-1].data=r.readInt(u),this.debug&&console.info("Unimplemented 0xFF meta event! data block readed as Integer"))}}else switch((f=f.toString(16).split(""))[1]||f.unshift("0"),i.track[h-1].event[o-1].type=parseInt(f[0],16),i.track[h-1].event[o-1].channel=parseInt(f[1],16),i.track[h-1].event[o-1].type){case 15:this.customInterpreter!==null&&(i.track[h-1].event[o-1].data=this.customInterpreter(i.track[h-1].event[o-1].type,r,!1)),this.customInterpreter!==null&&i.track[h-1].event[o-1].data!==!1||(n=r.readIntVLV(),i.track[h-1].event[o-1].data=r.readInt(n),this.debug&&console.info("Unimplemented 0xF exclusive events! data block readed as Integer"));break;case 10:case 11:case 14:case 8:case 9:i.track[h-1].event[o-1].data=[],i.track[h-1].event[o-1].data[0]=r.readInt(1),i.track[h-1].event[o-1].data[1]=r.readInt(1);break;case 12:case 13:i.track[h-1].event[o-1].data=r.readInt(1);break;case-1:c=!0;break;default:if(this.customInterpreter!==null&&(i.track[h-1].event[o-1].data=this.customInterpreter(i.track[h-1].event[o-1].metaType,r,!1)),this.customInterpreter===null||i.track[h-1].event[o-1].data===!1)return console.log("Unknown EVENT detected... reading cancelled!"),!1}}return i},customInterpreter:null};if(typeof K<"u")K.exports=t;else{let e=typeof window=="object"&&window.self===window&&window||typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;e.MidiParser=t}})()});DOMTokenList.prototype.on=function(t){!this.contains(t)&&this.toggle(t)};DOMTokenList.prototype.off=function(t){this.contains(t)&&this.toggle(t)};var I=function(t,e=document){return e?.querySelector(t)},X=function(t,e=document){return Array.from(e?.querySelectorAll(t))};var it=function(t){let e=Array.from("----");if(t>0)for(let r=0;t>0;r++)e[r]=t<1024?"=":">",t-=2048;else if(t<0)for(let r=3;t<0;r--)e[r]=t>=-1024?"=":"<",t+=2048;return e.join("")},rt=function(t){if(t==128)return"<<>>";let e=Array.from("----");if(t>64)for(let r=0;t>64;r++)e[r]=t<72?"=":">",t-=16;else if(t<64)for(let r=3;t<64;r--)e[r]=t>=56?"=":"<",t+=16;return e.join("")};var U=class{#t={};addEventListener(t,e){this.#t[t]||(this.#t[t]=[]),this.#t[t].unshift(e)}removeEventListener(t,e){if(this.#t[t]){let r=this.#t[t].indexOf(e);r>-1&&this.#t[t].splice(r,1),this.#t[t].length<1&&delete this.#t[t]}}dispatchEvent(t,e){let r=new Event(t),i=this;r.data=e,this.#t[t]?.length>0&&this.#t[t].forEach(function(a){a?.call(i,r)}),this[`on${t}`]&&this[`on${t}`](r)}};var at=function(t,e){let r=Math.min(t.length,e.length),i=t.slice(0,r),a=e.slice(0,r),s=0,n=0;for(;n<r&&s==0;)s=Math.sign(i[n]-a[n]),n++;return s},M=function(){this.pool=[],this.point=function(t,e=!1){if(this.pool.length>0){let r=this.pool.length,i=1<<Math.floor(Math.log2(r)),a=i,s=64;for(;i>=1&&s>=0;){if(s<=0)throw new Error("TTL reached.");if(a==r)a-=i;else{let l=at(t,this.pool[a]);switch(l){case 0:{s=0;break}case 1:{a+i<=r&&(a+=i);break}case-1:{a!=0&&(a-=i);break}default:console.warn(`Unexpected result ${l}.`)}}i=i>>1,s--}let n=!0;if(a>=this.pool.length)n=!1;else{let l=this;this.pool[a].forEach(function(u,h,o){n&&u!=t[h]&&(n=!1)}),!n&&at(t,this.pool[a])>0&&a++}return n||e?a:-1}else return e?0:-1},this.add=function(t,e){return t.data=e,this.pool.splice(this.point(t,!0),0,t),this},this.default=function(t){console.warn(`No match for "${t}". Default action not defined.`)},this.get=function(t){let e=this.point(t);if(e>-1)return this.pool[e].data;this.default(t)},this.run=function(t,...e){let r=this.point(t);r>-1?this.pool[r].data(t.slice(this.pool[r].length),...e):this.default(t,...e)}};var v=["off","hall","room","stage","plate","delay LCR","delay LR","echo","cross delay","early reflections","gate reverb","reverse gate"];v[16]="white room";v[17]="tunnel";v[19]="basement";v[20]="karaoke";v[64]="pass through";v[65]="chorus";v[66]="celeste";v[67]="flanger";v[68]="symphonic";v[69]="rotary speaker";v[70]="tremelo";v[71]="auto pan";v[72]="phaser";v[73]="distortion";v[74]="overdrive";v[75]="amplifier";v[76]="3-band EQ";v[77]="2-band EQ";v[78]="auto wah";var Y=["?","gm","gs","xg","g2","mt32","ns5r","ag10","x5d","05rw","krs","k11","sg"],st=[[0,0,0,0,121,0,0,56,82,81,63,0,0],[0,0,1,0,0,127,0,0,0,0,0,0,0]],$=[120,127,120,127,120,127,61,62,62,62,120,122,127],Vt=[0,3,81,84,88],nt={8:"Off",9:"On",10:"Note aftertouch",11:"cc",12:"pc",13:"Channel aftertouch",14:"Pitch"},V={0:0,1:1,2:3,5:4},lt=[[0,24],[0,127],[0,127],[40,88],[0,127],[0,127]],ot=[36,37];var G=[0,1,2,4,5,6,7,8,10,11,32,38,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,84,91,92,93,94,95,98,99,100,101,12,13,16,17,18,19],Yt=[33,99,100,32,102,8,9,10],A={};Y.forEach((t,e)=>{A[t]=e});var d={length:G.length};G.forEach((t,e)=>{d[t]=e});var b=function(t,e,r){r[e]=0},Gt=function(t){let e=[[]];return t?.forEach(function(r){r==247||(r==240?e.push([]):e[e.length-1].push(r))}),e},ht=function(t,e="",r="",i=2){return t?`${e}${t.toString().padStart(i,"0")}${r}`:""},p={ch:128,cc:G.length,nn:128,pl:512,tr:256,rpn:6},ft=class extends U{#t=0;#g=new Uint8Array(256);#c=0;#l=new Uint8Array(p.ch);#m=new Uint8Array(p.ch);#e=new Uint8ClampedArray(p.ch*p.cc);#d=new Uint8ClampedArray(p.ch);#i=new Uint8ClampedArray(p.ch*p.nn);#f=new Uint8Array(p.ch);#r=new Uint16Array(p.pl);#o=new Int16Array(p.ch);#M=new Array(p.ch);#u=new Uint8Array(p.ch);#w=0;#h=new Uint8Array(p.ch*p.rpn);#k=new Int8Array(p.ch*ot.length);#b=0;#E=0;#T=100;#p=0;#x="";#$=0;#s=!1;#R;#a=[];#v=new Uint8Array(p.ch);#S=new Uint8Array(p.tr);chRedir(t,e,r){if(this.#S[e])return(this.#S[e]-1)*16+t;if([A.gs,A.ns5r].indexOf(this.#t)>-1){if(r==1)return t;let i=0,a=!0;for(;a;)this.#v[t+i]==0?(this.#v[t+i]=e,console.debug(`Assign track ${e} to channel ${t+i+1}.`),a=!1):this.#v[t+i]==e?a=!1:(i+=16,i>=128&&(i=0,a=!1));return t+i}else return t}#n=[];#B;#y={ano:t=>{this.#r.forEach((e,r,i)=>{let a=e>>7;e==0&&this.#i[0]==0||a==t&&(this.#i[e]=0,i[r]=0)})}};#L={8:function(t){let r=t.channel*128+t.data[0],i=this.#r.indexOf(r);i>-1&&(this.#r[i]=0,this.#i[r]=0)},9:function(t){let e=t.channel;this.#l[e]=1;let r=e*128+t.data[0];if(t.data[1]>0){let i=0;for(;this.#r[i]>0;)i++;i<this.#r.length?(this.#r[i]=r,this.#i[r]=t.data[1],this.#u[e]<t.data[1]&&(this.#u[e]=t.data[1])):console.error("Polyphony exceeded.")}else{let i=this.#r.indexOf(r);i>-1&&(this.#r[i]=0,this.#i[r]=0)}},10:function(t){let r=t.channel*128+t.data[0];this.#r.indexOf(r)>-1&&(this.#i[r]=data[1])},11:function(t){let e=t.channel;this.#l[e]=1;let r=e*p.cc;switch(t.data[0]){case 96:return;case 97:return;case 120:return;case 121:{this.#y.ano(e),this.#o[e]=0;let i=e*p.cc;this.#e[i+d[1]]=0,this.#e[i+d[5]]=0,this.#e[i+d[64]]=0,this.#e[i+d[65]]=0,this.#e[i+d[66]]=0,this.#e[i+d[67]]=0,this.#e[i+d[11]]=127,this.#e[i+d[101]]=127,this.#e[i+d[100]]=127,this.#e[i+d[99]]=127,this.#e[i+d[98]]=127;return}case 123:{this.#y.ano(e);return}case 124:{this.#y.ano(e);return}case 125:{this.#y.ano(e);return}case 126:{this.#f[e]=1,this.#y.ano(e);return}case 127:{this.#f[e]=0,this.#y.ano(e);return}}if(d[t.data[0]]==null)console.warn(`cc${t.data[0]} is not accepted.`);else{switch(t.data[0]){case 0:{if(this.#t==0)t.data[1]<48?(this.#e[r]>119&&(t.data[1]=this.#e[r],t.data[1]=120,console.debug(`Forced channel ${e+1} to stay drums.`)),t.data[1]>0&&(console.debug(`Roland GS detected with MSB: ${t.data[1]}`),this.switchMode("gs"))):t.data[1]==62?this.switchMode("x5d"):t.data[1]==63&&this.switchMode("krs");else if(this.#t==A.gs)t.data[1]<64&&this.#e[r]>119&&(t.data[1]=this.#e[r],t.data[1]=120,console.debug(`Forced channel ${e+1} to stay drums.`));else if(this.#t==A.gm)t.data[1]<48&&this.#e[r]>119&&(t.data[1]=120,this.switchMode("gs",!0),console.debug(`Forced channel ${e+1} to stay drums.`));else if(this.#t==A.x5d){if(t.data[1]>0&&t.data[1]<8)this.switchMode("05rw",!0);else if(t.data[1]==56){let i=0;for(let a=0;a<16;a++){let s=this.#e[p.cc*a];(s==56||s==62)&&i++}i>14&&this.switchMode("ag10",!0)}}break}case 6:{if(this.#w){let i=this.#e[r+d[99]],a=this.#e[r+d[98]];if(i==1){let s=Yt.indexOf(a);if(s>-1)this.#e[r+d[71+s]]=t.data[1],console.debug(`Redirected NRPN 1 ${a} to cc${71+s}.`);else{let n=ot.indexOf(a);n>-1&&(this.#k[e*10+n]=t.data[1]-64),console.debug(`CH${e+1} voice NRPN ${a} commit`)}}}else{let i=V[this.#e[r+d[100]]];this.#e[r+d[101]]==0&&i!=null&&(console.debug(`CH${e+1} RPN 0 ${this.#e[r+d[100]]} commit: ${t.data[1]}`),t.data[1]=Math.min(Math.max(t.data[1],lt[i][0]),lt[i][1]),this.#h[e*p.rpn+i]=t.data[1])}break}case 38:{this.#w||this.#e[r+101]==0&&V[this.#e[r+100]]!=null&&(this.#h[e*p.rpn+V[this.#e[r+100]]+1]=t.data[1]);break}case 98:case 99:{this.#w=1;break}case 100:case 101:{this.#w=0;break}}this.#e[r+d[t.data[0]]]=t.data[1]}},12:function(t){let e=t.channel;this.#l[e]=1,this.#d[e]=t.data,this.#M[e]=0},13:function(t){let e=this,r=t.channel;this.#r.forEach(function(i){let a=i>>7;r==a&&(e.#i[i]=t.data)})},14:function(t){let e=t.channel;this.#o[e]=t.data[1]*128+t.data[0]-8192},15:function(t){Gt(t.data).forEach(e=>{let r=e[0],i=e[1]&15;(this.#F[r]||function(){console.debug(`Unknown manufacturer ${r}.`)})(i,e.slice(2))})},255:function(t){if((this.#n[t.meta]||function(r,i,a){}).call(this,t.data,t.track,t.meta),t.meta!=32&&(this.#p=0),Vt.indexOf(t.meta)>-1)return t.reply="meta",t;self.debugMode&&console.debug(t)}};#F={64:(t,e)=>{this.#P.run(e)},65:(t,e)=>{this.#A.run(e)},66:(t,e)=>{this.#O.run(e)},67:(t,e)=>{this.#I.run(e)},68:(t,e)=>{this.#D.run(e)},71:(t,e)=>{this.#U.run(e)},126:(t,e)=>{this.#C.run(e)},127:(t,e)=>{}};#C;#N;#I;#A;#O;#P;#U;#D;buildRchTree(){let t=[];this.#m.forEach((e,r)=>{t[e]?.constructor||(t[e]=[]),t[e].push(r)}),this.#R=t}getActive(){let t=this.#l.slice();return this.#t==A.mt32,t}getCc(t){let e=t*p.cc,r=this.#e.slice(e,e+p.cc);return r[d[0]]=r[d[0]]||this.#b,r[d[32]]=r[d[32]]||this.#E,r}getCcAll(){let t=this.#e.slice();for(let e=0;e<64;e++){let r=e*p.cc;t[r+d[0]]=t[r+d[0]]||this.#b,t[r+d[32]]=t[r+d[32]]||this.#E}return t}getPitch(){return this.#o}getProgram(){return this.#d}getTexts(){return this.#a.slice()}getVel(t){let e=new Map,r=this;return this.#r.forEach(function(i){let a=Math.floor(i/128),s=i%128;t==a&&r.#i[i]>0&&e.set(s,r.#i[i])}),e}getBitmap(){return{bitmap:this.#g,expire:this.#c}}getCustomNames(){return this.#M.slice()}getLetter(){return{text:this.#x,expire:this.#$}}getMode(){return Y[this.#t]}getMaster(){return{volume:this.#T}}getRawStrength(){let t=this;return this.#r.forEach(function(e){let r=Math.floor(e/128);t.#i[e]>t.#u[r]&&(t.#u[r]=t.#i[e])}),this.#u}getStrength(){let t=[],e=this;return this.getRawStrength().forEach(function(r,i){t[i]=Math.floor(r*e.#e[i*p.cc+d[7]]*e.#e[i*p.cc+d[11]]*e.#T/803288)}),t}getRpn(){return this.#h}getNrpn(){return this.#k}init(t=0){this.dispatchEvent("mode","?"),this.#t=0,this.#b=0,this.#E=0,this.#p=0,this.#l.forEach(b),this.#e.forEach(b),this.#d.forEach(b),this.#i.forEach(b),this.#r.forEach(b),this.#u.forEach(b),this.#o.forEach(b),this.#k.forEach(b),this.#T=100,this.#a=[],this.#$=0,this.#x="",this.#c=0,this.#g.forEach(b),this.#M.forEach(b),this.#s=!1,this.#m.forEach(function(e,r,i){i[r]=r}),this.buildRchTree(),this.#v.forEach(b),this.#S.forEach(b),this.#e[p.cc*9]=$[0],this.#e[p.cc*25]=$[0],this.#e[p.cc*41]=$[0],this.#e[p.cc*57]=$[0];for(let e=0;e<64;e++){let r=e*p.cc;this.#e[r+d[7]]=100,this.#e[r+d[11]]=127,this.#e[r+d[10]]=64,this.#e[r+d[71]]=64,this.#e[r+d[72]]=64,this.#e[r+d[73]]=64,this.#e[r+d[74]]=64,this.#e[r+d[75]]=64,this.#e[r+d[76]]=64,this.#e[r+d[77]]=64,this.#e[r+d[78]]=64,this.#e[r+d[91]]=40,this.#e[r+d[101]]=127,this.#e[r+d[100]]=127,this.#e[r+d[99]]=127,this.#e[r+d[98]]=127;let i=e*p.rpn;this.#h[i]=2,this.#h[i+1]=64,this.#h[i+2]=0,this.#h[i+3]=64,this.#h[i+4]=0,this.#h[i+5]=0}}switchMode(t,e=!1){let r=Y.indexOf(t);if(r>-1){if(this.#t==0||e){this.#t=r,this.#b=st[0][r],this.#E=st[1][r];for(let i=0;i<64;i++)$.indexOf(this.#e[i*p.cc])>-1&&(this.#e[i*p.cc]=$[r]);this.dispatchEvent("mode",t)}}else throw new Error(`Unknown mode ${t}`)}newStrength(){this.#u.forEach(b)}runJson(t){if(t.type>14)return this.#L[t.type].call(this,t);{let e=this.chRedir(t.part,t.track),r=!1;this.#R[e]?.forEach(i=>{t.channel=i,r=!0,this.#L[t.type].call(this,t)}),r||console.warn(`${nt[t.type]?nt[t.type]:t.type}${[11,12].includes(t.type)?(t.data[0]!=null?t.data[0]:t.data).toString():""} event sent to CH${e+1} without any recipient.`)}}runRaw(t){}constructor(){super();let t=this;this.#n[1]=function(e){switch(e.slice(0,2)){case"@I":{this.#s=!0,this.#a.unshift(`Kar.Info: ${e.slice(2)}`);break}case"@K":{this.#s=!0,this.#a.unshift("Karaoke mode active."),console.debug(`Karaoke mode active: ${e.slice(2)}`);break}case"@L":{this.#s=!0,this.#a.unshift(`Language: ${e.slice(2)}`);break}case"@T":{this.#s=!0,this.#a.unshift(`Ka.Title: ${e.slice(2)}`);break}case"@V":{this.#s=!0,this.#a.unshift(`Kara.Ver: ${e.slice(2)}`);break}default:this.#s?e[0]=="\\"?this.#a.unshift(`@ ${e.slice(1)}`):e[0]=="/"?this.#a.unshift(e.slice(1)):this.#a[0]+=e:(this.#a[0]=e,this.#a.unshift(""))}},this.#n[2]=function(e){this.#a.unshift(`Copyrite: ${e}`)},this.#n[3]=function(e,r){r<1&&this.#p<1&&this.#a.unshift(`TrkTitle: ${e}`)},this.#n[4]=function(e,r){r<1&&this.#p<1&&this.#a.unshift(`${ht(this.#p,""," ")}Instrmnt: ${e}`)},this.#n[5]=function(e){e.trim()==""?this.#a.unshift(""):this.#a[0]+=`${e}`},this.#n[6]=function(e){this.#a.unshift(`${ht(this.#p,""," ")}C.Marker: ${e}`)},this.#n[7]=function(e){this.#a.unshift(`CuePoint: ${e}`)},this.#n[32]=function(e){this.#p=e[0]+1},this.#n[33]=function(e,r){console.debug(`Track ${r} requests to get assigned to output ${e}.`),t.#S[r]=e+1},this.#n[127]=function(e,r){t.#B.run(e,r)},this.#C=new M,this.#N=new M,this.#I=new M,this.#A=new M,this.#O=new M,this.#P=new M,this.#U=new M,this.#D=new M,this.#C.add([9,1],()=>{t.switchMode("gm",!0),t.#s=t.#s||!1,console.info("MIDI reset: GM")}).add([9,2],()=>{t.switchMode("?",!0),t.init(),console.info("MIDI reset: Init")}).add([9,3],()=>{t.switchMode("g2",!0),t.#s=t.#s||!1,console.info("MIDI reset: GM2")}),this.#I.add([76,0,0,126,0],()=>{t.switchMode("xg",!0),t.#s=!1,console.info("MIDI reset: XG")}),this.#A.add([22,18,127,0,0,1],()=>{t.switchMode("mt32",!0),t.#s=!1,console.info("MIDI reset: MT-32")}).add([66,18,64,0,127,0,65],()=>{t.switchMode("gs",!0),t.#e[p.cc*9]=120,t.#e[p.cc*25]=120,t.#e[p.cc*41]=120,t.#e[p.cc*57]=120,t.#s=!1,t.#v.forEach(b),console.info("MIDI reset: GS")}),this.#P.add([16,0,8,0,0,0,0],()=>{t.switchMode("k11",!0),t.#s=!1,console.info("MIDI reset: KAWAI GMega/K11")})}};var z=et(H(),1);var ct=class{#t=!1;constructor(t,e,r,i){this.#t=t,this.start=e,this.end=r,this.data=i}get duration(){return this.ranged?this.end-this.start:0}get ranged(){return this.#t}},W=class extends ct{constructor(t,e,r){super(!0,t,e,r)}},dt=class extends ct{constructor(t,e){super(!1,t,t,e)}},q=class extends Array{#t=-1;constructor(){super(...arguments)}resetIndex(t){this.#t=-1}fresh(){this.sort(function(t,e){return t.start==e.start?0:(+(t.start>e.start)<<1)-1}),this.forEach(function(t,e){t.index=e})}step(t,e=!1){let r=[];if(e)for(let i=0;i<this.length&&!(this[i].start>t);i++){if(this[i].end<t)continue;r.push(this[i])}else{let i=this.getRange(this.#t==-1?0:t-1,t),a=this;i.forEach(function(s){s.index>a.#t&&(r.push(s),a.#t=s.index)})}return r}getRange(t,e){t>e&&([t,e]=[e,t]);let r=[],i=-1,a=Math.ceil(Math.sqrt(this.length)),s=!0;for(let n=0;n<this.length;n+=a)this[n+a]?i<0&&this[n+a].start>=t&&(i=n):i=i<0?n:i;for(;s;)this[i]?.end<e?this[i].start>=t&&r.push(this[i]):s=!1,i++;return r}};var Kt=0xffffffffffff,j=function(t){let e=new q,r=this,i=t.timeDivision,a=120,s=new q,n=0,l=0;s.push(new W(0,Kt,[120,0])),t.track.forEach(function(c){n=0,c.event.forEach(function(f){n+=f.deltaTime,f.type==255&&f?.metaType==81&&(a=6e7/f.data,s[s.length-1]&&s.push(new W(n,0xffffffffffff,[a,0])))})}),s.fresh(),s.forEach(function(c,f,g){f>0&&(g[f-1].end=c.start)});let u=120;s.forEach(function(c,f,g){f>0&&(c.end==c.start?g.splice(g.indexOf(c),1):u==c.data[0]&&(g[f-1].end=c.end,g.splice(g.indexOf(c),1)),u=c.data[0])});let h=0,o=120;return s.forEach(function(c){let f=c.start,g=f/o/i*60+h;o=c.data[0],h=g-f/o/i*60,c.data[1]=h}),console.debug("All tempo changes: ",s),a=120,n=0,l=0,t.track.forEach(function(c,f){n=0,l=0;let g=f+1;c.event.forEach(function(m,y){n+=m.deltaTime;let E=s.step(n,!0)[0];E&&(a=E.data[0],l=E.data[1]);let N={type:m.type,data:m.data,track:g,part:0};m.type>14?N.meta=m.metaType:N.part=m.channel,e.push(new dt(n/a/i*60+l,N))})}),e.fresh(),self.midiEvents=e,console.debug(`Parsed a type ${t.formatType} MIDI sequence.`),e};var Ht=["MSB","PRG","LSB"];var ut=class{#t;get(t=0,e=0,r=0,i){let a,s=Array.from(arguments);i=="gs"&&t==0&&r<5&&(s[2]=0),s[0]==0&&s[2]>111&&s[2]<120&&(s[2]=0);let n=" ";for(;!(a?.length>=0);)a=this.#t[s[1]||0][(s[0]<<7)+s[2]],a||(s[2]=0,n="^",this.#t[s[1]||0][s[0]<<7]||(t==62?(s[1]--,n=" "):t<64?i=="xg"&&t==16?(a=`Voice${(r*128+e+1).toString().padStart(3,"0")}`,n=" "):(s[0]=0,n="*"):t==80?(a=`PrgU:${e.toString().padStart(3,"0")}`,n="!"):t==88?(a=`CmbU:${e.toString().padStart(3,"0")}`,n="!"):t==121?(a=`GM2Vox0${r}`,n="#"):t==122?(s[1]==32?s[1]==0:s[1]%=7,n=" "):s[1]==0?(a=`${t.toString().padStart(3,"0")} ${e.toString().padStart(3,"0")} ${r.toString().padStart(3,"0")}`,n="!"):(s[1]=0,n="!")));i=="gs"&&n=="^"&&(n=" "),n!=" "&&self.debugMode&&(a="");let l="??";switch(s[0]){case 0:{s[2]==0?l="GM":s[2]==5||s[2]==7?l="KG":s[2]<120?l="XG":s[2]==127&&(l="MT");break}case 56:{l="AG";break}case 61:case 80:case 83:case 88:case 89:case 91:{l="AI";break}case 62:case 82:case 90:{l="XD";break}case 63:l="KR";case 81:{l="RW";break}case 64:case 126:{l="XG";break}case 120:{l="GS";break}case 121:{l="G2";break}case 122:{l="KG";break}case 127:{l=r==127?"MT":e==0?"GM":"XG";break}default:s[0]<48&&(s[0]==16&&i=="xg"?l="XG":l="GS")}return{name:a||(t||0).toString().padStart(3,"0")+" "+(e||0).toString().padStart(3,"0")+" "+(r||0).toString().padStart(3,"0"),ending:n,standard:l}}async load(t,e,r){let i=this,a=[],s=0,n=0;t.split(`
`).forEach(function(l,u){let h=l.split("	"),o=[];u==0?h.forEach(function(c,f){a[Ht.indexOf(c)]=f}):h.forEach(async function(c,f){f>2?(i.#t[o[a[1]]]=i.#t[o[a[1]]]||[],(!i.#t[o[a[1]]][(o[a[0]]<<7)+o[a[2]]]?.length||e)&&(i.#t[o[a[1]]][(o[a[0]]<<7)+o[a[2]]]=h[3],s++),n++):o.push(parseInt(h[f]))})}),console.debug(`Map "${r}" contains ${n} entries in total, loaded ${s} entries.`)}clearRange(t){let e=t.prg!=null?t.prg.constructor==Array?t.prg:[t.prg,t.prg]:[0,127],r=t.msb!=null?t.msb.constructor==Array?t.msb:[t.msb,t.msb]:[0,127],i=t.lsb!=null?t.lsb.constructor==Array?t.lsb:[t.lsb,t.lsb]:[0,127];for(let a=r[0];a<=r[1];a++){let s=a<<7;for(let n=i[0];n<=i[1];n++){let l=s+n;for(let u=e[0];u<=e[1];u++)delete this.#t[u][l]}}}init(){this.#t=[];for(let t=0;t<128;t++)this.#t.push([""])}async loadFiles(...t){this.init();let e=this;t.forEach(async function(r,i){await fetch(`./data/bank/${r}.tsv`).then(function(a){return a.text()}).then(a=>{e.load(a,!1,r)})})}constructor(...t){this.loadFiles(...t)}};z.default.customInterpreter=function(t,e,r){let i=[],a=r==!1?e.readIntVLV():r;t==0||t==127;for(let s=0;s<a;s++){let n=e.readInt(1);if(i.push(n),n!=247){if(n!=240){if(n>127)return console.debug(`Early termination: ${i}`),i.pop(),e.backOne(),e.backOne(),i}}}return i};var pt=class extends U{#t=new ft;#g;#c="";voices=new ut("gm","gm2","xg","gs","ns5r","gmega","sg","kross");#l=[];#m=new Uint8ClampedArray(64);#e=.5;#d=120;#i=4;#f=4;#r=0;#o=0;smoothing=0;reset(){this.dispatchEvent("reset"),this.#g?.resetIndex(),this.#t.init(),this.#c="",this.#e=.5,this.#d=120,this.#i=4,this.#f=4,this.#r=0,this.#o=0}async loadFile(t){this.#g=j(z.default.parse(new Uint8Array(await t.arrayBuffer())))}switchMode(t,e=!1){this.#t.switchMode(t,e)}getMode(){return this.#t.mode}get noteProgress(){return this.#o/this.#e}get noteOverall(){return this.noteProgress-this.#r}get noteBar(){return Math.floor(this.noteOverall/this.#i)}get noteBeat(){let t=this.noteOverall%this.#i;return t<0&&(t+=this.#i),t}getTimeSig(){return[this.#i,this.#f]}getTempo(){return this.#d}sendCmd(t){this.#t.runJson(t)}render(t){t>this.#o&&(this.#o=t);let e=this.#g?.step(t)||[],r=0,i=new Set,a=this,s=[];a.#t.newStrength(),e.forEach(function(m){let y=m.data;y.type==9&&(y.data[1]>0?i.add(y.part*128+y.data[0]):i.has(y.part*128+y.data[0])&&r++),m.data.type==8&&i.has(y.part*128+y.data[0])&&r++;let E=a.#t.runJson(y);switch(E?.reply){case"meta":{s.push(E);break}}E?.reply&&delete E.reply});let n=this.#t.getStrength();n.forEach(function(m,y){let E=m-a.#m[y];a.#m[y]+=Math.ceil(E-E*a.smoothing)}),s?.length>0&&this.dispatchEvent("meta",s);let l=this.#t.getActive(),u=[],h=a.#t.getPitch(),o=a.#t.getCcAll(),c=a.#t.getProgram(),f=0;return l.forEach(function(m,y){m&&(u[y]=a.#t.getVel(y),f+=u[y].size)}),{extraPoly:r,curPoly:f,chInUse:l,chKeyPr:u,chPitch:h,chProgr:c,chContr:o,eventCount:e.length,title:this.#c,bitmap:this.#t.getBitmap(),letter:this.#t.getLetter(),names:this.#t.getCustomNames(),texts:this.#t.getTexts(),master:this.#t.getMaster(),mode:this.#t.getMode(),strength:this.#m.slice(),velo:n,rpn:this.#t.getRpn(),tSig:this.getTimeSig(),tempo:this.getTempo(),noteBar:this.noteBar,noteBeat:Math.floor(this.noteBeat)}}constructor(){super();let t=this;this.smoothing=.5,this.addEventListener("meta",function(e){e?.data?.forEach(function(r){(t.#l[r.meta]||console.debug).call(t,r.meta,r.data)})}),this.#t.addEventListener("mode",function(e){t.dispatchEvent("mode",e.data)}),this.#t.addEventListener("mapupdate",function(e){e.data.clearRange&&t.voices.clearRange(e.data.clearRange),t.voices.load(e.data.voiceMap,e.data.overwrite)}),this.#l[3]=function(e,r){t.#c?.length<1&&(t.#c=r)},this.#l[81]=function(e,r){let i=t.noteProgress,a=t.#e||.5;t.#d=6e7/r,t.#e=r/1e6,t.#r+=i*(a/t.#e)-i},this.#l[88]=function(e,r){let i=t.noteProgress,a=t.noteOverall,s=t.noteBar,n=t.noteBeat,l=t.#i,u=t.#f;t.#i=r[0],t.#f=1<<r[1];let h=24*(32/r[3])/r[2];l!=t.#i&&(n<1?l<t.#i?t.#r+=i-n-s*t.#i:(t.#r+=a*t.#i/l,console.warn("Fuck me! Any trick to make tSig shrinking WORK in any condition!")):t.#r+=i-t.#i*(s+1),console.info(`${t.#i}/${t.#f}`))}}};var gt=new Uint8Array(40),D=0,Wt,ii=setInterval(()=>{Wt&&(gt[D]=!gt[D],D++,D>34&&(D=0))},1e3/50);var qt=["C~","C#","D~","Eb","E~","F~","F#","G~","Ab","A~","Bb","B~"],jt="!0123456789";var P="0123456789_aAbBcCdDeEfFgGhHiIjJ-kKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",zt=["-","~","+","|"],Zt={"?":"UnkwnStd",gm:"GnrlMIDI",g2:"GrlMIDI2",xg:"YamahaXG",gs:"RolandGS",mt32:"RlndMT32",ag10:"KorgAG10",x5d:"Korg X5D","05rw":"Korg05RW",ns5r:"KorgNS5R",krs:"KorgKros",k11:"KawaiK11",sg:"AkaiPrSG"};var mt=class extends pt{#t=0;constructor(){super(),this.addEventListener("reset",()=>{this.#t=0})}render(t,e){let r=new Array(24),i=super.render(t),a=this,s=Date.now(),n=Math.round(i.tempo*100)/100,l=i.curPoly+i.extraPoly;this.#t<l&&(this.#t=l),r[0]=`${i.eventCount.toString().padStart(3,"0")} ${l.toString().padStart(3,"0")}:${this.#t.toString().padStart(3,"0")}/512 TSig:${i.tSig[0]}/${i.tSig[1]} Bar:${(i.noteBar+1).toString().padStart(3,"0")}/${i.noteBeat+1} Tempo:${Math.floor(n)}.${Math.floor(n%1*100).toString().padStart(2,"0")} Vol:${Math.floor(i.master.volume)}.${Math.round(i.master.volume%1*100).toString().padStart(2,"0")}%`,r[1]=`Mode:${Zt[i.mode]} Title:${i.title||"N/A"}`,r[2]="Ch:VoiceNme#St VEM RCDB PP PiBd Pan : Note";let u=3,h=0;if(i.chInUse.forEach(function(o,c){if(o){h=c;let f=c*d.length;if(u<r.length-5&&c>=(self.minCh||0)){let g=a.voices.get(i.chContr[f+d[0]],i.chProgr[c],i.chContr[f+d[32]],i.mode);i.names[c]&&(g.name=i.names[c],g.ending="~"),r[u]=`${(c+1).toString().padStart(2,"0")}:${g.name.slice(0,8).padEnd(8," ")}${g.ending}${g.standard} ${P[i.chContr[f+d[7]]>>1]}${P[i.chContr[f+d[11]]>>1]}${zt[i.chContr[f+d[1]]>>5]} ${P[i.chContr[f+d[91]]>>1]}${P[i.chContr[f+d[93]]>>1]}${P[i.chContr[f+d[94]]>>1]}${P[i.chContr[f+d[74]]>>1]} ${i.chContr[f+d[65]]>63?"O":"X"}${P[i.chContr[f+d[5]]>>1]} ${it(i.chPitch[c])} ${rt(i.chContr[f+d[10]])}:`,i.chKeyPr[c].forEach(function(m,y){m>0&&(r[u]+=` <span style="opacity:${Math.round(m/1.27)/100}">${qt[y%12]}${jt[Math.floor(y/12)]}</span>`)}),u++}}}),i.texts.length>0){let o=0,c=r.length-1;for(;c>=u;)i.texts[o]?.length&&(r[c]=(i.texts[o]||"").padEnd(100," ")),(i.texts[o]?.length>0||i.texts[o]?.length==null)&&c--,o++}if(s<=i.letter.expire){let o=i.letter.text.padEnd(32," "),c=r.length-2;for(let f=0;f<2;f++)r[f+c]=`${(r[f+c]||"").slice(0,82).padEnd(81," ")} <span class="letter"> ${o.slice(f*16,f*16+16).padEnd(" ",16)} </span>`}if(e){e.clearRect(0,0,e.canvas.width,e.canvas.height),e.fillStyle="#202020";let o;s<=i.bitmap.expire?o=i.bitmap.bitmap:(o=new Array(256),h<16?i.strength.forEach(function(c,f){if(f<16){let g=c>>4;for(let m=0;m<=g;m++)o[f+(15-m)*16]=1}}):i.strength.forEach(function(c,f){if(f<32){let g=c>>5;for(let m=0;m<=g;m++)o[f+((f>15?6:15)-m)*16]=1}})),o.forEach(function(c,f){c&&e.fillRect((f&15)*12,(f>>4)*6,11,5)})}return r.join("<br/>")}};var hi=Math.PI*255/180,fi=Math.PI*285/180;CanvasRenderingContext2D.prototype.radial=function(t,e,r,i,a){let s=r-1.5707963267948966,n=Math.sin(s),l=Math.cos(s);this.beginPath(),this.moveTo(t+n*i,e+l*i),this.lineTo(t+n*a,e+l*a),this.stroke()};var yt=7;var ci=yt*(17+2),di=yt*(7+3)+1;var Jt=Object.defineProperty,R=(t,e)=>()=>(t&&(e=t(t=0)),e),L=(t,e)=>{for(var r in e)Jt(t,r,{get:e[r],enumerable:!0})},wt={};L(wt,{default:()=>bt});var bt,_t=R(()=>{bt=async(t=[{}])=>(Array.isArray(t)||(t=[t]),new Promise((e,r)=>{let i=document.createElement("input");i.type="file";let a=[...t.map(u=>u.mimeTypes||[]).join(),t.map(u=>u.extensions||[]).join()].join();i.multiple=t[0].multiple||!1,i.accept=a||"";let s=()=>l(r),n=u=>{typeof l=="function"&&l(),e(u)},l=t[0].legacySetup&&t[0].legacySetup(n,s,i);i.addEventListener("change",()=>{n(i.multiple?Array.from(i.files):i.files[0])}),i.click()}))}),Et={};L(Et,{default:()=>St});var vt,St,Qt=R(()=>{vt=async t=>{let e=await t.getFile();return e.handle=t,e},St=async(t=[{}])=>{Array.isArray(t)||(t=[t]);let e=[];t.forEach((a,s)=>{e[s]={description:a.description||"",accept:{}},a.mimeTypes?a.mimeTypes.map(n=>{e[s].accept[n]=a.extensions||[]}):e[s].accept["*/*"]=a.extensions||[]});let r=await window.showOpenFilePicker({id:t[0].id,startIn:t[0].startIn,types:e,multiple:t[0].multiple||!1,excludeAcceptAllOption:t[0].excludeAcceptAllOption||!1}),i=await Promise.all(r.map(vt));return t[0].multiple?i:i[0]}}),Mt={};L(Mt,{default:()=>kt});var kt,te=R(()=>{kt=async(t=[{}])=>(Array.isArray(t)||(t=[t]),t[0].recursive=t[0].recursive||!1,new Promise((e,r)=>{let i=document.createElement("input");i.type="file",i.webkitdirectory=!0;let a=()=>n(r),s=l=>{typeof n=="function"&&n(),e(l)},n=t[0].legacySetup&&t[0].legacySetup(s,a,i);i.addEventListener("change",()=>{let l=Array.from(i.files);t[0].recursive?t[0].recursive&&t[0].skipDirectory&&(l=l.filter(u=>u.webkitRelativePath.split("/").every(h=>!t[0].skipDirectory({name:h,kind:"directory"})))):l=l.filter(u=>u.webkitRelativePath.split("/").length===2),s(l)}),i.click()}))}),Tt={};L(Tt,{default:()=>Ct});var Z,Ct,ee=R(()=>{Z=async(t,e,r=t.name,i)=>{let a=[],s=[];for await(let n of t.values()){let l=`${r}/${n.name}`;n.kind==="file"?s.push(n.getFile().then(u=>(u.directoryHandle=t,u.handle=n,Object.defineProperty(u,"webkitRelativePath",{configurable:!0,enumerable:!0,get:()=>l})))):n.kind==="directory"&&e&&(!i||!i(n))&&a.push(Z(n,e,l,i))}return[...(await Promise.all(a)).flat(),...await Promise.all(s)]},Ct=async(t={})=>{t.recursive=t.recursive||!1;let e=await window.showDirectoryPicker({id:t.id,startIn:t.startIn});return Z(e,t.recursive,void 0,t.skipDirectory)}}),It={};L(It,{default:()=>At});async function ie(t,e){let r=t.getReader(),i=new ReadableStream({start(s){return n();async function n(){return r.read().then(({done:l,value:u})=>{if(l){s.close();return}return s.enqueue(u),n()})}}}),a=new Response(i);return r.releaseLock(),new Blob([await a.blob()],{type:e})}var At,re=R(()=>{At=async(t,e={})=>{Array.isArray(e)&&(e=e[0]);let r=document.createElement("a"),i=t;"body"in t&&(i=await ie(t.body,t.headers.get("content-type"))),r.download=e.fileName||"Untitled",r.href=URL.createObjectURL(i);let a=()=>n(reject),s=()=>{typeof n=="function"&&n()},n=e.legacySetup&&e.legacySetup(s,a,r);return r.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(r.href),30*1e3),s(null)}),r.click(),null}}),Pt={};L(Pt,{default:()=>xt});var xt,ae=R(()=>{xt=async(t,e=[{}],r=null,i=!1)=>{Array.isArray(e)||(e=[e]),e[0].fileName=e[0].fileName||"Untitled";let a=[];if(e.forEach((l,u)=>{a[u]={description:l.description||"",accept:{}},l.mimeTypes?(u===0&&(t.type?l.mimeTypes.push(t.type):t.headers&&t.headers.get("content-type")&&l.mimeTypes.push(t.headers.get("content-type"))),l.mimeTypes.map(h=>{a[u].accept[h]=l.extensions||[]})):t.type&&(a[u].accept[t.type]=l.extensions||[])}),r)try{await r.getFile()}catch(l){if(r=null,i)throw l}let s=r||await window.showSaveFilePicker({suggestedName:e[0].fileName,id:e[0].id,startIn:e[0].startIn,types:a,excludeAcceptAllOption:e[0].excludeAcceptAllOption||!1}),n=await s.createWritable();return"stream"in t?(await t.stream().pipeTo(n),s):"body"in t?(await t.body.pipeTo(n),s):(await n.write(blob),await n.close(),s)}}),se=(()=>{if(typeof self>"u")return!1;if("top"in self&&self!==top)try{top.location+""}catch{return!1}else if("showOpenFilePicker"in self)return"showOpenFilePicker";return!1})(),J=se,ne=J?Promise.resolve().then(()=>(Qt(),Et)):Promise.resolve().then(()=>(_t(),wt));async function _(...t){return(await ne).default(...t)}var gi=J?Promise.resolve().then(()=>(ee(),Tt)):Promise.resolve().then(()=>(te(),Mt));var mi=J?Promise.resolve().then(()=>(ae(),Pt)):Promise.resolve().then(()=>(re(),It));var $t=et(H(),1);$t.default.customInterpreter=function(t,e,r){let i=[],a=r==!1?e.readIntVLV():r;t==0||t==127;for(let s=0;s<a;s++){let n=e.readInt(1);if(i.push(n),n!=247){if(n!=240){if(n>127)return console.debug(`Early termination: ${i}`),i.pop(),e.backOne(),e.backOne(),i}}}return i};var Rt=function(){return new BroadcastChannel("cc.ltgc.octavia:MainInput")};var k={},Q=[];Q[9]="gm";var B=!1;self.minCh=0;var O=X("b.mode"),Lt=[];O.to=function(t){O.forEach(function(e){e.classList.off("active")}),t>-1&&O[t].classList.on("active")};O.forEach(function(t,e,r){Lt[e]=t.title,t.addEventListener("click",function(){tuiVis.switchMode(t.title,!0),O.to(e)})});var x=X("b.demo");x.to=function(t){x.forEach(function(e){e.classList.off("active")}),t>-1&&x[t].classList.on("active")};x.forEach(function(t,e,r){t.addEventListener("click",async function(){C.pause(),k[t.title]?.midi||(k[t.title]={},S.innerHTML=`Loading demo ${t.innerText.toUpperCase()}.${"<br/>".repeat(23)}`,k[t.title].midi=await(await fetch(`./demo/${t.title}.mid`)).blob(),k[t.title].wave=await(await fetch(`./demo/${t.title}.opus`)).blob()),S.innerHTML=`Demo ${t.innerText.toUpperCase()} ready.${"<br/>".repeat(23)}`,C.currentTime=0,tuiVis.reset(),tuiVis.loadFile(k[t.title].midi),w&&URL.revokeObjectURL(w),w=k[t.title].wave,C.src=URL.createObjectURL(w),Q[e]?.length>0&&tuiVis.switchMode(Q[e]),x.to(e)})});self.tuiVis=new mt;tuiVis.addEventListener("reset",function(t){minCh=0});tuiVis.addEventListener("mode",function(t){O.to(Lt.indexOf(t.data))});var F=I("#openMidw"),w,le=JSON.parse('{"extensions":[".mid",".MID",".kar",".KAR",".syx",".SYX"],"startIn":"music","id":"midiOpener","description":"Open a MIDI file"}'),oe=JSON.parse('{"mimeTypes":["audio/*"],"startIn":"music","id":"audioOpener","description":"Open an audio file"}');I("#openMidi").addEventListener("click",async function(){B=!1,F.classList.off("active");let t=await _(le),e=t.name.lastIndexOf("."),r="";e>-1&&(r=t.name.slice(e+1).toLowerCase()),r=="syx"?tuiVis.sendCmd({type:15,track:0,data:new Uint8Array(await t.arrayBuffer())}):(x.to(-1),tuiVis.reset(),tuiVis.loadFile(t))});I("#openAudio").addEventListener("click",async function(){B=!1,F.classList.off("active"),w&&URL.revokeObjectURL(w),w=await _(oe),C.src=URL.createObjectURL(w)});F.addEventListener("click",function(){x.to(-1),w&&URL.revokeObjectURL(w),w=null,C.src="",tuiVis.reset(),B=!0,F.classList.on("active")});var T=I("#bmDisp"),he=T.getContext("2d");T.addEventListener("wheel",function(t){t.deltaY>0?minCh<48&&minCh++:minCh>0&&minCh--});T.addEventListener("mouseup",function(t){t.layerY>47?minCh<48&&(minCh=1+(minCh>>4)<<4):t.layerY<47&&minCh>0&&(minCh<16&&(minCh=16),minCh=(minCh>>4)-1<<4)});var C=I("#audioPlayer"),S=I("#display");T.style.left=`${S.offsetLeft+S.offsetWidth-T.offsetWidth}px`;T.style.top=`${S.offsetTop}px`;C.onended=function(){tuiVis.reset()};(async function(){tuiVis.reset();let t=await(await fetch("./demo/KANDI8.mid")).blob();k.KANDI8={},k.KANDI8.midi=t,tuiVis.loadFile(t),w&&URL.revokeObjectURL(w),w=await(await fetch("./demo/KANDI8.opus")).blob(),k.KANDI8.wave=w,C.src=URL.createObjectURL(w),S.innerHTML=`${"<br/>".repeat(23)}`})();var Ci=setInterval(function(){(!C.paused||B)&&(S.innerHTML=tuiVis.render(C.currentTime-(self.audioDelay||0),he))},20);Rt().addEventListener("message",function(t){B&&tuiVis.sendCmd(t.data)});addEventListener("resize",function(){T.style.left=`${S.offsetLeft+S.offsetWidth-T.offsetWidth}px`,T.style.top=`${S.offsetTop}px`});})();
