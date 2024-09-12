import React, { Children, useEffect, useRef, useState } from 'react';
import './ProductNew.css'
import { FormControl, FormLabel, Select, Input, Textarea, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Button, Checkbox, RadioGroup, HStack, FormHelperText, Radio, WrapItem, textDecoration, useToast } from '@chakra-ui/react';
import { CiCirclePlus } from "react-icons/ci";
import { FaEye } from 'react-icons/fa6';
import { addNewProduct, getCategoryDataService } from '../../../Services/getDataService'
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
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    //variable for getting main image src
    const [mainImageSrc, setMainImageSrc] = useState('');
    //var for getting array of product images src
    const [productImagesSrc, setProductImagesSrc] = useState([]);
    const [maxImageIndex, setMaxImageIndex] = useState(0);
    const [mainPreviewImage, setMainPreviewImage] = useState('');

    const [productNewForm, setProductNewForm] = useState({
        category: '',
        subCategory: '',
        item: '',
        productName: '',
        subHead: '',
        summary: '',
        keyHighlights: [
            {
                key: '',
                value: ''
            }
        ],
        mainImage: '',
        productImages: [],
        basePrice: 0,
        moq: 0,
        isDiscounted: false,
        baseDiscount: 0,
        isQtyBasedPricing: false,
        qtyPriceSlabs: [
            {
                moq: 0,
                discount: 0
            }
        ],
        isSizeVariable: false,
        sizeVariations: [
            {
                size: 0,
                price: 0
            }
        ],
        isColorVariable: false,
        colorVariations: [
            {
                name: '',
                hex_code: '',
                image: ''
            }
        ],
        taxType: ''
    });

    let addImageInputRef = useRef(null);

    //intiallizing toast hook from chakra ui
    const toast = useToast();

    //------------------------------------------------------------------------methords for handing input change starts-----------------------------------------------------------------
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
        const {name, value} = e.target;

        const keyHighLights = productNewForm.keyHighlights;
        keyHighLights[index][name] = value;
        setProductNewForm((prev) => ({
            ...prev,
            keyHighlights: keyHighLights
        }));
    }

    const handleIsDiscountedChange = (e) => {

        console.log(e);
        setProductNewForm({
            ...productNewForm,
            isDiscounted: e
        });
    };

    const handleIsQtyBasedSlab = (e) => {

        console.log(e);
        setProductNewForm({
            ...productNewForm,
            isQtyBasedPricing: e
        });
    };

    const handleIsSizeVariable = (e) => {

        console.log(e);
        setProductNewForm({
            ...productNewForm,
            isSizeVariable: e
        });
    };

    const handleIsColorVariable = (e) => {

        console.log(e);
        setProductNewForm({
            ...productNewForm,
            isColorVariable: e
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

    //methord for adding qty place slab
    const addNewQtyPriceSlab = () => {
        const qtyPriceSlabs = productNewForm.qtyPriceSlabs;
        qtyPriceSlabs.push({
            moq: 0,
            discount: 0
        });

        setProductNewForm({
            ...productNewForm,
            qtyPriceSlabs: qtyPriceSlabs
        })
    }

    //methord for removing particular qty proce slab at given index
    const removeQtyPriceSlab = (index) => {
        const qtyPriceSlabs = productNewForm.qtyPriceSlabs;
        qtyPriceSlabs.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            qtyPriceSlabs: qtyPriceSlabs
        })
    }

    //methord for adding new size variation
    const addNewSizeVariation = () => {
        const sizeVariations = productNewForm.sizeVariations;
        sizeVariations.push({
            moq: 0,
            discount: 0
        });

        setProductNewForm({
            ...productNewForm,
            sizeVariations: sizeVariations
        })
    }

    //methord for removing particular size variation at given index
    const removeSizeVariation = (index) => {
        const sizeVariations = productNewForm.sizeVariations;
        sizeVariations.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            sizeVariations: sizeVariations
        })
    }

    //methord for adding color
    const addNewColor = () => {
        const colorVariations = productNewForm.colorVariations;
        colorVariations.push({
            name: '',
            hex_code: '',
            image: ''
        });

        setProductNewForm({
            ...productNewForm,
            colorVariations: colorVariations
        })
    }

    //methord for removing particular color variation at given index
    const removeColorVariation = (index) => {
        const colorVariations = productNewForm.colorVariations;
        colorVariations.splice(index, 1);

        setProductNewForm({
            ...productNewForm,
            colorVariations: colorVariations
        })
    }

    //methord for setting color
    const setColor = (index) => {

    }

    //methord for adding image 
    const addImage = (index) => {
        //showing max 6 image allowed toast
        if (maxImageIndex >= 6) {
            toast({
                title: 'Max 6 Images Are Allowed',
                status: 'info',
                isClosable: true,
                // variant: 'top-accent'
            })
            return;
        }
        if (addImageInputRef.current) {
            addImageInputRef.current.children[index].click();

            if (maxImageIndex > 0) {
                console.log('Add more image success')
            }
        } else {
            console.warn('Element not mounted yet')
        }
    }

    //methord for adding main image
    const onMainImageChange = (event) => {
        const imageSrc = event.target.files[0];

        if (imageSrc) {
            //checking if of type image or not
            console.log(imageSrc);
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
                    mainImage: mainImageSrc
                });

                console.log(productNewForm)

                //increasing current index in case of image upload
                setMaxImageIndex(maxImageIndex + 1);

                //adding new element to product images array in case of main image uploaded
                const productImages = productNewForm.productImages;
                productImages.push('');
                setProductNewForm({
                    ...productNewForm,
                    productImages: productImages
                })
            }

            //handling on error
            reader.onerror = (err) => {
                console.log(err);
            }

            //convertning blob data to url
            reader.readAsDataURL(imageSrc)
        }

    }

    //methord for adding product image image
    const onProductImageChange = (event) => {
        const imageSrc = event.target.files[0];

        if (imageSrc) {
            //checking if of type image or not
            console.log(imageSrc);
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
                const tempProductImagesSrc = productImagesSrc;
                tempProductImagesSrc[maxImageIndex - 1] = reader.result;

                console.log('max', maxImageIndex)
                // setProductImagesSrc();

                console.log(productImagesSrc);

                //increasing current index in case of image upload
                setMaxImageIndex(maxImageIndex + 1);

                //adding new element to product images array in case of main image uploaded
                const productImages = productNewForm.productImages;
                if (maxImageIndex < 5) {
                    productImages.push('');
                }
                setProductNewForm({
                    ...productNewForm,
                    productImages: productImages
                })
            }

            //handling on error
            reader.onerror = (err) => {
                console.log(err);
            }

            //convertning blob data to url
            reader.readAsDataURL(imageSrc)
        }

    }

    //methord for setting preview image
    const previewImage = (index, src) => {
        if (src) {
            setActiveImageIndex(index);
            setMainPreviewImage(src);
        }
    }

    //methord for removing image
    const removeImage = () => {

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
            <form className="container mx-auto px-4 product-new-outer py-5" onSubmit={onSubmit}>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <FormControl isRequired size='sm'>
                            <FormLabel className='form-label-sm'>Product name</FormLabel>
                            <Input placeholder='Product name' name='productName' size='sm' value={productNewForm.productName} onChange={handleInputChange} />
                        </FormControl>

                        <FormControl>
                            <FormControl isRequired>
                                <FormLabel className='form-label-sm'>Product label</FormLabel>
                                <Input placeholder='Product label' size='sm' name='subHead' value={productNewForm.subHead} onChange={handleInputChange}/>
                            </FormControl>
                        </FormControl>
                        <FormControl className='col-span-1 md:col-span-2'>
                            <FormControl isRequired>
                                <FormLabel className='form-label-sm'>Product summary</FormLabel>
                                <Textarea placeholder='Here is a sample placeholder' name='summary' value={productNewForm.summary} onChange={handleInputChange} rows={8} size='sm' />
                            </FormControl>
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormControl key={`${index}key`} isRequired size='sm'>
                                            <FormLabel className='form-label-sm'>Name</FormLabel>
                                            <Input placeholder='Name' size='sm' value={productNewForm.keyHighlights[index].key} name='key' index={index} onChange={(e) => {handleKeyHighlightsChange(e, index)}}/>
                                        </FormControl>


                                        <FormControl key={`${index}value`} isRequired>
                                            <FormLabel className='form-label-sm form-label-with-btns'><span>Value</span>
                                                {
                                                    (productNewForm.keyHighlights.length > 1) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeKeyHighlight(index)} />) : ''
                                                }
                                            </FormLabel>
                                            <Input placeholder='Value' size='sm' value={productNewForm.keyHighlights[index].value} name='value' index={index} onChange={(e) => {handleKeyHighlightsChange(e, index)}} />
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


                    <div ref={addImageInputRef} className="hidden-element">
                        <Input placeholder='Main Image' size='sm' onChange={onMainImageChange} type='file' />
                        {
                            productNewForm.productImages.map((item, index) => {
                                return (
                                    <Input key={index} placeholder='Add Image' size='sm' type='file' onChange={onProductImageChange} />
                                )
                            })
                        }
                    </div>

                    <h4 className="product-add-sub-head">Add Product Images</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 add-product-image-container">
                        <FormControl className="col-span-3 add-product-image" size='lg'>
                            <div className="add-image-main">
                                <WrapItem className='add-more-image-btn'>
                                    <Button colorScheme='red' onClick={() => { addImage(maxImageIndex) }} size='lg'>Add Image  <CiCirclePlus className="text-3xl add-more-icon" /></Button>
                                </WrapItem>
                                <div className="all-images">
                                    <div className={`item-image ${activeImageIndex === -1 ? 'active-image' : ''}`} style={{
                                        backgroundImage: `url(${mainImageSrc})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }} onClick={() => { previewImage(-1, mainImageSrc) }}></div>
                                    {
                                        productNewForm.productImages.map((item, index) => {
                                            return (<div className={`item-image ${index === activeImageIndex ? 'active-image' : ''}`} key={index}
                                                style={{
                                                    backgroundImage: `url(${productImagesSrc[index]})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundRepeat: 'no-repeat',
                                                }} onClick={() => { previewImage(index, productImagesSrc[index]) }}></div>)
                                        })
                                    }
                                </div>
                            </div>
                            <div className="add-image-helper">
                                <FormHelperText className='add-image-helper-text' size='xl'>First image should be the main image.</FormHelperText>
                            </div>
                        </FormControl>
                        <div className="add-product-image-preview add-product-image-preview-btns" style={{
                            backgroundImage: `url(${mainPreviewImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}>
                            {
                                mainPreviewImage ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-2xl text-red-700' onClick={() => removeKeyHighlight(index)} />) : ''
                            }
                        </div>
                    </div>

                </div>



                <hr className='line-beaker' />

                <div className="product-category-sec">
                    <h3 className="product-add-sub-head">Set Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        <FormControl size='sm' isRequired>
                            <FormLabel className='form-label-sm'>Base price</FormLabel>
                            <NumberInput max={50} min={10} size='sm' value={productNewForm.basePrice} onChange={(e) => {handleNumberInputChange(e, 'basePrice')}}>
                                <NumberInputField placeholder='Base price' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl size='sm' isRequired>
                            <FormLabel className='form-label-sm'>MOQ</FormLabel>
                            <NumberInput max={50} min={10} size='sm' value={productNewForm.moq} onChange={(e) => {handleNumberInputChange(e, 'moq')}}>
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
                                <NumberInput max={50} min={10} size='sm' value={productNewForm.baseDiscount} onChange={(e) => {handleNumberInputChange(e, 'baseDiscount')}}>
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
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Want to set price-slab based on quantity?</FormLabel>
                    <RadioGroup defaultValue='false' size='sm' value={productNewForm.isQtyBasedPricing} onChange={handleIsQtyBasedSlab}>
                        <HStack spacing='24px'>
                            <Radio value='true'>yes</Radio>
                            <Radio value='false'>No</Radio>
                        </HStack>
                    </RadioGroup>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                </FormControl>

                <br />
                {
                    productNewForm.isQtyBasedPricing === 'true' ? <div className="product-category-sec">
                        <h3 className="product-add-sub-head">Set Price Slabs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {
                                productNewForm.qtyPriceSlabs.map((item, index) => {
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FormControl size='sm' isRequired>
                                                <FormLabel className='form-label-sm'>MOQ</FormLabel>
                                                <NumberInput max={50} min={10} size='sm'>
                                                    <NumberInputField placeholder='MOQ' />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                            <FormControl size='sm' isRequired>
                                                <FormLabel className='form-label-sm form-label-with-btns'>Discount (%)
                                                    {
                                                        ((productNewForm.qtyPriceSlabs.length > 1) && (productNewForm.qtyPriceSlabs.length - 1 == index)) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeQtyPriceSlab(index)} />) : ''
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
                    </div> : ''
                }


                <FormControl as='fieldset' mt={8} isRequired>
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Have variants according to sizes?</FormLabel>
                    <RadioGroup defaultValue='false' size='sm' onChange={handleIsSizeVariable} value={productNewForm.isSizeVariable}>
                        <HStack spacing='24px'>
                            <Radio value='true'>yes</Radio>
                            <Radio value='false'>No</Radio>
                        </HStack>
                    </RadioGroup>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                </FormControl>

                <br />
                {
                    //  in case size variations
                    productNewForm.isSizeVariable === 'true' ? <div className="product-category-sec">
                        <h3 className="product-add-sub-head">Set Size Variations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {
                                productNewForm.sizeVariations.map((item, index) => {
                                    return (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <FormControl size='sm' isRequired>
                                                <FormLabel className='form-label-sm'>Add Size</FormLabel>
                                                <NumberInput max={50} min={10} size='sm'>
                                                    <NumberInputField placeholder='Add Size' />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>

                                            <FormControl size='sm' isRequired>
                                                <FormLabel className='form-label-sm form-label-with-btns'>Price
                                                    {
                                                        (productNewForm.sizeVariations.length > 1) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeSizeVariation(index)} />) : ''
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
                    </div> : ''
                }


                <FormControl as='fieldset' mt={8} isRequired>
                    <FormLabel className='form-label-sm' fontWeight={600} as='legend'>Have variants according to colors?</FormLabel>
                    <RadioGroup defaultValue='false' size='sm' value={productNewForm.isColorVariable} onChange={handleIsColorVariable}>
                        <HStack spacing='24px'>
                            <Radio value='true'>yes</Radio>
                            <Radio value='false'>No</Radio>
                        </HStack>
                    </RadioGroup>
                    {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                </FormControl>

                <br />
                {
                    productNewForm.isColorVariable === 'true' ? <div className="product-category-sec product-color-variation-sec">
                        <h3 className="product-add-sub-head">Set Color Variations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {
                                productNewForm.colorVariations.map((item, index) => {
                                    return (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <h4 className='col-span-1 md:col-span-2 add-color-head'>Add Color
                                                    {
                                                        (productNewForm.colorVariations.length > 1) ? (<RiDeleteBin5Fill title='Delete Item' className='btn text-lg text-red-600' onClick={() => removeColorVariation(index)} />) : ''
                                                    }
                                                </h4>
                                                <div className="color-pick-add ">

                                                    <Input placeholder='Color name' size='sm' type='color' />
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

                    </div> : ''
                }


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
                        // setProductNewForm({
                        //     ...productNewForm,
                        //     mainImage: mainImageSrc
                        // });
                        console.log('end', productNewForm);
                        await addNewProduct({...productNewForm, mainImage: mainImageSrc}).then((res) => {
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
