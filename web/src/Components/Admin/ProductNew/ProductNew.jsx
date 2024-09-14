import React, { Children, useEffect, useRef, useState } from 'react';
import './ProductNew.css'
import { FormControl, FormLabel, Select, Input, Textarea, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Checkbox, RadioGroup, HStack, FormHelperText, Radio, WrapItem, textDecoration, useToast } from '@chakra-ui/react';
import { CiCirclePlus } from "react-icons/ci";
import { FaEye } from 'react-icons/fa6';
import { addNewProduct, getCategoryDataService } from '../../../Services/getDataService'
import { RiDeleteBin5Fill } from 'react-icons/ri';


//variables
let categoryData = {}; //this var will contain category related data 
let subCategoryData = {};


function ProductNew() {

    //vars for deciding dropdown values of categories, subcategories and item lists
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itemList, setItemList] = useState([]);

    //variable for getting main image src
    const [mainImageSrc, setMainImageSrc] = useState('');
    //var for getting array of product images src

    const [productNewForm, setProductNewForm] = useState({
        category: '',
        subCategory: '',
        item: '',
        productName: '',
        subHead: '',
        sku: '',
        summary: '',
        keyHighlights: [
            {
                key: '',
                value: ''
            }
        ],
        mainImage: '',
        basePrice: 0,
        moq: 0,
        isDiscounted: false,
        baseDiscount: 0,
        taxType: ''
    });

    let addImageInputRef = useRef(null);

    //intiallizing toast hook from chakra ui
    const toast = useToast();

    //--------------------------------------------------------------------methords for handing input change starts-----------------------------------------------------------------
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductNewForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumberInputChange = (e, name) => {
        const value = e;
        setProductNewForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleKeyHighlightsChange = (e, index) => {
        const { name, value } = e.target;

        const keyHighLights = productNewForm.keyHighlights;
        keyHighLights[index][name] = value;
        setProductNewForm((prev) => ({
            ...prev,
            keyHighlights: keyHighLights
        }));
    }

    const handleIsDiscountedChange = (e) => {

        setProductNewForm({
            ...productNewForm,
            isDiscounted: e
        });
    };

    const handletaxTypeChange = (e) => {

        setProductNewForm({
            ...productNewForm,
            taxType: e
        });
    };

    //------------------------------------------------------------------------methords for handing input change ends-----------------------------------------------------------------

    //methord for getting category related data
    const getCategoryData = async () => {
        await getCategoryDataService().then((res) => {
            if (Object.keys(res).length) {
                categoryData = res;
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
            setProductNewForm({
                ...productNewForm,
                category: event.target.value
            })
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
            setProductNewForm({
                ...productNewForm,
                subCategory: event.target.value
            })
        }

    }

    //handler fot item input
    const onItemChange = (event) => {
        setProductNewForm({
            ...productNewForm,
            item: event.target.value
        })
    }

    //methord for adding new key highlight
    const addNewKeyHighlight = () => {
        const keyHighlights = productNewForm.keyHighlights;
        keyHighlights.push({
            key: '',
            value: ''
        });

        setProductNewForm({
            ...productNewForm,
            keyHighlights: keyHighlights
        })
    }

    //methord for removing particular key highlight at given index
    const removeKeyHighlight = (index) => {
        const keyHighlights = productNewForm.keyHighlights;
        keyHighlights.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            keyHighlights: keyHighlights
        })
    }

    //methord for adding image 
    const addImage = () => {
        if (addImageInputRef.current) {
            addImageInputRef.current.click();
        } else {
            console.warn('Element not mounted yet')
        }
    }

    //methord for adding main image
    const onMainImageChange = (event) => {
        const imageSrc = event.target.files[0];

        if (imageSrc) {
            //checking if of type image or not
            const type = imageSrc.type;
            if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/webp') {
                toast({
                    title: 'Invalid file type',
                    description: 'Only .png, .jpg, .jpeg and .webp files are allowed',
                    status: 'error',
                    isClosable: true,
                    // variant: 'top-accent'
                });
                return;
            }

            //getting image url for setting image in preview in case of fle only uploaded to frontend
            const reader = new FileReader();

            //handling on load end
            reader.onloadend = () => {
                setMainImageSrc(reader.result);

                setProductNewForm({
                    ...productNewForm,
                    mainImage: imageSrc
                });

                console.log(productNewForm)

            }

            //handling on error
            reader.onerror = (err) => {
                console.log(err);
            }

            //convertning blob data to url
            reader.readAsDataURL(imageSrc)
        }

    }

    //methord fotr handling submit
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(productNewForm)
    }


    useEffect(() => {
        getCategoryData();
    }, [])

    return (
        <>
            <form className="container mx-auto px-4 product-new-outer py-5" onSubmit={onSubmit} encType='multipart/form-data'>
                <h2 className="add-product-main-heading">
                    Add Product
                </h2>

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Category Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <FormControl isRequired>
                            <FormLabel className='form-label-sm'>Category</FormLabel>
                            <Select placeholder='Select category' size='sm'
                                onChange={onCategoryChange}>
                                {
                                    categories.map((category, index) => <option key={category} className='category-options' value={category}>{category}</option>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel className='form-label-sm'>Subcategory</FormLabel>
                            <Select placeholder='Select subcategory' size='sm'
                                onChange={onSubCategoryChange}>
                                {
                                    subCategories.map((subCat) => <option key={subCat} className='category-options' value={subCat}>{subCat}</option>)
                                }
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel className='form-label-sm'>Item</FormLabel>
                            <Select placeholder='Select item' size='sm' onChange={onItemChange}>
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                        <FormControl isRequired size='sm'>
                            <FormLabel className='form-label-sm'>Product name</FormLabel>
                            <Input placeholder='Product name' name='productName' size='sm' value={productNewForm.productName} onChange={handleInputChange} />
                        </FormControl>


                        <FormControl isRequired>
                            <FormLabel className='form-label-sm'>Product label</FormLabel>
                            <Input placeholder='Product label' size='sm' name='subHead' value={productNewForm.subHead} onChange={handleInputChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel className='form-label-sm'>Product SKU</FormLabel>
                            <Input placeholder='Product SKU' size='sm' name='sku' value={productNewForm.sku} onChange={handleInputChange} />
                        </FormControl>

                        <FormControl isRequired className='col-span-1 md:col-span-4'>
                            <FormLabel className='form-label-sm'>Product summary</FormLabel>
                            <Textarea placeholder='Here is a sample placeholder' name='summary' value={productNewForm.summary} onChange={handleInputChange} rows={8} size='sm' />
                        </FormControl>


                    </div>
                </div>

                <br /><br />

                <div className="product-category-sec">
                    <h4 className="product-add-sub-head">Add Key Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                        {
                            productNewForm.keyHighlights.map((item, index) => {
                                return (

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5" key={index}>
                                        <FormControl key={`${index}key`} isRequired size='sm'>
                                            <FormLabel className='form-label-sm'>Name</FormLabel>
                                            <Input placeholder='Name' size='sm' value={productNewForm.keyHighlights[index].key} name='key' onChange={(e) => { handleKeyHighlightsChange(e, index) }} />
                                        </FormControl>


                                        <FormControl key={`${index}value`} isRequired>
                                            <FormLabel className='form-label-sm form-label-with-btns'><span>Value</span>
                                                {
                                                    (productNewForm.keyHighlights.length > 1) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeKeyHighlight(index)} />) : ''
                                                }
                                            </FormLabel>
                                            <Input placeholder='Value' size='sm' value={productNewForm.keyHighlights[index].value} name='value' onChange={(e) => { handleKeyHighlightsChange(e, index) }} />
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


                    <div className="hidden-element">
                        <Input placeholder='Main Image' size='sm' onChange={onMainImageChange} type='file' ref={addImageInputRef} />
                    </div>

                    <h4 className="product-add-sub-head">Add Product Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 add-product-image-container">
                        <FormControl className="col-span-3 add-product-image" size='lg'>
                            <div className="add-image-main">
                                <WrapItem className='add-more-image-btn'>
                                    <Button colorScheme='red' onClick={() => { addImage() }} size='lg'>Add Image  <CiCirclePlus className="text-3xl add-more-icon" /></Button>
                                </WrapItem>
                            </div>
                            <div className="add-image-helper">
                                <FormHelperText className='add-image-helper-text' size='xl'>First image should be the main image.</FormHelperText>
                            </div>
                        </FormControl>
                        <div className="add-product-image-preview add-product-image-preview-btns" style={{
                            backgroundImage: `url(${mainImageSrc})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}>
                        </div>
                    </div>

                </div>



                <hr className='line-beaker' />

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Set Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <FormControl size='sm' isRequired>
                            <FormLabel className='form-label-sm'>Base price</FormLabel>
                            <NumberInput max={50} min={10} size='sm' value={productNewForm.basePrice} onChange={(e) => { handleNumberInputChange(e, 'basePrice') }}>
                                <NumberInputField placeholder='Base price' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl size='sm' isRequired>
                            <FormLabel className='form-label-sm'>MOQ</FormLabel>
                            <NumberInput max={50} min={10} size='sm' value={productNewForm.moq} onChange={(e) => { handleNumberInputChange(e, 'moq') }}>
                                <NumberInputField placeholder='MOQ' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl as='fieldset' isRequired>
                            <FormLabel className='form-label-sm' as='legend'>Is discounted?</FormLabel>
                            <RadioGroup defaultValue='false' size='sm' value={productNewForm.isDiscounted} onChange={handleIsDiscountedChange}>
                                <HStack spacing='15%'>
                                    <Radio value='true'>Discounted</Radio>
                                    <Radio value='false'>Not Discounted</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                        {
                            // in case of discounted
                            productNewForm.isDiscounted === 'true' ? <FormControl size='sm' isRequired>
                                <FormLabel className='form-label-sm'>Base discount (%)</FormLabel>
                                <NumberInput max={50} min={10} size='sm' value={productNewForm.baseDiscount} onChange={(e) => { handleNumberInputChange(e, 'baseDiscount') }}>
                                    <NumberInputField placeholder='Base discount' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl> : ''
                        }


                    </div>
                </div>


                <FormControl as='fieldset' mt={8} isRequired>
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Tax Type</FormLabel>
                    <RadioGroup size='sm' onChange={handletaxTypeChange} value={productNewForm.taxType}>
                        <HStack spacing='24px'>
                            <Radio value='inclusive'>Inclusive</Radio>
                            <Radio value='exclusive'>Exclusive</Radio>
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
                    onClick={async () => {
                        console.log('end', productNewForm);
                        const formData = new FormData();
                        formData.append('productName', productNewForm.productName);
                        formData.append('category', productNewForm.category);
                        formData.append('subCategory', productNewForm.subCategory);
                        formData.append('item', productNewForm.item);
                        formData.append('subHead', productNewForm.subHead);
                        formData.append('sku', productNewForm.sku);
                        formData.append('summary', productNewForm.summary);
                        formData.append('keyHighlights', JSON.stringify(productNewForm.keyHighlights));
                        formData.append('basePrice', productNewForm.basePrice);
                        formData.append('moq', productNewForm.moq);
                        formData.append('isDiscounted', productNewForm.isDiscounted);
                        formData.append('baseDiscount', productNewForm.baseDiscount);
                        formData.append('taxType', productNewForm.taxType);
                        formData.append('mainImage', productNewForm.mainImage);
                        await addNewProduct(formData).then((res) => {
                            console.log(res);
                        }).then(err => {
                            console.log(err)
                        });
                    }}
                >
                    Submit
                </Button>

            </form >
        </>
    );
}

export default ProductNew;
