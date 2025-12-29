import React from 'react'
import ProductCard from './ProductCard'

const SAMPLE = [
  { id: 1, title: 'Old Age Pension', desc: 'Support for seniors meeting income and residency criteria.', image: '/public/placeholder-1.png' },
  { id: 2, title: 'Disability Allowance', desc: 'Monthly assistance for citizens with qualifying disabilities.', image: '/public/placeholder-2.png' },
  { id: 3, title: 'Child Support', desc: 'Benefits for families with dependent children under 18.', image: '/public/placeholder-3.png' },
]

export default function Products({ openProduct }) {
  return (
    <div className="products-page">
      <header className="products-header">
        <h2>Available Programs</h2>
        <p className="muted">Browse common government schemes and check eligibility.</p>
      </header>

      <div className="products-list">
        {SAMPLE.map((s) => (
          <ProductCard key={s.id} item={s} onOpen={openProduct} />
        ))}
      </div>
    </div>
  )
}
