import React from 'react'
import './Cart.css'
import CartCard from './CartCard/CartCard'
import { Button } from '@chakra-ui/react'

const products = [
    {
      id: 1,
      name: 'Red Shirt',
      image: '#',
      price: '₹47,199',
      originalPrice: '₹48,900',
      discount: '5% Off',
      color: 'Orange',
      size: '8 UK',
      imageSrc:
        'http://localhost:3000/1726404391792_670.png',
    },
    {
      id: 2,
      name: 'Black Jeans',
      href: '#',
      price: '₹1,549',
      originalPrice: '₹2,499',
      discount: '38% off',
      color: 'White',
      leadTime: '3-4 weeks',
      size: '8 UK',
      imageSrc:
        'http://localhost:3000/1726404391792_670.png',
    },
    {
      id: 3,
      name: 'Blue Shirt',
      href: '#',
      price: '₹2219 ',
      originalPrice: '₹999',
      discount: '78% off',
      color: 'Black',
      imageSrc:
        'http://localhost:3000/1726404391792_670.png',
    },
  ]

function Cart() {
  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          My Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {products.map((product, productIdx) => (
                <CartCard product={product} key={product.id}/>
              ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price ({products.length} item)</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ 52,398</dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ 48,967</dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ 3,431 on this order
              </div>

              <Button style={{width: '100%'}}
              colorScheme={'teal'}>Check Out</Button>
              
            </div>
            
          </section>
        </form>
      </div>
    </div>
  )
}

export default Cart
