import React, { useState } from 'react';
import HeroCanvas from './components/HeroCanvas';
import axios from 'axios';
import './index.css';

function App() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    company: '',
    projectType: 'Web Development', 
    budget: 'Under $1k',
    message: '' 
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  // CORRECTED SCROLL LOGIC
  // Scrollable area = Total Height (600vh) - Viewport (100vh) = 500vh
  // We calculate the multipliers to land exactly in the middle of the active ranges defined in HeroCanvas.
  const navSections = [
    { id: 'text-1', label: 'Home', scrollIndex: 0 },         // 0%
    { id: 'text-2', label: 'Projects', scrollIndex: 1.75 },  // 35% of 500vh
    { id: 'text-3', label: 'Skills', scrollIndex: 3.25 },    // 65% of 500vh
    { id: 'text-4', label: 'Experience', scrollIndex: 4.25 },// 85% of 500vh
    { id: 'text-5', label: 'Contact', scrollIndex: 4.8 },    // 96% of 500vh
  ];

  // Helper to scroll based on viewport height (vh)
  const scrollToSection = (scrollIndex) => {
    const vh = window.innerHeight;
    window.scrollTo({
      top: vh * scrollIndex,
      behavior: 'smooth'
    });
  };

  const validateForm = () => {
    let newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email Validation (Strict)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@domain.com)";
    }

    // Phone Validation
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4,6}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number (e.g., +1 123-456-7890)";
    }

    // Company Validation
    if (!formData.company.trim()) {
      newErrors.company = "Company or Organization is required";
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more detail (min 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    
    if (!validateForm()) {
      setStatus('Please fill in all required fields correctly.');
      return;
    }

    setStatus('Sending...');
    try {
      const res = await axios.post('https://future-fs-01-hevw.onrender.com/api/contact', formData);
      if(res.status === 201) {
          setStatus('Message sent successfully!');
          setFormData({ 
            name: '', email: '', phone: '', 
            company: '', projectType: 'Web Development', 
            budget: 'Under $1k', message: '' 
          });
          setErrors({}); 
      }
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message.');
    }
  };

  return (
    <div className="scroll-container">
      <nav className="glass-nav">
          <div className="nav-logo">LINCOLN<span>ALEXYV</span></div>
          
          <div className="nav-links">
            {navSections.map((section) => (
              <button 
                key={section.id}
                onClick={() => scrollToSection(section.scrollIndex)}
                className="nav-link-item"
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
              <button 
                // Updated to 4.8 to land exactly on the Contact section
                onClick={() => scrollToSection(4.8)} 
                className="nav-cta"
              >
                Contact Me
              </button>
          </div>
      </nav>

      <main className="sticky-wrapper">
          <HeroCanvas />

          <section className="text-overlay" id="text-1">
              <span className="kicker">Full Stack Developer</span>
              <h1>Lincoln Alexyv</h1>
              <p>I build interactive web applications and websites using various frameworks to make them engaging.</p>
              {/* Updated scroll hint to point to Projects (1.75) */}
              <p className="scroll-hint" onClick={() => scrollToSection(1.75)} style={{cursor: 'pointer'}}>
                ▼ SCROLL TO EXPLORE
              </p>
          </section>

          <section className="text-overlay" id="text-2">
              <span className="kicker">Portfolio</span>
              <h2>Featured Projects</h2>
              <div className="project-grid">
                <div className="project-box" style={{ border: '1px solid #64ffda' }}>
            <h3>01. Future Interns Portfolio</h3>
            <p>Task 1: A professional Full-Stack portfolio (this site) featuring smooth scrolling, 3D Canvas integration, and a Node.js contact handler.</p>
            <div className="tech-tags"><span>React</span> <span>Node.js</span> <span>Three.js</span></div>
            <a href="https://github.com/GitHu317/FUTURE_FS_01" target="_blank" rel="noreferrer" className="project-link">View Repository →</a>
        </div>
                  <div className="project-box">
                      <h3>02. STEMEDU</h3>
                      <p>Interactive e-learning websites that teach science and technology courses with quizzes and assignments.</p>
                      <div className="tech-tags"><span>HTML</span> <span>CSS</span><span>JavaScript</span></div>
                  </div>
              </div>
          </section>

          <section className="text-overlay" id="text-3">
              <span className="kicker">Capabilities</span>
<h2>Core Competencies</h2>
              <div className="skill-grid">
                  <span>React</span>
                  <span>Spring Boot</span>
                  <span>Java</span>
                  <span>MySQL</span>
                  <span>JavaScript</span>
                  <span>CSS</span>
                  <span>HTML</span>
                  <span>Python</span>
              </div>
          </section>

          <section className="text-overlay" id="text-4">
              <h2>Experience</h2>
             <div className="timeline">
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>Student Developer</h4>
                        <span className="date">2019 – Present</span>
                        <p>
                            A student at SSC 
                            actively building projects, learning, and experimenting with new technologies.
                        </p>
                    </div>
                </div>

                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>48-Hour Game Jam Winner</h4>
                        <span className="date">2026</span>
                        <p>
                            Won a 48-hour global game jam by collaborating in a small team to develop a complete game.
                        </p>
                    </div>
                </div>
            </div>
          </section>

          <section className="text-overlay" id="text-5">
              <h2 className="contact_header">Let's Connect.</h2>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  
                  <div className="form-row">
                      <div className="input-group">
                        <label htmlFor="name" className="visually-hidden" style={{display:'none'}}>Name</label>
                        <input 
                          id="name"
                          name="name"
                          aria-label="Name"
                          className={errors.name ? "input-error" : ""}
                          type="text" placeholder="Name" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                      </div>

                      <div className="input-group">
                        <label htmlFor="email" className="visually-hidden" style={{display:'none'}}>Email</label>
                        <input 
                          id="email"
                          name="email"
                          aria-label="Email"
                          className={errors.email ? "input-error" : ""}
                          type="email" placeholder="Email" 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                      </div>
                  </div>

                  <div className="form-row">
                      <div className="input-group">
                        <label htmlFor="phone" className="visually-hidden" style={{display:'none'}}>Phone</label>
                        <input 
                          id="phone"
                          name="phone"
                          aria-label="Phone Number"
                          className={errors.phone ? "input-error" : ""}
                          type="tel" placeholder="Phone Number" 
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                      </div>
                      <div className="input-group">
                        <label htmlFor="company" className="visually-hidden" style={{display:'none'}}>Company</label>
                        <input 
                          id="company"
                          name="company"
                          aria-label="Company or Organization"
                          className={errors.company ? "input-error" : ""}
                          type="text" placeholder="Company / Org" 
                          value={formData.company}
                          onChange={e => setFormData({...formData, company: e.target.value})}
                        />
                        {errors.company && <span className="error-text">{errors.company}</span>}
                      </div>
                  </div>

                  <div className="form-row">
                      <div className="select-container">
                          <label htmlFor="projectType">Project Type</label>
                          <select 
                            id="projectType"
                            name="projectType"
                            value={formData.projectType}
                            onChange={e => setFormData({...formData, projectType: e.target.value})}
                          >
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Backend / API">Backend / API</option>
                          </select>
                      </div>
                      <div className="select-container">
                          <label htmlFor="budget">Budget Range</label>
                          <select 
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={e => setFormData({...formData, budget: e.target.value})}
                          >
                            <option value="Under $1k">Under $1k</option>
                            <option value="$1k - $5k">$1k - $5k</option>
                            <option value="$5k - $15k">$5k - $15k</option>
                            <option value="$15k+">$15k+</option>
                          </select>
                      </div>
                  </div>

                  <div className="input-group">
                    <label htmlFor="message" className="visually-hidden" style={{display:'none'}}>Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      aria-label="Message"
                      className={errors.message ? "input-error" : ""}
                      placeholder="Briefly describe your project goals..." 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>
                  
                  <button type="submit" className="primary-btn">Send Message</button>
                  <p id="form-message" className={status.includes('Failed') || status.includes('fields') ? "error-msg" : "success-msg"}>
                    {status}
                  </p>
              </form>

              
          </section>
      </main>
    </div>
  );
}

export default App;
