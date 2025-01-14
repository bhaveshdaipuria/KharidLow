import './ProductPreviewModal.css'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ProductDetails from '../../../../Components/ProductDetails/ProductDetails';
const ProductPreviewModal = (props) => {

    const closeModal = () => {
        props.setIsOpen(false);
    }

    const {isOpen, onClose} = useDisclosure({isOpen: props.isOpen});

    return (
        <Modal size='full' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="product-preview-modal-content">
            <ModalCloseButton onClick={closeModal} />
                <ModalBody >
                    <h4 className="modal-subhead">Product preview</h4>
                    <ProductDetails productDetails={props.productDetails}></ProductDetails>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductPreviewModal;