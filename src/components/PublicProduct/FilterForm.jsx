import React from 'react'

function FilterForm({ sizeL, sizeM, sizeXL, sizeXS, sizeS,
     setSizeL, setSizeM, setSizeXL, setSizeXS, setSizeS, handleSubmit,
      selectedPrice, setSelectedPrice, resetUrl }) {
  return (
    <div className="filter-div">
    <h3>Filters</h3>
       <form onSubmit={handleSubmit}>
          <div className="sizes">
             <h3>Filter by size</h3>
                <div className="sizes-container">
                   <span>
                      <label htmlFor="S">S</label>
                      <input type="checkbox" value={sizeS}  onChange={e => setSizeS(true)} name="size" id="M" />
                   </span>
                   <span>
                      <label htmlFor="XS">XS</label>
                      <input type="checkbox" value={sizeXS} name="size" id="XS" onChange={e => setSizeXS(true)} />
                   </span> 
                   <span>
                      <label htmlFor="M">M</label>
                      <input type="checkbox" value={sizeM}  onChange={e => setSizeM(true)} name="size" id="M" />
                   </span> 
                   <span>
                      <label htmlFor="L">L</label>
                      <input type="checkbox" value={sizeL} name="size" onChange={e => setSizeL(true)} id="L" />
                   </span> 
                   <span>
                      <label htmlFor="XL">XL</label>
                      <input type="checkbox" name="size" value={sizeXL} id="XL" onChange={e => setSizeXL(true)} />
                   </span> 
                </div>
          </div>
          <div className="price">
              <h3>Filter by price</h3>
              <div className="price-range-container">
                   <input type="range"  value={selectedPrice} id="selected-price" min="2" max="500" onChange={(e) => setSelectedPrice(e.target.value)}/>
                   <label htmlFor="selected-price">${selectedPrice}</label>
              </div>
          </div>
          <button className='filter-button'>apply filter</button>
          <button onClick={resetUrl}>reset filter</button>
       </form>
 </div>
  )
}

export default FilterForm