import React, { useState } from 'react';
import './AddAddressForm.css'
import { Button, FormControl, FormErrorMessage, FormLabel, Input, useToast } from '@chakra-ui/react';
import { addAddress } from '../../Services/userServices/userService';
import Loader from '../../comman/Loader/Loader';

const AddAddressForm = ({refreshAddressList}) => {

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const [addAddressForm, setAddAddressForm] = useState({
    address_line_1: '',
    address_line_2: '',
    state: '',
    district: '',
    pincode: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      
      const res = await addAddress(addAddressForm);

      if(res){
        setAddAddressForm((prev) => {
          const keys = Object.keys(prev);

          keys.forEach(() => prev[keys] = '');

          return prev;
        });
        toast({
          title: 'Address Added Successfully',
          status: 'success',
          isClosable: true
        });

        refreshAddressList && refreshAddressList();
      }
    } catch(error) {
      console.log(error);
    } finally{
      setSubmitted(false);
      setLoading(false);
    }
  
  }

  const checkValidation = () => {
    setSubmitted(true);
  }

  return (
    <div className='w-full px-4'>
      <h3 className='add-address-head'>Add Address</h3>
      <form className="add-address-form grid grid-cols-2 gap-6 md:grid-cols-2 my-6" onSubmit={onSubmit}>
        <FormControl isRequired isInvalid={submitted && !addAddressForm.address_line_1}>
            <FormLabel className='form-label-sm'>Address Line 1</FormLabel>
            <Input value={addAddressForm.address_line_1} name='address_line_1' onChange={handleInputChange}/>
            <FormErrorMessage>Address Line 1 is Required</FormErrorMessage>
        </FormControl>
        <FormControl>
            <FormLabel className='form-label-sm'>Address Line 2</FormLabel>
            <Input value={addAddressForm.address_line_2} name='address_line_2' onChange={handleInputChange}/>
        </FormControl>
        <FormControl isRequired isInvalid={submitted && !addAddressForm.state}>
            <FormLabel className='form-label-sm'>State</FormLabel>
            <Input value={addAddressForm.state} name='state' onChange={handleInputChange}/>
            <FormErrorMessage>State is Required</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={submitted && !addAddressForm.district}>
            <FormLabel className='form-label-sm'>District</FormLabel>
            <Input value={addAddressForm.district} name='district' onChange={handleInputChange}/>
            <FormErrorMessage>District is Required</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={submitted && !addAddressForm.pincode}>
            <FormLabel className='form-label-sm'>Pincode</FormLabel>
            <Input value={addAddressForm.pincode} name='pincode' onChange={handleInputChange}/>
            <FormErrorMessage>Pincode is Required</FormErrorMessage>
        </FormControl>

        <div className="submit-btn col-span-2">
            <Button className='' colorScheme='teal' type='submit' onClick={checkValidation}>Submit</Button>
        </div>
      </form>

      <Loader show={loading}/>
    </div>
  )
}

export default AddAddressForm;
