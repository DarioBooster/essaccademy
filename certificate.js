(() => {
  'use strict';
  const WIDTH = 1400, HEIGHT = 990, enc = new TextEncoder();
  function fittedFont(ctx, text, maxWidth, maxSize, minSize, family) {
    let size = maxSize;
    while (size > minSize) { ctx.font = `${size}px ${family}`; if (ctx.measureText(text).width <= maxWidth) break; size--; }
    ctx.font = `${size}px ${family}`;
  }
  function draw(canvas, learner) {
    if (!canvas) return Promise.resolve();
    canvas.width = WIDTH; canvas.height = HEIGHT; canvas.removeAttribute('data-rendered');
    canvas.setAttribute('aria-label', `Certificat de r\u00e9ussite ESS Academy d\u00e9cern\u00e9 \u00e0 ${learner.name}, score final ${learner.finalScore} %, r\u00e9f\u00e9rence ${learner.certificate}.`);
    return new Promise(resolve => {
      const ctx = canvas.getContext('2d'), logo = new Image(); let painted = false;
      const paint = () => {
        if (painted) return; painted = true;
        ctx.fillStyle='#fffdf5'; ctx.fillRect(0,0,WIDTH,HEIGHT);
        ctx.strokeStyle='#b99935';ctx.lineWidth=9;ctx.strokeRect(23,23,WIDTH-46,HEIGHT-46);ctx.lineWidth=2;ctx.strokeRect(43,43,WIDTH-86,HEIGHT-86);
        if(logo.naturalWidth)ctx.drawImage(logo,85,82,330,78);
        ctx.textAlign='right';ctx.fillStyle='#82703a';ctx.font='16px Arial,sans-serif';ctx.fillText('ESS ACADEMY',1305,102);ctx.font='14px Arial,sans-serif';ctx.fillText(`CERTIFICATION N\u00b0 ${learner.certificate}`,1305,128);
        ctx.textAlign='center';ctx.fillStyle='#a08025';ctx.font='bold 21px Arial,sans-serif';ctx.fillText('C E R T I F I C A T   D E   R E U S S I T E',WIDTH/2,256);
        ctx.fillStyle='#77736a';ctx.font='italic 22px Georgia,serif';ctx.fillText('Ce certificat est d\u00e9cern\u00e9 \u00e0',WIDTH/2,328);
        ctx.fillStyle='#214d3d';fittedFont(ctx,learner.name,1100,72,38,'Georgia,serif');ctx.fillText(learner.name,WIDTH/2,423);
        ctx.strokeStyle='#b7a66c';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(405,455);ctx.lineTo(995,455);ctx.stroke();
        ctx.fillStyle='#77736a';ctx.font='italic 19px Georgia,serif';ctx.fillText('pour avoir compl\u00e9t\u00e9 avec succ\u00e8s la formation',WIDTH/2,497);
        ctx.fillStyle='#214d3d';fittedFont(ctx,'Fondamentaux de l\u2019\u00c9conomie',1080,43,28,'Georgia,serif');ctx.fillText('Fondamentaux de l\u2019\u00c9conomie',WIDTH/2,555);fittedFont(ctx,'Sociale et Solidaire',1080,43,28,'Georgia,serif');ctx.fillText('Sociale et Solidaire',WIDTH/2,607);
        ctx.fillStyle='#77736a';ctx.font='17px Arial,sans-serif';ctx.fillText(`D\u00e9livr\u00e9 le ${new Date().toLocaleDateString('fr-FR')} \u00b7 Score final : ${learner.finalScore} %`,WIDTH/2,657);
        ctx.strokeStyle='#9c9271';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(125,797);ctx.lineTo(462,797);ctx.moveTo(938,797);ctx.lineTo(1275,797);ctx.stroke();ctx.fillStyle='#374d4a';ctx.font='italic 19px Georgia,serif';ctx.fillText('Direction p\u00e9dagogique',293,831);ctx.fillText('Programme ESS',1107,831);ctx.fillStyle='#203b49';ctx.font='bold 16px Arial,sans-serif';ctx.fillText('ESS Academy',293,857);ctx.fillText('ESS Academy',1107,857);
        ctx.beginPath();ctx.arc(WIDTH/2,820,58,0,Math.PI*2);ctx.strokeStyle='#b99935';ctx.lineWidth=4;ctx.stroke();ctx.beginPath();ctx.arc(WIDTH/2,820,47,0,Math.PI*2);ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#8a7023';ctx.font='bold 15px Arial,sans-serif';ctx.fillText('ESS',WIDTH/2,815);ctx.font='bold 12px Arial,sans-serif';ctx.fillText('VALID\u00c9',WIDTH/2,838);
        canvas.dataset.rendered='true';resolve();
      };
      logo.onload=paint;logo.onerror=paint;logo.src='./assets/ESS_Academy_logo_HD.png';if(logo.complete)paint();
    });
  }
  function buildPdf(jpeg) {
    const chunks=[];let length=0;const append=value=>{const b=typeof value==='string'?enc.encode(value):value;chunks.push(b);length+=b.length;};const offsets=[0];append('%PDF-1.4\n');
    const object=(n,body)=>{offsets[n]=length;append(`${n} 0 obj\n${body}\nendobj\n`);};
    object(1,'<< /Type /Catalog /Pages 2 0 R >>');object(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');object(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
    offsets[4]=length;append(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${WIDTH} /Height ${HEIGHT} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`);append(jpeg);append('\nendstream\nendobj\n');
    const content='q\n842 0 0 595 0 0 cm\n/Im0 Do\nQ\n';object(5,`<< /Length ${enc.encode(content).length} >>\nstream\n${content}endstream`);const xref=length;append('xref\n0 6\n0000000000 65535 f \n');for(let i=1;i<=5;i++)append(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);append(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);const pdf=new Uint8Array(length);let at=0;for(const c of chunks){pdf.set(c,at);at+=c.length;}return pdf;
  }
  function download(canvas,learner){const data=canvas.toDataURL('image/jpeg',0.96).split(',')[1],binary=atob(data),jpeg=new Uint8Array(binary.length);for(let i=0;i<binary.length;i++)jpeg[i]=binary.charCodeAt(i);const blob=new Blob([buildPdf(jpeg)],{type:'application/pdf'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`certificat-ess-academy-${learner.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')||'apprenant'}.pdf`;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);}
  window.ESSCertificate={draw,download};
})();
