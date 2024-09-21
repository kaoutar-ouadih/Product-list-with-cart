import './App.css'
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import {products} from './data'
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [activeBtns, setActiveBtns] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function addToCart(item) {
    setActiveBtns([...activeBtns, item.name]);
    setCart([...cart, item]);
  }

  function deletItem(name){
    const updatedCart = cart.filter((item) => item.name !== name);
    setCart(updatedCart);

    const updatedActiveButtons = activeBtns.filter((item) => item !== name);
    setActiveBtns(updatedActiveButtons);
    quantities[name] = 1;
    setQuantities(quantities);
  }

  function incrementQuantity(name){
    setQuantities(prev => ({
      ...prev,
      [name]: (quantities[name] || 1) +1
      
    }));
  }

  function decrementQuantity(name){
      setQuantities(prev => ({
        ...prev,
        [name]: (quantities[name] || 1) -1
        
      }));
  }

  function getTotal(){
    return cart.reduce((acc, curr)=> acc + curr.price * (quantities[curr.name] || 1) ,0).toFixed(2);
  }

  function confirmOrder(){
    setIsConfirmed(true);
  }

  function startNewOrder(){
    setIsConfirmed(false);
    setCart([]);
    setActiveBtns([]);
    setQuantities({});
  }

  return (
    <div className='flex flex-col md:flex-row p-16 relative bg-Rose50'>
      <ProductList products={products} quantities={quantities} activeBtns={activeBtns} addToCart={addToCart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} />
      <Cart cart={cart} quantities={quantities}  deletItem={deletItem} confirmOrder={confirmOrder}/>
      {/* confirm order */}
      {isConfirmed && 
      <div className='absolute top-0 left-0 z-10 flex justify-center items-center w-full min-h-screen'>
        <div className=' bg-white p-8 rounded-lg w-[90%] sm:w-[500px] fixed'>
          <svg className='mb-6' width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/><path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/></svg>
          <h1 className='text-4xl font-bold text-Rose900 mb-3'>Order Confirmed</h1>
          <p className='text-Rose400 mb-6'>we hope you enjoy your food!</p>
          <div className='bg-Rose50 rounded-lg'>
            {
              cart.map((item)=>(
                <div key={item.name} className='flex gap-4 items-center justify-between p-3 border-b border-b-Rose100'>
                  <img src={item.image.desktop} className='w-[50px] h-[50px] rounded-md' alt="dish image" />
                  <div className='grow'>
                    <h4 className="font-semibold mb-1 text-Rose900">{item.name}</h4>
                    <span className="text-red mr-3 font-semibold">{quantities[item.name] || 1}x</span>
                    <span className="mr-2 text-Rose400">@ ${item.price.toFixed(2)} </span>
                  </div>
                  <span className="font-semibold mb-1 text-Rose900">${(item.price * (quantities[item.name] || 1)).toFixed(2)}</span> 
                </div>
              ))
            }
            {/* for total */}
            <div className="flex justify-between items-center py-7">
                  <span className="text-Rose500">Order Total</span>
                  <span className="text-2xl text-Rose900 font-bold">${getTotal()}</span>
                </div>
          </div>
          <button onClick={startNewOrder} className="mt-6 bg-red text-Rose100 w-full py-4 rounded-full font-semibold hover:bg-darkRed transition duration-300">Start New Order</button>
        </div>
      </div>}
    </div>
  )
}

export default App
