import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import './ProductImagesModal.css'
import { CiCirclePlus } from "react-icons/ci";
import { useRef, useState } from "react";
import { addNewImage } from "../../../../Services/adminServices/productsService";
import { BACKEND } from "../../../../lib/config";
const ProductImagesModal = (props) => {

    const [productImagesArr, setProductImagesArr] = useState([]);
    const [isSaveMode, setIsSaveMode] = useState(false);
    const [imgFile, setImgFile] = useState(null);

    const { isOpen, onClose } = useDisclosure({ 
        isOpen: props.isOpen,
        onClose: () => {
            productImagesArr.forEach(item => URL.revokeObjectURL(item));
        }
     });


    const toast = useToast();

    let addproductImageInputRef = useRef(null);

    //methord for adding images
    const addImage = () => {
        addproductImageInputRef.current.click()
    }

    //methord runs on image change
    const onImageChange = (e) => {
        const imageSrc = e.target.files[0];

        if (imageSrc.type !== 'image/png' && imageSrc.type !== 'image/jpeg' && imageSrc.type !== 'image/jpg' && imageSrc.type !== 'image/webp') {
            toast({
                title: 'Invalid File Type only .png, .jpg or .webp are allowed',
                status: 'error',
                isClosable: true
            })
            return;
        }

        if (imageSrc) {

            setImgFile(imageSrc);
            setIsSaveMode(true);
            const blobUrl = URL.createObjectURL(imageSrc);
            setProductImagesArr(prev => {
                prev.push(blobUrl)
                return prev;
            });
        }
    }

    const saveProdImage = async () => {
        try {
            const formData = new FormData();
            formData.append('prodImage', imgFile);

            const res = await addNewImage(props.productDetails._id, formData);

            if (res) {
                toast({
                    title: 'Image added Successfully',
                    status: 'success',
                    isClosable: true
                })
            }
        } catch (err) {
            console.log(err);
            toast({
                title: 'Error in saving image',
                status: 'error',
                isClosable: true
            });
        }
    }

    return (
        <Modal size='xl' isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="add-images-modal-content">
                <ModalHeader className="product-modal-header">Product Images<ModalCloseButton onClick={() => props.setIsOpen(false)} /></ModalHeader>
                <ModalBody >
                    <h4 className="modal-subhead">Main Image</h4>
                    <div className="modal-main-image-container">
                        {/* <div className="update-image-div">
                            <div className=""></div> */}
                        {/* <Button colorScheme='purple' size='sm'>Update Image</Button> */}
                        {/* <Button colorScheme='blue' size='sm'>Save</Button>
                        </div> */}
                        {console.log(props)}
                        <div className="main-image"
                            style={{
                                backgroundImage: `url(${BACKEND.API_URL}/products/productimage/${props.productDetails.mainImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                        </div>
                    </div>
                    <h4 className="modal-subhead">Product Images</h4>
                    <div className="modal-product-images-container">
                        <div className="product-images">
                            {
                                console.log(productImagesArr.length)
                            }
                            {
                                productImagesArr.map((item, index) => (
                                    <div key={index} className="product-image-item" style={{
                                        backgroundImage: `url(${item})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}>
                                        {console.log('insiderender', productImagesArr.length)}
                                    </div>
                                )
                                )
                            }

                            {!isSaveMode ? <CiCirclePlus className="text-5xl add-more-icon" onClick={addImage} /> : <Button colorScheme='blue' my={4} size='xs' onClick={saveProdImage}>Save</Button>}
                        </div>
                        {/* <div className="product-images-preview">

                        </div> */}
                    </div>
                    <Input className='hidden-element' type='file' ref={addproductImageInputRef} onChange={onImageChange} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductImagesModal;