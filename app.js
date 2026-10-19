const templates = [
 {id:"role",title:"Peranan pakar",desc:"Tetapkan perspektif dan bidang kepakaran yang diperlukan.",example:"Bertindak sebagai pakar strategi kandungan. Bantu saya merancang kandungan LinkedIn selama sebulan."},
 {id:"steps",title:"Langkah demi langkah",desc:"Pecahkan tugasan kepada tindakan yang jelas dan tersusun.",example:"Terangkan cara melancarkan surat berita e-mel dalam lima langkah yang jelas."},
 {id:"compare",title:"Membandingkan pilihan",desc:"Nilai pilihan menggunakan kriteria dan matlamat tertentu.",example:"Bandingkan Canva dengan Figma untuk menghasilkan cadangan projek pelanggan. Nilai kos, kemudahan dan ciri utama."},
 {id:"ideas",title:"Penjana idea",desc:"Jana pelbagai idea mengikut matlamat dan sasaran audiens.",example:"Berikan saya 10 idea video YouTube untuk saluran kewangan peribadi."},
 {id:"rewrite",title:"Menulis semula teks",desc:"Ubah nada, gaya atau kejelasan tanpa mengubah maksud asal.",example:"Tulis semula teks jualan ini supaya lebih bersahaja, jelas dan meyakinkan."},
 {id:"review",title:"Semakan & penambahbaikan",desc:"Kenal pasti kekuatan, kelemahan dan tindakan penambahbaikan.",example:"Semak halaman pendaratan ini dan cadangkan penambahbaikan untuk tajuk utama dan seruan bertindak."},
 {id:"scenario",title:"Simulasi senario",desc:"Berlatih perbualan, rundingan atau situasi kerja.",example:"Simulasikan sesi pembentangan idea antara pengasas syarikat pemula dengan pelabur."},
 {id:"format",title:"Permintaan berdasarkan format",desc:"Tentukan bentuk output yang hendak dihasilkan.",example:"Hasilkan skrip YouTube tentang strategi SEO yang mesra pemula."},
 {id:"essentials",title:"Senarai perkara penting",desc:"Pastikan faktor atau langkah utama tidak tertinggal.",example:"Senaraikan perkara penting yang perlu dimasukkan dalam portfolio pekerja bebas."},
 {id:"brainstorm",title:"Sumbang saran",desc:"Teroka pendekatan berbeza serta kelebihan dan kekurangannya.",example:"Bantu saya menjana idea bahan untuk mendapatkan prospek pelanggan bagi produk SaaS, berserta kelebihan dan kekurangan."}
];
const $ = id => document.getElementById(id);
const grid = $("templateGrid");
templates.forEach((t,i)=>{
 const card=document.createElement("button"); card.type="button"; card.className="template-card";
 card.innerHTML=`<span class="num">${String(i+1).padStart(2,"0")}</span><span><h3>${t.title}</h3><p>${t.desc}</p><small>Gunakan templat →</small></span>`;
 card.addEventListener("click",()=>{$("template").value=t.id;document.querySelector("#pembina").scrollIntoView({behavior:"smooth"});$("topic").focus();toast("Templat dipilih: "+t.title);});
 grid.appendChild(card);
});
function buildPrompt(){
 const t=templates.find(x=>x.id===$("template").value);
 const topic=$("topic").value.trim(), audience=$("audience").value.trim()||"audiens yang berkaitan";
 const output=$("output").value, tone=$("tone").value, constraints=$("constraints").value.trim();
 const openers={
  role:`Bertindak sebagai pakar yang relevan untuk tugasan ini: ${topic}.`,
  steps:`Terangkan cara melaksanakan tugasan ini secara langkah demi langkah: ${topic}.`,
  compare:`Bandingkan pilihan yang relevan untuk matlamat berikut: ${topic}. Nyatakan kriteria perbandingan, kelebihan, kekurangan, risiko dan cadangan.`,
  ideas:`Jana 10 idea yang kreatif dan berbeza berkaitan: ${topic}.`,
  rewrite:`Sediakan atau tulis semula kandungan berkaitan tugasan ini: ${topic}. Kekalkan maksud asal jika teks sumber diberikan.`,
  review:`Semak bahan atau pendekatan berikut dan cadangkan penambahbaikan: ${topic}.`,
  scenario:`Bina simulasi yang realistik untuk situasi berikut: ${topic}. Paparkan perspektif pihak-pihak yang terlibat dan kemungkinan respons mereka.`,
  format:`Hasilkan kandungan tentang perkara berikut: ${topic}.`,
  essentials:`Senaraikan perkara penting yang perlu dipertimbangkan untuk tugasan ini: ${topic}.`,
  brainstorm:`Bantu saya membuat sumbang saran tentang cabaran atau topik ini: ${topic}. Berikan beberapa pendekatan yang berbeza.`
 };
 let prompt=`${openers[t.id]}\n\nSasaran audiens: ${audience}.\nFormat hasil: ${output}.\nGaya: ${tone}.\n\nKriteria jawapan:\n- Susun jawapan dengan jelas dan praktikal.\n- Berikan contoh yang sesuai dan langkah seterusnya jika relevan.\n- Bezakan fakta yang disokong bukti daripada andaian atau cadangan.\n- Jika maklumat tidak mencukupi, nyatakan perkara yang perlu dijelaskan dan jangan mereka-reka butiran.`;
 if(t.id==="compare") prompt += "\n- Buat cadangan berdasarkan matlamat dan kriteria, bukan dakwaan umum semata-mata.";
 if(t.id==="review") prompt += "\n- Mulakan dengan perkara yang sudah berfungsi, kemudian nyatakan masalah dan pembaikan yang boleh dilaksanakan.";
 if(t.id==="ideas"||t.id==="brainstorm") prompt += "\n- Elakkan idea yang berulang; jelaskan nilai dan usaha pelaksanaan setiap idea.";
 if(constraints) prompt+=`\n\nKekangan/arahan tambahan:\n${constraints}`;
 prompt+="\n\nJika jawapan mengandungi dakwaan fakta yang penting atau maklumat semasa, sertakan sumber yang boleh disahkan dan jangan cipta rujukan.";
 return prompt;
}
$("promptForm").addEventListener("submit",e=>{e.preventDefault();$("result").value=buildPrompt();$("status").textContent="Prompt dijana";toast("Prompt berjaya dijana.");});
$("copyBtn").addEventListener("click",async()=>{
 const val=$("result").value.trim(); if(!val){toast("Jana prompt terlebih dahulu.");return;}
 try{await navigator.clipboard.writeText(val);toast("Prompt disalin ke papan klip.");}
 catch(e){$("result").select();const ok=document.execCommand("copy");toast(ok?"Prompt disalin.":"Pilih dan salin teks secara manual.");}
});
$("useBtn").addEventListener("click",()=>{if(!$("result").value.trim()){$("result").value=buildPrompt();$("status").textContent="Prompt dijana";}window.open("https://chatgpt.com/","_blank","noopener,noreferrer");});
$("clearBtn").addEventListener("click",()=>{$("result").value="";$("status").textContent="Dikosongkan";});
let toastTimer;
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2300);}
let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").classList.remove("hidden");});
$("installBtn").addEventListener("click",async()=>{if(!deferredPrompt){toast("Gunakan menu Share/Add to Home Screen dalam pelayar yang menyokong PWA.");return;}deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$("installBtn").classList.add("hidden");});
if("serviceWorker" in navigator && (location.protocol==="https:" || location.hostname==="localhost")) {
 window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
