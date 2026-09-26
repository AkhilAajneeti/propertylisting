import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/propertySlice";

/* Inline rather than react-icons: App.css has a global "svg path" rule
   (stroke #fff, dasharray 34, dashoffset 34) meant for the check-box tick,
   which lands on every icon on the site. Own class = own reset. */
function PinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 384 512" aria-hidden="true">
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  );
}

/**
 * City type-ahead.
 *
 * variant="navbar" - always-visible pin + field in the desktop navbar. It
 *                    holds its own width in the row, so it never covers the
 *                    call button or CONTACT US.
 * variant="inline" - same thing in the mobile offcanvas.
 *
 * Only the suggestion list is conditional: it appears once someone actually
 * starts searching, so it never sits over the section below the navbar
 * unprompted.
 *
 * The API has no /cities/ endpoint (unlike /property-categories/), so the
 * list is derived from the City field of the projects already in the store.
 */
export default function LocationSearch({ variant = "inline", onSelect }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: projects = [] } = useSelector((state) => state.projects);

  const isNavbar = variant === "navbar";
  const [engaged, setEngaged] = useState(!isNavbar);
  const [text, setText] = useState("");
  const [active, setActive] = useState(0);

  const rootRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch]);

  const cities = useMemo(() => {
    const counts = new Map();
    (projects || []).forEach((p) => {
      const city = (p.City || "").trim();
      if (city) counts.set(city, (counts.get(city) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [projects]);

  const matches = useMemo(() => {
    const q = text.trim().toLowerCase();
    if (!q) return cities;
    return cities.filter((c) => c.name.toLowerCase().includes(q));
  }, [cities, text]);

  useEffect(() => {
    setActive(0);
  }, [text]);

  // The list stays up while the pointer is elsewhere, so a click outside is
  // what dismisses it.
  useEffect(() => {
    if (!isNavbar) return undefined;
    const onDocDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setEngaged(false);
        setText("");
        setActive(0);
      }
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [isNavbar]);

  const go = (name) => {
    if (!name) return;
    setText("");
    setActive(0);
    if (isNavbar) {
      setEngaged(false);
      inputRef.current?.blur();
    }
    onSelect?.();
    navigate(`/search-projects?q=${encodeURIComponent(name)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setEngaged(true);
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(matches[active]?.name);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setText("");
      if (isNavbar) {
        setEngaged(false);
        inputRef.current?.blur();
      }
    }
  };

  const list = (
    <ul className="location-search__list">
      {projects.length === 0 ? (
        <li className="location-search__empty">Loading...</li>
      ) : matches.length === 0 ? (
        <li className="location-search__empty">No location found</li>
      ) : (
        matches.map((c, i) => (
          <li key={c.name}>
            <button
              type="button"
              className={
                "location-search__item" + (i === active ? " is-active" : "")
              }
              /* onMouseDown, not onClick: blur fires first and hides the list,
                 unmounting this button before a click can land. */
              onMouseDown={(e) => {
                e.preventDefault();
                go(c.name);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span>{c.name}</span>
              <span className="location-search__count">{c.count}</span>
            </button>
          </li>
        ))
      )}
    </ul>
  );

  if (!isNavbar) {
    return (
      <div className="location-search">
        <div className="location-search__field">
          <PinIcon className="location-search__pin" />
          <input
            type="text"
            className="location-search__input"
            placeholder="Search a location"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Search projects by location"
            autoComplete="off"
          />
        </div>
        {list}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="location-nav">
      <div className="location-nav__pill">
        <input
          ref={inputRef}
          type="text"
          className="location-nav__input"
          placeholder="Search city..."
          value={text}
          onChange={(e) => {
            setEngaged(true);
            setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onMouseDown={() => setEngaged(true)}
          aria-label="Search projects by location"
          autoComplete="off"
        />
      </div>

      <button
        type="button"
        className="location-nav__toggle"
        aria-label="Search projects by location"
        onClick={() => {
          setEngaged(true);
          inputRef.current?.focus();
        }}
      >
        <PinIcon className="location-nav__icon" />
      </button>

      {engaged && (
        <div className="location-nav__panel" data-lenis-prevent>
          {list}
        </div>
      )}
    </div>
  );
}
