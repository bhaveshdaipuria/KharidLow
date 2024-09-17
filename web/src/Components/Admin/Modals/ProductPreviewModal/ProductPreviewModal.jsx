import './ProductPreviewModal.css'
import { useState } from "react";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import ProductDetails from '../../../../Components/ProductDetails/ProductDetails';
const ProductPreviewModal = (props) => {

    const [priceSlabForm, setPriceSlabForm] = useState({
        moq: 0,
        price: 0
    });

    const closeModal = () => {
        props.setIsOpen(false);
    }

    return (
        <Modal size='full' isOpen={props.isOpen}>
            <ModalOverlay />
            <ModalContent className="product-preview-modal-content">
            <ModalCloseButton onClick={closeModal} />
                <ModalBody >
                    <h4 className="modal-subhead">Product preview</h4>
                    <ProductDetails></ProductDetails>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductPreviewModal;