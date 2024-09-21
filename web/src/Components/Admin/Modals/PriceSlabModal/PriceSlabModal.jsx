import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import "./PriceSlabModal.css";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
const PriceSlabModal = (props) => {
  const [priceSlabForm, setPriceSlabForm] = useState({
    moq: 0,
    price: 0,
  });

  //methord for handling input
  const handleNumberInputChange = (e, name) => {
    const value = e;
    setPriceSlabForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const id = 11;
  };

  const closeModal = () => {
    props.setIsOpen(false);
  };

  return (
    <Modal size="xl" isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent className="price-slab-modal-content">
        <ModalHeader className="product-modal-header">
          Product Price Slabs
          <ModalCloseButton onClick={closeModal} />
        </ModalHeader>
        <ModalBody>
          <h4 className="modal-subhead">Add Price Slab</h4>

          <form
            className="grid grid-cols-1 gap-3 md:grid-cols-2"
            encType="Multipart/form-data"
            onSubmit={onSubmit}
          >
            <FormControl size="sm" isRequired>
              <FormLabel className="form-label-sm">MOQ</FormLabel>
              <NumberInput
                size="sm"
                onChange={(e) => {
                  handleNumberInputChange(e, "moq");
                }}
              >
                <NumberInputField placeholder="MOQ" />
                <NumberInputStepper size="sm">
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl size="sm" isRequired>
              <FormLabel className="form-label-sm">Price</FormLabel>
              <NumberInput
                size="sm"
                onChange={(e) => {
                  handleNumberInputChange(e, "price");
                }}
              >
                <NumberInputField placeholder="Price" />
                <NumberInputStepper size="sm">
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <div className="col-span-1 md:col-span-3">
              <Button
                className="add-product-submit-btn"
                mt={1}
                colorScheme="blue"
                size="sm"
                type="submit"
              >
                {" "}
                Save
              </Button>
            </div>
          </form>

          <h4 className="modal-subhead">Size List</h4>
          <div className="product-table-container">
            <main className="product-table-main">
              <div className="product-table-wrapper">
                <div className="product-table-card">
                  <header className="product-table-header">
                    <h2 className="price-slab-table-head">Product Size List</h2>
                    <div className="table-operations">
                      <div className="search-filters grid gap-2 grid-cols-2 ">
                        <div className="search-filter-input">
                          <FaMagnifyingGlass className="text-sm search-icon" />
                          <Input placeholder="Search" size="xs" />
                        </div>

                        <Select placeholder="Filter" size="xs">
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
                            <th>MOQ</th>
                            <th>Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr></tr>
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
  );
};

export default PriceSlabModal;
