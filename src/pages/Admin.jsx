import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlants, createPlant, updatePlant, deletePlant } from '../features/plants/plantsSlice'
import '../admin.css'

export default function Admin() {
  const dispatch = useDispatch()
  const { plants, isLoading } = useSelector((state) => state.plants)

  const [editingPlant, setEditingPlant] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: 'Air-Purifying',
    image: '',
    stock: 10,
    careLevel: 'Easy',
    lightRequirement: 'Medium',
    wateringFrequency: 'Weekly',
  })

  useEffect(() => {
    dispatch(getPlants())
  }, [dispatch])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingPlant) {
      await dispatch(updatePlant({ id: editingPlant.id, data: formData }))
    } else {
      await dispatch(createPlant(formData))
    }
    resetForm()
    dispatch(getPlants())
  }

  const handleEdit = (plant) => {
    setEditingPlant(plant)
    setFormData(plant)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this plant?')) {
      await dispatch(deletePlant(id))
      dispatch(getPlants())
    }
  }

  const resetForm = () => {
    setEditingPlant(null)
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      category: 'Air-Purifying',
      image: '',
      stock: 10,
      careLevel: 'Easy',
      lightRequirement: 'Medium',
      wateringFrequency: 'Weekly',
    })
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const totalPlants = plants.length
    const totalStock = plants.reduce((sum, plant) => sum + (plant.stock || 0), 0)
    const lowStockPlants = plants.filter(p => p.stock < 5).length
    const totalValue = plants.reduce((sum, plant) => sum + (plant.price * plant.stock), 0)

    return {
      totalPlants,
      totalStock,
      lowStockPlants,
      totalValue: totalValue.toFixed(2)
    }
  }, [plants])

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">
            <div className="admin-title-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            Admin Dashboard
          </h1>
          <p className="admin-subtitle">Manage your plant inventory and monitor store performance</p>
        </div>

        {/* Statistics Cards */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon primary">
                🌿
              </div>
            </div>
            <p className="stat-value">{stats.totalPlants}</p>
            <p className="stat-label">Total Plants</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon success">
                📦
              </div>
            </div>
            <p className="stat-value">{stats.totalStock}</p>
            <p className="stat-label">Items in Stock</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon warning">
                ⚠️
              </div>
            </div>
            <p className="stat-value">{stats.lowStockPlants}</p>
            <p className="stat-label">Low Stock Items</p>
            <p className="stat-change negative">Stock &lt; 5 units</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon info">
                💰
              </div>
            </div>
            <p className="stat-value">${stats.totalValue}</p>
            <p className="stat-label">Total Inventory Value</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="admin-grid">
          {/* Form Panel */}
          <div className="admin-form-panel">
            <div className="form-panel-header">
              <h2 className="form-panel-title">
                {editingPlant ? (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit Plant
                  </>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add New Plant
                  </>
                )}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-field">
                <label>
                  Plant ID <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  disabled={!!editingPlant}
                  placeholder="snake-plant"
                />
              </div>

              <div className="form-field">
                <label>
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Snake Plant"
                />
              </div>

              <div className="form-field">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the plant's features and care requirements..."
                />
              </div>

              <div className="form-field">
                <label>
                  Price <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  min="0"
                  placeholder="24.99"
                />
              </div>

              <div className="form-field">
                <label>
                  Category <span className="required">*</span>
                </label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="Air-Purifying">Air-Purifying</option>
                  <option value="Low-Light">Low-Light</option>
                  <option value="Pet-Friendly">Pet-Friendly</option>
                  <option value="Succulents">Succulents</option>
                  <option value="Tropical">Tropical</option>
                </select>
              </div>

              <div className="form-field">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/images/plant.jpg"
                />
              </div>

              <div className="form-field">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="form-field">
                <label>Care Level</label>
                <select name="careLevel" value={formData.careLevel} onChange={handleChange}>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="form-field">
                <label>Light Requirement</label>
                <select name="lightRequirement" value={formData.lightRequirement} onChange={handleChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="form-field">
                <label>Watering Frequency</label>
                <input
                  type="text"
                  name="wateringFrequency"
                  value={formData.wateringFrequency}
                  onChange={handleChange}
                  placeholder="Weekly"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-admin primary">
                  {editingPlant ? (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Update Plant
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Plant
                    </>
                  )}
                </button>
                {editingPlant && (
                  <button type="button" className="btn-admin secondary" onClick={resetForm}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Plants List Panel */}
          <div className="plants-list-panel">
            <div className="plants-list-header">
              <h2 className="plants-list-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                All Plants
                <span className="plants-count">{plants.length}</span>
              </h2>
            </div>

            {isLoading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading plants...</p>
              </div>
            ) : plants.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="empty-title">No plants yet</h3>
                <p className="empty-description">Add your first plant using the form on the left</p>
              </div>
            ) : (
              <div className="plants-grid">
                {plants.map((plant) => (
                  <div key={plant.id} className="plant-card">
                    <img src={plant.image} alt={plant.name} className="plant-image" />

                    <div className="plant-info">
                      <h3 className="plant-name">
                        {plant.name}
                        <span className="plant-badge">{plant.category}</span>
                      </h3>
                      <div className="plant-meta">
                        <div className="meta-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                          </svg>
                          <strong>${plant.price}</strong>
                        </div>
                        <div className="meta-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          </svg>
                          Stock: <strong>{plant.stock}</strong>
                        </div>
                        <div className="meta-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                          </svg>
                          {plant.lightRequirement}
                        </div>
                      </div>
                    </div>

                    <div className="plant-actions">
                      <button className="btn-icon edit" onClick={() => handleEdit(plant)} title="Edit plant">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(plant.id)} title="Delete plant">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
