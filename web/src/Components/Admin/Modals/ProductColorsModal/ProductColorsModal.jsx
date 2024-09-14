import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";
import './ProductColorsModal.css'
import { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoEyedropOutline } from "react-icons/io5";
import { addNewColor } from "../../../../Services/registerService";
const ProductColorsModal = () => {

    //refs of inputs
    const imgInputRef = useRef(null);
    const colorInputRef = useRef(null);

    const [colorForm, setColorForm] = useState({
        colorName: '',
        hexCode:'',
        image: '',
    });

    //methords
    const onImgSelect = (e) => {
        const img = e.target.files[0];

        // in case of file exsists
        if(img){

            setColorForm({
                ...colorForm,
                image: img
            });

            const reader = new FileReader();

            // onreaderloadend
            reader.onloadend = () => {
                
            }
        }
        
    }

    const addImage = () => {
        imgInputRef.current.click();
    }

    const onColorSelect = (e) => {
        const color = e.target.value;

        setColorForm({
            ...colorForm,
            hexCode : color
        })
        
    }

    //methord for handing input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setColorForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addColor = () => {
        colorInputRef.current.click();
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('hexCode', colorForm.hexCode);
        formData.append('colorName', colorForm.colorName);
        formData.append('image', colorForm.image);

        const id = 11;
        await addNewColor(id, formData).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Modal size='xl' isOpen={true}>
            <ModalOverlay />
            <ModalContent className="add-color-modal-content">
                <ModalHeader className="product-modal-header">Product Colors  <ModalCloseButton /></ModalHeader>
                <ModalBody >
                    <h4 className="modal-subhead">Add Color</h4>

                    <form className="grid grid-cols-1 gap-3 md:grid-cols-1" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="color-pick-add ">

                                <div className="grid grid-cols-2">
                                    <div className="product-color-picker" onClick={addColor} style={{
                                        backgroundColor: colorForm.hexCode.toString(),
                                        color: (colorForm.hexCode || colorForm.hexCode.toString() == '#fffff') ? 'white' : 'black',
                                        borderColor: (colorForm.hexCode || colorForm.hexCode.toString() == '#fffff') ? 'white' : 'black'
                                    }}>
                                        <IoEyedropOutline className='text-4xl' />
                                    </div>
                                    <input type="color" name="colorCode" className="hidden-element" id="" ref={colorInputRef} onChange={onColorSelect}  />
                                    <div className="add-color-photo ">
                                        <Input className="hidden-element" type='file' ref={imgInputRef} onChange={onImgSelect}></Input>
                                        <Button colorScheme='red' mt={4} size='lg' onClick={addImage}>Add Image</Button>
                                    </div>
                                </div>

                                <FormControl isRequired size='sm' mt={5}>
                                    <FormLabel className='form-label-sm' >Color name</FormLabel>
                                    <Input placeholder='Color name' name="colorName" size='sm' onChange={handleInputChange} />
                                </FormControl>
                            </div>
                            <div className="add-product-image-preview" style={{
                                // backgroundImage: `url(${productNewForm.colorVariations[index].image})`,
                                // backgroundSize: 'cover',
                                // backgroundPosition: 'center',
                                // backgroundRepeat: 'no-repeat',
                            }}>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-3">
                            <Button className='add-product-submit-btn'
                                mt={1}
                                colorScheme='blue'
                                size='sm'
                                type='submit'> Save</Button>
                        </div>

                    </form>

                    <h4 className="modal-subhead">Colors List</h4>
                    <div className="product-table-container">
                        <main className="product-table-main">
                            <div className="product-table-wrapper">
                                <div className="product-table-card">
                                    <header className="product-table-header">
                                        <h2>Product Colors List</h2>
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
                                                        <th>Image</th>
                                                        <th>Color</th>
                                                        <th>Color Name</th>
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

export default ProductColorsModal;