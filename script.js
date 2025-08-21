
// Confetti effect for birthday
(function(){
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let W, H, pieces = [], frame;

  function resize(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize); resize();

  function popConfetti(){
    pieces = [];
    const colors = ['#ff4d6d','#ff9a3d','#ffe066','#06d6a0','#118ab2','#ef476f'];
    for(let i=0;i<200;i++){
      pieces.push({
        x: Math.random()*W,
        y: Math.random()*H - H,
        r: Math.random()*6+2,
        c: colors[(Math.random()*colors.length)|0],
        vx: (Math.random()-0.5)*2,
        vy: Math.random()*3+2,
        a: Math.random()*Math.PI
      });
    }
    cancelAnimationFrame(frame);
    loop();
  }

  function loop(){
    frame = requestAnimationFrame(loop);
    ctx.clearRect(0,0,W,H);
    for(const p of pieces){
      p.y += p.vy;
      p.x += p.vx;
      p.a += 0.02;
      if(p.y > H) p.y = -10;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.a);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r);
      ctx.restore();
    }
  }

  window.addEventListener('load', popConfetti);
})();