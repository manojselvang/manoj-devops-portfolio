import { useEffect, useState } from 'react'
import {
  ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Terminal,
  Cloud, Container, GitBranch, ShieldCheck, Activity, ExternalLink,
  Code2, Boxes, Workflow, Menu, X, CheckCircle2, Circle, MapPin
} from 'lucide-react'
import SectionHeading from './components/SectionHeading'
import { getHealth, getProjects, getProfile, getSkills, getVersion } from './services/api'

const fallbackProfile = {
  name: 'Manoj Selvan G',
  title: 'DevOps & Cloud Engineer',
  location: 'Chennai, India',
  summary: 'I work at the intersection of infrastructure, security and automation—building practical skills in cloud-native platforms and reliable delivery workflows.',
  github: 'https://github.com/manojselvang',
  linkedin: 'https://www.linkedin.com/in/manojselvang',
  email: 'manojselvang@gmail.com'
}

const fallbackProjects = [
  { title: 'Kubernetes HPA on AWS EKS', category: 'KUBERNETES / AWS', description: 'Implemented CPU-based horizontal autoscaling and validated scale-out and scale-in behavior under load.', technologies: ['Kubernetes', 'AWS EKS', 'Metrics Server'], githubUrl: 'https://github.com/manojselvang/k8s-hpa-eks-project' },
  { title: 'Docker Image Build Comparison', category: 'DOCKER / OPTIMIZATION', description: 'Compared single-stage and multi-stage builds, reducing a sample image from 1.31 GB to 24.3 MB.', technologies: ['Docker', 'Go', 'Multi-stage builds'], githubUrl: 'https://github.com/manojselvang/docker-build-comparison' },
  { title: 'Docker Security Lab', category: 'CONTAINER SECURITY', description: 'Explored hardened container images, multi-stage builds and vulnerability scanning with Trivy.', technologies: ['Docker', 'Trivy', 'Security'], githubUrl: 'https://github.com/manojselvang/docker-security-lab' },
  { title: 'AI-Assisted Patch Prioritization', category: 'SECURITY AUTOMATION', description: 'Rule-based vulnerability prioritization using asset criticality, exposure and environment context.', technologies: ['Python', 'Risk scoring', 'Automation'], githubUrl: 'https://github.com/manojselvang/patch-prioritization-engine' }
]

const fallbackSkills = [
  { category: 'CLOUD & INFRASTRUCTURE', items: ['AWS', 'Linux', 'Terraform', 'Infrastructure automation'] },
  { category: 'CONTAINERS & ORCHESTRATION', items: ['Docker', 'Kubernetes', 'Helm', 'NGINX'] },
  { category: 'CI/CD & AUTOMATION', items: ['Jenkins', 'Git', 'GitHub', 'Bash', 'Python'] },
  { category: 'OBSERVABILITY & SECURITY', items: ['Prometheus', 'Grafana', 'Application security', 'Vulnerability management'] }
]

const pipeline = [
  { label: '01 / SOURCE', title: 'GitHub', detail: 'Commit pushed to the repository', icon: GitBranch },
  { label: '02 / BUILD', title: 'Jenkins', detail: 'Checkout, compile and test', icon: Workflow },
  { label: '03 / PACKAGE', title: 'Docker', detail: 'Build immutable container images', icon: Container },
  { label: '04 / REGISTRY', title: 'Docker Hub', detail: 'Publish commit-tagged images', icon: Boxes },
  { label: '05 / DEPLOY', title: 'Kubernetes', detail: 'Roll out and verify the release', icon: Cloud }
]

