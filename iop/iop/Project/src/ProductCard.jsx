import React from 'react'

export default function ProductCard({ item, onOpen }) {
  return (
    <article className="product-card vertical">
      <div className="product-body vertical-body">
        <div className="product-meta">
          <h3 className="product-title">{item.title}</h3>
          <p className="product-desc">{item.desc}</p>
        </div>
        <div className="product-actions">
          <button className="btn ghost" onClick={() => onOpen(item)}>View</button>
          <button className="btn primary">Apply</button>
        </div>
      </div>
    </article>
  )
}
