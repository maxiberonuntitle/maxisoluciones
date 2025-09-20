import React, { useEffect, useState, useRef, createElement } from 'react';
import * as THREE from 'three';
interface NotebookModel3DProps {
  isDragging: boolean;
  scrollRotation: number;
}
const NotebookModel3D: React.FC<NotebookModel3DProps> = ({
  isDragging,
  scrollRotation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const notebookRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Setup the 3D scene
  useEffect(() => {
    if (!containerRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a1929);
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 2000);
    camera.position.z = 4;
    cameraRef.current = camera;
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(1, 1, 2);
    keyLight.castShadow = true;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x3b82f6, 0.3); // Blue tint
    fillLight.position.set(-1, 0, 1);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0x6366f1, 0.2); // Indigo tint
    rimLight.position.set(0, -1, -1);
    scene.add(rimLight);
    // Create notebook model
    createNotebook().then(notebook => {
      notebookRef.current = notebook;
      scene.add(notebook);
      setIsLoaded(true);
    });
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    // Animation loop
    const animate = () => {
      if (!notebookRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
        frameIdRef.current = requestAnimationFrame(animate);
        return;
      }
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };
    frameIdRef.current = requestAnimationFrame(animate);
    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // Update notebook rotation based on scroll and drag
  useEffect(() => {
    if (!notebookRef.current) return;
    // Apply scroll rotation
    notebookRef.current.rotation.y = THREE.MathUtils.lerp(notebookRef.current.rotation.y, scrollRotation * 0.1, 0.1);
  }, [scrollRotation]);
  // Create the notebook 3D model
  const createNotebook = async () => {
    const notebook = new THREE.Group();
    // Laptop base dimensions
    const baseWidth = 2;
    const baseHeight = 0.1;
    const baseDepth = 1.4;
    // Screen dimensions
    const screenWidth = baseWidth;
    const screenHeight = 0.1;
    const screenDepth = baseDepth;
    // Materials
    const baseMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2a4365,
      metalness: 0.7,
      roughness: 0.3,
      clearcoat: 0.5
    });
    const screenMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8
    });
    const keyboardMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.3,
      roughness: 0.7
    });
    // Create display texture
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width = 512;
    displayCanvas.height = 512;
    const ctx = displayCanvas.getContext('2d');
    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 512);
      gradient.addColorStop(0, '#1e3a8a'); // Dark blue
      gradient.addColorStop(1, '#3b82f6'); // Lighter blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      // Add some code-like elements
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 20; i++) {
        const y = 40 + i * 20;
        const width = Math.random() * 350 + 50;
        ctx.fillRect(30, y, width, 8);
      }
      // Add some UI elements
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(30, 300, 452, 150);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(50, 320, 412, 40);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(50, 380, 190, 50);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(270, 380, 190, 50);
    }
    const displayTexture = new THREE.CanvasTexture(displayCanvas);
    const displayMaterial = new THREE.MeshBasicMaterial({
      map: displayTexture,
      side: THREE.FrontSide
    });
    // Create base (bottom part)
    const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    notebook.add(base);
    // Create keyboard inset
    const keyboardGeometry = new THREE.BoxGeometry(baseWidth - 0.1, 0.02, baseDepth - 0.1);
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.y = baseHeight / 2 + 0.01;
    base.add(keyboard);
    // Create trackpad
    const trackpadGeometry = new THREE.BoxGeometry(0.5, 0.01, 0.3);
    const trackpad = new THREE.Mesh(trackpadGeometry, new THREE.MeshPhysicalMaterial({
      color: 0x475569,
      metalness: 0.5,
      roughness: 0.2
    }));
    trackpad.position.y = baseHeight / 2 + 0.02;
    trackpad.position.z = 0.4;
    base.add(trackpad);
    // Create screen (top part)
    const screenGeometry = new THREE.BoxGeometry(screenWidth, screenHeight, screenDepth);
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.y = baseHeight + screenHeight / 2 + 0.01;
    screen.position.z = -baseDepth / 2 + screenDepth / 2;
    screen.rotation.x = Math.PI / 6; // Slightly open
    notebook.add(screen);
    // Create display
    const displayGeometry = new THREE.PlaneGeometry(screenWidth - 0.2, screenDepth - 0.2);
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.rotation.x = -Math.PI / 2;
    display.position.y = screenHeight / 2 + 0.01;
    display.position.z = 0;
    screen.add(display);
    // Create logo on screen back
    const logoGeometry = new THREE.CircleGeometry(0.15, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      side: THREE.FrontSide
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.y = -screenHeight / 2 - 0.01;
    logo.rotation.x = Math.PI;
    logo.position.z = 0;
    screen.add(logo);
    // Position the notebook
    notebook.position.y = -0.5;
    notebook.rotation.x = -Math.PI / 12; // Tilt forward slightly
    return notebook;
  };
  // Mouse/touch interaction for rotating the notebook
  useEffect(() => {
    if (!containerRef.current || !notebookRef.current) return;
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };
    let rotationSpeed = {
      x: 0,
      y: 0
    };
    let animationFrameId: number | null = null;
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !notebookRef.current) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      // Adjust rotation speed based on mouse movement
      rotationSpeed = {
        x: deltaMove.y * 0.005,
        y: deltaMove.x * 0.005
      };
      // Apply rotation
      notebookRef.current.rotation.x += rotationSpeed.x;
      notebookRef.current.rotation.y += rotationSpeed.y;
      // Limit rotation to prevent flipping
      notebookRef.current.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, notebookRef.current.rotation.x));
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !notebookRef.current || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };
      // Adjust rotation speed based on touch movement
      rotationSpeed = {
        x: deltaMove.y * 0.005,
        y: deltaMove.x * 0.005
      };
      // Apply rotation
      notebookRef.current.rotation.x += rotationSpeed.x;
      notebookRef.current.rotation.y += rotationSpeed.y;
      // Limit rotation to prevent flipping
      notebookRef.current.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, notebookRef.current.rotation.x));
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    // Apply momentum effect
    const applyMomentum = () => {
      if (!notebookRef.current) return;
      // Gradually decrease rotation speed
      rotationSpeed.x *= 0.95;
      rotationSpeed.y *= 0.95;
      // Apply rotation if speed is significant
      if (Math.abs(rotationSpeed.x) > 0.0001 || Math.abs(rotationSpeed.y) > 0.0001) {
        notebookRef.current.rotation.x += rotationSpeed.x;
        notebookRef.current.rotation.y += rotationSpeed.y;
        // Limit rotation to prevent flipping
        notebookRef.current.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, notebookRef.current.rotation.x));
      }
      animationFrameId = requestAnimationFrame(applyMomentum);
    };
    // Start momentum animation
    animationFrameId = requestAnimationFrame(applyMomentum);
    // Add event listeners
    containerRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    containerRef.current.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', onMouseDown);
        containerRef.current.removeEventListener('touchstart', onTouchStart);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  return <div ref={containerRef} className="w-full h-full min-h-[300px] cursor-grab relative" style={{
    cursor: isDragging ? 'grabbing' : 'grab'
  }}>
      {!isLoaded && <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>}
    </div>;
};
export default NotebookModel3D;