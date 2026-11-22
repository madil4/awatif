/* @ds-bundle: {"format":4,"namespace":"StructViewer","components":[{"name":"AppShell"},{"name":"Panel"},{"name":"TreeView"},{"name":"PropertyGrid"},{"name":"DataTable"},{"name":"Tabs"},{"name":"ContourLegend"},{"name":"StatusBadge"},{"name":"Button"},{"name":"Select"},{"name":"Checkbox"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState;

  function cx() {
    return Array.prototype.filter.call(arguments, Boolean).join(' ');
  }

  function Chevron(props) {
    return h('svg', { className: cx('sv-chevron', props.open && 'is-open'), width: 12, height: 12, viewBox: '0 0 12 12', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
      h('path', { d: 'M4.2 2.4L7.8 6L4.2 9.6' }));
  }

  /* ---------- Button ---------- */
  function Button(props) {
    var variant = props.variant || 'secondary';
    var size = props.size || 'md';
    return h('button', {
      type: props.type || 'button',
      className: cx('ui-strong', 'sv-btn', 'sv-btn--' + variant, 'sv-btn--' + size, props.className),
      disabled: props.disabled,
      onClick: props.onClick,
      'aria-pressed': props.pressed,
      'aria-label': props['aria-label'],
      title: props.title
    },
      props.icon ? h('span', { className: 'sv-btn__icon', 'aria-hidden': 'true' }, props.icon) : null,
      props.children);
  }

  /* ---------- StatusBadge ---------- */
  var STATUS_ICON = {
    ok: [h('path', { key: 1, d: 'M3 7.4l2.8 2.8L11 4.6' })],
    warn: [h('path', { key: 1, d: 'M7 2.2L12.6 12H1.4z' }), h('path', { key: 2, d: 'M7 6v2.6M7 10.4v.1' })],
    fail: [h('path', { key: 1, d: 'M3.6 3.6l6.8 6.8M10.4 3.6l-6.8 6.8' })],
    info: [h('circle', { key: 1, cx: 7, cy: 7, r: 5.4 }), h('path', { key: 2, d: 'M7 6.6v3.2M7 4.4v.1' })],
    neutral: [h('path', { key: 1, d: 'M3.4 7h7.2' })]
  };

  function StatusBadge(props) {
    var status = props.status || 'neutral';
    return h('span', { className: cx('caption', 'sv-badge', 'sv-badge--' + status, props.className) },
      h('svg', { width: 12, height: 12, viewBox: '0 0 14 14', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }, STATUS_ICON[status]),
      props.children);
  }

  /* ---------- Select ---------- */
  function optionEl(o) {
    var v = typeof o === 'string' ? o : o.value;
    var l = typeof o === 'string' ? o : o.label;
    return h('option', { key: v, value: v }, l);
  }

  function Select(props) {
    var p = {
      className: cx('ui', 'sv-select__el'),
      disabled: props.disabled,
      'aria-label': props['aria-label'],
      'aria-labelledby': props.labelledBy,
      onChange: function (e) { if (props.onChange) props.onChange(e.target.value); }
    };
    if (props.value !== undefined) p.value = props.value;
    else if (props.defaultValue !== undefined) p.defaultValue = props.defaultValue;
    return h('span', { className: cx('sv-select', props.size === 'md' && 'sv-select--md', props.className) },
      h('select', p, (props.options || []).map(function (o) {
        if (o && o.options) return h('optgroup', { key: o.label, label: o.label }, o.options.map(optionEl));
        return optionEl(o);
      })),
      h('svg', { className: 'sv-select__chev', width: 12, height: 12, viewBox: '0 0 12 12', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' },
        h('path', { d: 'M2.8 4.6L6 7.8l3.2-3.2' })));
  }

  /* ---------- Checkbox ---------- */
  function Checkbox(props) {
    var p = {
      type: 'checkbox',
      className: 'sv-check__input',
      disabled: props.disabled,
      'aria-labelledby': props.labelledBy,
      onChange: function (e) { if (props.onChange) props.onChange(e.target.checked); }
    };
    if (props.checked !== undefined) p.checked = props.checked;
    else p.defaultChecked = !!props.defaultChecked;
    return h('label', { className: cx('ui', 'sv-check', props.className) },
      h('input', p),
      h('span', { className: 'sv-check__box', 'aria-hidden': 'true' },
        h('svg', { width: 12, height: 12, viewBox: '0 0 12 12', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
          h('path', { d: 'M2.6 6.4l2.3 2.3L9.4 3.8' }))),
      props.children ? h('span', null, props.children) : null);
  }

  /* ---------- Tabs ---------- */
  function Tabs(props) {
    var tabs = props.tabs || [];
    var st = useState(props.defaultValue || (tabs[0] && tabs[0].id));
    var val = props.value !== undefined ? props.value : st[0];
    return h('div', { role: 'tablist', className: cx('sv-tabs', props.className) }, tabs.map(function (t) {
      var on = t.id === val;
      return h('button', {
        key: t.id, type: 'button', role: 'tab', 'aria-selected': on,
        className: cx('ui-strong', 'sv-tab', on && 'is-active'),
        onClick: function () { st[1](t.id); if (props.onChange) props.onChange(t.id); }
      }, t.label, t.meta != null ? h('span', { className: 'caption sv-tab__meta' }, t.meta) : null);
    }));
  }

  /* ---------- Panel ---------- */
  // Collapsible panels fold to their header. Uncontrolled (defaultOpen) or controlled (open + onToggle).
  function Panel(props) {
    var st = useState(props.defaultOpen !== false);
    var collapsible = !!props.collapsible;
    var controlled = props.open !== undefined;
    var open = controlled ? !!props.open : st[0];
    var isOpen = collapsible ? open : true;
    function toggle() {
      if (!controlled) st[1](!open);
      if (props.onToggle) props.onToggle(!open);
    }
    var titleEl = collapsible
      ? h('button', { type: 'button', className: 'sv-panel__toggle', 'aria-expanded': isOpen, onClick: toggle },
          h(Chevron, { open: isOpen }),
          h('span', { className: 'overline sv-caps' }, props.title))
      : h('h2', { className: 'sv-panel__title overline sv-caps' }, props.title);
    return h('section', { className: cx('sv-panel', props.flush && 'sv-panel--flush', !isOpen && 'is-collapsed', props.className) },
      h('header', { className: 'sv-panel__head' },
        titleEl,
        props.actions ? h('div', { className: 'sv-panel__actions' }, props.actions) : null),
      isOpen ? h('div', { className: 'sv-panel__body' }, props.children) : null);
  }

  /* ---------- TreeView ---------- */
  function TreeView(props) {
    var init = {};
    (props.defaultExpanded || []).forEach(function (id) { init[id] = true; });
    var st = useState(init);
    var exp = st[0], setExp = st[1];

    function toggle(id) {
      var next = Object.assign({}, exp);
      next[id] = !exp[id];
      setExp(next);
    }

    function render(nodes, depth) {
      return nodes.map(function (n) {
        var has = !!(n.children && n.children.length);
        var open = !!exp[n.id];
        var sel = props.selectedId === n.id;
        function activate() {
          if (has) toggle(n.id);
          if (!n.group && props.onSelect) props.onSelect(n.id, n);
        }
        return h('li', { key: n.id, role: 'none' },
          h('div', {
            role: 'treeitem',
            'aria-level': depth + 1,
            'aria-selected': n.group ? undefined : sel,
            'aria-expanded': has ? open : undefined,
            tabIndex: 0,
            className: cx('sv-tree__row', sel && 'is-selected', n.group && 'is-group'),
            style: { paddingLeft: 'calc(var(--space-2) + ' + (depth * 16) + 'px)' },
            onClick: activate,
            onKeyDown: function (e) {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
              else if (e.key === 'ArrowRight' && has && !open) { e.preventDefault(); toggle(n.id); }
              else if (e.key === 'ArrowLeft' && has && open) { e.preventDefault(); toggle(n.id); }
            }
          },
            has ? h(Chevron, { open: open }) : h('span', { className: 'sv-tree__spacer' }),
            n.icon ? h('span', { className: 'sv-tree__icon', 'aria-hidden': 'true' }, n.icon) : null,
            h('span', { className: cx(n.group ? 'overline sv-caps' : (sel ? 'ui-strong' : 'ui'), 'sv-tree__label') }, n.label),
            n.meta != null ? h('span', { className: 'caption sv-tree__meta' }, n.meta) : null),
          has && open ? h('ul', { role: 'group', className: 'sv-tree__group' }, render(n.children, depth + 1)) : null);
      });
    }

    return h('ul', { role: 'tree', className: cx('sv-tree', props.className) }, render(props.nodes || [], 0));
  }

  /* ---------- PropertyGrid ---------- */
  // A group with `collapsible: true` folds to its title. Its open state is the group's `open` when given
  // (report changes with onGroupToggle(title, open)), else kept here, starting from `defaultOpen` (true).
  function PropertyGrid(props) {
    var st = useState({});
    var folded = st[0], setFolded = st[1];
    return h('div', { className: cx('sv-props', props.className), role: 'group' },
      (props.groups || []).map(function (g, gi) {
        var key = g.title || String(gi);
        var open = !g.collapsible ? true : g.open !== undefined ? !!g.open : folded[key] !== undefined ? !folded[key] : g.defaultOpen !== false;
        function toggle() {
          var next = Object.assign({}, folded);
          next[key] = open;
          setFolded(next);
          if (props.onGroupToggle) props.onGroupToggle(key, !open);
        }
        var title = null;
        if (g.title) title = g.collapsible
          ? h('button', { type: 'button', className: 'sv-props__title sv-props__toggle overline sv-caps', 'aria-expanded': open, onClick: toggle }, h(Chevron, { open: open }), g.title)
          : h('div', { className: 'sv-props__title overline sv-caps' }, g.title);
        return h('div', { key: gi, className: 'sv-props__group' },
          title,
          !open ? null : (g.rows || []).map(function (r, ri) {
            var num = r.numeric || typeof r.value === 'number';
            var id = 'sv-prop-' + gi + '-' + ri;
            var ctrl = r.control || (r.editable ? 'input' : null);
            var onCh = function (v) { if (props.onChange) props.onChange(r.key || r.label, v); };
            var el;
            if (ctrl === 'select') el = h(Select, { options: r.options, defaultValue: r.value, labelledBy: id, onChange: onCh });
            else if (ctrl === 'checkbox') el = h(Checkbox, { defaultChecked: !!r.value, labelledBy: id, onChange: onCh });
            else if (ctrl === 'input') el = h('input', { className: cx('sv-input', num ? 'data is-num' : 'ui'), defaultValue: r.value, placeholder: r.placeholder, 'aria-labelledby': id, onChange: function (e) { onCh(e.target.value); } });
            else el = h('span', { className: cx(num ? 'data' : 'ui', 'sv-props__value') }, r.value);
            return h('div', { key: ri, className: 'sv-props__row' },
              h('span', { className: 'ui sv-props__label', id: id }, r.label),
              h('span', { className: 'sv-props__valuewrap' },
                el,
                r.unit ? h('span', { className: 'caption sv-props__unit' }, r.unit) : null));
          }));
      }));
  }

  /* ---------- DataTable ---------- */
  function DataTable(props) {
    var cols = props.columns || [];
    var rows = props.rows || [];
    return h('div', { className: cx('sv-table-wrap', props.className) },
      h('table', { className: cx('sv-table', props.density === 'compact' && 'sv-table--compact') },
        h('thead', null,
          h('tr', null, cols.map(function (c) {
            return h('th', { key: c.key, scope: 'col', className: cx('label', c.numeric && 'is-num'), style: c.width ? { width: c.width } : undefined },
              c.label,
              c.unit ? h('span', { className: 'sv-table__unit' }, ' (' + c.unit + ')') : null);
          }))),
        h('tbody', null, rows.map(function (r) {
          var sel = props.selectedId === r.id;
          function pick() { if (props.onSelect) props.onSelect(r.id, r); }
          return h('tr', {
            key: r.id,
            className: cx(sel && 'is-selected'),
            'aria-selected': props.onSelect ? sel : undefined,
            tabIndex: props.onSelect ? 0 : undefined,
            onClick: pick,
            onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } }
          }, cols.map(function (c) {
            var v = r[c.key];
            return h('td', { key: c.key, className: cx(c.numeric ? 'data is-num' : (c.mono ? 'data-mono' : 'ui')) }, c.render ? c.render(v, r) : v);
          }));
        }))));
  }

  /* ---------- ContourLegend ---------- */
  var SEQ = ['--contour-9', '--contour-8', '--contour-7', '--contour-6', '--contour-5', '--contour-4', '--contour-3', '--contour-2', '--contour-1'];
  var DIV = ['--div-pos-2', '--div-pos-1', '--div-mid', '--div-neg-1', '--div-neg-2'];

  function fmt(v, d) {
    return Number(v).toFixed(d).replace('-', '−');
  }

  function ContourLegend(props) {
    var vars = props.scale === 'diverging' ? DIV : SEQ;
    var min = props.min == null ? 0 : props.min;
    var max = props.max == null ? 1 : props.max;
    var n = props.ticks || 5;
    var dec = props.decimals == null ? 2 : props.decimals;
    var labels = [];
    for (var i = 0; i < n; i++) labels.push(fmt(max - (max - min) * i / (n - 1), dec));
    return h('figure', { className: cx('sv-legend', props.className) },
      h('figcaption', { className: 'sv-legend__head' },
        h('span', { className: 'ui-strong' }, props.title),
        props.unit ? h('span', { className: 'caption sv-legend__unit' }, props.unit) : null),
      h('div', { className: 'sv-legend__body', style: { height: props.height || 176 } },
        h('div', { className: 'sv-legend__bar', 'aria-hidden': 'true' }, vars.map(function (v) {
          return h('span', { key: v, style: { background: 'var(' + v + ')' } });
        })),
        h('div', { className: 'sv-legend__ticks' }, labels.map(function (l, k) {
          return h('span', { key: k, className: 'caption sv-legend__tick', style: { top: (k / (n - 1) * 100) + '%' } }, l);
        }))),
      props.note ? h('div', { className: 'caption sv-legend__note' }, props.note) : null);
  }

  /* ---------- AppShell ---------- */
  // Regions fold with `collapsed: { left, right, bottom }` and onToggle(region): a folded side becomes a
  // narrow rail, a folded drawer a single bar, each with a button that opens it again. With onResize(region, px)
  // the open regions get a drag handle on their inner edge.
  function Resizer(props) {
    function down(ev) {
      if (ev.button !== 0) return;
      ev.preventDefault();
      var el = ev.currentTarget.parentNode;
      var start = props.axis === 'y' ? ev.clientY : ev.clientX;
      var size = props.axis === 'y' ? el.offsetHeight : el.offsetWidth;
      function move(e) {
        var d = (props.axis === 'y' ? e.clientY : e.clientX) - start;
        props.onResize(Math.max(props.min || 120, Math.round(size + d * props.sign)));
      }
      function up() {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        document.body.style.cursor = '';
      }
      document.body.style.cursor = props.axis === 'y' ? 'row-resize' : 'col-resize';
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    }
    return h('div', { className: 'sv-resizer sv-resizer--' + props.edge, role: 'separator', 'aria-orientation': props.axis === 'y' ? 'horizontal' : 'vertical', onPointerDown: down });
  }

  function Rail(props) {
    return h('button', { type: 'button', className: cx('sv-rail', 'sv-rail--' + props.region), title: 'Show ' + props.label.toLowerCase(), 'aria-label': 'Show ' + props.label.toLowerCase(), 'aria-expanded': false, onClick: props.onOpen },
      h(Chevron, { open: props.region === 'bottom' ? false : null }),
      h('span', { className: 'overline sv-caps sv-rail__label' }, props.label));
  }

  function AppShell(props) {
    var o = props.overlays || {};
    var col = props.collapsed || {};
    var toggle = function (r) { return function () { if (props.onToggle) props.onToggle(r); }; };
    var resize = function (r) { return props.onResize ? function (px) { props.onResize(r, px); } : null; };
    function slot(k, node) {
      return node ? h('div', { className: 'sv-viewport__slot sv-viewport__slot--' + k }, node) : null;
    }
    function side(r) {
      var node = props[r];
      if (!node) return null;
      var label = props[r + 'Label'] || (r === 'left' ? 'Model tree' : 'Inspector');
      var cls = 'sv-shell__side sv-shell__side--' + r;
      if (col[r]) return h('aside', { className: cx(cls, 'is-collapsed'), 'aria-label': label }, h(Rail, { region: r, label: label, onOpen: toggle(r) }));
      var rs = resize(r);
      return h('aside', { className: cls, 'aria-label': label, style: { width: props[r + 'Width'] || 'var(--layout-' + r + ')' } },
        h('div', { className: 'sv-shell__sidebody' }, node),
        rs ? h(Resizer, { edge: r === 'left' ? 'right' : 'left', axis: 'x', sign: r === 'left' ? 1 : -1, min: 200, onResize: rs }) : null);
    }
    var bottom = null;
    if (props.bottom) {
      var bl = props.bottomLabel || 'Data';
      var brs = resize('bottom');
      bottom = col.bottom
        ? h('section', { className: 'sv-shell__bottom is-collapsed', 'aria-label': bl }, h(Rail, { region: 'bottom', label: bl, onOpen: toggle('bottom') }))
        : h('section', { className: 'sv-shell__bottom', 'aria-label': bl, style: { height: props.bottomHeight || 'var(--layout-bottom)' } },
            brs ? h(Resizer, { edge: 'top', axis: 'y', sign: -1, min: 80, onResize: brs }) : null,
            props.bottom);
    }
    return h('div', { className: cx('sv-shell', props.className) },
      props.toolbar ? h('header', { className: 'sv-shell__toolbar' }, props.toolbar) : null,
      h('div', { className: 'sv-shell__main' },
        side('left'),
        h('div', { className: 'sv-shell__center' },
          h('main', { className: 'sv-viewport', 'aria-label': 'Model view' },
            h('div', { className: 'sv-viewport__content' }, props.children),
            slot('tl', o.topLeft), slot('tr', o.topRight), slot('bl', o.bottomLeft), slot('br', o.bottomRight)),
          bottom),
        side('right')),
      props.statusbar ? h('footer', { className: 'sv-shell__status caption' }, props.statusbar) : null);
  }

  window.StructViewer = {
    AppShell: AppShell,
    Panel: Panel,
    TreeView: TreeView,
    PropertyGrid: PropertyGrid,
    DataTable: DataTable,
    Tabs: Tabs,
    ContourLegend: ContourLegend,
    StatusBadge: StatusBadge,
    Button: Button,
    Select: Select,
    Checkbox: Checkbox
  };
})();
