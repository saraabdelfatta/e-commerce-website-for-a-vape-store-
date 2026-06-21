import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';

const INITIAL_FORM = {
  name: '',
  category: 'devices',
  price: '',
  image: '',
  battery: '',
  capacity: '',
  resistance: '',
  flavors: '',
  nicotine: '',
  description: ''
};

export const AddProductForm = () => {
  const { addProduct } = useProducts();
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const flavors = form.flavors
      ? form.flavors.split(',').map(f => f.trim()).filter(Boolean)
      : ['N/A'];
    const nicotineLevels = form.nicotine
      ? form.nicotine.split(',').map(n => n.trim()).filter(Boolean)
      : ['N/A'];

    addProduct({
      name: form.name,
      category: form.category,
      price: parseInt(form.price),
      image: form.image,
      battery: form.battery || 'N/A',
      capacity: form.capacity || 'N/A',
      resistance: form.resistance || 'N/A',
      description: form.description,
      flavors,
      nicotineLevels
    });

    setForm(INITIAL_FORM);
    alert('Vape product successfully added to store!');
  };

  return (
    <div className="admin-column-card">
      <h3 className="admin-card-title">🆕 Add New Vape Product</h3>
      <form id="adminAddProductForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Al Fakher Crown Bar 8000 Puffs"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-input" name="category" value={form.category} onChange={handleChange} required>
              <option value="devices">Devices</option>
              <option value="disposables">Disposables</option>
              <option value="eliquids">E-Liquids</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Price (EGP)</label>
            <input
              type="number"
              className="form-input"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="1100"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-input"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
            placeholder="https://www.betavape.com/wp-content/..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Battery Capacity</label>
            <input
              type="text"
              className="form-input"
              name="battery"
              value={form.battery}
              onChange={handleChange}
              placeholder="e.g. 600mAh or N/A"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fluid Capacity</label>
            <input
              type="text"
              className="form-input"
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="e.g. 18ml or N/A"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Resistance / Coils</label>
          <input
            type="text"
            className="form-input"
            name="resistance"
            value={form.resistance}
            onChange={handleChange}
            placeholder="e.g. 0.6 ohm mesh or N/A"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Flavors (comma separated)</label>
          <input
            type="text"
            className="form-input"
            name="flavors"
            value={form.flavors}
            onChange={handleChange}
            placeholder="Peach Ice, Grape Ice, Two Apple"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nicotine Levels (comma separated)</label>
          <input
            type="text"
            className="form-input"
            name="nicotine"
            value={form.nicotine}
            onChange={handleChange}
            placeholder="5% (50mg), 2% (20mg)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Product Description</label>
          <textarea
            className="form-input"
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ height: '80px', resize: 'none' }}
            required
            placeholder="Enter device details..."
          />
        </div>

        <button type="submit" className="btn-admin-submit">Add Product to Store</button>
      </form>
    </div>
  );
};
export default AddProductForm;
