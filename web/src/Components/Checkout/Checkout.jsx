import React, { useEffect, useState } from 'react';
import './Checkout.css';
import AddAddressForm from '../../comman/AddAddressForm/AddAddressForm';
import { Form } from 'react-router-dom';
import { Button, FormControl, FormHelperText, FormLabel, Radio, Stack, useToast } from '@chakra-ui/react';
import { FaCirclePlus } from 'react-icons/fa6';
import { CiCirclePlus } from 'react-icons/ci';
import Loader from '../../comman/Loader/Loader';
import ConfirmationModal from '../../Components/Admin/Modals/ConfirmationModal/ConfirmationModal';

function Checkout() {

  const [isAddressFormVisible, setIsAddressformVisible] = useState(false);
  const [user, setUser] = useState({});
  const [selectedAddress, setSelectedAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnterOtpVisible, setIsEnterOtpVisible] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const toast = useToast();

  useEffect(() => {

    const getUser = async () => {
      if (!user || !user.address || !user.address.length) {
        setIsAddressformVisible(true);
      }
    }
    getUser();

  }, []);

  const checkOut = () => {
    try {

      setIsConfirmationModalOpen(true);

      if (!selectedAddress) {
        toast({
          title: 'Please Select Address of Delivery',
          status: 'info',
          isClosable: true
        });
        return
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const bookOrder = () => {
    
  }

  return (
    <div className='mx-5'>
      <h2 className='checkout-head'>Checkout</h2>
      <hr className="line-beaker" />
      <div className="address-list-container my-3">
        <h3 className="address-list-head">Choose Adress of Delivery</h3>
        <div className="address-list">
          <FormControl>
            <Stack>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br />
                  Springfield, ST 12345<br />
                  United States
                </Radio>
              </div>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br />
                  Springfield, ST 12345<br />
                  United States
                </Radio>
              </div>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br />
                  Springfield, ST 12345<br />
                  United States
                </Radio>
              </div>
              <div className="address-radio">
                <Radio size='md' name='1' colorScheme='green'>
                  123 Maple Lane<br />
                  Springfield, ST 12345<br />
                  United States
                </Radio>
              </div>
            </Stack>
          </FormControl>
          <CiCirclePlus title='Add New Address' className={`text-3xl ${isAddressFormVisible && 'close-address-form-icon'}`} onClick={() => setIsAddressformVisible(!isAddressFormVisible)}></CiCirclePlus>
        </div>

      </div>
      <hr className="line-beaker" />
      {isAddressFormVisible ? <AddAddressForm /> : ''}
      <Button colorScheme='teal' my={4} onClick={checkOut}>Complete Order</Button>
      <Loader show={loading} />

      {/* Modals */}
      {isConfirmationModalOpen && <ConfirmationModal onConFirmation={bookOrder} isOpen={isConfirmationModalOpen} setIsOpen={setIsConfirmationModalOpen} />}
    </div>
  )
}

export default Checkout
