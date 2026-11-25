import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  Box,
  ChevronDown,
  ChevronUp,
  Layers,
  RotateCcw,
  ArrowRight,
  Crosshair,
  Grid,
  Code2,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ARCH_NODES,
  CAMERA_PRESETS,
  CONDUIT_ROUTES,
  CameraPreset,
  NodeId
} from './isometric3d/architectureData';
import { buildArchitectureScene } from './isometric3d/sceneBuilders';

// Module-scope reusable math helpers (zero GC inside animation loop)
const _packetPos = new THREE.Vector3();
const _packetMat = new THREE.Matrix4();
const _packetQuat = new THREE.Quaternion();
const _packetScale = new THREE.Vector3(1, 1, 1);
const _pointer = new THREE.Vector2();
const _projVec = new THREE.Vector3();
const _colorActive = new THREE.Color('#ff3200');
const _colorIdle = new THREE.Color('#8e95a3');
const _tubeActiveColor = new THREE.Color('#ff3200');
const _tubeIdleColor = new THREE.Color('#272932');
const _tubeActiveEmissive = new THREE.Color('#ff3200');
const _tubeIdleEmissive = new THREE.Color('#000000');

function detectSoftwareWebGL(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export default function InteractiveIsometric3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pinRefs = useRef<Record<NodeId, HTMLButtonElement | null>>({
    'legacy-erp': null,
    'security-gate': null,
    'ai-agent-layer': null,
    'telemetry-3d': null,
    'gtm-pipeline': null
  });

  const [selectedNodeId, setSelectedNodeId] = useState<NodeId>('ai-agent-layer');
  const [hoveredNodeId, setHoveredNodeId] = useState<NodeId | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [exploded, setExploded] = useState<boolean>(false);
  const [blueprintMode, setBlueprintMode] = useState<boolean>(false);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);
  const [inspectorTab, setInspectorTab] = useState<'specs' | 'contract'>('specs');
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);

  // Refs synced into the WebGL loop so React state changes never recreate the canvas
  const selectedRef = useRef<NodeId>(selectedNodeId);
  const hoveredRef = useRef<NodeId | null>(hoveredNodeId);
  const explodedRef = useRef<boolean>(exploded);
  const blueprintRef = useRef<boolean>(blueprintMode);
  const cameraGoalRef = useRef<{
    pos: THREE.Vector3;
    target: THREE.Vector3;
    active: boolean;
  }>({
    pos: new THREE.Vector3(...CAMERA_PRESETS.isometric.pos),
    target: new THREE.Vector3(...CAMERA_PRESETS.isometric.target),
    active: false
  });

  useEffect(() => {
    selectedRef.current = selectedNodeId;
  }, [selectedNodeId]);

  useEffect(() => {
    hoveredRef.current = hoveredNodeId;
  }, [hoveredNodeId]);

  useEffect(() => {
    explodedRef.current = exploded;
  }, [exploded]);

  useEffect(() => {
    blueprintRef.current = blueprintMode;
  }, [blueprintMode]);

  const triggerCameraPreset = (preset: Exclude<CameraPreset, 'focus'>) => {
    setCameraPreset(preset);
    const cfg = CAMERA_PRESETS[preset];
    cameraGoalRef.current.pos.set(...cfg.pos);
    cameraGoalRef.current.target.set(...cfg.target);
    cameraGoalRef.current.active = true;
  };

  const focusOnNode = (id: NodeId) => {
    const spec = ARCH_NODES.find((n) => n.id === id);
    if (!spec) return;
    setSelectedNodeId(id);
    setCameraPreset('focus');
    cameraGoalRef.current.pos.set(...spec.focusCamera.pos);
    cameraGoalRef.current.target.set(...spec.focusCamera.target);
    cameraGoalRef.current.active = true;
  };

  // Keyboard shortcut 'H' for Zen / Cinema mode dock toggle
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'h' || e.key === 'H') {
        setDockCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const handleContextRestored = () => {
      setWebglUnavailable(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    // Scene, Fog & Studio RoomEnvironment
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060608');
    scene.fog = new THREE.FogExp2('#060608', 0.022);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // Low-FOV Telephoto Isometric Camera with Full Orbit Freedom
    const camera = new THREE.PerspectiveCamera(
      30,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      140
    );
    camera.position.set(...CAMERA_PRESETS.isometric.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.isometric.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 6.5;
    controls.maxDistance = 26;
    controls.minPolarAngle = 0.24;
    controls.maxPolarAngle = Math.PI / 2.22;
    controls.update();

    controls.addEventListener('start', () => {
      cameraGoalRef.current.active = false;
    });

    // Balanced 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight('#c4d8ff', '#16161d', 0.9);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#fff2e4', 2.45);
    keyLight.position.set(11, 17, 9);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -11;
      keyLight.shadow.camera.right = 11;
      keyLight.shadow.camera.top = 11;
      keyLight.shadow.camera.bottom = -11;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#ff4d24', 1.45);
    rimLight.position.set(-11, 8, -10);
    scene.add(rimLight);

    // Disposable Resource Tracker
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const tracker = {
      trackGeo: <T extends THREE.BufferGeometry>(g: T): T => {
        geometries.push(g);
        return g;
      },
      trackMat: <T extends THREE.Material>(m: T): T => {
        materials.push(m);
        return m;
      },
      trackTex: <T extends THREE.Texture>(t: T): T => {
        textures.push(t);
        return t;
      }
    };

    // Build Composite Procedural Architecture Nodes
    const handles = buildArchitectureScene(
      scene,
      renderer,
      isSoftwareGl,
      selectedRef.current,
      tracker
    );

    // Build Route-Aware Conduit Pathways & Instanced Animated Data Packets
    interface ConduitRecord {
      from: NodeId;
      to: NodeId;
      curve: THREE.CatmullRomCurve3;
      material: THREE.MeshStandardMaterial;
    }

    const conduits: ConduitRecord[] = CONDUIT_ROUTES.map((route) => {
      const a = ARCH_NODES.find((n) => n.id === route.from)!;
      const b = ARCH_NODES.find((n) => n.id === route.to)!;
      const start = new THREE.Vector3(a.position[0], 0.2, a.position[2]);
      const end = new THREE.Vector3(b.position[0], 0.2, b.position[2]);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      mid.y = route.archHeight;
      const curve = new THREE.CatmullRomCurve3([start, mid, end]);

      const tubeMat = tracker.trackMat(
        new THREE.MeshStandardMaterial({
          color: '#272932',
          emissive: '#000000',
          emissiveIntensity: 0.45,
          roughness: 0.36,
          metalness: 0.78
        })
      );
      const tube = new THREE.Mesh(
        tracker.trackGeo(new THREE.TubeGeometry(curve, 28, 0.048, 8, false)),
        tubeMat
      );
      scene.add(tube);

      return { from: route.from, to: route.to, curve, material: tubeMat };
    });

    const packetsPerCurve = 4;
    const totalPackets = conduits.length * packetsPerCurve;
    const packetMat = tracker.trackMat(
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#ff3200',
        emissiveIntensity: 0.55,
        roughness: 0.2,
        metalness: 0.1
      })
    );
    const packetMesh = new THREE.InstancedMesh(
      tracker.trackGeo(new THREE.OctahedronGeometry(0.095, 0)),
      packetMat,
      totalPackets
    );
    packetMesh.frustumCulled = false;
    scene.add(packetMesh);

    // Throttled Raycasting for Hover, Click, and Double-Click Focus
    const raycaster = new THREE.Raycaster();
    let lastHoverCheck = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;

    const getHitNodeId = (clientX: number, clientY: number): NodeId | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      _pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(_pointer, camera);
      const hits = raycaster.intersectObjects(handles.raycastProxies, false);
      if (hits.length > 0 && hits[0].object.userData.nodeId) {
        return hits[0].object.userData.nodeId as NodeId;
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastHoverCheck < 50) return;
      lastHoverCheck = now;
      const hit = getHitNodeId(e.clientX, e.clientY);
      renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
      if (hoveredRef.current !== hit) {
        hoveredRef.current = hit;
        setHoveredNodeId(hit);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownX = e.clientX;
      pointerDownY = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
      if (dist > 6) return;
      const hit = getHitNodeId(e.clientX, e.clientY);
      if (hit) {
        setSelectedNodeId(hit);
      }
    };

    const onDoubleClick = (e: MouseEvent) => {
      const hit = getHitNodeId(e.clientX, e.clientY);
      if (hit) {
        focusOnNode(hit);
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('dblclick', onDoubleClick);

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Animation Loop (paced via afterDraw on software WebGL, rAF on hardware GPU)
    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();
    let elapsed = 0;
    let explodeLerp = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;

      const now = performance.now();
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      elapsed += delta;

      // 1. Smooth Exploded Layer Damping
      const targetExplode = explodedRef.current ? 1 : 0;
      explodeLerp = THREE.MathUtils.damp(explodeLerp, targetExplode, 5.5, delta);
      for (let i = 0; i < handles.explodableParts.length; i++) {
        const p = handles.explodableParts[i];
        p.mesh.position.y = p.baseY + p.explodeOffset * explodeLerp;
      }

      // 2. Smooth Camera Transition (canceled immediately on manual drag)
      if (cameraGoalRef.current.active) {
        camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraGoalRef.current.pos.x, 5.2, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraGoalRef.current.pos.y, 5.2, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraGoalRef.current.pos.z, 5.2, delta);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, cameraGoalRef.current.target.x, 5.2, delta);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, cameraGoalRef.current.target.y, 5.2, delta);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, cameraGoalRef.current.target.z, 5.2, delta);

        if (
          camera.position.distanceTo(cameraGoalRef.current.pos) < 0.04 &&
          controls.target.distanceTo(cameraGoalRef.current.target) < 0.04
        ) {
          cameraGoalRef.current.active = false;
        }
      }

      // 3. Mechanical & Kinetic Choreography
      if (handles.turbineGroup) {
        handles.turbineGroup.rotation.y += delta * 0.95;
      }
      if (handles.coreCrown) {
        handles.coreCrown.rotation.y += delta * 0.72;
        handles.coreCrown.rotation.x = Math.sin(elapsed * 1.5) * 0.16;
      }
      if (handles.outerGyroRing) {
        handles.outerGyroRing.rotation.z += delta * 0.45;
      }
      if (handles.innerGyroRing) {
        handles.innerGyroRing.rotation.z -= delta * 0.75;
        handles.innerGyroRing.rotation.y += delta * 0.35;
      }
      if (handles.securityScanner) {
        handles.securityScanner.position.y = 1.25 + Math.sin(elapsed * 2.1) * 0.62;
      }

      // 4. Selection Halos, Hover Lift & Blueprint Edge Overlays
      const activeId = selectedRef.current;
      const hoverId = hoveredRef.current;
      const showAllBlueprint = blueprintRef.current;

      for (let i = 0; i < ARCH_NODES.length; i++) {
        const node = ARCH_NODES[i];
        const id = node.id;
        const isActive = id === activeId;
        const isHover = id === hoverId;

        const halo = handles.nodeHalos[id];
        const haloMat = halo.material as THREE.MeshBasicMaterial;
        const targetOpacity = isActive ? 0.95 : isHover ? 0.55 : 0.14;
        haloMat.opacity = THREE.MathUtils.damp(haloMat.opacity, targetOpacity, 8, delta);

        const group = handles.nodeGroups[id];
        const targetY = isActive ? 0.16 : isHover ? 0.07 : 0;
        group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 7.5, delta);

        const wires = handles.nodeWireframes[id];
        if (wires) {
          const targetWireOpacity = showAllBlueprint
            ? isActive
              ? 0.9
              : 0.42
            : isActive
              ? 0.55
              : isHover
                ? 0.32
                : 0.0;
          for (let w = 0; w < wires.length; w++) {
            const lm = wires[w].material as THREE.LineBasicMaterial;
            lm.opacity = THREE.MathUtils.damp(lm.opacity, targetWireOpacity, 8, delta);
          }
        }
      }

      // 5. Highlight Conduits Connected to Active Node & Animate Instanced Data Packets
      let instanceIdx = 0;
      for (let c = 0; c < conduits.length; c++) {
        const conduit = conduits[c];
        const isConnected = conduit.from === activeId || conduit.to === activeId;

        conduit.material.color.lerp(isConnected ? _tubeActiveColor : _tubeIdleColor, Math.min(1, delta * 7));
        conduit.material.emissive.lerp(
          isConnected ? _tubeActiveEmissive : _tubeIdleEmissive,
          Math.min(1, delta * 7)
        );

        const speed = isConnected ? 0.42 : 0.18;
        const scaleVal = isConnected ? 1.2 : 0.72;
        _packetScale.setScalar(scaleVal);

        for (let p = 0; p < packetsPerCurve; p++) {
          const t = (elapsed * speed + p / packetsPerCurve + c * 0.19) % 1;
          conduit.curve.getPointAt(t, _packetPos);
          _packetPos.y += 0.06;
          _packetQuat.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, elapsed * 2 + p);
          _packetMat.compose(_packetPos, _packetQuat, _packetScale);
          packetMesh.setMatrixAt(instanceIdx, _packetMat);
          packetMesh.setColorAt(instanceIdx, isConnected ? _colorActive : _colorIdle);
          instanceIdx++;
        }
      }
      packetMesh.instanceMatrix.needsUpdate = true;
      if (packetMesh.instanceColor) packetMesh.instanceColor.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);

      // 6. Project 3D Node Anchors to 2D Canvas Pins (Direct DOM Transform, Zero React Renders)
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      for (let i = 0; i < ARCH_NODES.length; i++) {
        const node = ARCH_NODES[i];
        const pinEl = pinRefs.current[node.id];
        if (!pinEl) continue;

        const grp = handles.nodeGroups[node.id];
        _projVec.set(
          node.position[0],
          grp.position.y + node.labelHeight + explodeLerp * 1.15,
          node.position[2]
        );
        _projVec.project(camera);

        const visible = _projVec.z < 1 && _projVec.x > -1.05 && _projVec.x < 1.05 && _projVec.y > -1.05 && _projVec.y < 1.05;
        if (!visible) {
          pinEl.style.opacity = '0';
          pinEl.style.pointerEvents = 'none';
        } else {
          const sx = (_projVec.x * 0.5 + 0.5) * cw;
          const sy = (-_projVec.y * 0.5 + 0.5) * ch;
          pinEl.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -100%)`;
          pinEl.style.opacity = '1';
          pinEl.style.pointerEvents = 'auto';
        }
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('dblclick', onDoubleClick);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      controls.dispose();
      envTarget.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeSpec = ARCH_NODES.find((n) => n.id === selectedNodeId) || ARCH_NODES[2];
  const ActiveIcon = activeSpec.icon;

  const getNodeById = (id: NodeId) => ARCH_NODES.find((n) => n.id === id);

  return (
    <section
      id="live-3d-architecture"
      className="py-20 sm:py-28 bg-[#060608] border-b border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold text-accent uppercase tracking-[0.25em] mb-4">
              <Box size={14} className="text-accent" />
              <span>Interactive 3D WebGL Architecture · Proof Over Claims</span>
            </div>
            <h2 className="font-sans font-black text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.9] text-white text-balance">
              INSPECT THE <br />
              <span className="text-white/25">PRODUCTION</span>{' '}
              <span className="text-accent">STACK IN 3D</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-md font-light leading-relaxed">
            Orbit the isometric topology, explode architectural sub-layers, or click any module — from Legacy ERP to the AI Agent Layer and GTM Pipeline — to inspect data flows and system contracts.
          </p>
        </div>

        {/* Unobstructed 3D Viewport Container */}
        <div className="relative border-2 sm:border-4 border-white bg-[#060608] shadow-[10px_10px_0px_#ff3200] mb-6 overflow-hidden">
          {/* Top-Left Minimal Spec Label (Outside center focal area) */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-[#0a0a0d] border border-white/20 px-3.5 py-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
              Interactive Isometric Topology
            </div>
            <div className="font-mono text-[10px] text-white/70">
              Drag to orbit · Click module for specs · Double-click to focus
            </div>
          </div>

          {/* Dedicated Isolated Canvas Mount or Graceful Fallback */}
          {webglUnavailable ? (
            <div className="relative h-[460px] sm:h-[560px] w-full bg-[#0a0a0a]">
              <img
                src="/src/assets/images/iso_crossing_chasm_1795560790001.jpg"
                alt="Isometric Enterprise AI Architecture Model"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[600px]">
              <div
                ref={mountRef}
                className="w-full h-full touch-none"
                aria-label="Interactive 3D Isometric Enterprise Architecture Model"
              />

              {/* 3D-Projected Interactive Architectural Node Pins (Hidden in Zen/Cinema mode) */}
              <div
                className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-200 ${
                  dockCollapsed ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {ARCH_NODES.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  const isHovered = node.id === hoveredNodeId;
                  return (
                    <button
                      key={node.id}
                      ref={(el) => {
                        pinRefs.current[node.id] = el;
                      }}
                      type="button"
                      onClick={() => setSelectedNodeId(node.id)}
                      onDoubleClick={() => focusOnNode(node.id)}
                      className={`absolute top-0 left-0 z-10 px-2.5 py-1 border font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-accent text-white border-white shadow-[3px_3px_0px_#ffffff]'
                          : isHovered
                            ? 'bg-white text-black border-white'
                            : 'bg-[#0b0b0f]/95 text-white/90 border-white/30 hover:border-accent hover:text-white'
                      }`}
                      style={{ opacity: 0 }}
                    >
                      <span className={isSelected ? 'text-white/80 mr-1.5' : 'text-accent mr-1.5'}>
                        {node.index}
                      </span>
                      <span>{node.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Unified Collapsible Bottom Control Dock (Zero Viewport Occlusion, No backdrop-blur) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[960px] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setDockCollapsed((c) => !c)}
              className="bg-[#0b0b0e] border border-white/25 border-b-0 px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white/80 hover:text-accent transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {dockCollapsed ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              <span>{dockCollapsed ? 'Show Controls (H)' : 'Hide Controls (H)'}</span>
            </button>

            {!dockCollapsed && (
              <div className="w-full bg-[#0b0b0e] border-2 border-white/25 px-3 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                {/* Node Quick-Select Buttons */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {ARCH_NODES.map((node) => {
                    const isSelected = node.id === selectedNodeId;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-accent text-white border-accent'
                            : 'bg-white/[0.04] text-white/80 border-white/15 hover:border-white/50 hover:text-white'
                        }`}
                      >
                        {node.index}. {node.shortLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Structural Modes & Camera Presets */}
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setExploded((prev) => !prev)}
                    className={`px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                      exploded
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.04] text-white/80 border-white/20 hover:border-white'
                    }`}
                  >
                    <Layers size={12} />
                    <span>{exploded ? 'Collapse' : 'Explode'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBlueprintMode((prev) => !prev)}
                    className={`px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                      blueprintMode
                        ? 'bg-accent text-white border-accent'
                        : 'bg-white/[0.04] text-white/80 border-white/20 hover:border-white'
                    }`}
                  >
                    <Grid size={12} />
                    <span>Blueprint</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => focusOnNode(selectedNodeId)}
                    className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition-colors inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer ${
                      cameraPreset === 'focus'
                        ? 'border-accent text-accent bg-accent/10 font-bold'
                        : 'border-white/15 text-white/70 hover:text-white'
                    }`}
                  >
                    <Crosshair size={12} />
                    <span>Focus</span>
                  </button>

                  {(['isometric', 'top', 'profile'] as Exclude<CameraPreset, 'focus'>[]).map(
                    (preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => triggerCameraPreset(preset)}
                        className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          cameraPreset === preset
                            ? 'border-accent text-accent bg-accent/10 font-bold'
                            : 'border-white/15 text-white/60 hover:text-white'
                        }`}
                      >
                        {preset === 'isometric' ? 'Iso' : preset === 'top' ? 'Top' : 'Side'}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setExploded(false);
                      setBlueprintMode(false);
                      triggerCameraPreset('isometric');
                    }}
                    aria-label="Reset 3D View"
                    title="Reset 3D View"
                    className="p-1.5 border border-white/20 text-white/70 hover:text-white hover:border-white transition-colors cursor-pointer"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Node Technical Inspection Panel (Cleanly Below Canvas, Zero Viewport Overlap) */}
        <div className="border-2 border-white/15 bg-[#0c0c10] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left: Node Identity, Architecture Summary & Interactive Topology Links */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-accent text-white flex items-center justify-center shrink-0">
                  <ActiveIcon size={20} />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
                    Module {activeSpec.index} · {activeSpec.category}
                  </div>
                  <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                    {activeSpec.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => focusOnNode(activeSpec.id)}
                className="px-3 py-1.5 border border-white/20 font-mono text-[10px] font-bold uppercase tracking-wider text-white/80 hover:border-accent hover:text-accent transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Crosshair size={12} />
                <span>Zoom To Module</span>
              </button>
            </div>

            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light">
              {activeSpec.summary}
            </p>

            {/* Unboxed Technical Stack Typography */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-white/75">
              {activeSpec.stack.map((tech, idx) => (
                <span key={tech} className="inline-flex items-center gap-3">
                  <span className="text-white font-semibold">{tech}</span>
                  {idx < activeSpec.stack.length - 1 && (
                    <span className="text-accent" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>

            {/* Interactive Connected Nodes (Upstream / Downstream Navigation) */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mb-2">
                  Upstream Inputs
                </div>
                {activeSpec.upstream.length === 0 ? (
                  <div className="font-mono text-xs text-white/50">Origin System of Record</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {activeSpec.upstream.map((upId) => {
                      const target = getNodeById(upId);
                      if (!target) return null;
                      return (
                        <button
                          key={upId}
                          type="button"
                          onClick={() => setSelectedNodeId(upId)}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/15 hover:border-accent text-white/85 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
                        >
                          {target.index}. {target.shortLabel}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/45 mb-2">
                  Downstream Outputs
                </div>
                {activeSpec.downstream.length === 0 ? (
                  <div className="font-mono text-xs text-white/50">Commercial Revenue Output</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {activeSpec.downstream.map((downId) => {
                      const target = getNodeById(downId);
                      if (!target) return null;
                      return (
                        <button
                          key={downId}
                          type="button"
                          onClick={() => setSelectedNodeId(downId)}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/15 hover:border-accent text-white/85 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
                        >
                          {target.index}. {target.shortLabel}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Tabbed Technical Specs & Live JSON Event Contract */}
          <div className="lg:col-span-6 space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-5 lg:pt-0 lg:pl-8">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setInspectorTab('specs')}
                  className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    inspectorTab === 'specs'
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white/65 border-white/15 hover:text-white'
                  }`}
                >
                  <BarChart3 size={12} />
                  <span>Production Specs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInspectorTab('contract')}
                  className={`px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider border transition-colors inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    inspectorTab === 'contract'
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white/65 border-white/15 hover:text-white'
                  }`}
                >
                  <Code2 size={12} />
                  <span>Payload Contract</span>
                </button>
              </div>

              <span className="font-mono text-[10px] text-white/45 hidden sm:inline">
                {activeSpec.deploymentPattern}
              </span>
            </div>

            {inspectorTab === 'specs' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black border border-white/10 p-3.5">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-white/45 mb-1">
                      Target Performance
                    </div>
                    <div className="font-sans font-black text-base sm:text-lg text-accent tabular-nums">
                      {activeSpec.latency}
                    </div>
                  </div>
                  <div className="bg-black border border-white/10 p-3.5">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-white/45 mb-1">
                      Production Capacity
                    </div>
                    <div className="font-sans font-black text-sm sm:text-base text-white tabular-nums">
                      {activeSpec.throughput}
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 p-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/45 font-bold mb-1">
                    Verified Client Proof
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed">
                    {activeSpec.clientProof}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-black border border-white/15 p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2.5">
                  {activeSpec.contractTitle}
                </div>
                <pre className="font-mono text-xs text-white/85 leading-relaxed overflow-x-auto tabular-nums">
                  <code>{activeSpec.contractPayload}</code>
                </pre>
              </div>
            )}

            <Link
              to="/audit"
              className="w-full py-3.5 px-5 bg-white hover:bg-accent text-black hover:text-white font-mono text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-between"
            >
              <span>Map This Architecture To Your Stack</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
