import * as THREE from 'three';
import { ARCH_NODES, NodeId } from './architectureData';

export interface ExplodablePart {
  mesh: THREE.Object3D;
  baseY: number;
  explodeOffset: number;
}

export interface BuiltSceneHandles {
  nodeGroups: Record<NodeId, THREE.Group>;
  nodeHalos: Record<NodeId, THREE.Mesh>;
  nodeWireframes: Record<NodeId, THREE.LineSegments[]>;
  raycastProxies: THREE.Mesh[];
  explodableParts: ExplodablePart[];
  turbineGroup: THREE.Group | null;
  coreCrown: THREE.Mesh | null;
  innerGyroRing: THREE.Mesh | null;
  outerGyroRing: THREE.Mesh | null;
  securityScanner: THREE.Mesh | null;
  gtmPulseBars: THREE.Mesh[];
}

export interface ResourceTracker {
  trackGeo: <T extends THREE.BufferGeometry>(g: T) => T;
  trackMat: <T extends THREE.Material>(m: T) => T;
  trackTex: <T extends THREE.Texture>(t: T) => T;
}

export function createArchitecturalGridTexture(
  renderer: THREE.WebGLRenderer,
  trackTex: ResourceTracker['trackTex']
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, size, size);

    // Fine drafting grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= size; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    // Major architectural datum lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.11)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i <= size; i += 128) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    // Precision vermilion registration ticks at datum intersections
    ctx.fillStyle = 'rgba(255, 50, 0, 0.55)';
    for (let x = 0; x <= size; x += 128) {
      for (let y = 0; y <= size; y += 128) {
        ctx.fillRect(x - 6, y - 1, 12, 2);
        ctx.fillRect(x - 1, y - 6, 2, 12);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return trackTex(texture);
}

export function createRackDetailTexture(
  renderer: THREE.WebGLRenderer,
  trackTex: ResourceTracker['trackTex']
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#14151a';
    ctx.fillRect(0, 0, size, size);

    // Horizontal brushed metal louver slots
    for (let y = 12; y < size; y += 20) {
      ctx.fillStyle = '#0a0b0e';
      ctx.fillRect(14, y, size - 28, 7);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(14, y + 7, size - 28, 1);

      // Tiny recessed indicator slits
      ctx.fillStyle = y % 60 === 12 ? '#ff3200' : 'rgba(255,255,255,0.22)';
      ctx.fillRect(20, y + 2, 10, 3);
    }

    // Precision frame border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 3;
    ctx.strokeRect(4, 4, size - 8, size - 8);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  return trackTex(tex);
}

export function createSoftShadowTexture(trackTex: ResourceTracker['trackTex']): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 8, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.78)');
    grad.addColorStop(0.58, 'rgba(0, 0, 0, 0.28)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return trackTex(tex);
}

function createBeveledPlateGeometry(
  width: number,
  depth: number,
  height: number,
  bevel: number,
  trackGeo: ResourceTracker['trackGeo']
): THREE.ExtrudeGeometry {
  const hw = width / 2;
  const hd = depth / 2;
  const r = Math.min(bevel * 2, hw * 0.25, hd * 0.25);

  const shape = new THREE.Shape();
  shape.moveTo(-hw + r, -hd);
  shape.lineTo(hw - r, -hd);
  shape.lineTo(hw, -hd + r);
  shape.lineTo(hw, hd - r);
  shape.lineTo(hw - r, hd);
  shape.lineTo(-hw + r, hd);
  shape.lineTo(-hw, hd - r);
  shape.lineTo(-hw, -hd + r);
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.04, height - bevel * 2),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 2
  });
  geo.rotateX(-Math.PI / 2);
  geo.center();
  return trackGeo(geo);
}

