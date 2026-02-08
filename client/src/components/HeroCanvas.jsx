import React, { useEffect, useRef } from 'react';

const HeroCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width, height, particles = [];
        let animationFrameId;

        const setupCanvas = () => {
            // Match your original script.js dimensions
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            
            // Re-initialize particles based on your original count
            particles = [];
            for (let i = 0; i < 120; i++) {
                particles.push({
                    x: (Math.random() - 0.5) * width * 0.8,
                    y: (Math.random() - 0.5) * height * 0.8,
                    z: (Math.random() - 0.5) * 1000,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const updateText = (scroll) => {
            // Exact scroll triggers from your original script.js
            const sections = [
                { id: 'text-1', start: 0, end: 0.15 },
                { id: 'text-2', start: 0.25, end: 0.45 },
                { id: 'text-3', start: 0.55, end: 0.75 },
                { id: 'text-4', start: 0.80, end: 0.90 },
                { id: 'text-5', start: 0.92, end: 1.0 }
            ];

            sections.forEach(t => {
                const el = document.getElementById(t.id);
                if (el) {
                    if (scroll >= t.start && scroll <= t.end) {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0px)";
                        el.classList.add('active');
                    } else {
                        el.style.opacity = "0";
                        el.style.transform = "translateY(30px)";
                        el.classList.remove('active');
                    }
                }
            });
        };

        const draw = () => {
            // Exact background and rotation logic from script.js
            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, width, height);

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll)) || 0;

            updateText(scrollFraction);

            const angleY = scrollFraction * Math.PI * 2 * 2.5; 
            const centerX = width / 2;
            const centerY = height / 2;

            particles.forEach(p => {
                let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
                let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
                let scale = 600 / (600 + z1);
                let x2d = x1 * scale + centerX;
                let y2d = p.y * scale + centerY;

                if (scale > 0) {
                    ctx.beginPath();
                    ctx.arc(x2d, y2d, Math.max(0, p.size * scale), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, scale)})`;
                    ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        setupCanvas();
        draw();

        window.addEventListener('resize', setupCanvas);
        return () => {
            window.removeEventListener('resize', setupCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Applying exact CSS positioning from your style.css
    return (
        <canvas 
            ref={canvasRef} 
            style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                zIndex: 1,
                pointerEvents: 'none' // Ensures canvas doesn't block clicks to the form
            }} 
        />
    );
};

export default HeroCanvas;