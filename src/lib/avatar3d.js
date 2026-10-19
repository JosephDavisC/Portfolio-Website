// Joseph's clay avatar, built from three.js geometry only (no addons), so the same file
// runs in the viewer (CDN three), the export script (local three) and a Remotion video.
// Approach follows the Merek Studio "Bean" mascot: lathes, ellipsoids and tubes in a
// matte clay material. Units: the head is roughly 1 unit in radius, centred on y = 0.

export const AVATAR_COLORS = {
  skin: '#F5D2BC',
  hair: '#2A221E',
  ink: '#1A1512',
  blush: '#F2A99A',
  lip: '#C9766A',
};

export function createAvatar(THREE, opts = {}) {
  const C = AVATAR_COLORS;
  const clay = (color, extra = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.82, metalness: 0, ...extra });
  const M = {
    skin: clay(C.skin, { roughness: 0.86, sheen: 0.4, sheenRoughness: 0.8, sheenColor: new THREE.Color('#FFE6D6') }),
    hair: clay(C.hair, { roughness: 0.62, sheen: 1, sheenRoughness: 0.5, sheenColor: new THREE.Color('#6B5A50'), side: THREE.DoubleSide }),
    eye: clay(C.ink, { roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.4 }),
    white: clay('#FFFFFF', { roughness: 0.5 }),
    feature: clay(C.ink, { roughness: 0.6, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }),
    blush: clay(C.blush, { roughness: 0.9, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
  };
  for (const [k, m] of Object.entries(M)) m.name = 'avatar-' + k;

  const root = new THREE.Group(); root.name = 'Avatar';
  const headG = new THREE.Group(); headG.name = 'head'; root.add(headG);
  const mesh = (geo, mat, name) => { const m = new THREE.Mesh(geo, mat); m.name = name; m.castShadow = true; return m; };

  // ---- head: a soft ellipsoid, a touch wider than tall, like the 2D chibis ----
  const HA = 1.0, HB = 0.94, HC = 0.93;
  const headGeo = new THREE.SphereGeometry(1, 72, 54); headGeo.scale(HA, HB, HC);
  headG.add(mesh(headGeo, M.skin, 'head-skin'));

  // point on the head surface (front hemisphere) and its normal, from x, y
  const onHead = (x, y, lift = 0) => {
    const dx = x / HA, dy = y / HB;
    const z = HC * Math.sqrt(Math.max(0.02, 1 - dx * dx - dy * dy));
    const n = new THREE.Vector3(x / (HA * HA), y / (HB * HB), z / (HC * HC)).normalize();
    return { p: new THREE.Vector3(x, y, z).addScaledVector(n, lift), n };
  };
  const orient = (obj, n) => obj.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);

  // ears: flattened ellipsoids half sunk into the sides
  for (const s of [-1, 1]) {
    const ear = mesh(new THREE.SphereGeometry(1, 28, 20), M.skin, s < 0 ? 'ear-left' : 'ear-right');
    ear.scale.set(0.11, 0.19, 0.12); ear.position.set(s * 0.97, -0.1, -0.04); headG.add(ear);
  }

  // ---- face features, all laid on the head surface ----
  const faceG = new THREE.Group(); faceG.name = 'face'; headG.add(faceG);
  const stroke = (pts2d, r, mat = M.feature) => {
    const g = new THREE.Group();
    const pts = pts2d.map(([x, y]) => onHead(x, y, 0.004).p);
    g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, r, 10, false), mat, 'stroke'));
    for (const p of [pts[0], pts[pts.length - 1]]) { const c = mesh(new THREE.SphereGeometry(r, 12, 8), mat, 'cap'); c.position.copy(p); g.add(c); }
    return g;
  };
  const quad = (a, c, b, n = 14) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]; });
  const fill = (outline, mat, lift = 0.004) => {
    const geo = new THREE.ShapeGeometry(new THREE.Shape(outline.map(([x, y]) => new THREE.Vector2(x, y))), 20);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) { const q = onHead(pos.getX(i), pos.getY(i), lift).p; pos.setXYZ(i, q.x, q.y, q.z); }
    geo.computeVertexNormals();
    return mesh(geo, mat, 'fill');
  };
  const ellipse = (cx, cy, rx, ry, n = 36) => Array.from({ length: n }, (_, i) => [cx + rx * Math.cos((i / n) * Math.PI * 2), cy + ry * Math.sin((i / n) * Math.PI * 2)]);
  const eye = (x, y, r) => {
    const g = new THREE.Group(); g.name = 'eye';
    const { p, n } = onHead(x, y, 0);
    const dome = mesh(new THREE.SphereGeometry(1, 24, 16), M.eye, 'eye-ink'); dome.scale.set(r, r * 1.08, r * 0.55); g.add(dome);
    const hl = mesh(new THREE.SphereGeometry(1, 12, 8), M.white, 'eye-light'); const hr = r * 0.32;
    hl.scale.set(hr, hr, hr * 0.5); hl.position.set(r * 0.32, r * 0.38, r * 0.5); g.add(hl);
    g.position.copy(p); orient(g, n);
    return g;
  };

  const EX = 0.33, EY = -0.16, ER = 0.082;
  const faces = {};
  function buildFace(expr) {
    const g = new THREE.Group(); g.name = 'face-' + expr;
    if (expr === 'happy') {
      // closed, upturned eyes like the coffee chibi
      for (const cx of [-EX, EX]) g.add(stroke(quad([cx - 0.09, EY - 0.02], [cx, EY + 0.08], [cx + 0.09, EY - 0.02]), 0.016));
      g.add(fill(quad([-0.12, -0.44], [0, -0.62], [0.12, -0.44]), M.feature));
    } else {
      for (const cx of [-EX, EX]) g.add(eye(cx, EY, ER));
      // calm closed-lip smile
      g.add(stroke(quad([-0.075, -0.47], [0, -0.52], [0.075, -0.47]), 0.013));
    }
    // soft brows, mostly tucked under the fringe
    for (const s of [-1, 1]) g.add(stroke(quad([s * 0.2, 0.04], [s * 0.31, 0.075], [s * 0.42, 0.05]), 0.014));
    // blush
    for (const s of [-1, 1]) {
      const { p, n } = onHead(s * 0.53, -0.36, -0.012);
      const b = mesh(new THREE.SphereGeometry(1, 28, 14), M.blush, 'blush'); b.scale.set(0.12, 0.066, 0.02);
      b.position.copy(p); orient(b, n); g.add(b);
    }
    g.visible = false; faceG.add(g);
    return g;
  }
  faces.main = buildFace('main');
  faces.happy = buildFace('happy');

  // ---- hair: a two-block cut with a 40/60 part ----
  // Two-block = short, close-cropped sides and back (the undercut), with a longer top
  // layer that overhangs them in a visible step. The part sits off centre on the viewer's
  // left: the smaller 40 side falls toward the left temple, the 60 side sweeps across the
  // forehead to the right. Angles: theta from the crown (0) down, phi 0 = facing camera,
  // positive phi = viewer's right.
  const hairG = new THREE.Group(); hairG.name = 'hair'; headG.add(hairG);
  M.hairShort = clay('#4C433D', { roughness: 0.9, sheen: 0.5, sheenRoughness: 0.8, sheenColor: new THREE.Color('#5E534C') });
  M.hairShort.name = 'avatar-hair-short';
  const deg = Math.PI / 180;
  const surf = (theta, phi, r) => new THREE.Vector3(r * HA * Math.sin(theta) * Math.sin(phi), r * HB * Math.cos(theta), r * HC * Math.sin(theta) * Math.cos(phi));
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  // limits as functions of phi, blended front / side / back with cosines
  const byDir = (front, side, back) => (phi) => { const c = Math.cos(phi); return c >= 0 ? side + (front - side) * Math.pow(c, 1.2) : side + (back - side) * Math.pow(-c, 1.0); };
  // a shell between two theta limits, built as a grid so its edges follow the limits exactly
  const shell = (tStart, tEnd, rFn, U = 192, V = 48, name, mat) => {
    const pos = [], idx = [];
    for (let i = 0; i <= U; i++) {
      const phi = (i / U) * Math.PI * 2 - Math.PI;
      for (let j = 0; j <= V; j++) {
        const f = j / V, th = tStart(phi) + (tEnd(phi) - tStart(phi)) * f;
        const p = surf(th, phi, rFn(f, phi)); pos.push(p.x, p.y, p.z);
      }
    }
    for (let i = 0; i < U; i++) for (let j = 0; j < V; j++) {
      const a = i * (V + 1) + j, b = a + V + 1;
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    const m = mesh(g, mat, name); hairG.add(m); return m;
  };
  const LEDGE = byDir(0.30 * Math.PI, 0.40 * Math.PI, 0.47 * Math.PI);   // where the top layer ends
  const UNDER = byDir(0.31 * Math.PI, 0.49 * Math.PI, 0.73 * Math.PI);   // where the undercut ends
  // 1) undercut: a thin crop hugging the skin from just above the ledge down to the nape
  shell((phi) => LEDGE(phi) - 0.04, UNDER, (f) => 1.012 - 0.01 * smooth(0.85, 1, f), 192, 32, 'hair-undercut', M.hairShort);
  // 2) top layer: fuller on the crown, ending in a rounded overhang at the ledge
  const TOP_R = 1.085;
  const PUFF = 0.24; // volume on top: Joseph's hair is full and round, not flat
  shell(() => 0, LEDGE, (f) => TOP_R + PUFF * (1 - Math.pow(f, 1.6)) + 0.02, 192, 48, 'hair-top', M.hair);
  {
    const pts = [];
    for (let i = 0; i <= 140; i++) { const phi = (62 + (i / 140) * 236) * deg; pts.push(surf(LEDGE(phi), phi, TOP_R - 0.01)); }
    hairG.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 220, 0.026, 12, false), M.hair, 'hair-ledge'));
  }
  // 3) strands: flattened clay ribbons swept along the head surface, tapering to soft tips
  const strand = (name, pts, width, thick, lift = 0.0) => {
    const ctrl = pts.map(([th, ph, rr = 0]) => surf(th * Math.PI, ph * deg, TOP_R + 0.05 + PUFF * Math.max(0, 1 - Math.pow(th / 0.47, 1.6)) + lift + rr));
    const curve = new THREE.CatmullRomCurve3(ctrl, false, 'centripetal');
    const N = 48, S = 14, pos = [], idx = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, p = curve.getPoint(t), tan = curve.getTangent(t);
      const nrm = new THREE.Vector3(p.x / (HA * HA), p.y / (HB * HB), p.z / (HC * HC)).normalize();
      const bin = new THREE.Vector3().crossVectors(tan, nrm).normalize(); nrm.crossVectors(bin, tan).normalize();
      // full at the root, easing to a rounded tip
      const k = 1.5 * Math.pow(Math.sin(Math.min(1, (1 - t) * 1.6 + 0.02) * Math.PI / 2), 0.7) * (t < 0.06 ? Math.sqrt(t / 0.06) * 0.6 + 0.4 : 1);
      for (let j = 0; j <= S; j++) {
        const a = (j / S) * Math.PI * 2;
        const q = p.clone().addScaledVector(bin, Math.cos(a) * width * k).addScaledVector(nrm, Math.sin(a) * thick * k);
        pos.push(q.x, q.y, q.z);
      }
    }
    for (let i = 0; i < N; i++) for (let j = 0; j < S; j++) { const a = i * (S + 1) + j, b = a + S + 1; idx.push(a, b, a + 1, b, b + 1, a + 1); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    const m = mesh(g, M.hair, name); hairG.add(m); return m;
  };
  const PART = -22;
  // 60 side: from the part, sweeping right; the front ones fall diagonally across the forehead
  strand('fringe-60-a', [[0.10, PART + 8], [0.22, PART + 4], [0.33, 2], [0.42, 26, 0.06], [0.48, 44, 0.03]], 0.3, 0.085, 0.03);
  strand('fringe-60-b', [[0.08, PART + 24], [0.2, 6], [0.32, 24], [0.41, 48, 0.06], [0.46, 64, 0.03]], 0.3, 0.085, 0.025);
  strand('top-60-c', [[0.05, PART + 46], [0.17, 30], [0.29, 58], [0.38, 80, -0.02], [0.42, 92, -0.04]], 0.32, 0.085, 0.015);
  strand('top-60-d', [[0.05, 120], [0.17, 96], [0.3, 104], [0.4, 112, -0.03]], 0.32, 0.08, 0.005);
  strand('top-60-e', [[0.04, 70], [0.12, 62], [0.24, 80], [0.36, 98, -0.02]], 0.28, 0.08, 0.02);
  // 40 side: shorter, falling to the left temple
  strand('fringe-40-a', [[0.1, PART - 2], [0.22, PART - 10], [0.33, -34], [0.42, -46, 0.06], [0.47, -44, 0.03]], 0.26, 0.08, 0.025);
  strand('top-40-b', [[0.06, PART - 34], [0.18, -56], [0.3, -78], [0.39, -92, -0.03]], 0.3, 0.08, 0.01);
  strand('top-40-c', [[0.05, -120], [0.18, -112], [0.3, -118], [0.41, -124, -0.03]], 0.3, 0.075, 0.0);
  // crown and back: smoothed down toward the ledge
  strand('back-a', [[0.04, -160], [0.2, -158], [0.36, -162], [0.46, -166, -0.02]], 0.32, 0.07, -0.01);
  strand('back-b', [[0.04, 168], [0.2, 160], [0.36, 152], [0.46, 148, -0.02]], 0.32, 0.07, -0.01);
  strand('back-c', [[0.03, 140], [0.18, 132], [0.34, 132], [0.44, 134, -0.02]], 0.3, 0.07, 0.0);

  // ---- body: chibi proportions, ground at y = 0, head on top ----
  // Outfit B, matching Joseph's 2D chibis: blue jacket over a light tee, navy trousers, white sneakers.
  const OUT = { jacket: '#2F6DA6', rib: '#265A8A', tee: '#EEF1F4', pants: '#26314A', shoe: '#F4F2EE', sole: '#D8D2C8' };
  Object.assign(M, {
    jacket: clay(OUT.jacket, { roughness: 0.8, sheen: 0.6, sheenRoughness: 0.7, sheenColor: new THREE.Color('#7FA9D6') }),
    rib: clay(OUT.rib, { roughness: 0.9 }),
    tee: clay(OUT.tee, { roughness: 0.85 }),
    pants: clay(OUT.pants, { roughness: 0.88 }),
    shoe: clay(OUT.shoe, { roughness: 0.75 }),
    sole: clay(OUT.sole, { roughness: 0.9 }),
  });
  for (const k of ['jacket', 'rib', 'tee', 'pants', 'shoe', 'sole']) M[k].name = 'avatar-' + k;
  // head about 12% smaller than v3, bottom of the head kept at the same height
  const HEAD_S = 0.88, HEAD_Y = 1.34 + 0.94 * HEAD_S;
  headG.position.y = HEAD_Y; headG.scale.setScalar(HEAD_S);
  const bodyG = new THREE.Group(); bodyG.name = 'body'; root.add(bodyG);
  const DEPTH = 0.78;

  // torso: a lathe from hem to collar, squashed front to back
  const tprof = [[0.0001, 0.5], [0.46, 0.5], [0.53, 0.58], [0.56, 0.78], [0.55, 1.0], [0.5, 1.16], [0.36, 1.27], [0.2, 1.32], [0.0001, 1.33]].map(([r, y]) => new THREE.Vector2(r, y));
  const torsoGeo = new THREE.LatheGeometry(new THREE.SplineCurve(tprof).getPoints(48), 64); torsoGeo.scale(1, 1, DEPTH);
  torsoGeo.computeVertexNormals();
  bodyG.add(mesh(torsoGeo, M.jacket, 'jacket'));
  // the open front: the black tee showing between the jacket edges
  // a flat panel laid on the chest curve, wider at the collar like an open jacket
  {
    // fine grid so it follows the chest curve; half width eases from 0.1 at the hem to 0.14 at the collar
    const g = new THREE.PlaneGeometry(1, 1, 16, 48), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const u = p.getX(i), v = p.getY(i) + 0.5, y = 0.6 + v * 0.62;
      p.setXY(i, u * 2 * (0.1 + 0.04 * v * v), y);
    }
    const tpts = new THREE.SplineCurve(tprof).getPoints(400);
    const rAt = (y) => { let best = tpts[0]; for (const q of tpts) if (Math.abs(q.y - y) < Math.abs(best.y - y)) best = q; return best.x; };
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), r = rAt(y); p.setZ(i, DEPTH * Math.sqrt(Math.max(0.0001, r * r - x * x)) + 0.008); }
    g.computeVertexNormals();
    const tee = mesh(g, M.tee, 'tee'); tee.material = M.tee; bodyG.add(tee);
    // jacket front edges: rolled seams that follow the chest curve along the tee's border and
    // stop under the collar, instead of straight rods that stick out in profile
    for (const sx of [-1, 1]) {
      const pts = [];
      for (let k = 0; k <= 24; k++) {
        const v = k / 24, y = 0.6 + v * 0.6, x = sx * (0.1 + 0.04 * v * v + 0.012), r = rAt(y);
        pts.push(new THREE.Vector3(x, y, DEPTH * Math.sqrt(Math.max(0.0001, r * r - x * x)) + 0.012));
      }
      const edge = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, 0.026, 10, false), M.jacket, sx < 0 ? 'zip-left' : 'zip-right');
      bodyG.add(edge);
    }
  }
  // ribbed hem and stand collar, the bomber's signature
  const hem = mesh(new THREE.TorusGeometry(0.49, 0.055, 14, 64), M.rib, 'hem'); hem.rotation.x = Math.PI / 2; hem.scale.set(1, DEPTH, 1); hem.position.y = 0.56; bodyG.add(hem);
  const collar = mesh(new THREE.TorusGeometry(0.22, 0.065, 14, 48), M.rib, 'collar'); collar.rotation.x = Math.PI / 2 + 0.14; collar.scale.set(1, 0.85, 1); collar.position.set(0, 1.31, -0.02); bodyG.add(collar); // tilted: higher at the back, dipping at the front
  const neck = mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.4, 28), M.skin, 'neck'); neck.position.set(0, 1.42, -0.02); bodyG.add(neck);

  // legs and sneakers: a standing set and a sitting set (thighs forward, shins down)
  const standG = new THREE.Group(); standG.name = 'legs-standing'; bodyG.add(standG);
  const sitG = new THREE.Group(); sitG.name = 'legs-sitting'; bodyG.add(sitG);
  const sneaker = (g, x, z) => {
    const shoe = mesh(new THREE.SphereGeometry(1, 32, 20), M.shoe, 'shoe');
    shoe.scale.set(0.2, 0.12, 0.3); shoe.position.set(x, 0.11, z); g.add(shoe);
    const sole = mesh(new THREE.CylinderGeometry(1, 1, 1, 32), M.sole, 'sole');
    sole.scale.set(0.2, 0.04, 0.3); sole.position.set(x, 0.025, z); g.add(sole);
  };
  for (const sx of [-1, 1]) {
    const leg = mesh(new THREE.CapsuleGeometry(0.17, 0.26, 8, 20), M.pants, sx < 0 ? 'leg-left' : 'leg-right');
    leg.position.set(sx * 0.25, 0.36, 0); standG.add(leg);
    sneaker(standG, sx * 0.27, 0.08);
    const thigh = mesh(new THREE.CapsuleGeometry(0.17, 0.34, 8, 20), M.pants, 'thigh');
    thigh.rotation.x = Math.PI / 2; thigh.position.set(sx * 0.25, 0.52, 0.22); sitG.add(thigh);
    const shin = mesh(new THREE.CapsuleGeometry(0.15, 0.24, 8, 20), M.pants, 'shin');
    shin.position.set(sx * 0.25, 0.3, 0.5); sitG.add(shin);
    sneaker(sitG, sx * 0.26, 0.6);
  }
  // office chair, shown when sitting
  M.chair = clay('#3A3F4A', { roughness: 0.7 }); M.chair.name = 'avatar-chair';
  const chairG = new THREE.Group(); chairG.name = 'chair'; bodyG.add(chairG);
  {
    const seat = mesh(new THREE.CylinderGeometry(0.5, 0.48, 0.12, 40), M.chair, 'chair-seat'); seat.scale.z = 0.95; seat.position.set(0, 0.29, 0.08); chairG.add(seat);
    const back = mesh(new THREE.CapsuleGeometry(0.32, 0.36, 8, 24), M.chair, 'chair-back'); back.scale.z = 0.32; back.position.set(0, 0.95, -0.5); back.rotation.x = -0.1; chairG.add(back);
    const strut = mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 12), M.chair, 'chair-strut'); strut.position.set(0, 0.55, -0.44); strut.rotation.x = -0.25; chairG.add(strut);
    const post = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 16), M.chair, 'chair-post'); post.position.set(0, 0.13, 0.08); chairG.add(post);
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2;
      const leg = mesh(new THREE.CapsuleGeometry(0.035, 0.36, 4, 10), M.chair, 'chair-foot'); leg.rotation.z = Math.PI / 2; leg.rotation.y = a;
      leg.position.set(Math.cos(a) * 0.2, 0.04, 0.08 - Math.sin(a) * 0.2); chairG.add(leg);
    }
  }

  // arms: a jacket sleeve from shoulder to wrist, a ribbed cuff, a clay hand
  const mkArm = (name) => {
    const g = new THREE.Group(); g.name = name;
    const AR = 0.135;
    const sleeve = mesh(new THREE.CylinderGeometry(AR, AR * 1.05, 1, 24, 1, true), M.jacket, name + '-sleeve'); sleeve.geometry.translate(0, 0.5, 0);
    const shoulder = mesh(new THREE.SphereGeometry(AR * 1.05, 24, 16), M.jacket, name + '-shoulder');
    const cuff = mesh(new THREE.CylinderGeometry(AR * 1.02, AR * 1.02, 0.09, 24), M.rib, name + '-cuff');
    const hand = mesh(new THREE.SphereGeometry(AR * 0.95, 24, 16), M.skin, name + '-hand');
    g.add(sleeve, shoulder, cuff, hand); g.userData = { sleeve, cuff, hand };
    bodyG.add(g); return g;
  };
  const armL = mkArm('arm-left'), armR = mkArm('arm-right');
  const SH_L = new THREE.Vector3(-0.5, 1.13, 0), SH_R = new THREE.Vector3(0.5, 1.13, 0), UP = new THREE.Vector3(0, 1, 0);
  const setArm = (arm, sh, hand) => {
    arm.position.copy(sh);
    const d = new THREE.Vector3().subVectors(hand, sh), len = Math.max(d.length(), 0.01);
    arm.quaternion.setFromUnitVectors(UP, d.clone().normalize());
    const { sleeve, cuff, hand: h } = arm.userData;
    sleeve.scale.set(1, len - 0.14, 1); cuff.position.set(0, len - 0.12, 0); h.position.set(0, len, 0);
  };


  // ---- extras: headphones (like the headphone chibi) and a laptop at a small desk ----
  M.gear = clay('#3A3D44', { roughness: 0.6, sheen: 0.6, sheenRoughness: 0.6, sheenColor: new THREE.Color('#6A6F7A') }); M.gear.name = 'avatar-gear';
  M.cushion = clay('#2A2C31', { roughness: 0.9 }); M.cushion.name = 'avatar-cushion';
  const phonesG = new THREE.Group(); phonesG.name = 'headphones'; headG.add(phonesG);
  {
    const band = mesh(new THREE.TorusGeometry(1.2, 0.07, 14, 72, Math.PI), M.gear, 'headphones-band');
    band.scale.set(0.92, 1.12, 1); band.position.set(0, -0.08, -0.08); band.rotation.x = -0.12; phonesG.add(band);
    for (const sx of [-1, 1]) {
      const cup = mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.16, 32), M.gear, 'headphones-cup');
      cup.rotation.z = Math.PI / 2; cup.position.set(sx * 1.1, -0.12, -0.04); phonesG.add(cup);
      const pad = mesh(new THREE.TorusGeometry(0.19, 0.06, 12, 32), M.cushion, 'headphones-pad');
      pad.rotation.y = Math.PI / 2; pad.position.set(sx * 1.02, -0.12, -0.04); phonesG.add(pad);
      const cap = mesh(new THREE.SphereGeometry(0.25, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), M.gear, 'headphones-cap');
      cap.scale.set(1, 0.35, 1); cap.rotation.z = -sx * Math.PI / 2; cap.position.set(sx * 1.18, -0.12, -0.04); phonesG.add(cap);
    }
  }
  M.wood = clay('#D9A86C', { roughness: 0.85 }); M.wood.name = 'avatar-wood';
  M.metal = clay('#C9CDD3', { roughness: 0.5, metalness: 0.1 }); M.metal.name = 'avatar-laptop';
  M.screen = clay('#20242C', { roughness: 0.4, clearcoat: 0.5 }); M.screen.name = 'avatar-screen';
  let screenUI = null;
  const deskG = new THREE.Group(); deskG.name = 'desk'; root.add(deskG);
  {
    const box = (w, h, d, mat, name) => mesh(new THREE.BoxGeometry(w, h, d, 2, 2, 2), mat, name);
    const top = box(1.7, 0.08, 0.7, M.wood, 'desk-top'); top.position.set(0, 0.86, 0.72); deskG.add(top);
    for (const sx of [-1, 1]) for (const z of [0.45, 0.99]) { const leg = box(0.08, 0.82, 0.08, M.wood, 'desk-leg'); leg.position.set(sx * 0.76, 0.41, z); deskG.add(leg); }
    const base = box(0.78, 0.05, 0.5, M.metal, 'laptop-base'); base.position.set(0, 0.925, 0.7); deskG.add(base);
    const lidG = new THREE.Group(); lidG.position.set(0, 0.95, 0.95); lidG.rotation.x = -0.32; deskG.add(lidG);
    const lid = box(0.78, 0.52, 0.04, M.metal, 'laptop-lid'); lid.position.set(0, 0.26, 0); lidG.add(lid);
    const scr = box(0.7, 0.44, 0.01, M.screen, 'laptop-screen'); scr.position.set(0, 0.26, -0.025); lidG.add(scr);
    if (typeof document !== 'undefined') {
      // the side facing Joseph shows a little editor; drawn by api.drawScreen(progress)
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 320;
      const tex = new THREE.CanvasTexture(cv); if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.68, 0.42), new THREE.MeshBasicMaterial({ map: tex }));
      face.name = 'screen-ui'; face.rotation.y = Math.PI; face.position.set(0, 0.26, -0.032); face.userData.noExport = true; lidG.add(face);
      screenUI = { cv, tex };
    }
    const logo = mesh(new THREE.CircleGeometry(0.05, 24), clay('#AEB3BA'), 'laptop-logo'); logo.position.set(0, 0.28, 0.022); lidG.add(logo);
  }


  // ---- coffee: a takeaway cup like the coffee chibi's, held in the right hand ----
  M.cup = clay('#8A5A3B', { roughness: 0.85 }); M.cup.name = 'avatar-cup';
  M.sleeve = clay('#C9A27A', { roughness: 0.9 }); M.sleeve.name = 'avatar-sleeve';
  M.lid = clay('#F3EFE8', { roughness: 0.6 }); M.lid.name = 'avatar-lid';
  M.steam = new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true, opacity: 0.55, depthWrite: false }); M.steam.name = 'avatar-steam';
  const cupG = new THREE.Group(); cupG.name = 'coffee'; cupG.scale.setScalar(1.3); bodyG.add(cupG);
  {
    const body = mesh(new THREE.CylinderGeometry(0.15, 0.115, 0.4, 36), M.cup, 'cup-body'); cupG.add(body);
    const sleeve = mesh(new THREE.CylinderGeometry(0.143, 0.127, 0.16, 36), M.sleeve, 'cup-sleeve'); sleeve.position.y = -0.02; cupG.add(sleeve);
    const lid = mesh(new THREE.CylinderGeometry(0.155, 0.158, 0.05, 36), M.lid, 'cup-lid'); lid.position.y = 0.22; cupG.add(lid);
    const dome = mesh(new THREE.SphereGeometry(0.15, 32, 12, 0, Math.PI * 2, 0, Math.PI / 2), M.lid, 'cup-lid-top'); dome.scale.y = 0.3; dome.position.y = 0.245; cupG.add(dome);
    const sip = mesh(new THREE.SphereGeometry(0.03, 12, 8), M.cup, 'cup-sip'); sip.scale.set(1.4, 0.6, 0.8); sip.position.set(0, 0.285, 0.1); cupG.add(sip);
    // steam: three soft wisps, animated with state.steam (kept out of the glb)
    const wisps = [];
    for (let k = 0; k < 3; k++) {
      const pts = Array.from({ length: 8 }, (_, i) => new THREE.Vector3(0.05 * Math.sin(i * 1.3 + k * 2), i * 0.05, 0));
      const w = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.014, 8, false), M.steam, 'steam');
      w.castShadow = false; w.position.set((k - 1) * 0.06, 0.32, 0); w.userData.noExport = true; cupG.add(w); wisps.push(w);
    }
    cupG.userData.wisps = wisps;
  }

  // contact shadow (kept out of the glb export)
  if (opts.shadow !== false && typeof document !== 'undefined') {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128;
    const cx = cv.getContext('2d'); const gr = cx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, 'rgba(20,16,14,0.34)'); gr.addColorStop(0.55, 'rgba(20,16,14,0.14)'); gr.addColorStop(1, 'rgba(20,16,14,0)');
    cx.fillStyle = gr; cx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(cv); if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.6), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.002; shadow.name = 'contact-shadow'; shadow.userData.noExport = true;
    root.add(shadow);
  }

  // ---- poses: hand targets, a head tilt and turn, and a face ----
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const PRESETS = {
    neutral: { lh: V(-0.66, 0.62, 0.08), rh: V(0.66, 0.62, 0.08), tilt: 0, turn: 0, face: 'main' },
    wave: { lh: V(-0.66, 0.62, 0.08), rh: V(0.95, 1.85, 0.12), tilt: -5, turn: 6, face: 'main' },
    thinking: { lh: V(-0.3, 0.86, 0.42), rh: V(0.2, 1.48, 0.62), tilt: 8, turn: -6, face: 'main' },
    happy: { lh: V(-0.92, 1.55, 0.18), rh: V(0.92, 1.55, 0.18), tilt: -4, turn: 0, face: 'happy' },
    music: { lh: V(-0.62, 0.72, 0.3), rh: V(0.62, 0.72, 0.3), tilt: 8, turn: 0, face: 'happy', headphones: true },
    coffee: { lh: V(-0.66, 0.62, 0.08), rh: V(0.3, 0.98, 0.55), tilt: 0, turn: 0, face: 'main', cup: true },
    lost: { lh: V(-0.62, 2.05, 0.38), rh: V(0.62, 2.05, 0.38), tilt: 9, turn: -14, face: 'main' },
    desk: { lh: V(-0.22, 0.98, 0.62), rh: V(0.22, 0.98, 0.62), tilt: 0, turn: 0, nod: 10, face: 'main', desk: true, sit: true, cup: true, cupAt: V(0.62, 1.12, 0.6) },
    working: { lh: V(-0.22, 0.98, 0.62), rh: V(0.22, 0.98, 0.62), tilt: 0, turn: 0, nod: 10, face: 'main', desk: true },
  };
  const state = { pose: 'neutral', face: 'main', headphones: false, override: null, blink: 0, lift: 0, scale: 1, steam: 0 };
  function apply() {
    const p = Object.assign({}, PRESETS[state.pose] || PRESETS.neutral, state.override || {});
    setArm(armL, SH_L, p.lh); setArm(armR, SH_R, p.rh);
    headG.rotation.set((p.nod || 0) * Math.PI / 180, p.turn * Math.PI / 180, -p.tilt * Math.PI / 180);
    phonesG.visible = !!(p.headphones || state.headphones);
    deskG.visible = !!p.desk;
    standG.visible = !p.sit; sitG.visible = !!p.sit; chairG.visible = !!p.sit;
    // the cup sits in the right hand, tilting toward the mouth when sipping
    cupG.visible = !!p.cup;
    if (p.cup) {
      if (p.cupAt) cupG.position.copy(p.cupAt); else cupG.position.copy(p.rh).add(new THREE.Vector3(-0.04, 0.12, 0.1));
      cupG.rotation.set(-(p.cupTilt || 0), 0, 0.08); cupG.scale.setScalar(1.3);
      cupG.userData.wisps.forEach((w, k) => { w.visible = !p.cupTilt || p.cupTilt < 0.2; w.material.opacity = 0.45 + 0.15 * Math.sin(state.steam * 2 + k); w.position.x = (k - 1) * 0.06 + 0.02 * Math.sin(state.steam * 3 + k * 2); w.scale.y = 0.9 + 0.2 * Math.sin(state.steam * 2.5 + k); });
    }
    root.position.y = state.lift; root.scale.setScalar(state.scale);
    // blink: squash the eye domes of whichever open-eyed face is showing
    faceG.traverse((o) => { if (o.name === 'eye') o.scale.y = Math.max(0.08, 1 - state.blink); });
    for (const [k, g] of Object.entries(faces)) g.visible = k === p.face;
  }
  function pose(name) { state.pose = PRESETS[name] ? name : 'neutral'; apply(); return api; }
  const CODE = [
    [['#C792EA', 'const '], ['#82AAFF', 'brew'], ['#E6EDF3', ' = '], ['#F78C6C', 'await '], ['#82AAFF', 'coffee'], ['#E6EDF3', '();']],
    [['#C792EA', 'if '], ['#E6EDF3', '(brew.'], ['#82AAFF', 'warm'], ['#E6EDF3', ') {']],
    [['#E6EDF3', '  '], ['#82AAFF', 'ship'], ['#E6EDF3', '('], ['#C3E88D', "'portfolio'"], ['#E6EDF3', ');']],
    [['#E6EDF3', '}']],
    [['#546E7A', '// one more sip, then deploy']],
    [['#82AAFF', 'deploy'], ['#E6EDF3', '({ '], ['#E6EDF3', 'site: '], ['#C3E88D', "'joechamdani.com'"], ['#E6EDF3', ' });']],
  ];
  function drawScreen(progress) {
    if (!screenUI) return;
    const { cv, tex } = screenUI, c = cv.getContext('2d');
    c.fillStyle = '#141B2D'; c.fillRect(0, 0, 512, 320);
    c.fillStyle = '#1C2540'; c.fillRect(0, 0, 512, 34);
    ['#F87171', '#FBBF24', '#34D399'].forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.arc(22 + i * 22, 17, 7, 0, Math.PI * 2); c.fill(); });
    c.font = 'bold 22px ui-monospace, Menlo, monospace';
    const total = CODE.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0), 0);
    let left = Math.floor(total * Math.min(1, Math.max(0, progress))), y = 74;
    for (const line of CODE) {
      let x = 20;
      for (const [col, t] of line) { if (left <= 0) break; const part = t.slice(0, left); left -= part.length; c.fillStyle = col; c.fillText(part, x, y); x += c.measureText(part).width; }
      if (left <= 0) { if (Math.floor(Date.now() / 1) % 2 === 0 || true) { c.fillStyle = '#60A5FA'; c.fillRect(x + 2, y - 20, 11, 24); } break; }
      y += 40;
    }
    tex.needsUpdate = true;
  }
  function set(partial) { Object.assign(state, partial); apply(); return api; }
  const api = { group: root, pose, set, drawScreen, state, presets: PRESETS, materials: M };
  pose('neutral');
  return api;
}
