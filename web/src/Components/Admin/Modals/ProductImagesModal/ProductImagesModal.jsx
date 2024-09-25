import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import './ProductImagesModal.css'
import { CiCirclePlus } from "react-icons/ci";
import { useRef, useState } from "react";
import { addNewImage } from "../../../../Services/adminServices/productsService";
const ProductImagesModal = (props) => {

    const [mainImage, setMainImage] = useState('');
    const [productImagesArr, setProductImagesArr] = useState([]);
    const [previewImage, setpreviewImage] = useState('');
    const [isSaveMode, setIsSaveMode] = useState(false);
    const [imgFile, setImgFile] = useState(null);

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

            const reader = new FileReader();

            setImgFile(imageSrc);
            setIsSaveMode(true);

            reader.onloadend = () => {
                console.log(reader.result)
                const arr = productImagesArr;
                // arr.push(reader.result);
                setProductImagesArr(prev => {
                    prev.push(reader.result)
                    return prev;
                });
            }

            reader.readAsDataURL(imageSrc);
        }
    }

    const saveProdImage = async () => {
        try {
            const formData = new FormData();
            formData.append('prodImage', imgFile);

            const res = await addNewImage(props.product._id, formData);

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
        <Modal size='xl' isOpen={props.isOpen}>
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
                        <div className="main-image">

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