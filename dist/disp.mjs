var V=Object.create;var S=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var X=Object.getOwnPropertyNames;var j=Object.getPrototypeOf,K=Object.prototype.hasOwnProperty;var Z=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var z=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of X(e))!K.call(t,r)&&r!==n&&S(t,r,{get:()=>e[r],enumerable:!(i=F(e,r))||i.enumerable});return t};var H=(t,e,n)=>(n=t!=null?V(j(t)):{},z(e||!t||!t.__esModule?S(n,"default",{value:t,enumerable:!0}):n,t));var L=Z((ft,k)=>{(function(){"use strict";let t={debug:!1,parse:function(e,n){if(e instanceof Uint8Array)return t.Uint8(e);if(typeof e=="string")return t.Base64(e);if(e instanceof HTMLElement&&e.type==="file")return t.addListener(e,n);throw new Error("MidiParser.parse() : Invalid input provided")},addListener:function(e,n){if(!File||!FileReader)throw new Error("The File|FileReader APIs are not supported in this browser. Use instead MidiParser.Base64() or MidiParser.Uint8()");if(e===void 0||!(e instanceof HTMLElement)||e.tagName!=="INPUT"||e.type.toLowerCase()!=="file")return console.warn("MidiParser.addListener() : Provided element is not a valid FILE INPUT element"),!1;n=n||function(){},e.addEventListener("change",function(i){if(!i.target.files.length)return!1;console.log("MidiParser.addListener() : File detected in INPUT ELEMENT processing data..");let r=new FileReader;r.readAsArrayBuffer(i.target.files[0]),r.onload=function(s){n(t.Uint8(new Uint8Array(s.target.result)))}})},Base64:function(e){let n=function(s){var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(s=s.replace(/^.*?base64,/,""),s=String(s).replace(/[\t\n\f\r ]+/g,""),!/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/.test(s))throw new TypeError("Failed to execute _atob() : The string to be decoded is not correctly encoded.");s+="==".slice(2-(3&s.length));let u,f="",a,o,l=0;for(;l<s.length;)u=h.indexOf(s.charAt(l++))<<18|h.indexOf(s.charAt(l++))<<12|(a=h.indexOf(s.charAt(l++)))<<6|(o=h.indexOf(s.charAt(l++))),f+=a===64?String.fromCharCode(u>>16&255):o===64?String.fromCharCode(u>>16&255,u>>8&255):String.fromCharCode(u>>16&255,u>>8&255,255&u);return f}(e=String(e));var i=n.length;let r=new Uint8Array(new ArrayBuffer(i));for(let s=0;s<i;s++)r[s]=n.charCodeAt(s);return t.Uint8(r)},Uint8:function(r){let n={data:null,pointer:0,movePointer:function(a){return this.pointer+=a,this.pointer},readInt:function(a){if((a=Math.min(a,this.data.byteLength-this.pointer))<1)return-1;let o=0;if(1<a)for(let l=1;l<=a-1;l++)o+=this.data.getUint8(this.pointer)*Math.pow(256,a-l),this.pointer++;return o+=this.data.getUint8(this.pointer),this.pointer++,o},readStr:function(a){let o="";for(let l=1;l<=a;l++)o+=String.fromCharCode(this.readInt(1));return o},backOne:function(){this.pointer--},readIntVLV:function(){let a=0;if(this.pointer>=this.data.byteLength)return-1;if(this.data.getUint8(this.pointer)<128)a=this.readInt(1);else{let l=[];for(;128<=this.data.getUint8(this.pointer);)l.push(this.readInt(1)-128);var o=this.readInt(1);for(let c=1;c<=l.length;c++)a+=l[l.length-c]*Math.pow(128,c);a+=o}return a}};if(n.data=new DataView(r.buffer,r.byteOffset,r.byteLength),n.readInt(4)!==1297377380)return console.warn("Header validation failed (not MIDI standard or file corrupt.)"),!1;n.readInt(4);let i={};i.formatType=n.readInt(2),i.tracks=n.readInt(2),i.track=[];var r=n.readInt(1),s=n.readInt(1);128<=r?(i.timeDivision=[],i.timeDivision[0]=r-128,i.timeDivision[1]=s):i.timeDivision=256*r+s;for(let a=1;a<=i.tracks;a++){i.track[a-1]={event:[]};var h,u=n.readInt(4);if(u===-1)break;if(u!==1297379947)return!1;n.readInt(4);let o=0,l=!1,c,d;for(;!l&&(o++,i.track[a-1].event[o-1]={},i.track[a-1].event[o-1].deltaTime=n.readIntVLV(),(c=n.readInt(1))!==-1);)if(128<=c?d=c:(c=d,n.movePointer(-1)),c===255){i.track[a-1].event[o-1].type=255,i.track[a-1].event[o-1].metaType=n.readInt(1);var f=n.readIntVLV();switch(i.track[a-1].event[o-1].metaType){case 47:case-1:l=!0;break;case 1:case 2:case 3:case 4:case 5:case 7:case 6:i.track[a-1].event[o-1].data=n.readStr(f);break;case 33:case 89:case 81:i.track[a-1].event[o-1].data=n.readInt(f);break;case 84:i.track[a-1].event[o-1].data=[],i.track[a-1].event[o-1].data[0]=n.readInt(1),i.track[a-1].event[o-1].data[1]=n.readInt(1),i.track[a-1].event[o-1].data[2]=n.readInt(1),i.track[a-1].event[o-1].data[3]=n.readInt(1),i.track[a-1].event[o-1].data[4]=n.readInt(1);break;case 88:i.track[a-1].event[o-1].data=[],i.track[a-1].event[o-1].data[0]=n.readInt(1),i.track[a-1].event[o-1].data[1]=n.readInt(1),i.track[a-1].event[o-1].data[2]=n.readInt(1),i.track[a-1].event[o-1].data[3]=n.readInt(1);break;default:this.customInterpreter!==null&&(i.track[a-1].event[o-1].data=this.customInterpreter(i.track[a-1].event[o-1].metaType,n,f)),this.customInterpreter!==null&&i.track[a-1].event[o-1].data!==!1||(n.readInt(f),i.track[a-1].event[o-1].data=n.readInt(f),this.debug&&console.info("Unimplemented 0xFF meta event! data block readed as Integer"))}}else switch((c=c.toString(16).split(""))[1]||c.unshift("0"),i.track[a-1].event[o-1].type=parseInt(c[0],16),i.track[a-1].event[o-1].channel=parseInt(c[1],16),i.track[a-1].event[o-1].type){case 15:this.customInterpreter!==null&&(i.track[a-1].event[o-1].data=this.customInterpreter(i.track[a-1].event[o-1].type,n,!1)),this.customInterpreter!==null&&i.track[a-1].event[o-1].data!==!1||(h=n.readIntVLV(),i.track[a-1].event[o-1].data=n.readInt(h),this.debug&&console.info("Unimplemented 0xF exclusive events! data block readed as Integer"));break;case 10:case 11:case 14:case 8:case 9:i.track[a-1].event[o-1].data=[],i.track[a-1].event[o-1].data[0]=n.readInt(1),i.track[a-1].event[o-1].data[1]=n.readInt(1);break;case 12:case 13:i.track[a-1].event[o-1].data=n.readInt(1);break;case-1:l=!0;break;default:if(this.customInterpreter!==null&&(i.track[a-1].event[o-1].data=this.customInterpreter(i.track[a-1].event[o-1].metaType,n,!1)),this.customInterpreter===null||i.track[a-1].event[o-1].data===!1)return console.log("Unknown EVENT detected... reading cancelled!"),!1}}return i},customInterpreter:null};if(typeof k<"u")k.exports=t;else{let e=typeof window=="object"&&window.self===window&&window||typeof self=="object"&&self.self===self&&self||typeof global=="object"&&global.global===global&&global;e.MidiParser=t}})()});var C=function(t){let e=Array.from("----");if(t>0)for(let n=0;t>0;n++)e[n]=t<1024?"=":">",t-=2048;else if(t<0)for(let n=3;t<0;n--)e[n]=t>=-1024?"=":"<",t+=2048;return e.join("")},$=function(t){let e=Array.from("----");if(t>64)for(let n=0;t>64;n++)e[n]=t<72?"=":">",t-=16;else if(t<64)for(let n=3;t<64;n--)e[n]=t>=56?"=":"<",t+=16;return e.join("")};var w=class{#t={};addEventListener(t,e){this.#t[t]||(this.#t[t]=[]),this.#t[t].unshift(e)}removeEventListener(t,e){if(this.#t[t]){let n=this.#t[t].indexOf(e);n>-1&&this.#t[t].splice(n,1),this.#t[t].length<1&&delete this.#t[t]}}dispatchEvent(t,e){let n=new Event(t),i=this;n.data=e,this.#t[t]?.length>0&&this.#t[t].forEach(function(r){r?.call(i,n)}),this[`on${t}`]&&this[`on${t}`](n)}};var P=function(t,e){let n=Math.min(t.length,e.length),i=t.slice(0,n),r=e.slice(0,n),s=0,h=0;for(;h<n&&s==0;)s=Math.sign(i[h]-r[h]),h++;return s},v=function(){this.pool=[],this.point=function(t,e=!1){if(this.pool.length>0){let n=this.pool.length,i=1<<Math.floor(Math.log2(n)),r=i,s=64;for(;i>=1&&s>=0;){if(s<=0)throw new Error("TTL reached.");if(r==n)r-=i;else{let u=P(t,this.pool[r]);switch(u){case 0:{s=0;break}case 1:{r+i<=n&&(r+=i);break}case-1:{r!=0&&(r-=i);break}default:console.warn(`Unexpected result ${u}.`)}}i=i>>1,s--}let h=!0;if(r>=this.pool.length)h=!1;else{let u=this;this.pool[r].forEach(function(f,a,o){h&&f!=t[a]&&(h=!1)}),!h&&P(t,this.pool[r])>0&&r++}return h||e?r:-1}else return e?0:-1},this.add=function(t,e){return t.data=e,this.pool.splice(this.point(t,!0),0,t),this},this.default=function(t){console.warn(`No match for "${t}". Default action not defined.`)},this.get=function(t){let e=this.point(t);if(e>-1)return this.pool[e].data;this.default(t)},this.run=function(t,...e){let n=this.point(t);n>-1?this.pool[n].data(t.slice(this.pool[n].length),...e):this.default(t,...e)}};var M=["?","gm","gs","xg","g2","mt32","ns5r","ag10","x5d","05rw"],y={};M.forEach(function(t,e){y[t]=e});var A=[[0,0,0,0,0,0,0,56,82,81],[0,0,0,0,0,127,0,0,0,0]],W=[0,3,32,81,84,88,89],p=function(t,e,n){n[e]=0},q=function(t){let e=[[]];return t?.forEach(function(n){n==247||(n==240?e.push([]):e[e.length-1].push(n))}),e},B=function(t,e="",n="",i=2){return t?`${e}${t.toString().padStart(i,"0")}${n}`:""},D=class extends w{#t=0;#d=new Array(256);#h=0;#a=new Array(64);#n=new Uint8ClampedArray(8192);#l=new Uint8ClampedArray(64);#i=new Uint8ClampedArray(8192);#e=new Uint16Array(256);#u=new Int16Array(64);#o=new Array(64);#r=new Uint8Array(64);#v=0;#E=0;#m=100;#g=0;#w="";#I=0;#c=[];#f=[];#M={8:function(t){let e=t.part*128+t.data[0],n=this.#e.indexOf(e);n>-1&&(this.#e[n]=0,this.#i[e]=0)},9:function(t){this.#a[t.part]=1;let e=t.part*128+t.data[0];if(t.data[1]>0){let n=0;for(;this.#e[n]>0;)n++;n<256?(this.#e[n]=e,this.#i[e]=t.data[1],this.#r[t.part]<t.data[1]&&(this.#r[t.part]=t.data[1])):console.error("Polyphony exceeded.")}else{let n=this.#e.indexOf(e);n>-1&&(this.#e[n]=0,this.#i[e]=0)}},10:function(t){let e=t.part*128+t.data[0];this.#e.indexOf(e)>-1&&(this.#i[e]=data[1])},11:function(t){this.#a[t.part]=1,t.data[0]==0&&t.part%16==9&&this.#t==y.gs&&(t.data[1]=120),this.#n[t.part*128+t.data[0]]=t.data[1]},12:function(t){this.#a[t.part]=1,this.#l[t.part]=t.data,this.#o[t.part]=0},13:function(t){let e=this;this.#e.forEach(function(n){let i=n>>7;t.part==i&&(e.#i[n]=t.data)}),console.info(t)},14:function(t){this.#u[t.part]=t.data[1]*128+t.data[0]-8192},15:function(t){let e=this;q(t.data).forEach(function(n){e.#p.run(n)})},255:function(t){if((this.#f[t.meta]||function(){}).call(this,t.data,t.track),W.indexOf(t.meta)>-1)return t.reply="meta",t;self.debugMode&&console.debug(t)}};#p;#y;#s;getActive(){let t=this.#a.slice();return this.#t==y.mt32&&(t[0]=0),t}getCc(t){let e=t*128,n=this.#n.slice(e,e+128);return n[0]=n[0]||this.#v,n[32]=n[32]||this.#E,n}getPitch(){return this.#u.slice()}getProgram(){return this.#l.slice()}getTexts(){return this.#c.slice()}getVel(t){let e=new Map,n=this;return this.#e.forEach(function(i){let r=Math.floor(i/128),s=i%128;t==r&&n.#i[i]>0&&e.set(s,n.#i[i])}),e}getBitmap(){return{bitmap:this.#d.slice(),expire:this.#h}}getCustomNames(){return this.#o.slice()}getLetter(){return{text:this.#w,expire:this.#I}}getMode(){return M[this.#t]}getMaster(){return{volume:this.#m}}getRawStrength(){let t=this;return this.#e.forEach(function(e){let n=Math.floor(e/128);t.#i[e]>t.#r[n]&&(t.#r[n]=t.#i[e])}),this.#r.slice()}getStrength(){let t=[],e=this;return this.getRawStrength().forEach(function(n,i){t[i]=Math.floor(n*e.#n[i*128+7]*e.#n[i*128+11]*e.#m/803288)}),t}init(){this.dispatchEvent("mode","?"),this.#t=0,this.#v=0,this.#E=0,this.#g=0,this.#a.forEach(p),this.#n.forEach(p),this.#l.forEach(p),this.#i.forEach(p),this.#e.forEach(p),this.#r.forEach(p),this.#m=100,this.#c=[],this.#I=0,this.#w="",this.#h=0,this.#d.forEach(p),this.#o.forEach(p),this.#n[1152]=127;for(let t=0;t<64;t++)this.#n[t*128+7]=127,this.#n[t*128+11]=127,this.#n[t*128+74]=127,this.#n[t*128+10]=127}switchMode(t,e=!1){let n=M.indexOf(t);if(n>-1)(this.#t==0||e)&&(this.#t=n,this.#v=A[0][n],this.#E=A[1][n],this.dispatchEvent("mode",t));else throw new Error(`Unknown mode ${t}`)}runJson(t){return this.#r.forEach(p),this.#M[t.type].call(this,t)}runRaw(t){}constructor(){super();let t=this;this.#p=new v,this.#y=new v,this.#s=new v,this.#p.default=console.debug,this.#f[1]=function(e){this.#c.unshift(e)},this.#f[2]=function(e){this.#c.unshift(`Copyrite: ${e}`)},this.#f[3]=function(e,n){n<1&&this.#g<1&&this.#c.unshift(`TrkTitle: ${e}`)},this.#f[4]=function(e,n){n<1&&this.#g<1&&this.#c.unshift(`${B(this.#g,""," ")}Instrmnt: ${e}`)},this.#f[5]=function(e){this.#c.unshift(`C.Lyrics: ${e}`)},this.#f[6]=function(e){this.#c.unshift(`${B(this.#g,""," ")}C.Marker: ${e}`)},this.#f[7]=function(e){this.#c.unshift(`CuePoint: ${e}`)},this.#f[32]=function(e){this.#g=e[0]+1},this.#p.add([126,127,9,1],function(){t.switchMode("gm",!0),console.info("MIDI reset: GM")}).add([126,127,9,3],function(){t.switchMode("g2",!0),console.info("MIDI reset: GM2")}).add([65,16,22,18,127,1],function(){t.switchMode("mt32",!0),console.info("MIDI reset: MT-32")}).add([65,16,66,18,64,0,127,0,65],function(){t.switchMode("gs",!0),console.info("MIDI reset: GS")}).add([66,48,66,52,0],function(e){t.switchMode("ns5r",!0),console.info("KORG reset:",e)}).add([67,16,76,0,0,126,0],function(e){t.switchMode("xg",!0),console.info("MIDI reset: XG")}),this.#p.add([127,127,4,1],function(e){t.switchMode("gm"),t.#m=(e[1]<<7+e[0])/163.83}),this.#p.add([67,16,76,6,0],function(e){let n=e[0];t.#w=" ".repeat(n),t.#I=Date.now()+3200,e.slice(1).forEach(function(i){t.#w+=String.fromCharCode(i)})}).add([67,16,76,7,0,0],function(e){for(t.#h=Date.now()+3200;e.length<48;)e.unshift(0);e.forEach(function(n,i){let r=Math.floor(i/16),s=i%16,h=(s*3+r)*7,u=7,f=0;for(h-=s*5,r==2&&(u=2);f<u;)t.#d[h+f]=n>>6-f&1,f++})}),this.#p.add([65,1],function(e){t.switchMode("mt32"),t.#s.run(e,1)}).add([65,2],function(e){t.switchMode("mt32"),t.#s.run(e,2)}).add([65,3],function(e){t.switchMode("mt32"),t.#s.run(e,3)}).add([65,4],function(e){t.switchMode("mt32"),t.#s.run(e,4)}).add([65,5],function(e){t.switchMode("mt32"),t.#s.run(e,5)}).add([65,6],function(e){t.switchMode("mt32"),t.#s.run(e,6)}).add([65,7],function(e){t.switchMode("mt32"),t.#s.run(e,7)}).add([65,8],function(e){t.switchMode("mt32"),t.#s.run(e,8)}).add([65,9],function(e){t.switchMode("mt32"),t.#a[9]=1,t.#s.run(e,9)}),this.#s.add([22,18,2,0,0],function(e,n){let i="";e.slice(0,10).forEach(function(r){r>31&&(i+=String.fromCharCode(r))}),t.#o[n]=i,console.debug(`MT-32 tone properties on channel ${n+1} (${i}): ${e.slice(10)}`)}),this.#p.add([65,16,69,18,16,1,0],function(e){t.#h=Date.now()+3200,e.forEach(function(n,i){if(i<64){let r=Math.floor(i/16),s=i%16,h=(s*4+r)*5,u=5,f=0;for(h-=s*4,r==3&&(u=1);f<u;)t.#d[h+f]=n>>4-f&1,f++}})})}};var b=H(L(),1);var U=class{#t=!1;constructor(t,e,n,i){this.#t=t,this.start=e,this.end=n,this.data=i}get duration(){return this.ranged?this.end-this.start:0}get ranged(){return this.#t}},x=class extends U{constructor(t,e,n){super(!0,t,e,n)}},N=class extends U{constructor(t,e){super(!1,t,t,e)}},T=class extends Array{#t=-1;constructor(){super(...arguments)}resetIndex(t){this.#t=-1}fresh(){this.sort(function(t,e){return t.start==e.start?0:(+(t.start>e.start)<<1)-1}),this.forEach(function(t,e){t.index=e})}step(t,e=!1){let n=[];if(e)for(let i=0;i<this.length&&!(this[i].start>t);i++){if(this[i].end<t)continue;n.push(this[i])}else{let i=this.getRange(t-1,t),r=this;i.forEach(function(s){s.index>r.#t&&(n.push(s),r.#t=s.index)})}return n}getRange(t,e){t>e&&([t,e]=[e,t]);let n=[],i=-1,r=Math.ceil(Math.sqrt(this.length)),s=!0;for(let h=0;h<this.length;h+=r)this[h+r]?i<0&&this[h+r].start>=t&&(i=h):i=i<0?h:i;for(;s;)this[i]?.end<e?this[i].start>=t&&n.push(this[i]):s=!1,i++;return n}};var Y=0xffffffffffff,O=function(t){let e=new T,n=this,i=t.timeDivision,r=120,s=new T,h=0,u=0;s.push(new x(0,Y,[120,0])),t.track.forEach(function(l){h=0,l.event.forEach(function(c){h+=c.deltaTime,c.type==255&&c?.metaType==81&&(r=6e7/c.data,s[s.length-1]&&s.push(new x(h,0xffffffffffff,[r,0])))})}),s.fresh(),s.forEach(function(l,c,d){c>0&&(d[c-1].end=l.start)});let f=120;s.forEach(function(l,c,d){c>0&&(l.end==l.start?d.splice(d.indexOf(l),1):f==l.data[0]&&(d[c-1].end=l.end,d.splice(d.indexOf(l),1)),f=l.data[0])});let a=0,o=120;return s.forEach(function(l){let c=l.start,d=c/o/i*60+a;o=l.data[0],a=d-c/o/i*60,l.data[1]=a}),console.debug("All tempo changes: ",s),r=120,h=0,u=0,t.track.forEach(function(l,c){h=0,u=0,l.event.forEach(function(d,g){h+=d.deltaTime;let E=s.step(h,!0)[0];E&&(r=E.data[0],u=E.data[1]);let I={type:d.type,data:d.data,track:c,part:0};d.type>14?I.meta=d.metaType:I.part=d.channel,e.push(new N(h/r/i*60+u,I))})}),e.fresh(),e};var J=["MSB","PRG","LSB"];var R=class{#t=[];get(t=0,e=0,n=0){let i,r=Array.from(arguments);r[0]==127&&r[2]==0&&r[1]>111&&(r[1]=0),r[0]==0&&r[2]>111&&r[2]<120&&(r[2]=0);let s=" ";for(;!(i?.length>0);)i=this.#t[r[1]||0][(r[0]<<7)+r[2]],i||(r[2]=0,s="^",this.#t[r[1]||0][r[0]<<7]||(r[0]=0,s="*"));s!=" "&&self.debugMode&&(i="");let h="??";switch(r[0]){case 0:{r[2]==0?h="GM":r[2]<120?h="XG":r[2]==127&&(h="MT");break}case 56:{h="AG";break}case 61:case 83:{h="AI";break}case 62:case 82:{h="XD";break}case 81:{h="RW";break}case 64:case 121:case 126:{h="XG";break}case 127:{h=n==127?"MT":e==0?"GM":"XG";break}case 120:h="GS";default:r[0]<40&&(h="GS")}return{name:i||(t||0).toString().padStart(3,"0")+" "+(e||0).toString().padStart(3,"0")+" "+(n||0).toString().padStart(3,"0"),ending:s,standard:h}}load(t){let e=this,n=[];t.split(`
`).forEach(function(i,r){let s=i.split("	"),h=[];r==0?(s.forEach(function(u,f){n[J.indexOf(u)]=f}),console.info(`Bank map significance: ${n}`)):s.forEach(function(u,f){f>2?(e.#t[h[n[1]]]=e.#t[h[n[1]]]||[],e.#t[h[n[1]]][(h[n[0]]<<7)+h[n[2]]]=s[3]):h.push(parseInt(s[f]))})})}async loadFiles(...t){this.#t=[];let e=this;for(let n=0;n<t.length;n++)await fetch(`./data/bank/${t[n]}.tsv`).then(function(i){return console.info(`Parsing voice map: ${t[n]}`),i.text()}).then(function(i){e.load.call(e,i)})}constructor(...t){this.loadFiles(...t)}};b.default.customInterpreter=function(t,e,n){let i=[],r=n==!1?e.readIntVLV():n;t==127&&(r=1);for(let s=0;s<r;s++){let h=e.readInt(1);if(i.push(h),h!=247){if(h!=240){if(h>127)return console.debug(`Early termination: ${i}`),e.backOne(),e.backOne(),i}}}return i};var G=class extends w{#t=new D;#d;#h="";voices=new R("xg","gs","ns5r");#a=[];#n=new Uint8ClampedArray(64);#l=.5;#i=120;#e=4;#u=4;#o=0;#r=0;reset(){this.dispatchEvent("reset"),this.#d?.resetIndex(),this.#t.init(),this.#h="",this.#l=.5,this.#i=120,this.#e=4,this.#u=4,this.#o=0,this.#r=0}async loadFile(t){this.#d=O(b.default.parse(new Uint8Array(await t.arrayBuffer())))}switchMode(t,e=!1){this.#t.switchMode(t,e)}getMode(){return this.#t.mode}get noteProgress(){return this.#r/this.#l}get noteOverall(){return this.noteProgress-this.#o}get noteBar(){return Math.floor(this.noteOverall/this.#e)}get noteBeat(){return this.noteOverall%this.#e}getTimeSig(){return[this.#e,this.#u]}getTempo(){return this.#i}render(t){t>this.#r&&(this.#r=t);let e=this.#d.step(t),n=0,i=new Set,r=this,s=[];e.forEach(function(c){let d=c.data;d.type==9&&(d.data[1]>0?i.add(d.part*128+d.data[0]):i.has(d.part*128+d.data[0])&&n++),c.data.type==8&&i.has(d.part*128+d.data[0])&&n++;let g=r.#t.runJson(d);switch(g?.reply){case"meta":{s.push(g);break}}g?.reply&&delete g.reply}),s?.length>0&&this.dispatchEvent("meta",s),this.#t.getStrength().forEach(function(c,d){let g=c-r.#n[d];r.#n[d]+=Math.ceil(g-g/2)});let h=this.#t.getActive(),u=[],f=r.#t.getPitch(),a=[],o=r.#t.getProgram(),l=0;return h.forEach(function(c,d){c&&(u[d]=r.#t.getVel(d),a[d]=r.#t.getCc(d),l+=u[d].size)}),{extraPoly:n,curPoly:l,chInUse:h,chKeyPr:u,chPitch:f,chProgr:o,chContr:a,eventCount:e.length,title:this.#h,bitmap:this.#t.getBitmap(),letter:this.#t.getLetter(),names:this.#t.getCustomNames(),texts:this.#t.getTexts(),master:this.#t.getMaster(),mode:this.#t.getMode(),strength:this.#n.slice(),tSig:this.getTimeSig(),tempo:this.getTempo(),noteBar:this.noteBar,noteBeat:Math.floor(this.noteBeat)}}constructor(){super();let t=this;this.addEventListener("meta",function(e){e?.data?.forEach(function(n){(t.#a[n.meta]||console.debug).call(t,n.meta,n.data)})}),this.#t.addEventListener("mode",function(e){t.dispatchEvent("mode",e.data)}),this.#a[3]=function(e,n){t.#h?.length<1&&(t.#h=n)},this.#a[81]=function(e,n){let i=t.noteProgress,r=t.#l||.5;t.#i=6e7/n,t.#l=n/1e6,t.#o+=i*(r/t.#l)-i},this.#a[88]=function(e,n){let i=t.noteProgress,r=t.noteBar,s=t.noteBeat,h=t.#e,u=t.#u;t.#e=n[0],t.#u=1<<n[1];let f=24*(32/n[3])/n[2];h!=t.#e&&(s<1&&t.#e<h?(t.#o+=i-t.#e*r,console.info("Not new bar.")):(t.#o+=i-t.#e*(r+1),console.info("New bar.")),console.info(`${t.#e}/${t.#u}`))}}};var Q=["C~","C#","D~","Eb","E~","F~","F#","G~","Ab","A~","Bb","B~"],_="!0123456789";var m="0123456789_aAbBcCdDeEfFgGhHiIjJ-kKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ",tt=["-","~","+","|"],et={"?":"UnkwnStd",gm:"GnrlMIDI",g2:"GrlMIDI2",xg:"YamahaXG",gs:"RolandGS",mt32:"RlndMT32",ag10:"KorgAG10",x5d:"Korg X5D","05rw":"Korg05RW",ns5r:"KorgNS5R"};var $t=class extends G{constructor(){super()}render(t,e){let n=new Array(24),i=super.render(t),r=this,s=Date.now(),h=Math.round(i.tempo*100)/100;n[0]=`${i.eventCount.toString().padStart(3,"0")} Poly:${(i.curPoly+i.extraPoly).toString().padStart(3,"0")}/256 TSig:${i.tSig[0]}/${i.tSig[1]} Bar:${(i.noteBar+1).toString().padStart(3,"0")}/${i.noteBeat+1} Tempo:${Math.floor(h)}.${Math.floor(h%1*100).toString().padStart(2,"0")} Vol:${Math.floor(i.master.volume)}.${Math.round(i.master.volume%1*100).toString().padStart(2,"0")}%`,n[1]=`Mode:${et[i.mode]} Title:${i.title||"N/A"}`,n[2]="Ch:VoiceNme#St VEM RCDB PP PiBd Pan : Note";let u=3;if(i.chInUse.forEach(function(f,a){if(f){let o=r.voices.get(i.chContr[a][0],i.chProgr[a],i.chContr[a][32]);i.names[a]&&(o.name=i.names[a],o.ending="~"),n[u]=`${(a+1).toString().padStart(2,"0")}:${o.name.slice(0,8).padEnd(8," ")}${o.ending}${o.standard} ${m[i.chContr[a][7]>>1]}${m[i.chContr[a][11]>>1]}${tt[i.chContr[a][1]>>5]} ${m[i.chContr[a][91]>>1]}${m[i.chContr[a][93]>>1]}${m[i.chContr[a][94]>>1]}${m[i.chContr[a][74]>>1]} ${i.chContr[a][65]>63?"O":"X"}${m[i.chContr[a][5]>>1]} ${C(i.chPitch[a])} ${$(i.chContr[a][10])}:`,i.chKeyPr[a].forEach(function(l,c){l>0&&(n[u]+=` <span style="opacity:${Math.round(l/1.27)/100}">${Q[c%12]}${_[Math.floor(c/12)]}</span>`)}),u++}}),i.texts.length>0){let f=0;for(let a=n.length-1;a>=u;a--)n[a]=(i.texts[f]||"").padEnd(100," "),f++}if(s<=i.letter.expire){let f=i.letter.text.padEnd(32," "),a=n.length-2;for(let o=0;o<2;o++)n[o+a]=`${(n[o+a]||"").slice(0,82).padEnd(81)} <span class="letter"> ${f.slice(o*16,o*16+16).padEnd(" ",16)} </span>`}if(e.clearRect(0,0,e.canvas.width,e.canvas.height),e){e.fillStyle="#202020";let f;s<=i.bitmap.expire?f=i.bitmap.bitmap:(f=new Array(256),i.strength.forEach(function(a,o){if(o<16&&i.chContr[o]?.length>0){let l=a>>4;for(let c=0;c<=l;c++)f[o+(15-c)*16]=1}})),f.forEach(function(a,o){a&&e.fillRect((o&15)*12,(o>>4)*6,11,5)})}return n.join("<br/>")}};export{$t as TuiDisplay};
