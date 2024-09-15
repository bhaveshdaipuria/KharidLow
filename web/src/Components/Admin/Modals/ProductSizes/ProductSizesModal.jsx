import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";
import './ProductSizesModal.css'
import { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
const ProductSizesModal = () => {

    return (
        <Modal size='xl' isOpen={true}>
            <ModalOverlay />
            <ModalContent className="add-size-modal-content">
                <ModalHeader className="product-modal-header">Product Sizes  <ModalCloseButton /></ModalHeader>
                <ModalBody >
                    <h4 className="modal-subhead">Add Size</h4>

                    <form className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <FormControl size='sm' isRequired>
                            <FormLabel className='form-label-xs'>Product size</FormLabel>
                            <NumberInput size='xs'>
                                <NumberInputField placeholder='Product size' />
                                <NumberInputStepper size='xs'>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel className='form-label-xs'>Product price</FormLabel>
                            <NumberInput size='xs'>
                                <NumberInputField placeholder='Product price' />
                                <NumberInputStepper size='xs'>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <div className="col-span-1 md:col-span-3">
                            <Button className='add-product-submit-btn'
                                mt={1}
                                colorScheme='blue'
                                size='sm'
                                type='submit'> Save</Button>
                        </div>

                    </form>

                    <h4 className="modal-subhead">Size List</h4>
                    <div className="product-table-container">
                        <main className="product-table-main">
                            <div className="product-table-wrapper">
                                <div className="product-table-card">
                                    <header className="product-table-header">
                                        <h2>Product Size List</h2>
                                        <div className="table-operations grid grid-cols-1 md:grid-cols-2 gap-2">
                                            
                                            <div className="search-filters grid gap-2 grid-cols-2 ">
                                                <div className="search-filter-input">
                                                    <FaMagnifyingGlass className='text-sm search-icon' />
                                                    <Input placeholder='Search' size='xs' />
                                                </div>

                                                <Select placeholder='Filter' size='xs'>
                                                    <option>United Arab Emirates</option>
                                                    <option>Nigeria</option>
                                                </Select>

                                            </div>
                                        </div>
                                    </header>
                                    <div className="product-table-content">
                                        <div className="product-table-table-container">
                                            <table className="product-table-table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Size</th>
                                                        <th>Price</th>
                                                        <th>SKU</th>
                                                        <th>Stock Quantity</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductSizesModal;