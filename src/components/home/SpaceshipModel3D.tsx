import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
interface SpaceshipModel3DProps {
  isDragging: boolean;
  scrollRotation?: number;
}
const SpaceshipModel3D: React.FC<SpaceshipModel3DProps> = ({
  isDragging: externalIsDragging,
  scrollRotation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const shipRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [internalIsDragging, setInternalIsDragging] = useState(false);
  const lastRotationRef = useRef({
    x: 0,
    y: 0
  });
  const initialPositionSetRef = useRef(false);
  const lastInteractionTimeRef = useRef(0);
  const rotationSpeedRef = useRef({
    x: 0,
    y: 0
  });
  const hasInteractedRef = useRef(false);
  const lockVerticalAnimationRef = useRef(false);
  // Referencias para el efecto de fuego
  const engineFireRef = useRef<THREE.Group[]>([]);
  const fireIntensityRef = useRef(0);
  // Setup the 3D scene
  useEffect(() => {
    if (!containerRef.current) return;
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a1929);
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 2000);
    camera.position.z = 5;
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
    // Luz especial para el efecto de fuego
    const fireLight = new THREE.PointLight(0xff6600, 0, 3);
    fireLight.position.set(0, 0, 1.5);
    scene.add(fireLight);
    // Add stars to the background
    createStars(scene);
    // Create spaceship model
    createSpaceship().then(ship => {
      shipRef.current = ship;
      // No establecer una rotación inicial fija - se establecerá con el movimiento
      lastRotationRef.current = {
        x: ship.rotation.x,
        y: ship.rotation.y
      };
      scene.add(ship);
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
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
        frameIdRef.current = requestAnimationFrame(animate);
        return;
      }
      // Animate the ship if it exists
      if (shipRef.current) {
        const isDragging = internalIsDragging || externalIsDragging;
        const currentTime = Date.now();
        const timeSinceLastInteraction = currentTime - lastInteractionTimeRef.current;
        // Actualizar intensidad del fuego - SOLO cuando se está arrastrando
        if (isDragging) {
          lockVerticalAnimationRef.current = false;
          // Aumentar intensidad del fuego SOLO cuando se arrastra
          fireIntensityRef.current = Math.min(fireIntensityRef.current + 0.15, 1.0);
        } else {
          // Disminuir intensidad del fuego cuando no se arrastra - más rápido para que desaparezca
          fireIntensityRef.current = Math.max(fireIntensityRef.current - 0.1, 0);
        }
        // Actualizar el efecto de fuego en los motores
        if (engineFireRef.current.length > 0) {
          engineFireRef.current.forEach(fireGroup => {
            // Solo mostrar el fuego cuando hay intensidad
            if (fireIntensityRef.current > 0.05) {
              // Hacer visible el grupo de fuego
              fireGroup.visible = true;
              // Escalar el fuego según la intensidad
              const fireScale = 0.8 + Math.sin(Date.now() * 0.01) * 0.2 + fireIntensityRef.current * 0.7;
              fireGroup.scale.set(fireScale, fireScale, 1 + fireIntensityRef.current * 3);
              // Actualizar los colores y opacidad del fuego
              fireGroup.children.forEach(flame => {
                if (flame instanceof THREE.Mesh && flame.material instanceof THREE.MeshStandardMaterial) {
                  // Colores más intensos - amarillo y rojo
                  if (flame.name === 'fireCore') {
                    // Núcleo más brillante - amarillo/blanco
                    const hue = THREE.MathUtils.lerp(0.12, 0.08, fireIntensityRef.current); // Amarillo a naranja
                    const saturation = THREE.MathUtils.lerp(0.8, 1.0, fireIntensityRef.current);
                    const lightness = THREE.MathUtils.lerp(0.6, 0.8, fireIntensityRef.current);
                    const color = new THREE.Color().setHSL(hue, saturation, lightness);
                    flame.material.emissive.copy(color);
                    flame.material.color.copy(color);
                    flame.material.emissiveIntensity = 1.5 + fireIntensityRef.current * 3;
                  } else {
                    // Capa exterior - rojo/naranja
                    const hue = THREE.MathUtils.lerp(0.05, 0.02, fireIntensityRef.current); // Naranja a rojo
                    const saturation = THREE.MathUtils.lerp(0.9, 1.0, fireIntensityRef.current);
                    const lightness = THREE.MathUtils.lerp(0.5, 0.6, fireIntensityRef.current);
                    const color = new THREE.Color().setHSL(hue, saturation, lightness);
                    flame.material.emissive.copy(color);
                    flame.material.color.copy(color);
                    flame.material.emissiveIntensity = 1.0 + fireIntensityRef.current * 2;
                  }
                }
              });
            } else {
              // Ocultar el fuego completamente cuando no hay interacción
              fireGroup.visible = false;
            }
          });
          // Actualizar luz del fuego
          const fireLight = sceneRef.current.children.find(child => child instanceof THREE.PointLight && child.color.getHex() === 0xff6600) as THREE.PointLight | undefined;
          if (fireLight) {
            fireLight.intensity = fireIntensityRef.current * 3;
          }
        }
        // Aplicar animación de flotación SOLO si:
        // 1. No estamos arrastrando
        // 2. No se ha interactuado nunca con la nave O han pasado más de 15 segundos desde la última interacción
        // 3. La animación vertical no está bloqueada
        if (!isDragging && (!hasInteractedRef.current || timeSinceLastInteraction > 15000) && !lockVerticalAnimationRef.current) {
          // Solo aplicar animación de flotación si nunca se ha interactuado con la nave
          // o si ha pasado mucho tiempo desde la última interacción
          if (!initialPositionSetRef.current) {
            shipRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.15;
          }
        } else {
          // Mantener la nave completamente estable en Y=0 después de interactuar
          shipRef.current.position.y = 0;
          // Una vez que el usuario ha interactuado, marcamos que la posición inicial ha sido establecida
          if (hasInteractedRef.current && !initialPositionSetRef.current) {
            initialPositionSetRef.current = true;
          }
        }
        // Aplicar inercia después de soltar, pero solo por un tiempo corto
        if (!isDragging && hasInteractedRef.current && timeSinceLastInteraction < 800) {
          // Reducir gradualmente la velocidad de rotación
          rotationSpeedRef.current.x *= 0.92;
          rotationSpeedRef.current.y *= 0.92;
          // Aplicar rotación si la velocidad es significativa
          if (Math.abs(rotationSpeedRef.current.x) > 0.0001 || Math.abs(rotationSpeedRef.current.y) > 0.0001) {
            shipRef.current.rotation.x += rotationSpeedRef.current.x;
            shipRef.current.rotation.y += rotationSpeedRef.current.y;
            // Limitar rotación para evitar volteos
            shipRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, shipRef.current.rotation.x));
            // Actualizar referencia de última rotación
            lastRotationRef.current = {
              x: shipRef.current.rotation.x,
              y: shipRef.current.rotation.y
            };
          }
        }
        // Después de la fase de inercia, mantener la nave completamente quieta
        else if (!isDragging && hasInteractedRef.current) {
          // Asegurar que las velocidades de rotación estén a cero
          rotationSpeedRef.current.x = 0;
          rotationSpeedRef.current.y = 0;
          // Mantener la nave en su última rotación
          shipRef.current.rotation.x = lastRotationRef.current.x;
          shipRef.current.rotation.y = lastRotationRef.current.y;
        }
        // Animar brillo del motor (ahora controlado por el efecto de fuego)
        const engineParts = shipRef.current.children.filter(child => child.name === 'engineGlow1' || child.name === 'engineGlow2');
        engineParts.forEach(part => {
          if (part && part.scale) {
            // Efecto pulsante para el brillo del motor
            const scale = 0.8 + Math.sin(Date.now() * 0.005) * 0.2;
            part.scale.set(scale, scale, 1);
            // Actualizar intensidad del material si tiene propiedad emisiva
            if (part.material instanceof THREE.MeshStandardMaterial) {
              part.material.emissiveIntensity = 0.8 + Math.sin(Date.now() * 0.005) * 0.2;
            }
          }
        });
        // Aplicar rotación de scroll si se proporciona, pero solo si:
        // 1. No se está arrastrando
        // 2. No se ha interactuado nunca O ha pasado mucho tiempo desde la última interacción
        // 3. La animación vertical no está bloqueada
        if (typeof scrollRotation === 'number' && !isDragging && (!hasInteractedRef.current || timeSinceLastInteraction > 15000) && !lockVerticalAnimationRef.current) {
          // Aplicar rotación muy sutil desde el scroll
          const targetY = lastRotationRef.current.y + scrollRotation * 0.03;
          shipRef.current.rotation.y = THREE.MathUtils.lerp(shipRef.current.rotation.y, targetY, 0.02);
          // Solo actualizar la referencia si estamos aplicando activamente la rotación de scroll
          if (Math.abs(scrollRotation) > 0.01) {
            lastRotationRef.current.y = shipRef.current.rotation.y;
          }
        }
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
  }, [externalIsDragging, internalIsDragging, scrollRotation]);
  // Create star field background
  const createStars = (scene: THREE.Scene) => {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      starsVertices.push(x, y, z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
  };
  // Create the spaceship 3D model - Versión simplificada original
  const createSpaceship = async () => {
    const ship = new THREE.Group();
    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xb0c4de,
      metalness: 0.7,
      roughness: 0.3
    });
    const secondaryMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      metalness: 0.6,
      roughness: 0.4
    });
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x3498db,
      emissiveIntensity: 0.2
    });
    const cockpitMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.7
    });
    const engineGlowMaterial = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x60a5fa,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.9
    });
    // Materiales para el fuego de los motores - colores más intensos
    const fireCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffcc00,
      emissive: 0xffcc00,
      emissiveIntensity: 2.5,
      transparent: true,
      opacity: 0.95
    });
    const fireOuterMaterial = new THREE.MeshStandardMaterial({
      color: 0xff3300,
      emissive: 0xff3300,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.8
    });
    // Main hull - forma cilíndrica simple
    const hullGeometry = new THREE.CylinderGeometry(0.4, 0.4, 2, 16);
    hullGeometry.rotateX(Math.PI / 2);
    const hull = new THREE.Mesh(hullGeometry, bodyMaterial);
    ship.add(hull);
    // Nose cone
    const noseGeometry = new THREE.ConeGeometry(0.4, 0.8, 16);
    noseGeometry.rotateX(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeometry, bodyMaterial);
    nose.position.z = -1.4;
    ship.add(nose);
    // Cockpit
    const cockpitGeometry = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    cockpitGeometry.rotateX(Math.PI);
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.set(0, 0.2, -0.6);
    ship.add(cockpit);
    // Wings
    const wingGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.4);
    const leftWing = new THREE.Mesh(wingGeometry, secondaryMaterial);
    leftWing.position.set(-0.7, 0, 0);
    leftWing.rotation.z = Math.PI / 12;
    ship.add(leftWing);
    const rightWing = new THREE.Mesh(wingGeometry, secondaryMaterial);
    rightWing.position.set(0.7, 0, 0);
    rightWing.rotation.z = -Math.PI / 12;
    ship.add(rightWing);
    // Engine section
    const engineHousingGeometry = new THREE.CylinderGeometry(0.45, 0.55, 0.4, 16);
    engineHousingGeometry.rotateX(Math.PI / 2);
    const engineHousing = new THREE.Mesh(engineHousingGeometry, secondaryMaterial);
    engineHousing.position.z = 1.2;
    ship.add(engineHousing);
    // Engine nozzles with fire effect
    const createEngineNozzle = (x, y, index) => {
      const nozzleGroup = new THREE.Group();
      // Nozzle exterior
      const nozzleGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.3, 16);
      nozzleGeometry.rotateX(Math.PI / 2);
      const nozzle = new THREE.Mesh(nozzleGeometry, secondaryMaterial);
      // Engine glow
      const glowGeometry = new THREE.CylinderGeometry(0.08, 0.12, 0.05, 16);
      glowGeometry.rotateX(Math.PI / 2);
      const glow = new THREE.Mesh(glowGeometry, engineGlowMaterial);
      glow.position.z = 0.15;
      glow.name = `engineGlow${index}`;
      // Crear grupo de fuego para este motor
      const fireGroup = new THREE.Group();
      fireGroup.name = `engineFire${index}`;
      fireGroup.visible = false; // Inicialmente oculto
      // Núcleo de fuego (más brillante) - amarillo
      const fireCoreGeometry = new THREE.ConeGeometry(0.08, 0.5, 16, 8);
      fireCoreGeometry.rotateX(-Math.PI / 2);
      const fireCore = new THREE.Mesh(fireCoreGeometry, fireCoreMaterial);
      fireCore.position.z = 0.4;
      fireCore.name = 'fireCore';
      // Capa exterior de fuego (más naranja/roja)
      const fireOuterGeometry = new THREE.ConeGeometry(0.15, 0.7, 16, 8);
      fireOuterGeometry.rotateX(-Math.PI / 2);
      const fireOuter = new THREE.Mesh(fireOuterGeometry, fireOuterMaterial);
      fireOuter.position.z = 0.5;
      fireOuter.name = 'fireOuter';
      // Añadir partículas de fuego (pequeñas esferas)
      for (let i = 0; i < 5; i++) {
        const particleSize = Math.random() * 0.03 + 0.01;
        const particleGeometry = new THREE.SphereGeometry(particleSize, 8, 8);
        const particleMaterial = new THREE.MeshStandardMaterial({
          color: Math.random() > 0.5 ? 0xffcc00 : 0xff3300,
          emissive: Math.random() > 0.5 ? 0xffcc00 : 0xff3300,
          emissiveIntensity: 2,
          transparent: true,
          opacity: 0.9
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 0.15;
        particle.position.set(Math.cos(angle) * distance, Math.sin(angle) * distance, Math.random() * 0.8 + 0.3);
        fireGroup.add(particle);
      }
      // Añadir ambas partes del fuego al grupo
      fireGroup.add(fireCore);
      fireGroup.add(fireOuter);
      // Inicialmente escalar a 0 (sin fuego)
      fireGroup.scale.set(0.1, 0.1, 0.1);
      nozzleGroup.add(nozzle);
      nozzleGroup.add(glow);
      nozzleGroup.add(fireGroup);
      nozzleGroup.position.set(x, y, 1.4);
      // Guardar referencia al grupo de fuego
      engineFireRef.current.push(fireGroup);
      return nozzleGroup;
    };
    // Add two engine nozzles
    ship.add(createEngineNozzle(0.2, 0, 1));
    ship.add(createEngineNozzle(-0.2, 0, 2));
    // Wing details
    const addWingDetail = (wing, x, y, z) => {
      const detailGeometry = new THREE.BoxGeometry(0.3, 0.02, 0.1);
      const detail = new THREE.Mesh(detailGeometry, accentMaterial);
      detail.position.set(x, y, z);
      wing.add(detail);
    };
    // Add details to wings
    addWingDetail(leftWing, 0.2, 0, -0.1);
    addWingDetail(leftWing, -0.2, 0, -0.1);
    addWingDetail(rightWing, 0.2, 0, -0.1);
    addWingDetail(rightWing, -0.2, 0, -0.1);
    // Hull details
    const addHullDetail = (x, y, z, width, height) => {
      const detailGeometry = new THREE.BoxGeometry(width, height, 0.02);
      const detail = new THREE.Mesh(detailGeometry, accentMaterial);
      detail.position.set(x, y, z);
      detail.rotation.x = Math.PI / 2;
      hull.add(detail);
    };
    // Add details to hull
    addHullDetail(0, 0.3, 0, 0.6, 0.02);
    addHullDetail(0, -0.3, 0, 0.6, 0.02);
    // Simple antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 8);
    const antenna = new THREE.Mesh(antennaGeometry, accentMaterial);
    antenna.position.set(0, 0.3, -0.8);
    ship.add(antenna);
    // Scale the ship
    ship.scale.set(0.8, 0.8, 0.8);
    return ship;
  };
  // Mouse/touch interaction for rotating the spaceship
  useEffect(() => {
    if (!containerRef.current) return;
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setInternalIsDragging(true);
      setIsInteracting(true);
      hasInteractedRef.current = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      // Reset rotation speed when starting to drag
      rotationSpeedRef.current = {
        x: 0,
        y: 0
      };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !shipRef.current) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      // Calculate rotation speed based on mouse movement
      rotationSpeedRef.current = {
        x: deltaMove.y * 0.005,
        y: deltaMove.x * 0.005
      };
      // Apply rotation
      shipRef.current.rotation.x += rotationSpeedRef.current.x;
      shipRef.current.rotation.y += rotationSpeedRef.current.y;
      // Limit rotation to prevent flipping
      shipRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, shipRef.current.rotation.x));
      // Update last rotation reference
      lastRotationRef.current = {
        x: shipRef.current.rotation.x,
        y: shipRef.current.rotation.y
      };
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      // Update last interaction time
      lastInteractionTimeRef.current = Date.now();
    };
    const onMouseUp = () => {
      isDragging = false;
      setInternalIsDragging(false);
      setIsInteracting(false);
      // Record the time when interaction ended
      lastInteractionTimeRef.current = Date.now();
      // IMPORTANTE: Estabilizar completamente la nave al soltar
      if (shipRef.current) {
        // Forzar la posición Y a cero
        shipRef.current.position.y = 0;
        // Actualizar la rotación final
        lastRotationRef.current = {
          x: shipRef.current.rotation.x,
          y: shipRef.current.rotation.y
        };
        // Bloquear permanentemente la animación vertical
        // hasta que pasen 15 segundos o se vuelva a interactuar
        lockVerticalAnimationRef.current = true;
        // Una vez que el usuario ha interactuado, la posición inicial queda establecida
        initialPositionSetRef.current = true;
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setInternalIsDragging(true);
        setIsInteracting(true);
        hasInteractedRef.current = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        // Reset rotation speed when starting to drag
        rotationSpeedRef.current = {
          x: 0,
          y: 0
        };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !shipRef.current || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y
      };
      // Calculate rotation speed based on touch movement
      rotationSpeedRef.current = {
        x: deltaMove.y * 0.005,
        y: deltaMove.x * 0.005
      };
      // Apply rotation
      shipRef.current.rotation.x += rotationSpeedRef.current.x;
      shipRef.current.rotation.y += rotationSpeedRef.current.y;
      // Limit rotation to prevent flipping
      shipRef.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, shipRef.current.rotation.x));
      // Update last rotation reference
      lastRotationRef.current = {
        x: shipRef.current.rotation.x,
        y: shipRef.current.rotation.y
      };
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
      // Update last interaction time
      lastInteractionTimeRef.current = Date.now();
    };
    const onTouchEnd = () => {
      isDragging = false;
      setInternalIsDragging(false);
      setIsInteracting(false);
      // Record the time when interaction ended
      lastInteractionTimeRef.current = Date.now();
      // IMPORTANTE: Estabilizar completamente la nave al soltar
      if (shipRef.current) {
        // Forzar la posición Y a cero
        shipRef.current.position.y = 0;
        // Actualizar la rotación final
        lastRotationRef.current = {
          x: shipRef.current.rotation.x,
          y: shipRef.current.rotation.y
        };
        // Bloquear permanentemente la animación vertical
        // hasta que pasen 15 segundos o se vuelva a interactuar
        lockVerticalAnimationRef.current = true;
        // Una vez que el usuario ha interactuado, la posición inicial queda establecida
        initialPositionSetRef.current = true;
      }
    };
    // Add event listeners
    containerRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    containerRef.current.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove, {
      passive: true
    });
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
    };
  }, []);
  return <div ref={containerRef} className={`w-full h-full min-h-[300px] cursor-grab relative ${isInteracting ? 'cursor-grabbing' : 'cursor-grab'}`}>
      {!isLoaded && <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>}
      {/* Interactive hint overlay */}
      {isLoaded && !isInteracting && <div className="absolute inset-0 bg-black/10 rounded-lg flex flex-col items-center justify-center z-20 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <p className="text-sm font-medium text-center bg-black/40 px-3 py-1 rounded-md">
            Haz clic y arrastra para rotar la nave
          </p>
        </div>}
    </div>;
};
export default SpaceshipModel3D;