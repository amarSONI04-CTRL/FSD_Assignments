const { useState, useEffect } = React;

/* Default avatar as inline SVG */
const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8," +
  "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'>" +
  "<defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='%2300ffff'/><stop offset='1' stop-color='%239b5de5'/></linearGradient></defs>" +
  "<rect width='100%' height='100%' rx='30' fill='url(%23g)'/>" +
  "<text x='50%' y='58%' font-family='Poppins, sans-serif' font-weight='700' font-size='96' fill='white' text-anchor='middle' alignment-baseline='middle'>AS</text>" +
  "</svg>";

function Header({ name, title }) {
  return (
    <header className="w-full py-6 px-6 flex items-center justify-between rounded-b-3xl" style={{
      background: "linear-gradient(90deg,#09111b, #07121e)",
      borderBottom: "1px solid rgba(0,255,255,0.04)"
    }}>
      <div>
        <h1 className="name neon-text">{name}</h1>
        <div className="title">{title}</div>
      </div>
      <div className="text-right">
        <div className="text-sm text-cyan-100 opacity-80">Personal Dashboard</div>
        <div className="text-xs text-cyan-300">Neon Theme • Offline-ready</div>
      </div>
    </header>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="text-2xl font-bold" style={{ color: "#dffeff" }}>{value}</div>
      <div className="text-xs opacity-90" style={{ color: "#bfefff" }}>{label}</div>
    </div>
  );
}

function ProfileCard({ profile, onEditClick }) {
  return (
    <div className="card p-6 flex flex-col sm:flex-row gap-6 items-center">
      <div className="avatar">
        <img src={profile.avatar || DEFAULT_AVATAR} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="name">{profile.name}</div>
            <div className="title" style={{ marginTop: 6 }}>{profile.title}</div>
          </div>

          <div>
            <button className="btn-neo" onClick={onEditClick}>Edit Profile</button>
          </div>
        </div>

        <p className="mt-4" style={{ color: "#d0f6ff" }}>{profile.bio}</p>

        <div className="mt-4 text-sm" style={{ color: "#bfefff" }}>
          <div><strong>Email:</strong> {profile.email}</div>
          <div className="mt-1"><strong>Location:</strong> {profile.location}</div>
        </div>
      </div>
    </div>
  );
}

function EditProfile({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial.name);
  const [title, setTitle] = useState(initial.title);
  const [bio, setBio] = useState(initial.bio);
  const [email, setEmail] = useState(initial.email);
  const [location, setLocation] = useState(initial.location);

  function save(e) {
    e.preventDefault();
    onSave({ name, title, bio, email, location });
  }

  return (
    <form className="card p-6" onSubmit={save}>
      <h3 className="text-lg font-semibold neon-text">Edit Profile</h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input-neo" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        <input className="input-neo" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title (e.g. Developer)" />
      </div>

      <textarea className="input-neo mt-3 w-full" rows="3" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short bio"></textarea>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className="input-neo" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="input-neo" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      </div>

      <div className="mt-4 flex gap-3">
        <button className="btn-neo" type="submit">Save Changes</button>
        <button type="button" className="px-4 py-2 rounded-xl bg-[#1f2937] text-white" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function App() {
  const [profile, setProfile] = useState({
    name: "Amar Soni",
    title: "CSE Student & Developer",
    bio: "Second-year CSE student exploring web, game dev, and cybersecurity. Love building small, beautiful UIs.",
    email: "amar@example.com",
    location: "India",
    avatar: DEFAULT_AVATAR
  });

  const [editing, setEditing] = useState(false);

  // Persistent Stats (localStorage)
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("neon_profile_stats_v1");
    return saved ? JSON.parse(saved) : { followers: 128, projects: 6, likes: 420 };
  });

  // Load saved profile
  useEffect(() => {
    const saved = localStorage.getItem("neon_profile_v1");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // Save profile + stats
  useEffect(() => {
    localStorage.setItem("neon_profile_v1", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("neon_profile_stats_v1", JSON.stringify(stats));
  }, [stats]);

  const openEdit = () => setEditing(true);
  const saveProfile = (data) => {
    setProfile((p) => ({ ...p, ...data }));
    setEditing(false);
  };

  // 🔥 Increment logic for +Follow and +Project
  const increaseStat = (key) => {
    setStats((prev) => {
      const updated = { ...prev, [key]: prev[key] + 1 };
      localStorage.setItem("neon_profile_stats_v1", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen p-6 flex items-start justify-center">
      <div className="w-full max-w-4xl">
        <Header name={profile.name} title={profile.title} />

        <main className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile + Stats */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCard profile={profile} onEditClick={openEdit} />

            <div className="card p-4 grid grid-cols-3 gap-3">
              <Stat label="Followers" value={stats.followers} />
              <Stat label="Projects" value={stats.projects} />
              <Stat label="Likes" value={stats.likes} />
            </div>

            {/* Buttons now functional */}
            <div className="card p-4 flex gap-3">
              <button className="btn-neo flex-1" onClick={() => increaseStat("followers")}>+ Follow</button>
              <button className="px-4 py-2 rounded-xl bg-[#1f2937] hover:bg-cyan-800/30 flex-1" onClick={() => increaseStat("projects")}>+ Project</button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold neon-text">About Me</h3>
              <p className="mt-3" style={{ color: "#cfeefc" }}>{profile.bio}</p>
              <div className="mt-4 text-sm" style={{ color: "#bfefff" }}>
                <div><strong>Email:</strong> {profile.email}</div>
                <div className="mt-1"><strong>Location:</strong> {profile.location}</div>
              </div>
            </div>

            {editing ? (
              <EditProfile initial={profile} onSave={saveProfile} onCancel={() => setEditing(false)} />
            ) : (
              <div className="card p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold neon-text">Quick Actions</h3>
                  <p className="mt-2" style={{ color: "#bfefff" }}>Edit your profile, update info, or grow your stats.</p>
                </div>
                <div>
                  <button className="btn-neo" onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
              </div>
            )}

            <div className="text-center footer">
              © 2025 Amar Soni • Built with React & Neon vibes
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