function App() {
  const [profile, setProfile] = useState(fallbackProfile)
  const [projects, setProjects] = useState(fallbackProjects)
  const [skills, setSkills] = useState(fallbackSkills)
  const [apiState, setApiState] = useState('checking')
  const [version, setVersion] = useState(null)
  const [lastChecked, setLastChecked] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePipeline, setActivePipeline] = useState(1)

  useEffect(() => {
    let alive = true
    Promise.all([getProfile(), getProjects(), getSkills(), getHealth(), getVersion()])
      .then(([p, pr, sk, h, v]) => {
        if (!alive) return
        setProfile(p)
        setProjects(pr)
        setSkills(sk)
        setApiState(h.status === 'UP' ? 'online' : 'degraded')
        setVersion(v.version || 'unknown')
        setLastChecked(new Date())
      })
      .catch(() => {
        if (!alive) return
        setApiState('offline')
        setLastChecked(new Date())
      })
    return () => { alive = false }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Manoj Selvan G home">
          <span className="brand-mark">ms<span>.</span></span>
          <span className="brand-label">MANOJ SELVAN G <small>DEVOPS / CLOUD</small></span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#stack" onClick={closeMenu}>Stack</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#pipeline" onClick={closeMenu}>CI/CD lab</a>
          <a className="nav-contact" href={`mailto:${profile.email}`} onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="pulse-dot" /> BUILDING • LEARNING • SHIPPING</div>
            <p className="hero-kicker">INFRASTRUCTURE MEETS AUTOMATION</p>
            <h1>Making systems<br />work <em>better.</em></h1>
            <p className="hero-intro">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
              <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub profile <ExternalLink size={13} /></a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={14} /> {profile.location}</span>
              <span className="meta-divider" />
              <span>Security <b>→</b> DevOps <b>→</b> Cloud</span>
            </div>
          </div>

          <div className="terminal-card">
            <div className="terminal-top">
              <div className="window-dots"><i /><i /><i /></div>
              <span>manoj@portfolio:~</span>
              <Terminal size={15} />
            </div>
            <div className="terminal-body">
              <p><span className="terminal-muted">01</span> <span className="term-green">$</span> whoami</p>
              <p className="term-output">Manoj Selvan G</p>
              <p><span className="terminal-muted">02</span> <span className="term-green">$</span> cat focus.txt</p>
              <div className="terminal-output-list">
                <span>cloud infrastructure</span><span>container platforms</span><span>delivery automation</span><span>security by design</span>
              </div>
              <p><span className="terminal-muted">03</span> <span className="term-green">$</span> systemctl status curiosity</p>
              <p className="service-status"><span className="status-led" /> active (running)</p>
              <p className="terminal-prompt"><span className="term-green">$</span> <span className="cursor" /></p>
            </div>
            <div className="terminal-foot"><span><Circle size={8} fill="currentColor" /> LOCAL PROFILE</span><span>v1.0.0</span></div>
          </div>
          <div className="hero-index"><span>01</span> / ENGINEER PORTFOLIO</div>
        </section>

        <section className="about-section section-wrap" id="about">
          <SectionHeading eyebrow="01 — THE PERSON BEHIND THE TERMINAL" title="A security mindset.<br/>An automation habit." detail="I bring an infrastructure and application security perspective to the systems I build and the tools I'm learning." />
          <div className="about-grid">
            <div className="about-statement">
              <span className="quote-mark">“</span>
              <p>Wherever I'm at, I'm known for <em>adding value.</em></p>
              <div className="statement-line" />
              <p className="about-small">I learn by building real labs, documenting what breaks, and understanding why it broke.</p>
            </div>
            <div className="about-facts">
              <div className="fact-row"><span className="fact-label">CURRENT ROLE</span><strong>Application Security Engineer</strong><span className="fact-note">Infrastructure & application security</span></div>
              <div className="fact-row"><span className="fact-label">DIRECTION</span><strong>DevOps / Cloud / Platform Engineering</strong><span className="fact-note">Hands-on projects and automation</span></div>
              <div className="fact-row"><span className="fact-label">BASED IN</span><strong>{profile.location}</strong><span className="fact-note">India · Open to learning and collaboration</span></div>
            </div>
          </div>
        </section>

        <section className="stack-section section-wrap" id="stack">
          <SectionHeading eyebrow="02 — TOOLS I WORK WITH" title="The working toolbox." detail="A practical mix of cloud, systems, delivery automation and security." />
          <div className="skills-grid">
            {skills.map((group) => (
              <article className="skill-group" key={group.category}>
                <div className="skill-group-head"><span>{group.category}</span><ArrowUpRight size={15} /></div>
                <div className="skill-chips">{group.items.map(item => <span className="skill-chip" key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section section-wrap" id="projects">
          <SectionHeading eyebrow="03 — SELECTED BUILDS" title="Proof beats buzzwords." detail="Projects are where concepts become skills. Open a repository to inspect the implementation and trade-offs." />
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-top"><span className="project-index">0{index + 1}</span><span className="project-category">{project.category}</span><ArrowUpRight size={17} /></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
                <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer">Inspect repository <ArrowUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="pipeline-section section-wrap" id="pipeline">
          <SectionHeading eyebrow="04 — THE DELIVERY LOOP" title="From commit to cluster." detail="This is the target workflow for the portfolio's separate CI/CD project. The visualization is illustrative—not live Jenkins telemetry yet." />
          <div className="pipeline-panel">
            <div className="pipeline-header"><div><span className="mini-label">PIPELINE / REFERENCE ARCHITECTURE</span><h3>portfolio-release</h3></div><span className="demo-badge"><span /> DEMO MODE</span></div>
            <div className="pipeline-track">
              {pipeline.map((stage, index) => {
                const Icon = stage.icon
                return <button className={`pipeline-stage ${activePipeline === index ? 'active' : ''}`} key={stage.title} onClick={() => setActivePipeline(index)}>
                  <span className="stage-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="stage-icon"><Icon size={19} /></span>
                  <span className="stage-title">{stage.title}</span>
                  <span className="stage-label">{stage.label}</span>
                  <span className="stage-state">{index < activePipeline ? <CheckCircle2 size={14} /> : <Circle size={14} />}{index < activePipeline ? ' target' : index === activePipeline ? ' selected' : ' queued'}</span>
                </button>
              })}
            </div>
            <div className="pipeline-detail"><div className="pipeline-detail-icon"><Terminal size={18} /></div><div><span className="mini-label">STAGE {String(activePipeline + 1).padStart(2, '0')} / {pipeline[activePipeline].label}</span><strong>{pipeline[activePipeline].title}</strong><p>{pipeline[activePipeline].detail}. In the completed project, Jenkins will execute and report this step.</p></div></div>
            <div className="pipeline-footer"><span><span className="status-led muted" /> No live pipeline connection</span><span>Designed for Jenkins + Docker Hub + Kubernetes</span></div>
          </div>
        </section>

        <section className="status-section section-wrap">
          <div className="status-copy"><p className="eyebrow">05 — RUNNING IN THE REAL WORLD</p><h2>Operational awareness<br />starts with <em>visibility.</em></h2><p>Health and build information below is fetched from the Spring Boot API when available.</p></div>
          <div className="status-card">
            <div className="status-card-head"><Activity size={17} /><span>APPLICATION STATUS</span><span className={`status-pill ${apiState}`}>{apiState === 'online' ? 'API ONLINE' : apiState === 'degraded' ? 'API DEGRADED' : apiState === 'offline' ? 'API UNAVAILABLE' : 'CHECKING'}</span></div>
            <div className="status-metric"><span>Backend reachability</span><strong>{apiState === 'online' ? 'Healthy' : apiState === 'checking' ? 'Checking…' : 'Not reachable'}</strong></div>
            <div className="status-metric"><span>Build version</span><strong>{version || 'Waiting for API'}</strong></div>
            <div className="status-metric"><span>Last checked</span><strong>{lastChecked ? lastChecked.toLocaleTimeString() : '—'}</strong></div>
            <p className="status-note">If the backend is unavailable, the portfolio content falls back to local sample data. The status remains honest about API reachability.</p>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <p className="eyebrow">06 — OPEN CHANNEL</p>
          <h2>Have a problem worth<br/><em>automating?</em></h2>
          <p>Let's connect over cloud, DevOps, platform engineering or security automation.</p>
          <div className="contact-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a>
            <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a>
            <a href={`mailto:${profile.email}`}><Mail size={17} /> Email <ArrowUpRight size={14} /></a>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark">ms<span>.</span></span></a>
        <p>Built with intent. Delivered with automation.</p>
        <span>© {new Date().getFullYear()} Manoj Selvan G</span>
      </footer>
    </div>
  )
}

export default App
