import React, { useEffect, useState, useRef } from 'react';
const CursorFollower = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [mouseTrail, setMouseTrail] = useState<{
    x: number;
    y: number;
    timestamp: number;
  }[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveDirection, setMoveDirection] = useState({
    x: 0,
    y: 0
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const trailCanvas = useRef<HTMLCanvasElement>(null);
  const maxTrailPoints = 20; // Reduced from 200 to 20 for a much shorter trail
  // Configuración del rastro
  const trailConfig = {
    mainDotSize: isDrawing ? 10 : 8,
    trailWidth: isDrawing ? 3 : 2,
    trailColor: 'rgba(59, 130, 246, 0.8)',
    trailGlowColor: 'rgba(59, 130, 246, 0.4)',
    trailFadeTime: 500,
    smoothingFactor: 0.2,
    samplingInterval: 10 // Increased from 5 to 10ms to reduce trail density
  };
  // Efecto para la animación del rastro usando requestAnimationFrame
  useEffect(() => {
    let lastCaptureTime = 0;
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        // Actualizar posición del cursor con suavizado
        if (isVisible) {
          renderTrail();
        }
        // Limpieza natural del rastro basada en tiempo
        const now = Date.now();
        if (now - lastCaptureTime > trailConfig.samplingInterval) {
          lastCaptureTime = now;
          // Eliminar puntos antiguos
          setMouseTrail(prev => prev.filter(point => now - point.timestamp < trailConfig.trailFadeTime));
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isVisible, mouseTrail, isDrawing]);
  // Renderizar el rastro en el canvas
  const renderTrail = () => {
    if (!trailCanvas.current || mouseTrail.length < 2) return;
    const ctx = trailCanvas.current.getContext('2d');
    if (!ctx) return;
    // Configurar tamaño del canvas al tamaño de la ventana
    const canvas = trailCanvas.current;
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Configurar estilo para el rastro
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Dibujar el rastro con efecto de desvanecimiento
    for (let i = 1; i < mouseTrail.length; i++) {
      const point = mouseTrail[i];
      const prevPoint = mouseTrail[i - 1];
      // Calcular opacidad basada en la edad del punto
      const age = Date.now() - point.timestamp;
      const opacity = Math.max(0, 1 - age / trailConfig.trailFadeTime);
      if (opacity <= 0) continue;
      // Calcular grosor basado en la posición en el rastro y si está dibujando
      const thickness = isDrawing ? trailConfig.trailWidth * (1 - i / mouseTrail.length * 0.7) * opacity : trailConfig.trailWidth * (1 - i / mouseTrail.length * 0.8) * opacity;
      // Crear degradado para el trazo
      const gradient = ctx.createLinearGradient(prevPoint.x, prevPoint.y, point.x, point.y);
      gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`); // blue-500 inicio
      gradient.addColorStop(1, `rgba(99, 102, 241, ${opacity * 0.8})`); // indigo-500 fin
      // Dibujar línea con sombra para efecto de brillo
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = thickness;
      // Añadir sombra para efecto de brillo
      ctx.shadowColor = trailConfig.trailGlowColor;
      ctx.shadowBlur = isDrawing ? 15 : 8;
      ctx.stroke();
    }
    // Dibujar la nave espacial en lugar del punto principal
    if (mouseTrail.length > 0) {
      const mainPoint = mouseTrail[0];
      // Guardar el estado actual del contexto
      ctx.save();
      // Traslación al punto actual del cursor
      ctx.translate(mainPoint.x, mainPoint.y);
      // Rotación basada en la dirección del movimiento
      const angle = Math.atan2(moveDirection.y, moveDirection.x);
      ctx.rotate(angle);
      // Definir colores y estilos
      const glowColor = 'rgba(59, 130, 246, 0.7)';
      const shipColor = 'rgba(59, 130, 246, 0.9)';
      const engineColor = 'rgba(236, 72, 153, 0.9)'; // pink-500
      // Añadir sombra para efecto de brillo
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = isDrawing ? 15 : 10;
      // Dibujar la nave espacial
      ctx.beginPath();
      // Cuerpo principal de la nave
      const shipSize = isDrawing ? trailConfig.mainDotSize * 1.5 : trailConfig.mainDotSize;
      // Forma de nave espacial
      ctx.fillStyle = shipColor;
      ctx.beginPath();
      ctx.moveTo(shipSize, 0); // Punta de la nave
      ctx.lineTo(-shipSize / 2, shipSize / 2); // Esquina inferior derecha
      ctx.lineTo(-shipSize / 3, 0); // Parte trasera central
      ctx.lineTo(-shipSize / 2, -shipSize / 2); // Esquina superior derecha
      ctx.closePath();
      ctx.fill();
      // Motor/propulsor (luz de atrás)
      if (isMoving) {
        ctx.fillStyle = engineColor;
        ctx.beginPath();
        ctx.moveTo(-shipSize / 3, 0);
        ctx.lineTo(-shipSize, shipSize / 3);
        ctx.lineTo(-shipSize * 1.5, 0);
        ctx.lineTo(-shipSize, -shipSize / 3);
        ctx.closePath();
        ctx.fill();
        // Efecto de propulsión
        const propulsionGradient = ctx.createRadialGradient(-shipSize * 1.2, 0, 0, -shipSize * 1.2, 0, shipSize * 2);
        propulsionGradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
        propulsionGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.3)');
        propulsionGradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
        ctx.fillStyle = propulsionGradient;
        ctx.beginPath();
        ctx.arc(-shipSize * 1.2, 0, shipSize * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Restaurar el contexto
      ctx.restore();
    }
  };
  useEffect(() => {
    let lastCaptureTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const prevPosition = mousePosition;
      const newPosition = {
        x: e.clientX,
        y: e.clientY
      };
      // Calcular dirección del movimiento
      const dirX = newPosition.x - prevPosition.x;
      const dirY = newPosition.y - prevPosition.y;
      // Establecer dirección del movimiento para el efecto de rastro
      setMoveDirection({
        x: dirX !== 0 ? Math.sign(dirX) * Math.min(Math.abs(dirX) * 0.2, 4) : 0,
        y: dirY !== 0 ? Math.sign(dirY) * Math.min(Math.abs(dirY) * 0.2, 4) : 0
      });
      // Actualizar posición del ratón con suavizado
      setMousePosition(newPosition);
      // Añadir posición actual con marca de tiempo al rastro
      const now = Date.now();
      // Limitar la frecuencia de captura para evitar demasiados puntos
      if (now - lastCaptureTime > trailConfig.samplingInterval) {
        lastCaptureTime = now;
        setMouseTrail(prev => {
          // Calcular posición suavizada para efecto más fluido
          let newTrail;
          if (prev.length > 0) {
            // Aplicar suavizado solo si hay puntos previos
            const lastPoint = prev[0];
            const smoothX = lastPoint.x + (newPosition.x - lastPoint.x) * trailConfig.smoothingFactor;
            const smoothY = lastPoint.y + (newPosition.y - lastPoint.y) * trailConfig.smoothingFactor;
            newTrail = [{
              x: newPosition.x,
              y: newPosition.y,
              timestamp: now
            }, ...prev];
          } else {
            newTrail = [{
              x: newPosition.x,
              y: newPosition.y,
              timestamp: now
            }, ...prev];
          }
          // Limitar el número de puntos para rendimiento
          return newTrail.slice(0, maxTrailPoints);
        });
      }
      // Mostrar cursor e indicar movimiento
      if (!isVisible) setIsVisible(true);
      setIsMoving(true);
      // Reiniciar estado de movimiento después de un retraso
      clearTimeout(moveTimerRef.current);
      moveTimerRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 150);
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
      setMouseTrail([]);
      setIsDrawing(false);
    };
    const handleMouseDown = () => {
      setIsDrawing(true);
    };
    const handleMouseUp = () => {
      setIsDrawing(false);
    };
    // Configurar la resolución del canvas para pantallas de alta densidad
    const setupCanvas = () => {
      if (!trailCanvas.current) return;
      const canvas = trailCanvas.current;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };
    // Configurar canvas y agregar event listeners
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    window.addEventListener('mousemove', handleMouseMove, {
      passive: true
    });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    const moveTimerRef = {
      current: 0 as any
    };
    return () => {
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(moveTimerRef.current);
    };
  }, [mousePosition]);
  return <div className="fixed inset-0 pointer-events-none z-50">
      <canvas ref={trailCanvas} className="absolute inset-0 w-full h-full" style={{
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s ease-out',
      willChange: 'transform, opacity'
    }} />
    </div>;
};
export default CursorFollower;