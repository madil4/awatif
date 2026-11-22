/* Awatif model -> UI content. Classic script, no dependencies. Exposes window.AwatifUI.
 *
 * It turns an Awatif `Model` (points, lines, polygons, loadCases, loadCombinations and the component-entry
 * fields) into the data the design-system components expect, so every app lists and inspects a model the
 * same way (see references/brand-book.md, "Data model to UI").
 *
 *   AwatifUI.buildTree(model)               -> nodes for <TreeView>
 *   AwatifUI.inspector(model, itemId)       -> { title, sub, groups } for the inspector <PropertyGrid>
 *   AwatifUI.loadSelectionOptions(model)    -> grouped options for the toolbar <Select>
 *   AwatifUI.parseId(itemId)                -> what a tree id refers to
 *
 * Tree ids: point-<n>, line-<n>, polygon-<n>, case-<name>, combo-<name>, <field>-<index> for component entries.
 */
(function () {
  var TEMPLATE_NAMES = {
    'line-mesh': 'Line mesh', 'triangle-mesh': 'Triangle mesh',
    'point-load': 'Point load', 'distributed-load': 'Distributed load',
    'point-support': 'Point support', 'releases': 'Releases', 'local-axes': 'Local axes', 'imperfections': 'Imperfections',
    'load-case': 'Load case', 'load-combination': 'Load combination', 'grid-system': 'Grid system',
    'generic-member': 'Generic frame', 'generic-shell': 'Generic shell',
    'concrete-member': 'Concrete frame', 'steel-member': 'Steel frame', 'timber-member': 'Timber frame'
  };

  /* what a template's `geometry` ids refer to */
  var GEOMETRY_KIND = {
    'point-load': 'Points', 'point-support': 'Points',
    'distributed-load': 'Lines', 'releases': 'Lines', 'local-axes': 'Lines', 'imperfections': 'Lines', 'line-mesh': 'Lines',
    'generic-member': 'Lines', 'concrete-member': 'Lines', 'steel-member': 'Lines', 'timber-member': 'Lines',
    'triangle-mesh': 'Polygons', 'generic-shell': 'Polygons'
  };

  /* units as the data model states them; never convert */
  var UNITS = {
    w: 'kN/m', Fx: 'kN', Fy: 'kN', Fz: 'kN', Mx: 'kN·m', My: 'kN·m', Mz: 'kN·m',
    width: 'mm', depth: 'mm', cover: 'mm', thickness: 'mm', steelArea: 'mm²', stirrupArea: 'mm²/m',
    elasticity: 'MPa', shearModulus: 'MPa', area: 'cm²', momentInertiaY: 'cm⁴', momentInertiaZ: 'cm⁴', torsionalConstant: 'cm⁴',
    theta0: 'rad', angle: '°'
  };

  var LABELS = {
    momentInertiaY: 'Moment of inertia Y', momentInertiaZ: 'Moment of inertia Z', torsionalConstant: 'Torsional constant',
    theta0: 'θ₀', bowRatioDenominator: 'Bow ratio denominator', globalInclination: 'Global inclination', localBow: 'Local bow'
  };

  function range(prefix, nums) { return nums.map(function (n) { return prefix + ' ' + n; }); }
  var IPE = [80, 100, 120, 140, 160, 180, 200, 220, 240, 270, 300, 330, 360, 400, 450, 500, 550, 600];
  var HA = [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 400, 450, 500, 550, 600];

  /* fixed value lists, keyed templateId.param */
  var ENUMS = {
    'distributed-load.direction': ['local-y', 'local-z', 'global-x', 'global-y', 'global-z'],
    'point-support.type': ['fixed', 'pinned', 'x-roller', 'y-roller', 'z-roller'],
    'releases.type': ['both-ends', 'start', 'end'],
    'imperfections.direction': ['y-positive', 'y-negative', 'z-positive', 'z-negative'],
    'concrete-member.concreteGrade': ['C12', 'C16', 'C20', 'C25', 'C30', 'C35', 'C40', 'C45', 'C50', 'C55', 'C60', 'C70', 'C80', 'C90'],
    'steel-member.steelGrade': ['S235', 'S275', 'S355', 'S460'],
    'steel-member.profile': range('IPE', IPE).concat(range('HEA', HA), range('HEB', HA)),
    'timber-member.timberClass': ['C14', 'C16', 'C18', 'C20', 'C22', 'C24', 'C27', 'C30', 'C35', 'C40', 'C45', 'C50', 'GL24h', 'GL28h', 'GL32h'],
    'timber-member.serviceClass': ['1', '2', '3'],
    'timber-member.loadDurationClass': ['permanent', 'long-term', 'medium-term', 'short-term', 'instantaneous']
  };

  var COMPONENT_FIELDS = [
    ['gridLines', 'Grid lines'], ['loads', 'Loads'], ['supports', 'Supports'], ['releases', 'Releases'],
    ['localAxes', 'Local axes'], ['imperfections', 'Imperfections'], ['mesh', 'Mesh'], ['design', 'Design']
  ];

  function templateName(id) { return TEMPLATE_NAMES[id] || id; }

  /* "local-z" -> "Local z"; leave grades and profiles ("C30", "IPE 300") alone */
  function humanize(v) {
    v = String(v);
    return /^[a-z]/.test(v) ? v.replace(/-/g, ' ').replace(/^./, function (c) { return c.toUpperCase(); }) : v;
  }

  function paramLabel(key) {
    if (LABELS[key]) return LABELS[key];
    if (key.length <= 3) return key;
    var s = key.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/\?$/, '');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* Ided<T>: Map | [id, T][] | T[]  ->  [[id, T], ...] */
  function entries(ided) {
    if (!ided) return [];
    if (Object.prototype.toString.call(ided) === '[object Map]') return Array.from(ided.entries());
    var pairs = ided.length > 0 && ided.every(function (e) { return Array.isArray(e) && e.length === 2 && typeof e[0] === 'number' && Array.isArray(e[1]); });
    return pairs ? ided.slice() : ided.map(function (e, i) { return [i + 1, e]; });
  }

  function lookup(ided, id) {
    var found = entries(ided).filter(function (e) { return String(e[0]) === String(id); })[0];
    return found ? found[1] : null;
  }

  function fixed(n, d) { return Number(n).toFixed(d == null ? 2 : d); }

  /* [1, 3, 5, 6, 7, 8] -> "1, 3, 5–8" */
  function formatIds(ids) {
    var s = (ids || []).slice().sort(function (a, b) { return a - b; }).filter(function (v, i, a) { return i === 0 || a[i - 1] !== v; });
    var out = [];
    for (var i = 0; i < s.length; i++) {
      var j = i;
      while (j + 1 < s.length && s[j + 1] === s[j] + 1) j++;
      out.push(j - i >= 2 ? s[i] + '–' + s[j] : j > i ? s[i] + ', ' + s[j] : String(s[i]));
      i = j;
    }
    return out.join(', ');
  }

  /* ---------- tree ---------- */
  function buildTree(model) {
    model = model || {};
    var groups = [];
    var pts = entries(model.points), lns = entries(model.lines), pgs = entries(model.polygons);
    var geo = [];
    function sub(id, label, list, kind) {
      if (list.length) geo.push({ id: id, label: label, meta: list.length, children: list.map(function (e) { return { id: kind + '-' + e[0], label: humanize(kind) + ' ' + e[0] }; }) });
    }
    sub('points', 'Points', pts, 'point'); sub('lines', 'Lines', lns, 'line'); sub('polygons', 'Polygons', pgs, 'polygon');
    if (geo.length) groups.push({ id: 'geometry', label: 'Geometry', group: true, children: geo });

    var cases = model.loadCases || [];
    if (cases.length) groups.push({ id: 'loadCases', label: 'Load cases', group: true, children: cases.map(function (n) { return { id: 'case-' + n, label: n }; }) });
    var combos = model.loadCombinations || [];
    if (combos.length) groups.push({ id: 'loadCombinations', label: 'Load combinations', group: true, children: combos.map(function (c) { return { id: 'combo-' + c.name, label: c.name }; }) });

    COMPONENT_FIELDS.forEach(function (f) {
      var list = model[f[0]] || [];
      if (list.length) groups.push({ id: f[0], label: f[1], group: true, children: list.map(function (e, i) { return { id: f[0] + '-' + i, label: e.name, meta: templateName(e.templateId) }; }) });
    });
    return groups;
  }

  /* ---------- inspector ---------- */
  function ro(label, value, unit) { return { label: label, value: value, unit: unit, numeric: unit != null }; }

  function paramRow(entry, key, value) {
    var unit = UNITS[key];
    var enumKey = entry.templateId + '.' + key;
    if (typeof value === 'boolean') return { label: paramLabel(key), value: value, control: 'checkbox', key: key };
    if (ENUMS[enumKey]) {
      return { label: paramLabel(key), value: String(value), control: 'select', key: key,
        options: ENUMS[enumKey].map(function (v) { return { value: v, label: humanize(v) }; }) };
    }
    if (typeof value === 'number') return { label: paramLabel(key), value: String(value), unit: unit, numeric: true, control: 'input', key: key };
    return { label: paramLabel(key), value: String(value), unit: unit, control: 'input', key: key };
  }

  function entryInspector(model, field, entry) {
    var groups = [];
    var assign = [];
    var kind = GEOMETRY_KIND[entry.templateId];
    // The entry's geometry ids, editable as a list ("1, 3, 5-8")
    if (kind) assign.push({ label: kind, value: formatIds(entry.geometry), control: 'input', key: '__geometry', placeholder: 'None, e.g. 1, 3, 5-8' });
    if (field === 'loads') assign.push({ label: 'Load case', value: entry.loadCase || (model.loadCases || [])[0] || '', control: 'select', key: 'loadCase', options: (model.loadCases || []).map(function (n) { return { value: n, label: n }; }) });
    if (assign.length) groups.push({ title: 'Assignment', rows: assign });

    if (entry.templateId === 'grid-system' && entry.params) {
      ['x', 'y', 'z'].forEach(function (axis) {
        var lines = entry.params[axis] || [];
        if (lines.length) groups.push({ title: axis.toUpperCase(), rows: lines.map(function (g) { return ro(g.id, fixed(g.ordinate), 'm'); }) });
      });
    } else {
      var rows = Object.keys(entry.params || {}).map(function (k) { return paramRow(entry, k, entry.params[k]); });
      if (rows.length) groups.push({ title: 'Parameters', rows: rows });
    }
    return { title: entry.name, sub: templateName(entry.templateId), groups: groups };
  }

  function parseId(id) {
    var m;
    if ((m = /^(point|line|polygon)-(\d+)$/.exec(id))) return { kind: m[1], id: Number(m[2]) };
    if ((m = /^case-(.*)$/.exec(id))) return { kind: 'case', name: m[1] };
    if ((m = /^combo-(.*)$/.exec(id))) return { kind: 'combo', name: m[1] };
    if ((m = /^([A-Za-z]+)-(\d+)$/.exec(id))) return { kind: 'entry', field: m[1], index: Number(m[2]) };
    return null;
  }

  function inspector(model, id) {
    model = model || {};
    var p = parseId(id);
    var empty = { title: 'Nothing selected', sub: 'Select an item in the model tree.', groups: [] };
    if (!p) return empty;
    var pos = function (n) { return lookup(model.points, n); };
    if (p.kind === 'point') {
      var pt = pos(p.id); if (!pt) return empty;
      return { title: 'Point ' + p.id, sub: 'Geometry point', groups: [{ title: 'Geometry', rows: [ro('x', fixed(pt[0]), 'm'), ro('y', fixed(pt[1]), 'm'), ro('z', fixed(pt[2]), 'm')] }] };
    }
    if (p.kind === 'line') {
      var ln = lookup(model.lines, p.id); if (!ln) return empty;
      var a = pos(ln[0]), b = pos(ln[1]);
      var len = a && b ? Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)) : null;
      var rows = [ro('Start point', String(ln[0])), ro('End point', String(ln[1]))];
      if (len != null) rows.push(ro('Length', fixed(len), 'm'));
      return { title: 'Line ' + p.id, sub: 'Geometry line', groups: [{ title: 'Geometry', rows: rows }] };
    }
    if (p.kind === 'polygon') {
      var pg = lookup(model.polygons, p.id); if (!pg) return empty;
      return { title: 'Polygon ' + p.id, sub: 'Geometry polygon', groups: [{ title: 'Geometry', rows: [ro('Points', pg.join(', '))] }] };
    }
    if (p.kind === 'case') {
      var used = (model.loads || []).filter(function (e) { return e.loadCase === p.name; }).length;
      return { title: p.name, sub: 'Load case', groups: [{ title: 'Usage', rows: [ro('Loads', String(used))] }] };
    }
    if (p.kind === 'combo') {
      var combo = (model.loadCombinations || []).filter(function (c) { return c.name === p.name; })[0];
      if (!combo) return empty;
      var frows = (model.loadCases || []).map(function (n) { return { label: n, value: fixed(combo.factors[n] || 0), numeric: true, control: 'input', key: n }; });
      return { title: combo.name, sub: 'Load combination', groups: [{ title: 'Factors', rows: frows }] };
    }
    var list = model[p.field];
    if (!list || !list[p.index]) return empty;
    return entryInspector(model, p.field, list[p.index]);
  }

  function loadSelectionOptions(model) {
    model = model || {};
    var out = [];
    if ((model.loadCases || []).length) out.push({ label: 'Load cases', options: model.loadCases.slice() });
    if ((model.loadCombinations || []).length) out.push({ label: 'Load combinations', options: model.loadCombinations.map(function (c) { return c.name; }) });
    return out;
  }

  window.AwatifUI = {
    TEMPLATE_NAMES: TEMPLATE_NAMES, UNITS: UNITS, ENUMS: ENUMS,
    buildTree: buildTree, inspector: inspector, formatIds: formatIds, loadSelectionOptions: loadSelectionOptions, parseId: parseId, humanize: humanize
  };
})();