export function buildArchitectureScene(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  isSoftwareGl: boolean,
  initialSelected: NodeId,
  tracker: ResourceTracker
): BuiltSceneHandles {
  const { trackGeo, trackMat, trackTex } = tracker;

  const rackTex = createRackDetailTexture(renderer, trackTex);
  const gridTex = createArchitecturalGridTexture(renderer, trackTex);
  const shadowTex = createSoftShadowTexture(trackTex);

  // Curated High-Contrast Architectural PBR Material Library
  const matObsidian = trackMat(
    new THREE.MeshStandardMaterial({
      color: '#131419',
      roughness: 0.72,
      metalness: 0.18
    })
  );
  const matRackFace = trackMat(
    new THREE.MeshStandardMaterial({
      map: rackTex,
      roughness: 0.56,
      metalness: 0.35
    })
  );
  const matTitanium = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: '#3a404c',
      roughness: 0.22,
      metalness: 0.9,
      clearcoat: 0.4,
      clearcoatRoughness: 0.18
    })
  );
  const matBoneWhite = trackMat(
    new THREE.MeshStandardMaterial({
      color: '#f3f2ee',
      roughness: 0.48,
      metalness: 0.06
    })
  );
  const matAccent = trackMat(
    new THREE.MeshStandardMaterial({
      color: '#ff3200',
      emissive: '#ff3200',
      emissiveIntensity: 0.65,
      roughness: 0.26,
      metalness: 0.2
    })
  );
  const matGlassShroud = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: '#dce8ff',
      roughness: 0.08,
      metalness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.78,
      transparent: true,
      opacity: isSoftwareGl ? 0.22 : 0.92,
      ior: 1.5,
      thickness: 0.4,
      clearcoat: 1.0,
      depthWrite: false
    })
  );
  const matBlueprintEdge = trackMat(
    new THREE.LineBasicMaterial({
      color: '#ff3200',
      transparent: true,
      opacity: 0.0
    })
  );

  // Architectural Etched Floor Plinth
  const floorMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: gridTex,
      roughness: 0.88,
      metalness: 0.08
    })
  );
  const floor = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(42, 42)), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.025;
  floor.receiveShadow = true;
  scene.add(floor);

  const contactShadowMat = trackMat(
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.68
    })
  );

  const nodeGroups = {} as Record<NodeId, THREE.Group>;
  const nodeHalos = {} as Record<NodeId, THREE.Mesh>;
  const nodeWireframes = {} as Record<NodeId, THREE.LineSegments[]>;
  const raycastProxies: THREE.Mesh[] = [];
  const explodableParts: ExplodablePart[] = [];
  const gtmPulseBars: THREE.Mesh[] = [];

  let turbineGroup: THREE.Group | null = null;
  let coreCrown: THREE.Mesh | null = null;
  let innerGyroRing: THREE.Mesh | null = null;
  let outerGyroRing: THREE.Mesh | null = null;
  let securityScanner: THREE.Mesh | null = null;

  const attachBlueprintEdges = (id: NodeId, mesh: THREE.Mesh) => {
    const edges = trackGeo(new THREE.EdgesGeometry(mesh.geometry, 24));
    const lineMat = trackMat(matBlueprintEdge.clone());
    const segs = new THREE.LineSegments(edges, lineMat);
    segs.scale.setScalar(1.003);
    mesh.add(segs);
    if (!nodeWireframes[id]) nodeWireframes[id] = [];
    nodeWireframes[id].push(segs);
  };

  const addShadowPlane = (parent: THREE.Group, scaleX: number, scaleZ: number) => {
    const plane = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(scaleX, scaleZ)), contactShadowMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0.005;
    parent.add(plane);
  };

  const addSelectionHalo = (parent: THREE.Group, id: NodeId, radius: number) => {
    const haloMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: '#ff3200',
        transparent: true,
        opacity: id === initialSelected ? 0.92 : 0.16,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      })
    );
    const halo = new THREE.Mesh(trackGeo(new THREE.RingGeometry(radius, radius + 0.085, 40)), haloMat);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = 0.025;
    parent.add(halo);

    // Subtle outer hairline datum ring
    const outerMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide
      })
    );
    const outer = new THREE.Mesh(
      trackGeo(new THREE.RingGeometry(radius + 0.16, radius + 0.185, 40)),
      outerMat
    );
    outer.rotation.x = -Math.PI / 2;
    outer.position.y = 0.02;
    parent.add(outer);

    nodeHalos[id] = halo;
  };

  const addProxy = (parent: THREE.Group, id: NodeId, w: number, h: number, d: number) => {
    const proxyMat = trackMat(new THREE.MeshBasicMaterial({ visible: false }));
    const proxy = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(w, h, d)), proxyMat);
    proxy.position.y = h / 2;
    proxy.userData.nodeId = id;
    parent.add(proxy);
    raycastProxies.push(proxy);
  };

  // =========================================================================
  // 01. LEGACY ERP & CORE DATABASES (9-Part Beveled Brutalist Rack Monolith)
  // =========================================================================
  {
    const spec = ARCH_NODES[0];
    const g = new THREE.Group();
    g.position.set(...spec.position);
    addShadowPlane(g, 3.3, 3.3);
    addSelectionHalo(g, spec.id, 1.48);

    const plinth = new THREE.Mesh(createBeveledPlateGeometry(2.25, 2.25, 0.3, 0.05, trackGeo), matObsidian);
    plinth.position.y = 0.15;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    g.add(plinth);
    attachBlueprintEdges(spec.id, plinth);

    // Three stacked beveled database tiers with louver rack texture
    for (let i = 0; i < 3; i++) {
      const dim = 1.72 - i * 0.14;
      const tier = new THREE.Mesh(
        createBeveledPlateGeometry(dim, dim, 0.36, 0.04, trackGeo),
        i === 1 ? matTitanium : matRackFace
      );
      const y = 0.54 + i * 0.45;
      tier.position.y = y;
      tier.castShadow = true;
      tier.receiveShadow = true;
      g.add(tier);
      attachBlueprintEdges(spec.id, tier);
      explodableParts.push({ mesh: tier, baseY: y, explodeOffset: (i + 1) * 0.42 });
    }

    // Bone-white architectural datum cap with recessed vermilion strip
    const cap = new THREE.Mesh(createBeveledPlateGeometry(1.18, 1.18, 0.15, 0.03, trackGeo), matBoneWhite);
    cap.position.y = 1.76;
    cap.castShadow = true;
    g.add(cap);
    attachBlueprintEdges(spec.id, cap);
    explodableParts.push({ mesh: cap, baseY: 1.76, explodeOffset: 1.62 });

    // Dual vertical CDC bus rails
    const busGeo = trackGeo(new THREE.BoxGeometry(0.12, 1.52, 0.12));
    const busA = new THREE.Mesh(busGeo, matAccent);
    busA.position.set(0.72, 0.96, 0.72);
    g.add(busA);

    const busB = new THREE.Mesh(busGeo, matTitanium);
    busB.position.set(-0.72, 0.96, -0.72);
    g.add(busB);

    addProxy(g, spec.id, 2.5, 2.35, 2.5);
    scene.add(g);
    nodeGroups[spec.id] = g;
  }

  // =========================================================================
  // 02. POPIA & SOVEREIGN SECURITY GATE (9-Part Chamfered Inspection Portal)
  // =========================================================================
  {
    const spec = ARCH_NODES[1];
    const g = new THREE.Group();
    g.position.set(...spec.position);
    g.rotation.y = Math.PI / 5;
    addShadowPlane(g, 3.1, 2.6);
    addSelectionHalo(g, spec.id, 1.38);

    const plinth = new THREE.Mesh(createBeveledPlateGeometry(2.35, 1.32, 0.24, 0.04, trackGeo), matObsidian);
    plinth.position.y = 0.12;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    g.add(plinth);
    attachBlueprintEdges(spec.id, plinth);

    const pillarGeo = trackGeo(new THREE.BoxGeometry(0.38, 1.98, 0.58));
    const leftPillar = new THREE.Mesh(pillarGeo, matBoneWhite);
    leftPillar.position.set(-0.78, 1.21, 0);
    leftPillar.castShadow = true;
    g.add(leftPillar);
    attachBlueprintEdges(spec.id, leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, matBoneWhite);
    rightPillar.position.set(0.78, 1.21, 0);
    rightPillar.castShadow = true;
    g.add(rightPillar);
    attachBlueprintEdges(spec.id, rightPillar);

    // Titanium reinforcement fins on pillars
    const finGeo = trackGeo(new THREE.BoxGeometry(0.08, 1.68, 0.68));
    const leftFin = new THREE.Mesh(finGeo, matTitanium);
    leftFin.position.set(-0.98, 1.2, 0);
    g.add(leftFin);

    const rightFin = new THREE.Mesh(finGeo, matTitanium);
    rightFin.position.set(0.98, 1.2, 0);
    g.add(rightFin);

    // Heavy beveled lintel
    const lintel = new THREE.Mesh(createBeveledPlateGeometry(2.12, 0.68, 0.34, 0.04, trackGeo), matBoneWhite);
    lintel.position.set(0, 2.32, 0);
    lintel.castShadow = true;
    g.add(lintel);
    attachBlueprintEdges(spec.id, lintel);
    explodableParts.push({ mesh: lintel, baseY: 2.32, explodeOffset: 1.0 });

    // Moving vertical inspection laser bar
    const scanner = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.16, 0.055, 0.09)), matAccent);
    scanner.position.set(0, 1.25, 0);
    g.add(scanner);
    securityScanner = scanner;

    // Translucent policy containment pane inside portal
    const glassPane = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(1.14, 1.72, 0.06)), matGlassShroud);
    glassPane.position.set(0, 1.25, 0);
    glassPane.renderOrder = 3;
    g.add(glassPane);
    explodableParts.push({ mesh: glassPane, baseY: 1.25, explodeOffset: 0.45 });

    const shieldCore = new THREE.Mesh(trackGeo(new THREE.OctahedronGeometry(0.32, 0)), matTitanium);
    shieldCore.position.set(0, 1.25, 0);
    shieldCore.castShadow = true;
    g.add(shieldCore);
    explodableParts.push({ mesh: shieldCore, baseY: 1.25, explodeOffset: 0.45 });

    addProxy(g, spec.id, 2.5, 2.7, 1.7);
    scene.add(g);
    nodeGroups[spec.id] = g;
  }

  // =========================================================================
  // 03. AI AGENT LAYER (Centerpiece 11-Part Neural Monolith + Glass Shroud)
  // =========================================================================
  {
    const spec = ARCH_NODES[2];
    const g = new THREE.Group();
    g.position.set(...spec.position);
    addShadowPlane(g, 4.2, 4.2);
    addSelectionHalo(g, spec.id, 1.85);

    const baseOct = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(1.54, 1.72, 0.36, 8)), matObsidian);
    baseOct.position.y = 0.18;
    baseOct.castShadow = true;
    baseOct.receiveShadow = true;
    g.add(baseOct);
    attachBlueprintEdges(spec.id, baseOct);

    const collar = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(1.18, 1.32, 0.48, 8)), matTitanium);
    collar.position.y = 0.6;
    collar.castShadow = true;
    g.add(collar);
    attachBlueprintEdges(spec.id, collar);
    explodableParts.push({ mesh: collar, baseY: 0.6, explodeOffset: 0.4 });

    // Four corner architectural heat-sink pylons
    const pylonGeo = trackGeo(new THREE.BoxGeometry(0.24, 1.62, 0.24));
    const offsets: [number, number][] = [
      [0.84, 0.84],
      [-0.84, 0.84],
      [0.84, -0.84],
      [-0.84, -0.84]
    ];
    offsets.forEach(([ox, oz]) => {
      const pylon = new THREE.Mesh(pylonGeo, matObsidian);
      pylon.position.set(ox, 1.56, oz);
      pylon.castShadow = true;
      g.add(pylon);
      explodableParts.push({ mesh: pylon, baseY: 1.56, explodeOffset: 0.85 });
    });

    // Inner bone-white computational core
    const whiteCore = new THREE.Mesh(trackGeo(new THREE.BoxGeometry(0.92, 1.78, 0.92)), matBoneWhite);
    whiteCore.position.y = 1.72;
    whiteCore.rotation.y = Math.PI / 4;
    whiteCore.castShadow = true;
    g.add(whiteCore);
    attachBlueprintEdges(spec.id, whiteCore);
    explodableParts.push({ mesh: whiteCore, baseY: 1.72, explodeOffset: 1.15 });

    // Optical glass containment shroud around the neural core
    const shroud = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(1.06, 1.06, 1.64, 8)), matGlassShroud);
    shroud.position.y = 1.72;
    shroud.renderOrder = 4;
    g.add(shroud);
    explodableParts.push({ mesh: shroud, baseY: 1.72, explodeOffset: 1.35 });

    // Counter-rotating gyroscopic inference rings
    const outerRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(1.26, 0.052, 12, 56)), matAccent);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = 1.64;
    g.add(outerRing);
    outerGyroRing = outerRing;
    explodableParts.push({ mesh: outerRing, baseY: 1.64, explodeOffset: 1.2 });

    const innerRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(1.02, 0.032, 10, 48)), matTitanium);
    innerRing.rotation.x = Math.PI / 2.4;
    innerRing.position.y = 2.02;
    g.add(innerRing);
    innerGyroRing = innerRing;
    explodableParts.push({ mesh: innerRing, baseY: 2.02, explodeOffset: 1.5 });

    // Floating vermilion neural kernel crown
    const crown = new THREE.Mesh(trackGeo(new THREE.OctahedronGeometry(0.48, 0)), matAccent);
    crown.position.y = 3.12;
    crown.castShadow = true;
    g.add(crown);
    attachBlueprintEdges(spec.id, crown);
    coreCrown = crown;
    explodableParts.push({ mesh: crown, baseY: 3.12, explodeOffset: 1.9 });

    addProxy(g, spec.id, 3.2, 3.8, 3.2);
    scene.add(g);
    nodeGroups[spec.id] = g;
  }

  // =========================================================================
  // 04. USER-FACING APPS & 3D STUDIO (Composite Spatial Turbine + UI Panes)
  // =========================================================================
  {
    const spec = ARCH_NODES[3];
    const g = new THREE.Group();
    g.position.set(...spec.position);
    addShadowPlane(g, 3.2, 3.2);
    addSelectionHalo(g, spec.id, 1.44);

    const plinth = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(1.18, 1.32, 0.3, 28)), matObsidian);
    plinth.position.y = 0.15;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    g.add(plinth);
    attachBlueprintEdges(spec.id, plinth);

    const rotorGroup = new THREE.Group();
    rotorGroup.position.y = 0.74;
    const hub = new THREE.Mesh(trackGeo(new THREE.CylinderGeometry(0.34, 0.38, 0.62, 18)), matTitanium);
    hub.castShadow = true;
    rotorGroup.add(hub);

    const bladeGeo = trackGeo(new THREE.BoxGeometry(0.11, 0.44, 0.88));
    for (let i = 0; i < 8; i++) {
      const blade = new THREE.Mesh(bladeGeo, i % 2 === 0 ? matTitanium : matObsidian);
      const angle = (i / 8) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.58, 0, Math.sin(angle) * 0.58);
      blade.rotation.y = -angle + 0.35;
      blade.castShadow = true;
      rotorGroup.add(blade);
    }
    g.add(rotorGroup);
    turbineGroup = rotorGroup;
    explodableParts.push({ mesh: rotorGroup, baseY: 0.74, explodeOffset: 0.6 });

    // Layered floating spatial UI/viewport planes
    const panesGroup = new THREE.Group();
    panesGroup.position.y = 1.72;
    for (let i = -1; i <= 1; i++) {
      const isCenter = i === 0;
      const pane = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(isCenter ? 1.48 : 1.24, isCenter ? 0.68 : 0.52, 0.055)),
        isCenter ? matBoneWhite : matGlassShroud
      );
      pane.position.set(0, isCenter ? 0.08 : 0, i * 0.36);
      pane.castShadow = isCenter;
      if (!isCenter) pane.renderOrder = 3;
      panesGroup.add(pane);
      if (isCenter) attachBlueprintEdges(spec.id, pane);
    }
    g.add(panesGroup);
    explodableParts.push({ mesh: panesGroup, baseY: 1.72, explodeOffset: 1.45 });

    const telRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(0.98, 0.036, 10, 44)), matAccent);
    telRing.rotation.x = Math.PI / 2.6;
    telRing.position.y = 1.28;
    g.add(telRing);
    explodableParts.push({ mesh: telRing, baseY: 1.28, explodeOffset: 1.0 });

    addProxy(g, spec.id, 2.6, 2.55, 2.6);
    scene.add(g);
    nodeGroups[spec.id] = g;
  }

  // =========================================================================
  // 05. GTM PIPELINE & REVENUE ENGINE (Ascending Architectural Velocity Bars)
  // =========================================================================
  {
    const spec = ARCH_NODES[4];
    const g = new THREE.Group();
    g.position.set(...spec.position);
    addShadowPlane(g, 3.3, 2.8);
    addSelectionHalo(g, spec.id, 1.48);

    const base = new THREE.Mesh(createBeveledPlateGeometry(2.34, 1.66, 0.24, 0.04, trackGeo), matObsidian);
    base.position.y = 0.12;
    base.castShadow = true;
    base.receiveShadow = true;
    g.add(base);
    attachBlueprintEdges(spec.id, base);

    const heights = [0.62, 1.06, 1.54, 2.12];
    heights.forEach((h, idx) => {
      const x = -0.76 + idx * 0.51;
      const bar = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(0.38, h, 1.0)),
        idx === 3 ? matTitanium : idx === 1 ? matRackFace : matObsidian
      );
      bar.position.set(x, 0.24 + h / 2, 0);
      bar.castShadow = true;
      bar.receiveShadow = true;
      g.add(bar);
      attachBlueprintEdges(spec.id, bar);
      gtmPulseBars.push(bar);

      const cap = new THREE.Mesh(
        createBeveledPlateGeometry(0.4, 1.02, 0.11, 0.02, trackGeo),
        idx === 3 ? matAccent : matBoneWhite
      );
      const capY = 0.24 + h + 0.06;
      cap.position.set(x, capY, 0);
      cap.castShadow = true;
      g.add(cap);
      explodableParts.push({ mesh: cap, baseY: capY, explodeOffset: 0.45 + idx * 0.28 });
    });

    addProxy(g, spec.id, 2.6, 2.65, 2.1);
    scene.add(g);
    nodeGroups[spec.id] = g;
  }

  return {
    nodeGroups,
    nodeHalos,
    nodeWireframes,
    raycastProxies,
    explodableParts,
    turbineGroup,
    coreCrown,
    innerGyroRing,
    outerGyroRing,
    securityScanner,
    gtmPulseBars
  };
}
