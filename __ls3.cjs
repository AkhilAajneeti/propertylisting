const fs = require('fs');
const p = 'src/components/LocationSearch.jsx';
let s = fs.readFileSync(p, 'utf8');
const NL = s.includes('\r\n') ? '\r\n' : '\n';
const L = (...a) => a.join(NL);
const one = t => { const n = s.split(t).length - 1; if (n !== 1) throw new Error('anchor x'+n+': '+t.slice(0,60)); };

// open state is gone - the field is always visible now
one('  const [open, setOpen] = useState(!expand);');
s = s.replace('  const [open, setOpen] = useState(!expand);', '');

s = s.split('      setOpen(false);' + NL).join('');
s = s.split('    setOpen(false);' + NL).join('');
s = s.split('  }, [expand, open]);').join('  }, [expand]);');
s = s.split('    if (!expand || !open) return undefined;').join('    if (!expand) return undefined;');

// openNow / closeSoon no longer have anything to open or close
const old = L(
'  const openNow = () => {',
'    if (!expand) return;',
'    clearTimeout(closeTimer.current);',
'    requestAnimationFrame(() => inputRef.current?.focus());',
'  };',
'',
'  const closeSoon = () => {',
'    if (!expand) return;',
'    clearTimeout(closeTimer.current);',
'    closeTimer.current = setTimeout(() => {',
'      if (engagedRef.current) return; // mid-search - leave it alone',
'      reset();',
'    }, 200);',
'  };',
'');
one(old);
s = s.replace(old, '');

// container: no hover handlers, no is-open class
const oldRoot = L(
'    <div',
'      ref={rootRef}',
'      className={"location-nav" + (open ? " is-open" : "")}',
'      onMouseEnter={openNow}',
'      onMouseLeave={closeSoon}',
'    >',
'      {/* Pill sits behind the button, anchored left, widening rightward into',
'          the space .location-nav reserves - so nothing in the navbar gets',
'          covered and nothing reflows. */}');
one(oldRoot);
s = s.replace(oldRoot, L(
'    <div ref={rootRef} className="location-nav">',
'      {/* Always visible - no hover reveal. It holds its own width in the',
'          navbar, so it never covers the call button or CONTACT US. */}'));

one('          tabIndex={open ? 0 : -1}' + NL);
s = s.replace('          tabIndex={open ? 0 : -1}' + NL, '');

const oldBtn = L(
'        aria-label="Search projects by location"',
'        aria-expanded={open}',
'        onClick={() => {',
'          openNow();',
'          markEngaged();',
'        }}',
'      >');
one(oldBtn);
s = s.replace(oldBtn, L(
'        aria-label="Search projects by location"',
'        onClick={() => {',
'          markEngaged();',
'          inputRef.current?.focus();',
'        }}',
'      >'));

// panel comment no longer about hover
s = s.replace(L('      {/* Only once someone is actually searching - a hover must not drop a',
                '          panel over the banner below. */}'),
              L('      {/* Only once someone is actually searching, so the list never sits',
                '          over the section below the navbar unprompted. */}'));

s = s.replace(/\n{3,}/g, NL + NL);
fs.writeFileSync(p, s);
console.log('hover removed');
