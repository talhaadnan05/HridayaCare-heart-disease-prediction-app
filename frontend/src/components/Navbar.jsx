const links = [["home", "Overview"], ["prediction", "Prediction"], ["about", "About"]];

export default function Navbar({ page, onNavigate }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="HridayaCare overview">
          <span className="brand-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.6c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.8 2.1Z"/><path d="M4.8 12h4l1.8-3.2 2.7 6 1.8-2.8h4.1"/></svg></span>
          <span>Hridaya<span className="brand-accent">Care</span></span>
        </button>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map(([id, label]) => <button key={id} className={page === id ? "active" : ""} aria-current={page === id ? "page" : undefined} onClick={() => onNavigate(id)}>{label}</button>)}
        </nav>
        <div className="topbar-tools">
          <button className="icon-button" aria-label="Search" title="Search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m15.5 15.5 4 4"/></svg></button>
          <button className="icon-button notification-button" aria-label="Notifications" title="Notifications"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg><i /></button>
          <div className="profile-avatar" aria-label="User profile">CP</div>
        </div>
      </div>
    </header>
  );
}
