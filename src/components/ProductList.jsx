import PropTypes from 'prop-types';

const ProductList = ({products, addToCart, decrementQuantity, incrementQuantity, activeBtns, quantities}) => {

  return (
    <div className="w-full md:w-3/4">
        <h1 className="text-4xl font-bold mb-8 text-Rose900">Desserts</h1>
        <div className="flex gap-6 flex-wrap gap-y-9">
          {
            products.map((item)=> 
              <div key={item.name} className="w-full sm:w-[45%] lg:w-[30%]">
                <div className='relative'>
                  <img src={item.image.desktop} alt="waffle" className="rounded-lg mb-10" />
                  {/* to add items to cart */}
                  <button aria-labelledby='add-to-cart-btn' onClick={() => addToCart(item)} style={{display: activeBtns.includes(item.name)? 'none': 'flex'}} className="bg-white absolute -bottom-[20px] left-[5%] right-[5%] z-10 flex gap-2 items-center font-semibold border border-rose-900 rounded-full py-3 text-Rose900 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clipPath="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
                    <span id='add-to-cart-btn'>Add to Cart</span>
                  </button>
                  {/* to manage quantity of items */}
                  <div style={{display: activeBtns.includes(item.name)? 'flex': 'none'}} className="bg-red absolute -bottom-[20px] left-[5%] right-[5%] z-10 flex gap-2 items-center font-semibold border border-rose-900 rounded-full py-3 text-Rose900 justify-center">
                    <span className='flex justify-between w-full px-4' style={{display:  activeBtns.includes(item.name)? 'flex': 'none'}}>
                      {/* to decrement quantity */}
                      <span role='button' tabIndex={0} aria-label='decrement quantity' onKeyDown={() => {if(event.key==="Enter"){decrementQuantity(item.name)}}} onClick={() => decrementQuantity(item.name)} className="rounded-full border-2 border-white px-1 py-2  h-fit hover:bg-white group transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path className='group-hover:fill-red' fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                      </span>
                      <span className='text-white'>{quantities[item.name] || 1}</span>
                      {/* to increment quantity */}
                      <span role='button' tabIndex={0} aria-label='increment quantity' onKeyDown={() => {if(event.key==="Enter"){incrementQuantity(item.name)}}} onClick={() => {incrementQuantity(item.name)}} className="rounded-full border-2 border-white px-1 py-1  h-fit hover:bg-white group transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path className='group-hover:fill-red' fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                      </span>
                    </span>
                  </div>
                </div>
                <span>{item.category}</span>
                <h4 className="text-xl font-semibold my-1 text-Rose900">{item.name}</h4>
                <span className="block text-red font-semibold text-xl">${item.price.toFixed(2)}</span>
                
              </div> 
            )
          }
        </div>
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired
    })
  ).isRequired,
  addToCart: PropTypes.func,
  decrementQuantity: PropTypes.func,
  incrementQuantity: PropTypes.func,
  activeBtns: PropTypes.array,
  quantities: PropTypes.array
};

export default ProductList