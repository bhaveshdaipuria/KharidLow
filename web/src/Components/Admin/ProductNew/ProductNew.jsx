import React, { Children, useEffect, useRef, useState } from 'react';
import './ProductNew.css'
import { FormControl, FormLabel, Select, Input, Textarea, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Checkbox, RadioGroup, HStack, FormHelperText, Radio, WrapItem, textDecoration, useToast, FormErrorMessage } from '@chakra-ui/react';
import { CiCirclePlus } from "react-icons/ci";
import { FaEye } from 'react-icons/fa6';
import { addNewProduct, getCategoryDataService } from '../../../Services/getDataService'
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoEyedropOutline } from 'react-icons/io5';
import Loader from '../../../comman/Loader/Loader';


//variables
let categoryData = {}; //this var will contain category related data 
let subCategoryData = {};
let taxPercentages = [2.5, 5, 12, 18]


function ProductNew() {

    //vars for deciding dropdown values of categories, subcategories and item lists
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    //variable for getting main image src
    const [mainImageSrc, setMainImageSrc] = useState('');
    //var for getting array of product images src

    let colorInputRef = useRef(null);

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
        taxType: '',
        taxPercentage: ''
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

    const onColorSelect = (e) => {
        const color = e.target.value;

        console.log(color);

        setProductNewForm({
            ...productNewForm,
            hexCode: color
        })

    }


    //-----------------------------------------methords for handing input changeends-------------------------------------------------------

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

    const onTaxPercentageChange = (event) => {
        setProductNewForm({
            ...productNewForm,
            taxPercentage: event.target.value
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

    const addColor = () => {
        colorInputRef.current.click();
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
    const onSubmit = async (event) => {
        event.preventDefault();
       setLoading(true);
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
           setSubmitted(false);
           setLoading(false)
       }).then(err => {
           console.log(err)
           setSubmitted(false);
           setLoading(false)
       });
    }


    useEffect(() => {
        getCategoryData();
    }, [])

    return (
        <>
            <form className="container mx-auto px-4 product-new-outer py-5" encType="multipart/form-data" onSubmit={onSubmit}>
                <h2 className="add-product-main-heading">
                    Add Product
                </h2>

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Category Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <FormControl isRequired isInvalid={submitted && !productNewForm.category}>
                            <FormLabel className='form-label-sm'>Category</FormLabel>
                            <Select placeholder='Select category' size='sm'
                                onChange={onCategoryChange}>
                                {
                                    categories.map((category, index) => <option key={category} className='category-options' value={category}>{category}</option>)
                                }
                            </Select>
                            <FormErrorMessage>Category is Required.</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={submitted && !productNewForm.subCategory}>
                            <FormLabel className='form-label-sm'>Sub Category</FormLabel>
                            <Select placeholder='Select subcategory' size='sm'
                                onChange={onSubCategoryChange}>
                                {
                                    subCategories.map((subCat) => <option key={subCat} className='category-options' value={subCat}>{subCat}</option>)
                                }
                            </Select>
                            <FormErrorMessage>Sub Category is Required.</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired isInvalid={submitted && !productNewForm.item}>
                            <FormLabel className='form-label-sm'>Item</FormLabel>
                            <Select placeholder='Select item' size='sm' onChange={onItemChange}>
                                {
                                    itemList.map((item) => <option key={item.categoryCode} className='category-options' value={item.categoryCode}>{item.name}</option>)
                                }
                            </Select>
                            <FormErrorMessage>Item is Required.</FormErrorMessage>
                        </FormControl>
                    </div>
                </div>

                <hr className='line-beaker' />

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Product Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                        <FormControl isRequired isInvalid={submitted && !productNewForm.productName}>
                            <FormLabel className='form-label-sm'>Product Name</FormLabel>
                            <Input placeholder='Product name' name='productName' size='sm' value={productNewForm.productName} onChange={handleInputChange} />
                            <FormErrorMessage>Product Name is Required.</FormErrorMessage>
                        </FormControl>


                        <FormControl isRequired isInvalid={submitted && !productNewForm.subHead}>
                            <FormLabel className='form-label-sm'>Product Label</FormLabel>
                            <Input placeholder='Product label' size='sm' name='subHead' value={productNewForm.subHead} onChange={handleInputChange} />
                            <FormErrorMessage>Product Label is Required.</FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired isInvalid={submitted && !productNewForm.sku}>
                            <FormLabel className='form-label-sm' >Product SKU</FormLabel>
                            <Input placeholder='Product SKU' size='sm' name='sku' value={productNewForm.sku} onChange={handleInputChange} />
                            <FormErrorMessage>Product SKU is Required.</FormErrorMessage>
                        </FormControl>

                        <FormControl isRequired className='col-span-1 md:col-span-4' isInvalid={submitted && !productNewForm.summary}>
                            <FormLabel className='form-label-sm'>Product summary</FormLabel>
                            <Textarea placeholder='Product Summary' name='summary' value={productNewForm.summary} onChange={handleInputChange} rows={8} size='sm' />
                            <FormErrorMessage>Summary is Required.</FormErrorMessage>
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
                                        <FormControl isRequired isInvalid={submitted && !productNewForm.keyHighlights[index].key}>
                                            <FormLabel className='form-label-sm'>Name</FormLabel>
                                            <Input placeholder='Name' size='sm' value={productNewForm.keyHighlights[index].key} name='key' onChange={(e) => { handleKeyHighlightsChange(e, index) }} />
                                            <FormErrorMessage>Key is Required.</FormErrorMessage>
                                        </FormControl>


                                        <FormControl isRequired isInvalid={submitted && !productNewForm.keyHighlights[index].value}>
                                            <FormLabel className='form-label-sm form-label-with-btns'><span>Value</span>
                                                {
                                                    (productNewForm.keyHighlights.length > 1) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeKeyHighlight(index)} />) : ''
                                                }
                                            </FormLabel>
                                            <Input placeholder='Value' size='sm' value={productNewForm.keyHighlights[index].value} name='value' onChange={(e) => { handleKeyHighlightsChange(e, index) }} />
                                            <FormErrorMessage>Value is Required.</FormErrorMessage>
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
                        <FormControl className="col-span-3 add-product-image" size='lg' isRequired>
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
                        <FormControl size='sm' isRequired isInvalid={submitted && !productNewForm.basePrice}>
                            <FormLabel className='form-label-sm'>Base Price</FormLabel>
                            <NumberInput size='sm' value={productNewForm.basePrice} onChange={(e) => { handleNumberInputChange(e, 'basePrice') }}>
                                <NumberInputField placeholder='Base Price' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage>Base Price is Required.</FormErrorMessage>      
                        </FormControl>
                        <FormControl size='sm' isRequired isInvalid={submitted && !productNewForm.moq}>
                            <FormLabel className='form-label-sm'>MOQ</FormLabel>
                            <NumberInput size='sm' value={productNewForm.moq} onChange={(e) => { handleNumberInputChange(e, 'moq') }}>
                                <NumberInputField placeholder='MOQ' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage>MOQ is Required.</FormErrorMessage>
                        </FormControl>
                        <FormControl as='fieldset' isRequired isInvalid={submitted && !productNewForm.isDiscounted}>
                            <FormLabel className='form-label-sm' as='legend'>Is Discounted?</FormLabel>
                            <RadioGroup defaultValue='false' size='sm' value={productNewForm.isDiscounted} onChange={handleIsDiscountedChange}>
                                <HStack spacing='15%'>
                                    <Radio value='true'>Discounted</Radio>
                                    <Radio value='false'>Not Discounted</Radio>
                                </HStack>
                            </RadioGroup>
                            <FormErrorMessage>Is Discounted is Required.</FormErrorMessage>
                        </FormControl>
                        {
                            // in case of discounted
                            productNewForm.isDiscounted === 'true' ? <FormControl isRequired isInvalid={submitted && !productNewForm.baseDiscount}>
                                <FormLabel className='form-label-sm'>Base Discount (%)</FormLabel>
                                <NumberInput size='sm' value={productNewForm.baseDiscount} onChange={(e) => { handleNumberInputChange(e, 'baseDiscount') }}>
                                    <NumberInputField placeholder='Base Discount' />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <FormErrorMessage>Base Discount is Required.</FormErrorMessage>
                            </FormControl> : ''
                        }

                        <FormControl as='fieldset' isRequired  isInvalid={submitted && !productNewForm.taxType}>

                            <FormLabel className='form-label-sm' as='legend'>Tax Type</FormLabel>
                            <RadioGroup size='sm' onChange={handletaxTypeChange} value={productNewForm.taxType}>
                                <HStack spacing='24px'>
                                    <Radio value='inclusive'>Inclusive</Radio>
                                    <Radio value='exclusive'>Exclusive</Radio>
                                </HStack>
                            </RadioGroup>
                            <FormErrorMessage>Tax Type is Required.</FormErrorMessage>
                            {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                        </FormControl>

                        <FormControl isRequired  isInvalid={submitted && !productNewForm.taxPercentage}>

                            <FormLabel className='form-label-sm'>Tax Percentage</FormLabel>
                            <Select placeholder='Select Tax Percentage' size='sm'
                                onChange={onTaxPercentageChange}>
                                {
                                    taxPercentages.map((item, index) => <option key={item} className='category-options' value={item}>{`${item}%`}</option>)
                                }
                            </Select>
                            <FormErrorMessage>Tax Percentage is Required.</FormErrorMessage>
                        </FormControl>

                        {/* <FormControl isReadOnly size='sm'>
                            <FormLabel className='form-label-sm'>Total amount(with tax)</FormLabel>
                            <Input placeholder='Total amount' size='sm' value={
                               productNewForm.taxType === 'inclusive'?productNewForm.basePrice:(Number(productNewForm.basePrice) + (productNewForm.basePrice * (productNewForm.basePrice/100)))
                            } onChange={handleInputChange} />
                        </FormControl> */}


                    </div>
                </div>


                <hr className='line-beaker' />

                <p className="product-review-text text-md">Preview  <FaEye className='product-preview-btn text-lg' /></p>
                {/* <Checkbox className="product-submit-checkbox" mt={3}>Want to add new product</Checkbox> */}
                <br></br>

                <Button className='add-product-submit-btn'
                    mt={4}
                    colorScheme='teal'
                    size='md'
                    type='submit'
                    onClick={ () => {
                        setSubmitted(true);
                        if(!productNewForm.mainImage){
                            toast({
                                title: 'Add Image before submitting the form',
                                status: 'error',
                                isClosable: true
                            });
                        }
                    }}
                >
                    Submit
                </Button>

            </form >

        <Loader show={loading}></Loader>
        </>
    );
}

export default ProductNew;
