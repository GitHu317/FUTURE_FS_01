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

  // NAV SECTIONS
  // Adjusted scroll indexes to ensure sections land in the center of the screen
  const navSections = [
    { id: 'text-1', label: 'Home', scrollIndex: 0 },         
    { id: 'text-2', label: 'Projects', scrollIndex: 1.75 },  
    { id: 'text-3', label: 'Internship', scrollIndex: 2.75 }, // New Section for Future Interns
    { id: 'text-4', label: 'Skills', scrollIndex: 3.5 },    
    { id: 'text-5', label: 'Experience', scrollIndex: 4.25 },
    { id: 'text-6', label: 'Contact', scrollIndex: 4.8 },    
  ];

  const scrollToSection = (scrollIndex) => {
    const vh = window.innerHeight;
    window.scrollTo({
      top: vh * scrollIndex,
      behavior: 'smooth'
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4,6}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.company.trim()) newErrors.company = "Company is required";

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    
    if (!validateForm()) {
      setStatus('Please correct the errors above.');
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
      setStatus('Failed to send message. Please try again.');
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
                onClick={() => scrollToSection(4.8)} 
                className="nav-cta"
              >
                Let's Talk
              </button>
          </div>
      </nav>

      <main className="sticky-wrapper">
          <HeroCanvas />

          {/* --- SECTION 1: INTRO --- */}
          <section className="text-overlay" id="text-1">
              <span className="kicker">Full Stack Developer</span>
              <h1>Lincoln Alexyv</h1>
              <p>
                Passionate about building scalable web applications and interactive user experiences. 
                I turn complex problems into elegant code.
              </p>
              <p className="scroll-hint" onClick={() => scrollToSection(1.75)} style={{cursor: 'pointer'}}>
                ▼ SCROLL TO EXPLORE
              </p>
          </section>

          {/* --- SECTION 2: FEATURED PROJECTS --- */}
          <section className="text-overlay" id="text-2">
              <span className="kicker">Portfolio</span>
              <h2>Featured Works</h2>
              <div className="project-grid">
                  <div className="project-box">
                      <h3>01. Business Club</h3>
                      <p>A custom school club website featuring member management, event scheduling, and real-time updates.</p>
                      <div className="tech-tags"><span>HTML</span> <span>CSS</span><span>JavaScript</span></div>
                  </div>
                  <div className="project-box">
                      <h3>02. STEMEDU</h3>
                      <p>An interactive e-learning platform focusing on science tech with built-in quizzes and progress tracking.</p>
                      <div className="tech-tags"><span>React</span> <span>Node.js</span><span>MongoDB</span></div>
                  </div>
              </div>
          </section>

          {/* --- SECTION 3: FUTURE INTERNS TASKS (NEW) --- */}
          <section className="text-overlay" id="text-3">
              <span className="kicker">Future Interns</span>
              <h2>Internship Tasks</h2>
              <p style={{marginBottom: '20px'}}>Projects built during the Future Interns program demonstrating frontend mastery.</p>
              
              <div className="project-grid">
                  {/* UPDATE THESE WITH YOUR SPECIFIC REPO TASKS */}
                  <div className="project-box" style={{borderColor: 'rgba(100, 255, 218, 0.3)'}}>
                      <h3>Task 01: Calculator</h3>
                      <p>A fully functional calculator with mathematical operations and a responsive UI.</p>
                      <div className="tech-tags"><span>DOM Manipulation</span> <span>CSS Grid</span></div>
                  </div>
                  <div className="project-box" style={{borderColor: 'rgba(100, 255, 218, 0.3)'}}>
                      <h3>Task 02: Tribute Page</h3>
                      <p>A responsive tribute page utilizing clean layout techniques and semantic HTML.</p>
                      <div className="tech-tags"><span>HTML5</span> <span>CSS3</span></div>
                  </div>
              </div>
              <div style={{marginTop: '20px'}}>
                <a href="https://github.com/GitHu317/FUTURE_FS_01" target="_blank" rel="noopener noreferrer" className="github-link">
                   View Code on GitHub →
                </a>
              </div>
          </section>

          {/* --- SECTION 4: SKILLS --- */}
          <section className="text-overlay" id="text-4">
              <span className="kicker">Tech Stack</span>
              <h2>Core Competencies</h2>
              <div className="skill-grid">
                  <span>React.js</span>
                  <span>Spring Boot</span>
                  <span>Java</span>
                  <span>MySQL</span>
                  <span>JavaScript (ES6+)</span>
                  <span>CSS3 / Tailwind</span>
                  <span>HTML5</span>
                  <span>Python</span>
                  <span>Git & GitHub</span>
                  <span>REST APIs</span>
              </div>
          </section>

          {/* --- SECTION 5: EXPERIENCE --- */}
          <section className="text-overlay" id="text-5">
             <h2>Background & Goals</h2>
             <div className="timeline">
                
                {/* Current Role */}
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>Web Development Intern</h4>
                        <span className="date">Future Interns | 2024</span>
                        <p>
                            Completing rigorous frontend and backend challenges. Built responsive layouts and interactive components (Calculator, Tribute Page) housed in the <strong>FUTURE_FS_01</strong> repository.
                        </p>
                    </div>
                </div>

                {/* Education */}
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>Student Developer</h4>
                        <span className="date">SSC | 2019 – Present</span>
                        <p>
                           Focusing on Computer Science fundamentals, algorithm design, and full-stack development.
                        </p>
                    </div>
                </div>

                {/* Future Goal */}
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <h4>Career Objective</h4>
                        <span className="date">Future</span>
                        <p>
                           Aiming to become a Senior Full Stack Engineer, leading teams to build impactful global software solutions.
                        </p>
                    </div>
                </div>

            </div>
          </section>

          {/* --- SECTION 6: CONTACT --- */}
          <section className="text-overlay" id="text-6">
              <h2 className="contact_header">Let's Connect.</h2>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  
                  <div className="form-row">
                      <div className="input-group">
                        <label htmlFor="name" className="visually-hidden" style={{display:'none'}}>Name</label>
                        <input 
                          id="name" name="name" aria-label="Name"
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
                          id="email" name="email" aria-label="Email"
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
                          id="phone" name="phone" aria-label="Phone Number"
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
                          id="company" name="company" aria-label="Company or Organization"
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
                            id="projectType" name="projectType"
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
                            id="budget" name="budget"
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
                      id="message" name="message" aria-label="Message"
                      className={errors.message ? "input-error" : ""}
                      placeholder="Tell me about your project goals..." 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>
                  
                  <button type="submit" className="primary-btn">Send Message</button>
                  <p id="form-message" className={status.includes('Failed') || status.includes('correct') ? "error-msg" : "success-msg"}>
                    {status}
                  </p>
              </form>
          </section>
      </main>
    </div>
  );
}

export default App;
