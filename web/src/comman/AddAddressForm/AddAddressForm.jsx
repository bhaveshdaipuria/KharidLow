import React from 'react';
import './AddAddressForm.css'
import { Button, FormControl, Input } from '@chakra-ui/react';
import { FormLabel } from 'react-bootstrap';

const AddAddressForm = () => {
  return (
    <div className='w-full px-4'>
      <h3 className='add-address-head'>Add Address</h3>
      <form className="add-address-form grid grid-cols-2 gap-6 md:grid-cols-2 my-6">
        <FormControl isRequired>
            <FormLabel>Address Line 1</FormLabel>
            <Input/>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Address Line 2</FormLabel>
            <Input/>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <Input/>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>District</FormLabel>
            <Input/>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Pincode</FormLabel>
            <Input/>
        </FormControl>

        <div className="submit-btn col-span-2">
            <Button className='' colorScheme='teal' type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default AddAddressForm
