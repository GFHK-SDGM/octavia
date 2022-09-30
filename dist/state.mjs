var p=function(t,n){let e=Math.min(t.length,n.length),i=t.slice(0,e),o=n.slice(0,e),r=0,c=0;for(;c<e&&r==0;)r=Math.sign(i[c]-o[c]),c++;return r},h=function(){this.pool=[],this.point=function(t,n=!1){if(this.pool.length>0){let e=this.pool.length,i=1<<Math.floor(Math.log2(e)),o=i,r=64;for(;i>=1&&r>=0;){if(r<=0)throw new Error("TTL reached.");if(o==e)o-=i;else{let u=p(t,this.pool[o]);switch(u){case 0:{r=0;break}case 1:{o+i<=e&&(o+=i);break}case-1:{o!=0&&(o-=i);break}default:console.warn(`Unexpected result ${u}.`)}}i=i>>1,r--}let c=!0;if(o>=this.pool.length)c=!1;else{let u=this;this.pool[o].forEach(function(f,x,D){c&&f!=t[x]&&(c=!1)}),!c&&p(t,this.pool[o])>0&&o++}return c||n?o:-1}else return n?0:-1},this.add=function(t,n){return t.data=n,this.pool.splice(this.point(t,!0),0,t),this},this.default=function(t){console.warn(`No match for "${t}". Default action not defined.`)},this.get=function(t){let n=this.point(t);if(n>-1)return this.pool[n].data;this.default(t)},this.run=function(t,...n){let e=this.point(t);e>-1?this.pool[e].data(t.slice(this.pool[e].length),...n):this.default(t,...n)}};var g=class{#t={};addEventListener(t,n){this.#t[t]||(this.#t[t]=[]),this.#t[t].unshift(n)}removeEventListener(t,n){if(this.#t[t]){let e=this.#t[t].indexOf(n);e>-1&&this.#t[t].splice(e,1),this.#t[t].length<1&&delete this.#t[t]}}dispatchEvent(t,n){let e=new Event(t),i=this;e.data=n,this.#t[t]?.length>0&&this.#t[t].forEach(function(o){o?.call(i,e)}),this[`on${t}`]&&this[`on${t}`](e)}};var s=["off","hall","room","stage","plate","delay LCR","delay LR","echo","cross delay","early reflections","gate reverb","reverse gate"];s[16]="white room";s[17]="tunnel";s[19]="basement";s[20]="karaoke";s[64]="pass through";s[65]="chorus";s[66]="celeste";s[67]="flanger";s[68]="symphonic";s[69]="rotary speaker";s[70]="tremelo";s[71]="auto pan";s[72]="phaser";s[73]="distortion";s[74]="overdrive";s[75]="amplifier";s[76]="3-band EQ";s[77]="2-band EQ";s[78]="auto wah";var G=["melodic","drum","drum set 1","drum set 2"],k=[17.1,18.6,20.2,21.8,23.3,24.9,26.5,28,29.6,31.2,32.8,34.3,35.9,37.5,39,40.6,42.2,43.7,45.3,46.9,48.4,50],$=[20,22,25,28,32,36,40,45,50,56,63,70,80,90,100,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630,700,800,900,1e3,1100,1200,1400,1600,1800,2e3,2200,2500,2800,3200,3600,4e3,4500,5e3,5600,6300,7e3,8e3,9e3,1e4,11e3,12e3,14e3,16e3,18e3,2e4],w=[0,.04,.08,.13,.17,.21,.25,.29,.34,.38,.42,.46,.51,.55,.59,.63,.67,.72,.76,.8,.84,.88,.93,.97,1.01,1.05,1.09,1.14,1.18,1.22,1.26,1.3,1.35,1.39,1.43,1.47,1.51,1.56,1.6,1.64,1.68,1.72,1.77,1.81,1.85,1.89,1.94,1.98,2.02,2.06,2.1,2.15,2.19,2.23,2.27,2.31,2.36,2.4,2.44,2.48,2.52,2.57,2.61,2.65,2.69,2.78,2.86,2.94,3.03,3.11,3.2,3.28,3.37,3.45,3.53,3.62,3.7,3.87,4.04,4.21,4,37,4.54,4.71,4.88,5.05,5.22,5.38,5.55,5.72,6.06,6.39,6.73,7.07,7.4,7.74,8.08,8.41,8.75,9.08,9.42,9.76,10.1,10.8,11.4,12.1,12.8,13.5,14.1,14.8,15.5,16.2,16.8,17.5,18.2,19.5,20.9,22.2,23.6,24.9,26.2,27.6,28.9,30.3,31.6,33,34.3,37,39.7],X=function(t){let n=.1,e=-.3;return t>66?(n=5,e=315):t>56?(n=1,e=47):t>46&&(n=.5,e=18.5),n*t-e},b=function(t){return t>105?k[t-106]:t>100?t*1.1-100:t/10};var v=["room 1","room 2","room 3","hall 1","hall 2","plate","delay","panning delay"],E=["chorus 1","chorus 2","chorus 3","chorus 4","feedback","flanger","short delay","short delay feedback"];var d=function(t=64){return Math.round(2e3*Math.log10(t/64))/100};var m=["?","gm","gs","xg","g2","mt32","ns5r","ag10","x5d","05rw"],l={};m.forEach(function(t,n){l[t]=n});var y=[[0,0,0,0,121,0,0,56,82,81],[0,0,1,0,0,127,0,0,0,0]],M=[120,127,120,127,120,127,61,62,62,62],S=[0,3,81,84,88],P=[8,9,10,32,33,36,37,99,100,101];var a=function(t,n,e){e[n]=0},C=function(t){let n=[[]];return t?.forEach(function(e){e==247||(e==240?n.push([]):n[n.length-1].push(e))}),n},R=function(t,n="",e="",i=2){return t?`${n}${t.toString().padStart(i,"0")}${e}`:""},z=class extends g{#t=0;#v=new Array(256);#E=0;#p=new Array(64);#n=new Uint8ClampedArray(8192);#G=new Uint8ClampedArray(64);#f=new Uint8ClampedArray(8192);#r=new Uint16Array(256);#P=new Int16Array(64);#y=new Array(64);#h=new Uint8Array(64);#M=0;#l=new Uint8Array(256);#C=new Int8Array(640);#R=0;#w=0;#X=100;#$=0;#g="";#x=0;#s=!1;#e=[];#d=new Uint8Array(32);#b=new Uint8Array(128);chRedir(t,n,e){if(this.#t==l.gs){if(this.#b[n])return(this.#b[n]-1)*16+t;if(e)return t;let i=0;return this.#d[t]==0?(this.#d[t]=n,console.debug(`Assign track ${n} to channel ${t+1}.`)):this.#d[t]!=n&&(i=16,this.#d[t+i]==0?(this.#d[t+i]=n,console.debug(`Assign track ${n} to channel ${t+i+1}.`)):this.#d[t+i]!=n&&(i=0)),t+i}else return t}#c=[];#k;#D={8:function(t){let e=this.chRedir(t.part,t.track)*128+t.data[0],i=this.#r.indexOf(e);i>-1&&(this.#r[i]=0,this.#f[e]=0)},9:function(t){let n=this.chRedir(t.part,t.track);this.#p[n]=1;let e=n*128+t.data[0];if(t.data[1]>0){let i=0;for(;this.#r[i]>0;)i++;i<256?(this.#r[i]=e,this.#f[e]=t.data[1],this.#h[n]<t.data[1]&&(this.#h[n]=t.data[1])):console.error("Polyphony exceeded.")}else{let i=this.#r.indexOf(e);i>-1&&(this.#r[i]=0,this.#f[e]=0)}},10:function(t){let e=this.chRedir(t.part,t.track)*128+t.data[0];this.#r.indexOf(e)>-1&&(this.#f[e]=data[1])},11:function(t){let n=this.chRedir(t.part,t.track);this.#p[n]=1;let e=n*128;switch(t.data[0]){case 0:{if(this.#t==l.gs||this.#t==0)t.data[1]<48?(this.#n[e]>119&&(t.data[1]=this.#n[e],this.#t||(t.data[1]=120,console.debug(`Forced channel ${n+1} to stay drums.`))),t.data[1]>0&&(console.debug(`Roland GS detected with MSB: ${t.data[1]}`),this.switchMode("gs"))):t.data[1]==62&&this.switchMode("x5d");else if(this.#t==l.gm)t.data[1]<48&&this.#n[e]>119&&(t.data[1]=120,this.switchMode("gs",!0),console.debug(`Forced channel ${n+1} to stay drums.`));else if(this.#t==l.x5d){if(t.data[1]>0&&t.data[1]<8)this.switchMode("05rw",!0);else if(t.data[1]==56){let i=0;for(let o=0;o<16;o++){let r=this.#n[128*o];(r==56||r==62)&&i++}i>14&&this.switchMode("ag10",!0)}}break}case 6:{if(this.#M){if(this.#n[e+99]==1){let i=P.indexOf(this.#n[e+98]);i>-1&&(this.#C[n*10+i]=t.data[1]-64)}}else this.#n[e+101]==0&&this.#n[e+100]<3&&(this.#l[n*4+[0,1,3][this.#n[e+100]]]=t.data[1]);break}case 38:{this.#M||this.#n[e+101]==0&&this.#n[e+100]==1&&(this.#l[n*4+2]=t.data[1]);break}case 98:case 99:{this.#M=1;break}case 100:case 101:{this.#M=0;break}}this.#n[e+t.data[0]]=t.data[1]},12:function(t){let n=this.chRedir(t.part,t.track);this.#p[n]=1,this.#G[n]=t.data,this.#y[n]=0},13:function(t){let n=this,e=this.chRedir(t.part,t.track);this.#r.forEach(function(i){let o=i>>7;e==o&&(n.#f[i]=t.data)})},14:function(t){let n=this.chRedir(t.part,t.track);this.#P[n]=t.data[1]*128+t.data[0]-8192},15:function(t){let n=this;C(t.data).forEach(function(e){n.#u.run(e,t.track)})},255:function(t){if((this.#c[t.meta]||function(e,i,o){}).call(this,t.data,t.track,t.meta),t.meta!=32&&(this.#$=0),S.indexOf(t.meta)>-1)return t.reply="meta",t;self.debugMode&&console.debug(t)}};#u;#i;#o;#S;#m;#a;getActive(){let t=this.#p.slice();return this.#t==l.mt32&&(t[0]=0),t}getCc(t){let n=t*128,e=this.#n.slice(n,n+128);return e[0]=e[0]||this.#R,e[32]=e[32]||this.#w,e}getCcAll(){let t=this.#n.slice();for(let n=0;n<64;n++){let e=n*128;t[e]=t[e]||this.#R,t[e+32]=t[e+32]||this.#w}return t}getPitch(){return this.#P}getProgram(){return this.#G}getTexts(){return this.#e.slice()}getVel(t){let n=new Map,e=this;return this.#r.forEach(function(i){let o=Math.floor(i/128),r=i%128;t==o&&e.#f[i]>0&&n.set(r,e.#f[i])}),n}getBitmap(){return{bitmap:this.#v,expire:this.#E}}getCustomNames(){return this.#y.slice()}getLetter(){return{text:this.#g,expire:this.#x}}getMode(){return m[this.#t]}getMaster(){return{volume:this.#X}}getRawStrength(){let t=this;return this.#r.forEach(function(n){let e=Math.floor(n/128);t.#f[n]>t.#h[e]&&(t.#h[e]=t.#f[n])}),this.#h}getStrength(){let t=[],n=this;return this.getRawStrength().forEach(function(e,i){t[i]=Math.floor(e*n.#n[i*128+7]*n.#n[i*128+11]*n.#X/803288)}),t}getRpn(){return this.#l}getNrpn(){return this.#C}init(){this.dispatchEvent("mode","?"),this.#t=0,this.#R=0,this.#w=0,this.#$=0,this.#p.forEach(a),this.#n.forEach(a),this.#G.forEach(a),this.#f.forEach(a),this.#r.forEach(a),this.#h.forEach(a),this.#P.forEach(a),this.#C.forEach(a),this.#X=100,this.#e=[],this.#x=0,this.#g="",this.#E=0,this.#v.forEach(a),this.#y.forEach(a),this.#s=!1,this.#d.forEach(a),this.#b.forEach(a),this.#n[1152]=127,this.#n[3200]=127,this.#n[5248]=127,this.#n[7296]=127;for(let t=0;t<64;t++){let n=t*128;this.#n[n+7]=127,this.#n[n+11]=127,this.#n[n+74]=127,this.#n[n+10]=64,this.#n[n+101]=127,this.#n[n+100]=127,this.#n[n+99]=127,this.#n[n+98]=127;let e=t*4;this.#l[e]=2,this.#l[e+1]=64,this.#l[e+2]=0,this.#l[e+3]=64}}switchMode(t,n=!1){let e=m.indexOf(t);if(e>-1){if(this.#t==0||n){this.#t=e,this.#R=y[0][e],this.#w=y[1][e];for(let i=0;i<64;i++)M.indexOf(this.#n[i*128])>-1&&(this.#n[i*128]=M[e]);this.dispatchEvent("mode",t)}}else throw new Error(`Unknown mode ${t}`)}newStrength(){this.#h.forEach(a)}runJson(t){return this.#D[t.type].call(this,t)}runRaw(t){}constructor(){super();let t=this;this.#k=new h,this.#u=new h,this.#i=new h,this.#o=new h,this.#S=new h,this.#m=new h,this.#a=new h,this.#k.default=function(n,e){console.debug(`Unparsed meta 127 sequence on track ${e}: `,n)},this.#u.default=function(n){console.debug("Unparsed SysEx: ",n)},this.#i.default=function(n,e){console.debug(`Unparsed GS Part on channel ${e}: `,n)},this.#S.default=function(n,e){console.debug(`Unparsed XG Part on channel ${e}: `,n)},this.#m.default=function(n,e){console.debug(`Unparsed XG Drum Part on channel ${e}: `,n)},this.#c[1]=function(n){switch(n.slice(0,2)){case"@I":{this.#s=!0,this.#e.unshift(`Kar.Info: ${n.slice(2)}`);break}case"@K":{this.#s=!0,this.#e.unshift("Karaoke mode active."),console.debug(`Karaoke mode active: ${n.slice(2)}`);break}case"@L":{this.#s=!0,this.#e.unshift(`Language: ${n.slice(2)}`);break}case"@T":{this.#s=!0,this.#e.unshift(`Ka.Title: ${n.slice(2)}`);break}case"@V":{this.#s=!0,this.#e.unshift(`Kara.Ver: ${n.slice(2)}`);break}default:this.#s?n[0]=="\\"?this.#e.unshift(`@ ${n.slice(1)}`):n[0]=="/"?this.#e.unshift(n.slice(1)):this.#e[0]+=n:(this.#e[0]=n,this.#e.unshift(""))}},this.#c[2]=function(n){this.#e.unshift(`Copyrite: ${n}`)},this.#c[3]=function(n,e){e<1&&this.#$<1&&this.#e.unshift(`TrkTitle: ${n}`)},this.#c[4]=function(n,e){e<1&&this.#$<1&&this.#e.unshift(`${R(this.#$,""," ")}Instrmnt: ${n}`)},this.#c[5]=function(n){n.trim()==""?this.#e.unshift(""):this.#e[0]+=`${n}`},this.#c[6]=function(n){this.#e.unshift(`${R(this.#$,""," ")}C.Marker: ${n}`)},this.#c[7]=function(n){this.#e.unshift(`CuePoint: ${n}`)},this.#c[32]=function(n){this.#$=n[0]+1},this.#c[33]=function(n,e){console.debug(`Track ${e} requests to get assigned to output ${n}.`),t.#b[e]=n+1},this.#c[127]=function(n,e){t.#k.run(n,e)},this.#u.add([126,127,9,1],function(){t.switchMode("gm",!0),t.#s=t.#s||!1,console.info("MIDI reset: GM")}).add([126,127,9,3],function(){t.switchMode("g2",!0),t.#s=t.#s||!1,console.info("MIDI reset: GM2")}).add([65,16,22,18,127,1],function(){t.switchMode("mt32",!0),t.#s=!1,console.info("MIDI reset: MT-32")}).add([65,16,66,18,64,0,127,0,65],function(){t.switchMode("gs",!0),t.#n[1152]=120,t.#n[3200]=120,t.#n[5248]=120,t.#n[7296]=120,t.#s=!1,t.#d.forEach(a),console.info("MIDI reset: GS")}).add([66,48,66,52,0],function(n){t.switchMode("ns5r",!0),t.#s=!1,console.info("KORG reset:",n)}).add([67,16,76,0,0,126,0],function(n){t.switchMode("xg",!0),t.#s=!1,console.info("MIDI reset: XG")}),this.#k.add([67,0,1],function(n,e){t.#b[e]=n[0]+1}),this.#u.add([127,127,4,1],function(n){t.switchMode("gm"),t.#X=(n[1]<<7+n[0])/163.83}),this.#u.add([67,16,76,6,0],function(n){let e=n[0];t.#g=" ".repeat(e),t.#x=Date.now()+3200,n.slice(1).forEach(function(i){t.#g+=String.fromCharCode(i)})}).add([67,16,76,7,0,0],function(n){for(t.#E=Date.now()+3200;n.length<48;)n.unshift(0);n.forEach(function(e,i){let o=Math.floor(i/16),r=i%16,c=(r*3+o)*7,u=7,f=0;for(c-=r*5,o==2&&(u=2);f<u;)t.#v[c+f]=e>>6-f&1,f++})}).add([67,16,76,2,1,0],function(n){console.info(`XG reverb type: ${s[n[0]]}${n[1]>0?" "+(n[1]+1):""}`)}).add([67,16,76,2,1,2],function(n){console.info(`XG reverb time: ${X(n)}s`)}).add([67,16,76,2,1,3],function(n){console.info(`XG reverb diffusion: ${n}`)}).add([67,16,76,2,1,4],function(n){console.info(`XG reverb initial delay: ${n}`)}).add([67,16,76,2,1,5],function(n){console.info(`XG reverb high pass cutoff: ${$[n[0]]}Hz`)}).add([67,16,76,2,1,6],function(n){console.info(`XG reverb low pass cutoff: ${$[n[0]]}Hz`)}).add([67,16,76,2,1,7],function(n){console.info(`XG reverb width: ${n}`)}).add([67,16,76,2,1,8],function(n){console.info(`XG reverb height: ${n}`)}).add([67,16,76,2,1,9],function(n){console.info(`XG reverb depth: ${n}`)}).add([67,16,76,2,1,10],function(n){console.info(`XG reverb wall type: ${n}`)}).add([67,16,76,2,1,11],function(n){console.info(`XG reverb dry/wet: ${n[0]}`)}).add([67,16,76,2,1,12],function(n){console.info(`XG reverb return: ${n}`)}).add([67,16,76,2,1,13],function(n){console.info(`XG reverb pan: ${n[0]-64}`)}).add([67,16,76,2,1,16],function(n){console.info(`XG reverb delay: ${n}`)}).add([67,16,76,2,1,17],function(n){console.info(`XG density: ${n}`)}).add([67,16,76,2,1,18],function(n){console.info(`XG reverb balance: ${n}`)}).add([67,16,76,2,1,20],function(n){console.info(`XG reverb feedback: ${n}`)}).add([67,16,76,2,1,32],function(n){console.info(`XG chorus type: ${s[n[0]]}${n[1]>0?" "+(n[1]+1):""}`)}).add([67,16,76,2,1,34],function(n){console.info(`XG chorus LFO: ${w[n[0]]}Hz`)}).add([67,16,76,2,1,35],function(n){}).add([67,16,76,2,1,36],function(n){console.info(`XG chorus feedback: ${n}`)}).add([67,16,76,2,1,37],function(n){console.info(`XG chorus delay offset: ${b(n[0])}ms`)}).add([67,16,76,2,1,39],function(n){console.info(`XG chorus low: ${$[n[0]]}Hz`)}).add([67,16,76,2,1,40],function(n){console.info(`XG chorus low: ${n[0]-64}dB`)}).add([67,16,76,2,1,41],function(n){console.info(`XG chorus high: ${$[n[0]]}Hz`)}).add([67,16,76,2,1,42],function(n){console.info(`XG chorus high: ${n[0]-64}dB`)}).add([67,16,76,2,1,43],function(n){console.info(`XG chorus dry/wet: ${n}`)}).add([67,16,76,2,1,44],function(n){console.info(`XG chorus return: ${n}`)}).add([67,16,76,2,1,45],function(n){console.info(`XG chorus pan: ${n[0]-64}`)}).add([67,16,76,2,1,46],function(n){console.info(`XG chorus to reverb: ${n}`)}).add([67,16,76,2,1,64],function(n){console.info(`XG variation type: ${s[n[0]]}${n[1]>0?" "+(n[1]+1):""}`)}).add([67,16,76,2,1,66],function(n){console.info(`XG variation 1: ${n}`)}).add([67,16,76,2,1,68],function(n){console.info(`XG variation 2: ${n}`)}).add([67,16,76,2,1,70],function(n){console.info(`XG variation 3: ${n}`)}).add([67,16,76,2,1,72],function(n){console.info(`XG variation 4: ${n}`)}).add([67,16,76,2,1,74],function(n){console.info(`XG variation 5: ${n}`)}).add([67,16,76,2,1,76],function(n){console.info(`XG variation 6: ${n}`)}).add([67,16,76,2,1,78],function(n){console.info(`XG variation 7: ${n}`)}).add([67,16,76,2,1,80],function(n){console.info(`XG variation 8: ${n}`)}).add([67,16,76,2,1,82],function(n){console.info(`XG variation 9: ${n}`)}).add([67,16,76,2,1,84],function(n){console.info(`XG variation 10: ${n}`)}).add([67,16,76,2,1,86],function(n){console.info(`XG variation return: ${d(n[0])}dB`)}).add([67,16,76,2,1,87],function(n){console.info(`XG variation pan: ${n[0]-64}`)}).add([67,16,76,2,1,88],function(n){console.info(`XG variation to reverb: ${d(n[0])}dB`)}).add([67,16,76,2,1,89],function(n){console.info(`XG variation to chorus: ${d(n[0])}dB`)}).add([67,16,76,2,1,90],function(n){console.info(`XG variation connection: ${n[0]?"system":"insertion"}`)}).add([67,16,76,2,1,91],function(n){console.info(`XG variation part: ${n}`)}).add([67,16,76,2,1,92],function(n){console.info(`XG variation mod wheel: ${n[0]-64}`)}).add([67,16,76,2,1,93],function(n){console.info(`XG variation bend wheel: ${n[0]-64}`)}).add([67,16,76,2,1,94],function(n){console.info(`XG variation channel after touch: ${n[0]-64}`)}).add([67,16,76,2,1,95],function(n){console.info(`XG variation AC1: ${n[0]-64}`)}).add([67,16,76,2,1,96],function(n){console.info(`XG variation AC2: ${n[0]-64}`)}).add([67,16,76,8],function(n,e){t.#S.run(n.slice(1),t.chRedir(n[0],e))}).add([67,16,76,48],function(n){t.#m.run(n.slice(1),0,n[0])}).add([67,16,76,49],function(n){t.#m.run(n.slice(1),1,n[0])}).add([67,16,76,50],function(n){t.#m.run(n.slice(1),2,n[0])}).add([67,16,76,51],function(n){t.#m.run(n.slice(1),3,n[0])}),this.#u.add([65,1],function(n){t.switchMode("mt32"),t.#a.run(n,1)}).add([65,2],function(n){t.switchMode("mt32"),t.#a.run(n,2)}).add([65,3],function(n){t.switchMode("mt32"),t.#a.run(n,3)}).add([65,4],function(n){t.switchMode("mt32"),t.#a.run(n,4)}).add([65,5],function(n){t.switchMode("mt32"),t.#a.run(n,5)}).add([65,6],function(n){t.switchMode("mt32"),t.#a.run(n,6)}).add([65,7],function(n){t.switchMode("mt32"),t.#a.run(n,7)}).add([65,8],function(n){t.switchMode("mt32"),t.#a.run(n,8)}).add([65,9],function(n){t.switchMode("mt32"),t.#p[9]=1,t.#a.run(n,9)}),this.#a.add([22,18,2,0,0],function(n,e){let i="";n.slice(0,10).forEach(function(o){o>31&&(i+=String.fromCharCode(o))}),t.#y[e]=i,console.debug(`MT-32 tone properties on channel ${e+1} (${i}): ${n.slice(10)}`)}),this.#u.add([65,16,66,18,0,0,127],function(n){t.switchMode("gs",!0),t.#n[1152]=120,t.#n[3200]=120,t.#n[5248]=120,t.#n[7296]=120,t.#d.forEach(a),t.#s=!1,t.#w=3,console.info(`GS system set to ${n[0]?"dual":"single"} mode.`)}).add([65,16,66,18,64,0,0],function(n){}).add([65,16,66,18,64,0,4],function(n){t.#X=n[0]*129/163.83}).add([65,16,66,18,64,0,5],function(n){console.info(`GS master key shift: ${n[0]-64} semitones.`)}).add([65,16,66,18,64,0,6],function(n){console.info(`GS master pan:${n[0]-64}.`)}).add([65,16,66,18,64,1,48],function(n){console.info(`GS reverb type: ${v[n[0]]}`)}).add([65,16,66,18,64,1,49],function(n){}).add([65,16,66,18,64,1,50],function(n){console.info(`GS reverb pre-LPF: ${n[0]}`)}).add([65,16,66,18,64,1,51],function(n){console.info(`GS reverb level: ${n[0]}`)}).add([65,16,66,18,64,1,52],function(n){console.info(`GS reverb time: ${n[0]}`)}).add([65,16,66,18,64,1,53],function(n){console.info(`GS reverb delay feedback: ${n[0]}`)}).add([65,16,66,18,64,1,55],function(n){console.info(`GS reverb pre-delay time: ${n[0]}`)}).add([65,16,66,18,64,1,56],function(n){console.info(`GS chorus type: ${E[n[0]]}`)}).add([65,16,66,18,64,1,57],function(n){console.info(`GS chorus pre-LPF: ${n[0]}`)}).add([65,16,66,18,64,2,0],function(n){console.info(`GS EQ low: ${n[0]?400:200}Hz`)}).add([65,16,66,18,64,2,1],function(n){console.info(`GS EQ low: ${n[0]-64}dB`)}).add([65,16,66,18,64,2,2],function(n){console.info(`GS EQ high: ${n[0]?6e3:3e3}Hz`)}).add([65,16,66,18,64,2,3],function(n){console.info(`GS EQ high: ${n[0]-64}dB`)}).add([65,16,66,18,64,3],function(n){}).add([65,16,69,18,16,0],function(n){let e=n[0];t.#g=" ".repeat(e),t.#x=Date.now()+3200,n.pop(),n.slice(1).forEach(function(i){t.#g+=String.fromCharCode(i)})}).add([65,16,69,18,16,1,0],function(n){t.#E=Date.now()+3200,n.forEach(function(e,i){if(i<64){let o=Math.floor(i/16),r=i%16,c=(r*4+o)*5,u=5,f=0;for(c-=r*4,o==3&&(u=1);f<u;)t.#v[c+f]=e>>4-f&1,f++}})}).add([65,16,66,18,64,16],function(n,e){t.#i.run(n,t.chRedir(9,e,!0))}).add([65,16,66,18,64,17],function(n,e){t.#i.run(n,t.chRedir(0,e,!0))}).add([65,16,66,18,64,18],function(n,e){t.#i.run(n,t.chRedir(1,e,!0))}).add([65,16,66,18,64,19],function(n,e){t.#i.run(n,t.chRedir(2,e,!0))}).add([65,16,66,18,64,20],function(n,e){t.#i.run(n,t.chRedir(3,e,!0))}).add([65,16,66,18,64,21],function(n,e){t.#i.run(n,t.chRedir(4,e,!0))}).add([65,16,66,18,64,22],function(n,e){t.#i.run(n,t.chRedir(5,e,!0))}).add([65,16,66,18,64,23],function(n,e){t.#i.run(n,t.chRedir(6,e,!0))}).add([65,16,66,18,64,24],function(n,e){t.#i.run(n,t.chRedir(7,e,!0))}).add([65,16,66,18,64,25],function(n,e){t.#i.run(n,t.chRedir(8,e,!0))}).add([65,16,66,18,64,26],function(n,e){t.#i.run(n,t.chRedir(10,e,!0))}).add([65,16,66,18,64,27],function(n,e){t.#i.run(n,t.chRedir(11,e,!0))}).add([65,16,66,18,64,28],function(n,e){t.#i.run(n,t.chRedir(12,e,!0))}).add([65,16,66,18,64,29],function(n,e){t.#i.run(n,t.chRedir(13,e,!0))}).add([65,16,66,18,64,30],function(n,e){t.#i.run(n,t.chRedir(14,e,!0))}).add([65,16,66,18,64,31],function(n,e){t.#i.run(n,t.chRedir(15,e,!0))}).add([65,16,66,18,64,64],function(n,e){t.#o.run(n,t.chRedir(9,e,!0))}).add([65,16,66,18,64,65],function(n,e){t.#o.run(n,t.chRedir(0,e,!0))}).add([65,16,66,18,64,66],function(n,e){t.#o.run(n,t.chRedir(1,e,!0))}).add([65,16,66,18,64,67],function(n,e){t.#o.run(n,t.chRedir(2,e,!0))}).add([65,16,66,18,64,68],function(n,e){t.#o.run(n,t.chRedir(3,e,!0))}).add([65,16,66,18,64,69],function(n,e){t.#o.run(n,t.chRedir(4,e,!0))}).add([65,16,66,18,64,70],function(n,e){t.#o.run(n,t.chRedir(5,e,!0))}).add([65,16,66,18,64,71],function(n,e){t.#o.run(n,t.chRedir(6,e,!0))}).add([65,16,66,18,64,72],function(n,e){t.#o.run(n,t.chRedir(7,e,!0))}).add([65,16,66,18,64,73],function(n,e){t.#o.run(n,t.chRedir(8,e,!0))}).add([65,16,66,18,64,74],function(n,e){t.#o.run(n,t.chRedir(10,e,!0))}).add([65,16,66,18,64,75],function(n,e){t.#o.run(n,t.chRedir(11,e,!0))}).add([65,16,66,18,64,76],function(n,e){t.#o.run(n,t.chRedir(12,e,!0))}).add([65,16,66,18,64,77],function(n,e){t.#o.run(n,t.chRedir(13,e,!0))}).add([65,16,66,18,64,78],function(n,e){t.#o.run(n,t.chRedir(14,e,!0))}).add([65,16,66,18,64,79],function(n,e){t.#o.run(n,t.chRedir(15,e,!0))}),t.#m.add([0],function(n,e,i){console.info(`XG Drum ${e} note ${i} coarse pitch bend ${n[0]-64}.`)}).add([1],function(n,e,i){console.info(`XG Drum ${e} note ${i} fine pitch bend ${n[0]-64}.`)}).add([2],function(n,e,i){console.info(`XG Drum ${e} note ${i} level ${n[0]}.`)}).add([3],function(n,e,i){console.info(`XG Drum ${e} note ${i} alt group ${n[0]}.`)}).add([4],function(n,e,i){console.info(`XG Drum ${e} note ${i} pan ${n[0]-64}.`)}).add([5],function(n,e,i){console.info(`XG Drum ${e} note ${i} reverb send ${d(n[0])}dB.`)}).add([6],function(n,e,i){console.info(`XG Drum ${e} note ${i} chorus send ${d(n[0])}dB.`)}).add([7],function(n,e,i){console.info(`XG Drum ${e} note ${i} variation send ${d(n[0])}dB.`)}).add([8],function(n,e,i){console.info(`XG Drum ${e} note ${i} key assign as ${n[0]>0?"multi":"single"}.`)}).add([9],function(n,e,i){}).add([10],function(n,e,i){}).add([11],function(n,e,i){}).add([12],function(n,e,i){}).add([13],function(n,e,i){}).add([14],function(n,e,i){}).add([15],function(n,e,i){}),t.#S.add([0],function(n,e){console.info(`XG Part reserve ${n[0]} elements for channel ${e}.`)}).add([1],function(n,e){t.#n[e*128]=n[0]}).add([2],function(n,e){t.#n[e*128+32]=n[0]}).add([3],function(n,e){t.#G[e]=n[0]}).add([4],function(n,e){console.info(`XG Part send CH${e} to CH${n[0]}. Channel redirect feature required!`)}).add([5],function(n,e){console.info(`XG Part mono/poly set to ${n[0]?"mono":"poly"} for channel ${e}.`)}).add([6],function(n,e){console.info(`XG Part repeat pressing set to ${["single","multi","inst"][n[0]]} mode for channel ${e}.`)}).add([7],function(n,e){let i=n[0];t.#n[128*e]=i>1?127:0,console.info(`XG Part use mode "${G[i]}" for channel ${e}.`)}).add([14],function(n,e){t.#n[128*e+10]=n[0]||128}).add([17],function(n,e){console.info(`XG Part dry level ${n[0]} for channel ${e}.`)}).add([18],function(n,e){console.info(`XG Part chorus send ${d(n[0])}dB for channel ${e}.`)}).add([19],function(n,e){console.info(`XG Part reverb send ${d(n[0])}dB for channel ${e}.`)}).add([20],function(n,e){console.info(`XG Part variation send ${d(n[0])}dB for channel ${e}.`)}).add([21],function(n,e){console.info(`XG Part LFO speed ${n[0]} for channel ${e}.`)}).add([29],function(n,e){console.info(`XG Part MW bend ${n[0]-64} semitones for channel ${e}.`)}).add([32],function(n,e){console.info(`XG Part MW LFO pitch depth ${n[0]} for channel ${e}.`)}).add([33],function(n,e){console.info(`XG Part MW LFO filter depth ${n[0]} for channel ${e}.`)}).add([35],function(n,e){console.info(`XG Part bend pitch ${n[0]-64} semitones for channel ${e}.`)}).add([83],function(n,e){}).add([103],function(n,e){t.#n[e*128+65]=n[0]}).add([104],function(n,e){t.#n[e*128+5]=n[0]}).add([105],function(n,e){console.info(`XG Part EG initial ${n[0]-64} for channel ${e}.`)}).add([106],function(n,e){console.info(`XG Part EG attack time ${n[0]-64} for channel ${e}.`)}),t.#i.add([0],function(n,e){t.#n[e*128]==120&&(n[0]=120),t.#n[e*128]=n[0]||0,t.#G[e]=n[1]||0}).add([2],function(n,e){}).add([19],function(n,e){}).add([20],function(n,e){}).add([21],function(n,e){console.info(`GS Part ${e+1} type: ${["melodic","drum 1","drum 2"][n[0]]}.`),n[0]>0&&(t.#n[e*128]=120)}).add([25],function(n,e){t.#n[e*128+7]=n[0]}).add([28],function(n,e){t.#n[e*128+10]=n[0]||128}).add([33],function(n,e){t.#n[e*128+93]=n[0]}).add([34],function(n,e){t.#n[e*128+91]=n[0]}),t.#o.add([0],function(n,e){t.#n[e*128+32]=n[0]}).add([1],function(n,e){t.#n[e*128+32]=n[0]}).add([32],function(n,e){console.info(`GS Part ${e+1} turned EQ ${n[0]?"on":"off"}.`)}).add([33],function(n,e){}).add([34],function(n,e){console.info(`GS Part ${e+1} turned EFX ${n[0]?"on":"off"}.`)})}};export{z as OctaviaDevice};
