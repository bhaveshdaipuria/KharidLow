import React from 'react';
import './Checkout.css';
import AddAddressForm from '../../comman/AddAddressForm/AddAddressForm';
import { Form } from 'react-router-dom';
import { Button, FormControl, FormLabel, Radio, Stack } from '@chakra-ui/react';
import { FaCirclePlus } from 'react-icons/fa6';
import { CiCirclePlus } from 'react-icons/ci';

function Checkout() {
  return (
    <div className='mx-5'>
      <h2 className='checkout-head'>Checkout</h2>
      <hr className="line-beaker" />
      <AddAddressForm />
      <hr className="line-beaker" />

      <div className="address-list-container">
        <h3 className="address-list-head">Choose Adress of Delivery</h3>
        <div className="address-list">
          <FormControl>
            <Stack>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br/>
                  Springfield, ST 12345<br/>
                  United States
                </Radio>
              </div>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br/>
                  Springfield, ST 12345<br/>
                  United States
                </Radio>
              </div>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br/>
                  Springfield, ST 12345<br/>
                  United States
                </Radio>
              </div>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br/>
                  Springfield, ST 12345<br/>
                  United States
                </Radio>
              </div>
            </Stack>
          </FormControl>
          <CiCirclePlus title='Add New Address' className='text-3xl'></CiCirclePlus>
        </div>

        <Button colorScheme='teal' my={4}>Complete Order</Button>
      </div>
    </div>
  )
}

export default Checkout
