import React, { useState, useEffect } from 'react';
import { getProjects, saveProjects } from '../data/projects';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    demoUrl: '',
    repoUrl: '',
    imageUrl: ''
  });

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies ? project.technologies.join(', ') : '',
      demoUrl: project.demoUrl || '',
      repoUrl: project.repoUrl || '',
      imageUrl: project.imageUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const newProjects = projects.filter(p => p.id !== id);
      setProjects(newProjects);
      saveProjects(newProjects);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProject = {
      id: editingId || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      demoUrl: formData.demoUrl,
      repoUrl: formData.repoUrl,
      imageUrl: formData.imageUrl
    };

    let newProjects;
    if (editingId) {
      newProjects = projects.map(p => p.id === editingId ? newProject : p);
    } else {
      newProjects = [newProject, ...projects];
    }

    setProjects(newProjects);
    saveProjects(newProjects);
    
    // Reset form
    setEditingId(null);
    setFormData({ title: '', description: '', technologies: '', demoUrl: '', repoUrl: '', imageUrl: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple hardcoded auth for demonstration
    if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="container animate-fade-in" style={{ padding: '10rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Login</h2>
          {loginError && <p style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{loginError}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                value={loginForm.username} 
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} 
                className="form-input" 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                value={loginForm.password} 
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                className="form-input" 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Login
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        
        {/* Form Section */}
        <section>
          <div className="glass-panel" style={{ position: 'sticky', top: '2rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="form-textarea" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input 
                  type="url" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Technologies (comma separated)</label>
                <input 
                  type="text" 
                  name="technologies" 
                  value={formData.technologies} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  placeholder="React, Node.js, Express"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Live Demo URL</label>
                <input 
                  type="url" 
                  name="demoUrl" 
                  value={formData.demoUrl} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Source Code Repo URL</label>
                <input 
                  type="url" 
                  name="repoUrl" 
                  value={formData.repoUrl} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingId ? 'Update Project' : 'Save Project'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    setEditingId(null);
                    setFormData({ title: '', description: '', technologies: '', demoUrl: '', repoUrl: '', imageUrl: '' });
                  }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* List Section */}
        <section>
          <h2 style={{ marginBottom: '2rem' }}>Manage Projects</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map(project => (
              <div key={project.id} className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {project.technologies?.join(', ')}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => handleEdit(project)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {projects.length === 0 && (
              <p style={{ color: 'var(--text-secondary)' }}>No projects found. Add one to get started.</p>
            )}
          </div>
        </section>
        
      </div>
    </main>
  );
};

export default Admin;
