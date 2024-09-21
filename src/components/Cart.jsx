import PropTypes from 'prop-types';

const Cart = ({cart, quantities, deletItem, confirmOrder}) => {
 
  function getTotal(){
    return cart.reduce((acc, curr)=> acc + curr.price * (quantities[curr.name] || 1) ,0).toFixed(2);
  }

  function getTotalItems(){
    return cart.reduce((acc, curr)=> acc + (quantities[curr.name] || 1), 0);
  }

  return (
    <div className="w-full mt-8 md:mt-0 md:w-1/4 bg-white rounded-md p-4">

       <h1 className="text-2xl font-bold text-red">Your Cart ({getTotalItems()}) </h1>
       {/* for listing elements in the cart */}
       {
        getTotalItems()===0 &&
        <div className='flex flex-col items-center'>
          <img src="./assets/images/illustration-empty-cart.svg" alt="empty cart illustration" className='mt-8 mb-4' />
          <p className='text-Rose500 font-semibold'>Your added items will appear here</p>
        </div>
       }
       
       { getTotalItems()>0 && 
        cart.map((item)=>
          <div key={item.name} className="mt-5 py-4 flex justify-between items-center border-b border-b-Rose100">
        <div className="flex flex-col">
          <span className="font-semibold mb-1 text-Rose900">{item.name}</span>
          <div className="flex">
            <span className="text-red mr-3 font-semibold">{quantities[item.name] || 1}x </span>
            <span className="mr-2 text-Rose400">@ ${item.price.toFixed(2)} </span>
            <span className="text-Rose400 font-semibold">${(item.price * (quantities[item.name] || 1)).toFixed(2)}</span>
          </div>
        </div>
        <button onClick={() => deletItem(item.name)} className="rounded-full border-2 border-Rose300 p-1 h-fit hover:border-Rose400 group transition duration-300">
          <svg  xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path className="group-hover:fill-Rose400" fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
        </button>
       </div>
        )
       }
       
       {/* for total */}
       {(getTotalItems()>0) &&  <>
        <div className="flex justify-between items-center py-7">
          <span className="text-Rose500">Order Total</span>
          <span className="text-2xl text-Rose900 font-bold">${getTotal()}</span>
        </div>
        <div className="flex gap-2 justify-center py-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
          <span className="text-Rose900">this is a <span className="font-bold">carbon-neutral</span> delivery</span>
        </div>
        <button onClick={confirmOrder} className="mt-6 bg-red text-Rose100 w-full py-4 rounded-full font-semibold hover:bg-darkRed transition duration-300">Confirm Order</button>
       </>
       }
      </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired
    })
  ).isRequired,
  quantities: PropTypes.object,
  deletItem: PropTypes.array,
  confirmOrder: PropTypes.func
};

export default Cart
