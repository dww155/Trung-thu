import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/audio';

export default function SkyCanvas({ customLanterns = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };
    window.addEventListener('resize', handleResize);

    // Stars
    let stars = [];
    const initStars = () => {
      stars = [];
      const count = Math.floor((width * height) / 4500);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.85,
          radius: Math.random() * 1.6 + 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.03 + 0.01,
          phase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.3 ? '#ffeaa7' : '#ffffff'
        });
      }
    };
    initStars();

    // Shooting Stars
    let shootingStars = [];
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.35,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 12,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        width: Math.random() * 1.5 + 1
      });
    };

    // Ambient floating lanterns
    const lanterns = [];
    const lanternCount = Math.min(30, Math.floor(width / 45));
    for (let i = 0; i < lanternCount; i++) {
      lanterns.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.6 + 0.35,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmp: Math.random() * 1.2 + 0.5,
        alpha: Math.random() * 0.5 + 0.5,
        color: Math.random() > 0.4 ? '#ff9f43' : '#ee5253'
      });
    }

    // Interactive fireworks / spark particles
    let particles = [];
    const addFireworks = (x, y) => {
      const colors = ['#f9ca24', '#f0932b', '#eb4d4b', '#ffbe76', '#ff7979', '#ffffff', '#ffd32a'];
      const count = 35;
      sound.playFirework();
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 0.08,
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1.5
        });
      }
    };

    const handleCanvasClick = (e) => {
      // Don't interfere if clicked on interactive card/buttons
      if (e.target.closest('.interactive-ui') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea')) {
        return;
      }
      addFireworks(e.clientX, e.clientY);
    };
    window.addEventListener('pointerdown', handleCanvasClick);

    // Drifting ethereal clouds
    const clouds = [
      { x: 50, y: height * 0.12, w: 320, h: 60, speed: 0.18, alpha: 0.22 },
      { x: width * 0.4, y: height * 0.22, w: 420, h: 80, speed: 0.12, alpha: 0.18 },
      { x: width * 0.7, y: height * 0.08, w: 380, h: 70, speed: 0.22, alpha: 0.25 },
    ];

    let tick = 0;

    // Render loop
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep celestial night sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#040817');
      skyGrad.addColorStop(0.35, '#0b1633');
      skyGrad.addColorStop(0.7, '#151d45');
      skyGrad.addColorStop(1, '#0c102b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Full Moon
      const moonX = Math.min(width * 0.82, width - 120);
      const moonY = Math.max(130, height * 0.2);
      const moonRadius = Math.min(85, Math.max(55, width * 0.09));

      // Moon outer radiant glow layers
      const glow1 = ctx.createRadialGradient(moonX, moonY, moonRadius * 0.8, moonX, moonY, moonRadius * 3.8);
      glow1.addColorStop(0, 'rgba(255, 236, 179, 0.4)');
      glow1.addColorStop(0.4, 'rgba(255, 215, 100, 0.15)');
      glow1.addColorStop(0.8, 'rgba(255, 195, 80, 0.05)');
      glow1.addColorStop(1, 'rgba(255, 180, 60, 0)');
      ctx.fillStyle = glow1;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 3.8, 0, Math.PI * 2);
      ctx.fill();

      // Moon body
      const moonBody = ctx.createRadialGradient(
        moonX - moonRadius * 0.25,
        moonY - moonRadius * 0.25,
        moonRadius * 0.1,
        moonX,
        moonY,
        moonRadius
      );
      moonBody.addColorStop(0, '#fffdfa');
      moonBody.addColorStop(0.7, '#fef0c7');
      moonBody.addColorStop(0.92, '#fde08b');
      moonBody.addColorStop(1, '#f5c958');

      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = moonBody;
      ctx.shadowColor = '#ffeaa7';
      ctx.shadowBlur = 35;
      ctx.fill();
      ctx.restore();

      // Subtle moon surface details / Chú Cuội & Cây Đa silhouette
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.clip();

      // Crater / shadow texture
      ctx.fillStyle = 'rgba(217, 168, 79, 0.16)';
      ctx.beginPath();
      ctx.arc(moonX - moonRadius * 0.3, moonY + moonRadius * 0.2, moonRadius * 0.35, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.25, moonY - moonRadius * 0.2, moonRadius * 0.4, 0, Math.PI * 2);
      ctx.arc(moonX + moonRadius * 0.1, moonY + moonRadius * 0.35, moonRadius * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // Banyan Tree & Cuội Silhouette
      ctx.fillStyle = 'rgba(78, 52, 24, 0.35)';
      // Tree trunk
      ctx.beginPath();
      const baseTX = moonX + moonRadius * 0.1;
      const baseTY = moonY + moonRadius * 0.7;
      ctx.moveTo(baseTX, baseTY);
      ctx.quadraticCurveTo(baseTX - 10, baseTY - 40, baseTX - 18, baseTY - 70);
      ctx.quadraticCurveTo(baseTX + 5, baseTY - 45, baseTX + 12, baseTY);
      ctx.fill();
      // Tree canopy foliage
      ctx.beginPath();
      ctx.arc(baseTX - 22, baseTY - 75, moonRadius * 0.3, 0, Math.PI * 2);
      ctx.arc(baseTX + 5, baseTY - 85, moonRadius * 0.32, 0, Math.PI * 2);
      ctx.arc(baseTX - 8, baseTY - 60, moonRadius * 0.24, 0, Math.PI * 2);
      ctx.fill();

      // Cuội sitting silhouette
      ctx.fillStyle = 'rgba(70, 45, 18, 0.45)';
      ctx.beginPath();
      ctx.arc(baseTX - 32, baseTY - 18, 6, 0, Math.PI * 2); // head
      ctx.ellipse(baseTX - 30, baseTY - 6, 9, 7, 0.2, 0, Math.PI * 2); // body
      ctx.fill();

      // Thỏ ngọc (Rabbit) silhouette
      ctx.fillStyle = 'rgba(70, 45, 18, 0.4)';
      ctx.beginPath();
      ctx.arc(baseTX + 22, baseTY - 10, 4.5, 0, Math.PI * 2); // body
      ctx.arc(baseTX + 25, baseTY - 16, 3, 0, Math.PI * 2); // head
      ctx.ellipse(baseTX + 27, baseTY - 21, 1.5, 4, 0.3, 0, Math.PI * 2); // ear
      ctx.fill();

      ctx.restore();

      // Draw Stars
      for (let s of stars) {
        s.phase += s.speed;
        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Occasional shooting stars
      if (Math.random() < 0.007 && shootingStars.length < 2) {
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.018;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = `rgba(255, 243, 191, ${ss.opacity})`;
        ctx.lineWidth = ss.width;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        );
        ctx.stroke();
        ctx.restore();
      }

      // Draw drifting ethereal clouds
      for (let cloud of clouds) {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.w > width) {
          cloud.x = -cloud.w;
        }
        ctx.save();
        const cGrad = ctx.createRadialGradient(
          cloud.x + cloud.w / 2,
          cloud.y + cloud.h / 2,
          10,
          cloud.x + cloud.w / 2,
          cloud.y + cloud.h / 2,
          cloud.w / 2
        );
        cGrad.addColorStop(0, `rgba(230, 220, 255, ${cloud.alpha})`);
        cGrad.addColorStop(0.5, `rgba(180, 190, 235, ${cloud.alpha * 0.6})`);
        cGrad.addColorStop(1, 'rgba(15, 25, 60, 0)');

        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.ellipse(cloud.x + cloud.w / 2, cloud.y + cloud.h / 2, cloud.w / 2, cloud.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw ambient floating sky lanterns (Đèn trời)
      for (let l of lanterns) {
        l.y -= l.speedY;
        const sway = Math.sin(tick * l.swaySpeed + l.swayOffset) * l.swayAmp;
        l.x += sway * 0.3;

        if (l.y < -50) {
          l.y = height + 40;
          l.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(l.x, l.y);

        // Lantern Outer Glow
        const lGlow = ctx.createRadialGradient(0, 0, l.size * 0.2, 0, 0, l.size * 1.8);
        lGlow.addColorStop(0, 'rgba(255, 180, 50, 0.45)');
        lGlow.addColorStop(0.5, 'rgba(255, 100, 30, 0.15)');
        lGlow.addColorStop(1, 'rgba(255, 80, 20, 0)');
        ctx.fillStyle = lGlow;
        ctx.beginPath();
        ctx.arc(0, 0, l.size * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Lantern Body
        ctx.fillStyle = l.color;
        ctx.globalAlpha = l.alpha;
        ctx.beginPath();
        const w = l.size * 0.7;
        const h = l.size;
        ctx.moveTo(-w * 0.4, -h * 0.5);
        ctx.quadraticCurveTo(0, -h * 0.6, w * 0.4, -h * 0.5);
        ctx.quadraticCurveTo(w * 0.6, 0, w * 0.4, h * 0.5);
        ctx.lineTo(-w * 0.4, h * 0.5);
        ctx.quadraticCurveTo(-w * 0.6, 0, -w * 0.4, -h * 0.5);
        ctx.fill();

        // Internal flickering candle flame
        const flameSize = (l.size * 0.25) * (0.85 + 0.15 * Math.sin(tick * 0.2 + l.swayOffset));
        ctx.fillStyle = '#fff7b2';
        ctx.beginPath();
        ctx.arc(0, h * 0.2, flameSize, 0, Math.PI * 2);
        ctx.fill();

        // Lantern bottom rim
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-w * 0.45, h * 0.5);
        ctx.lineTo(w * 0.45, h * 0.5);
        ctx.stroke();

        ctx.restore();
      }

      // Draw User Custom Wish Lanterns
      if (customLanterns && customLanterns.length > 0) {
        for (let cl of customLanterns) {
          cl.y -= cl.speedY || 1.1;
          cl.x += Math.sin(tick * 0.03 + cl.offset) * 0.6;

          ctx.save();
          ctx.translate(cl.x, cl.y);

          // Big golden beacon aura
          const aura = ctx.createRadialGradient(0, 0, 10, 0, 0, 70);
          aura.addColorStop(0, 'rgba(255, 230, 100, 0.7)');
          aura.addColorStop(0.4, 'rgba(255, 140, 0, 0.25)');
          aura.addColorStop(1, 'rgba(255, 80, 0, 0)');
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.arc(0, 0, 70, 0, Math.PI * 2);
          ctx.fill();

          // Lantern body
          const lw = 28;
          const lh = 36;
          ctx.fillStyle = '#ff793f';
          ctx.beginPath();
          ctx.moveTo(-lw * 0.5, -lh * 0.5);
          ctx.quadraticCurveTo(0, -lh * 0.6, lw * 0.5, -lh * 0.5);
          ctx.quadraticCurveTo(lw * 0.65, 0, lw * 0.4, lh * 0.5);
          ctx.lineTo(-lw * 0.4, lh * 0.5);
          ctx.quadraticCurveTo(-lw * 0.65, 0, -lw * 0.5, -lh * 0.5);
          ctx.fill();

          // Core bright flame
          ctx.fillStyle = '#fffbe7';
          ctx.beginPath();
          ctx.arc(0, lh * 0.15, 8, 0, Math.PI * 2);
          ctx.fill();

          // Attached Wish Tag Banner
          if (cl.text) {
            ctx.fillStyle = 'rgba(20, 20, 35, 0.75)';
            ctx.strokeStyle = '#f1c40f';
            ctx.lineWidth = 1;
            const textWidth = Math.min(220, ctx.measureText(cl.text).width + 20);
            ctx.beginPath();
            ctx.roundRect(-textWidth / 2, lh * 0.7, textWidth, 24, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#ffeaa7';
            ctx.font = '12px "Be Vietnam Pro", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const displayTxt = cl.text.length > 22 ? cl.text.slice(0, 20) + '...' : cl.text;
            ctx.fillText(displayTxt, 0, lh * 0.7 + 12);
          }

          ctx.restore();
        }
      }

      // Draw Fireworks & Spark particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleCanvasClick);
    };
  }, [customLanterns]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
