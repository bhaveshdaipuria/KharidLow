import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import './ProductImagesModal.css'
import { CiCirclePlus } from "react-icons/ci";
import { useRef, useState } from "react";
const ProductImagesModal = () => {

    const [mainImage, setMainImage] = useState('');
    const [productImagesArr, setProductImagesArr] = useState([]);
    const [previewImage, setpreviewImage] = useState('');
    const [isSaveMode, setIsSaveMode] = useState(false);

    let addproductImageInputRef = useRef(null);

    //methord for adding images
    const addImage = () => {
        addproductImageInputRef.current.click()
    }

    //methord runs on image change
    const onImageChange = (e) => {
        const imageSrc = e.target.files[0];

        if (imageSrc) {

            const reader = new FileReader();

            reader.onloadend = () => {
                console.log(reader.result)
                const arr = productImagesArr;
                arr.push(reader.result);
                setProductImagesArr(arr);

                console.log(productImagesArr)
            }

            reader.readAsDataURL(imageSrc);
        }
    }

    return (
        <Modal size='xl' isOpen={true}>
            <ModalOverlay />
            <ModalContent className="add-images-modal-content">
                <ModalHeader className="product-modal-header">Product Images  <ModalCloseButton /></ModalHeader>
                <ModalBody >
                    <h4 className="modal-subhead">Main Image</h4>
                    <div className="modal-main-image-container">
                        {/* <div className="update-image-div">
                            <div className=""></div> */}
                        {/* <Button colorScheme='purple' size='sm'>Update Image</Button> */}
                        {/* <Button colorScheme='blue' size='sm'>Save</Button>
                        </div> */}
                        <div className="main-image">

                        </div>
                    </div>
                    <h4 className="modal-subhead">Product Images</h4>
                    <div className="modal-product-images-container">
                        <div className="product-images">
                            {
                                productImagesArr.map((item, index) => {
                                    console.log(index);
                                    return(
                                        <div key={index} className="product-image-item"  style={{
                                            backgroundImage: `url(${productImagesArr[index]})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}></div>
                                    )
                                   
                                })
                            }

                            {!isSaveMode ? <CiCirclePlus className="text-5xl add-more-icon" onClick={addImage} /> : <Button colorScheme='blue' my={4} size='xs'>Save</Button>}
                        </div>
                        <div className="product-images-preview">

                        </div>
                    </div>
                    <Input className='hidden-element' type='file' ref={addproductImageInputRef} onChange={onImageChange} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductImagesModal;