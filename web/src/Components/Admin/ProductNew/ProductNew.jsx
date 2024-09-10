import React, { useEffect, useState } from 'react';
import './ProductNew.css'
import { FormControl, FormLabel, Select, Input, Textarea, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Checkbox, RadioGroup, HStack, FormHelperText, Radio, WrapItem, textDecoration } from '@chakra-ui/react';
import { CiCirclePlus } from "react-icons/ci";
import { FaEye } from 'react-icons/fa6';
import { getCategoryDataService } from '../../../Services/getDataService'
import { IoEyedropOutline } from "react-icons/io5";
import { RiDeleteBin5Fill } from 'react-icons/ri';


//variables
let categoryData = {}; //this var will contain category related data 
let subCategoryData = {};


function ProductNew() {

    //vars for deciding dropdown values of categories, subcategories and item lists
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itemList, setItemList] = useState([]);

    const [productNewForm, setProductNewForm] = useState({
        category: '',
        subCategory: '',
        item: '',
        product_name: '',
        sub_head: '',
        summary: '',
        key_highlights: [
            {
                key: '',
                value: ''
            }
        ],
        main_image: '',
        product_images: [],
        base_price: 0,
        moq: 0,
        isDiscounted: false,
        base_discount: 0,
        is_qty_based_pricing: false,
        qty_price_slabs: [
            {
                moq: 0,
                discount: 0
            }
        ],
        is_size_variable: false,
        size_variations: [
            {
                size: 0,
                price: 0
            }
        ],
        is_color_variable: false,
        color_variations: [
            {
                name: '',
                hex_code: '',
                image: ''
            }
        ],
        tax_type: ''
    });

    //methord for getting category related data
    const getCategoryData = async () => {
        await getCategoryDataService().then((res) => {
            console.log('response', res);
            if (Object.keys(res).length) {
                categoryData = res;
                console.log(categoryData)
                setCategories(Object.keys(categoryData));
            }

        }).catch(err => {
            console.log(err);
        })

    }

    //metord run on ctaegory selection
    const onCategoryChange = (event) => {
        //empty the subcattegory and item list on caegory change
        setSubCategories([]);
        setItemList([]);

        //setting sub category list 
        subCategoryData = categoryData[event.target.value]
        if (subCategoryData && typeof subCategoryData == 'object') {
            setSubCategories(Object.keys(subCategoryData));
        }

    }

    //metord run on sub ctaegory selection
    const onSubCategoryChange = (event) => {
        //empty the item list on caegory change
        setItemList([]);

        //setting sub category list 
        // setItemList(subCategoryData[event.target.value].map(item));
        if (subCategoryData[event.target.value]) {
            setItemList(subCategoryData[event.target.value]);
        }

    }

    //methord for adding new key highlight
    const addNewKeyHighlight = () => {
        const key_highlights = productNewForm.key_highlights;
        key_highlights.push({
            key: '',
            value: ''
        });

        setProductNewForm({
            ...productNewForm,
            key_highlights: key_highlights
        })
    }

    //methord for removing particular key highlight at given index
    const removeKeyHighlight = (index) => {
        const key_highlights = productNewForm.key_highlights;
        key_highlights.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            key_highlights: key_highlights
        })
    }

    //methord for adding qty place slab
    const addNewQtyPriceSlab = () => {
        const qty_price_slabs = productNewForm.qty_price_slabs;
        qty_price_slabs.push({
            moq: 0,
            discount: 0
        });

        setProductNewForm({
            ...productNewForm,
            qty_price_slabs: qty_price_slabs
        })
    }

    //methord for removing particular qty proce slab at given index
    const removeQtyPriceSlab = (index) => {
        const qty_price_slabs = productNewForm.qty_price_slabs;
        qty_price_slabs.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            qty_price_slabs: qty_price_slabs
        })
    }

    //methord for adding new size variation
    const addNewSizeVariation = () => {
        const size_variations = productNewForm.size_variations;
        size_variations.push({
            moq: 0,
            discount: 0
        });

        setProductNewForm({
            ...productNewForm,
            size_variations: size_variations
        })
    }

    //methord for removing particular size variation at given index
    const removeSizeVariation = (index) => {
        const size_variations = productNewForm.size_variations;
        size_variations.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            size_variations: size_variations
        })
    }

    //methord for adding color
    const addNewColor = () => {
        const color_variations = productNewForm.color_variations;
        color_variations.push({
            name: '',
            hex_code: '',
            image: ''
        });

        setProductNewForm({
            ...productNewForm,
            color_variations: color_variations
        })
    }

    //methord for removing particular color variation at given index
    const removeColorVariation = (index) => {
        const color_variations = productNewForm.color_variations;
        color_variations.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            color_variations: color_variations
        })
    }

    //methord for setting color
    const setColor = (index) => {

    }


    useEffect(() => {
        getCategoryData();
    }, [])

    return (
        <>
            <div className="container mx-auto px-4 product-new-outer py-5">
                <h2 className="add-product-main-heading">
                    Add Product
                </h2>

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Category Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <FormControl>
                            <FormLabel className='form-label-sm'>Category</FormLabel>
                            <Select placeholder='Select category' size='sm'
                                onChange={onCategoryChange}>
                                {
                                    categories.map((category, index) => <option key={category} className='category-options' value={category}>{category}</option>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel className='form-label-sm'>Subcategory</FormLabel>
                            <Select placeholder='Select subcategory' size='sm'
                                onChange={onSubCategoryChange}>
                                {
                                    subCategories.map((subCat) => <option key={subCat} className='category-options' value={subCat}>{subCat}</option>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel className='form-label-sm'>Item</FormLabel>
                            <Select placeholder='Select item' size='sm'>
                                {
                                    itemList.map((item) => <option key={item.categoryCode} className='category-options' value={item.categoryCode}>{item.name}</option>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <hr className='line-beaker' />

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Product Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormControl size='sm'>
                            <FormControl isRequired size='sm'>
                                <FormLabel className='form-label-sm' >Product name</FormLabel>
                                <Input placeholder='Product name' size='sm' />
                            </FormControl>
                        </FormControl>
                        <FormControl>
                            <FormControl isRequired>
                                <FormLabel className='form-label-sm'>Product label</FormLabel>
                                <Input placeholder='Product label' size='sm' />
                            </FormControl>
                        </FormControl>
                        <FormControl className='col-span-1 md:col-span-2'>
                            <FormControl isRequired>
                                <FormLabel className='form-label-sm'>Product summary</FormLabel>
                                <Textarea placeholder='Here is a sample placeholder' rows={8} size='sm' />
                            </FormControl>
                        </FormControl>

                    </div>
                </div>

                <br /><br />

                <div className="product-category-sec">
                    <h4 className="product-add-sub-head">Add Key Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                        {
                            productNewForm.key_highlights.map((item, index) => {
                                return (

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormControl key={`${index}key`} isRequired size='sm'>
                                            <FormLabel className='form-label-sm' >Name</FormLabel>
                                            <Input placeholder='Name' size='sm' />
                                        </FormControl>


                                        <FormControl key={`${index}value`} isRequired>
                                            <FormLabel className='form-label-sm form-label-with-btns'><span>Value</span>
                                                {
                                                    (productNewForm.key_highlights.length > 1) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeKeyHighlight(index)} />) : ''
                                                }
                                            </FormLabel>
                                            <Input placeholder='Value' size='sm' />
                                        </FormControl>
                                    </div>
                                )
                            })
                        }



                        <div className="add-more-btn">
                            <CiCirclePlus className="text-3xl add-more-icon" onClick={addNewKeyHighlight} title='Add More' />
                        </div>
                    </div>

                </div>
                <br /><br />

                <div className="product-category-sec">
                    <FormControl isRequired size='sm' className='hidden-element' mt={5}>
                        <FormLabel className='form-label-sm' >Color name</FormLabel>
                        <Input placeholder='Color name' size='sm' type='file' />
                    </FormControl>
                    <h4 className="product-add-sub-head">Add Product Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 add-product-image-container">
                        <FormControl className="col-span-3 add-product-image" size='lg'>
                            <div className="add-image-main">
                                <WrapItem className='add-more-image-btn'>
                                    <Button colorScheme='red' size='lg'>Add Image  <CiCirclePlus className="text-3xl add-more-icon" /></Button>
                                </WrapItem>
                                <div className="all-images">
                                    <div className="item-image"></div>
                                    <div className="item-image"></div>
                                    <div className="item-image"></div>
                                    <div className="item-image"></div>
                                    <div className="item-image"></div>
                                    <div className="item-image"></div>
                                </div>
                            </div>
                            <div className="add-image-helper">
                                <FormHelperText className='add-image-helper-text' size='xl'>First image should be the main image.</FormHelperText>
                            </div>
                        </FormControl>
                        <div className="add-product-image-preview">

                        </div>
                    </div>

                </div>



                <hr className='line-beaker' />

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Set Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <FormControl size='sm'>
                            <FormLabel className='form-label-sm'>Base price</FormLabel>
                            <NumberInput max={50} min={10} size='sm'>
                                <NumberInputField placeholder='Base price' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl size='sm'>
                            <FormLabel className='form-label-sm'>MOQ</FormLabel>
                            <NumberInput max={50} min={10} size='sm'>
                                <NumberInputField placeholder='MOQ' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl as='fieldset'>
                            <FormLabel className='form-label-sm' as='legend'>Is discounted?</FormLabel>
                            <RadioGroup defaultValue='Itachi' size='sm'>
                                <HStack spacing='15%'>
                                    <Radio value='Sasuke'>Discounted</Radio>
                                    <Radio value='Nagato'>Not Discounted</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl size='sm'>
                            <FormLabel className='form-label-sm'>Base discount (%)</FormLabel>
                            <NumberInput max={50} min={10} size='sm'>
                                <NumberInputField placeholder='Base discount' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                    </div>
                </div>

                <FormControl as='fieldset' mt={8}>
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Want to set price-slab based on quantity?</FormLabel>
                    <RadioGroup defaultValue='Itachi' size='sm'>
                        <HStack spacing='24px'>
                            <Radio value='Sasuke'>yes</Radio>
                            <Radio value='Nagato'>No</Radio>
                        </HStack>
                    </RadioGroup>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                </FormControl>

                <br />
                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Set Price Slabs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {
                            productNewForm.qty_price_slabs.map((item, index) => {
                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormControl size='sm'>
                                            <FormLabel className='form-label-sm'>MOQ</FormLabel>
                                            <NumberInput max={50} min={10} size='sm'>
                                                <NumberInputField placeholder='MOQ' />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                        <FormControl size='sm'>
                                            <FormLabel className='form-label-sm form-label-with-btns'>Discount (%)
                                                {
                                                    ((productNewForm.qty_price_slabs.length > 1) && (productNewForm.qty_price_slabs.length - 1 == index)) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeQtyPriceSlab(index)} />) : ''
                                                }
                                            </FormLabel>
                                            <NumberInput max={50} min={10} size='sm'>
                                                <NumberInputField placeholder='Base discount' />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    </div>
                                )
                            })
                        }
                        <div className="add-more-btn">
                            <CiCirclePlus className="text-3xl add-more-icon" onClick={addNewQtyPriceSlab} title='Add More' />
                        </div>
                    </div>
                </div>


                <FormControl as='fieldset' mt={8}>
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Have variants according to sizes?</FormLabel>
                    <RadioGroup defaultValue='Itachi' size='sm'>
                        <HStack spacing='24px'>
                            <Radio value='Sasuke'>yes</Radio>
                            <Radio value='Nagato'>No</Radio>
                        </HStack>
                    </RadioGroup>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                </FormControl>

                <br />
                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Set Size Variations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {
                            productNewForm.size_variations.map((item, index) => {
                                return (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormControl size='sm'>
                                            <FormLabel className='form-label-sm'>Add Size</FormLabel>
                                            <NumberInput max={50} min={10} size='sm'>
                                                <NumberInputField placeholder='Add Size' />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>

                                        <FormControl size='sm'>
                                            <FormLabel className='form-label-sm form-label-with-btns'>Price
                                                {
                                                    (productNewForm.size_variations.length > 1)? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeSizeVariation(index)} />) : ''
                                                }
                                            </FormLabel>
                                            <NumberInput max={50} min={10} size='sm'>
                                                <NumberInputField placeholder='Price' />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </FormControl>
                                    </div>
                                )
                            })
                        }

                        <div className="add-more-btn">
                            <CiCirclePlus className="text-3xl add-more-icon" title='Add More' onClick={addNewSizeVariation} />
                        </div>
                    </div>
                </div>


                <FormControl as='fieldset' mt={8}>
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Have variants according to colors?</FormLabel>
                    <RadioGroup defaultValue='Itachi' size='sm'>
                        <HStack spacing='24px'>
                            <Radio value='Sasuke'>yes</Radio>
                            <Radio value='Nagato'>No</Radio>
                        </HStack>
                    </RadioGroup>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                </FormControl>

                <br />
                <div className="product-category-sec product-color-variation-sec">
                    <h3 className="product-add-sub-head">Set Color Variations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {
                            productNewForm.color_variations.map((item, index) => {
                                return (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <h4 className='col-span-1 md:col-span-2 add-color-head'>Add Color
                                                {
                                                    (productNewForm.color_variations.length > 1) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeColorVariation(index)} />) : ''
                                                }
                                            </h4>
                                            <div className="color-pick-add ">
                                                <FormControl isRequired size='sm' mt={5} className='hidden-element'>
                                                    <FormLabel className='form-label-sm' >Color name</FormLabel>
                                                    <Input placeholder='Color name' size='sm' type='color' />
                                                </FormControl>
                                                <div className="grid grid-cols-2">
                                                    <div className="product-color-picker">
                                                        <IoEyedropOutline className='text-4xl' onClick={() => { setColor(index) }} />
                                                    </div>
                                                    <div className="add-color-photo ">
                                                        <Button colorScheme='red' mt={4} size='lg'>Add Image</Button>
                                                    </div>
                                                </div>

                                                <FormControl isRequired size='sm' mt={5}>
                                                    <FormLabel className='form-label-sm' >Color name</FormLabel>
                                                    <Input placeholder='Color name' size='sm' />
                                                </FormControl>
                                            </div>
                                            <div className="add-product-image-preview">

                                            </div>
                                        </div>

                                    </>
                                )
                            })
                        }
                        <div className="add-more-btn">
                            <CiCirclePlus className="text-5xl add-more-icon" onClick={addNewColor} />
                        </div>
                    </div>

                </div>


                <FormControl as='fieldset' mt={8}>
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Tax Type</FormLabel>
                    <RadioGroup defaultValue='Itachi' size='sm'>
                        <HStack spacing='24px'>
                            <Radio value='Sasuke'>Inclusive</Radio>
                            <Radio value='Nagato'>Exclusive</Radio>
                        </HStack>
                    </RadioGroup>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                </FormControl>

                <hr className='line-beaker' />

                <p className="product-review-text text-md">Preview  <FaEye className='product-preview-btn text-lg' /></p>
                <Checkbox className="product-submit-checkbox" mt={3}>Want to add new product</Checkbox>
                <br></br>

                <Button className='add-product-submit-btn'
                    mt={4}
                    colorScheme='teal'
                    size='md'
                    type='submit'
                >
                    Submit
                </Button>

            </div >
        </>
    );
}

export default ProductNew;
