// -------------------------------------- This files contains all then methords used in product new components-------------

import { addNewProduct } from "../../../Services/registerService";
import { getCategoryDataService } from "../../../Services/getDataService";

//variables
let categoryData = {}; //this var will contain category related data 
let subCategoryData = {};

//methords for handing form data change starts

//methord for handling input change in case of string value
const handleInputChange = (e, setProductNewForm) => {
    const { name, value } = e.target;
    setProductNewForm((prev) => ({
        ...prev,
        [name]: value
    }));
};


//methord for handing number inputs
const handleNumberInputChange = (e, name, setProductNewForm) => {
    const value = e;
    setProductNewForm((prev) => ({
        ...prev,
        [name]: value
    }));
};


//methords for handling keyhighlights change
const handleKeyHighlightsChange = (e, index, setProductNewForm) => {
    const { name, value } = e.target;
    setProductNewForm((prev) => {
        const keyHighLights = prev.keyHighlights;
        keyHighLights[index][name] = value;
        return (
            {
                ...prev,
                keyHighlights: keyHighLights
            }
        )
    }
    );

}

const handleIsDiscountedChange = (e, setProductNewForm) => {
    setProductNewForm((prev) => ({
        ...prev,
        isDiscounted: e
    })
    );
}


const handletaxTypeChange = (e, setProductNewForm) => {
    setProductNewForm((prev) => ({
        ...prev,
        taxType: e
    })
    );
}

//methords for handing form data change ends






//methord for getting category related data
const getCategoryData = async (setCategories) => {
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
const onCategoryChange = (event, setSubCategories, setItemList, setProductNewForm) => {
    //empty the subcattegory and item list on caegory change
    setSubCategories([]);
    setItemList([]);

    //setting sub category list 
    subCategoryData = categoryData[event.target.value]
    if (subCategoryData && typeof subCategoryData == 'object') {
        setSubCategories(Object.keys(subCategoryData));
        setProductNewForm((prev) => ({
            ...prev,
            category: event.target.value
        })
        );
    }

}


//metord run on sub ctaegory selection
const onSubCategoryChange = (event, setItemList, setProductNewForm) => {
    //empty the item list on caegory change
    setItemList([]);

    //setting sub category list 
    // setItemList(subCategoryData[event.target.value].map(item));
    if (subCategoryData[event.target.value]) {
        setItemList(subCategoryData[event.target.value]);
        setProductNewForm((prev) => ({
            ...prev,
            subCategory: event.target.value
        })
        );
    }

}

const onItemChange = (event, setProductNewForm) => {
    setProductNewForm((prev) => ({
        ...prev,
        item: event.target.value
    })
    );
}

const ontaxPercentageChange = (event, setProductNewForm) => {
    setProductNewForm(prev => ({
        ...prev,
        taxPercentage: event.target.value
    })
    );
}


//methord for adding new key highlight
const addNewKeyHighlight = (setProductNewForm) => {


    setProductNewForm((prev) => {
        const keyHighlights = prev.keyHighlights;
        keyHighlights.push({
            key: '',
            value: ''
        });

        return ({
            ...prev,
            keyHighlights: keyHighlights
        })

    });
}

//methord for removing particular key highlight at given index
const removeKeyHighlight = (index, setProductNewForm) => {

    setProductNewForm(prev => {
        const keyHighlights = prev.keyHighlights;
        keyHighlights.splice(index, 1);

        return {
            ...prev,
            keyHighlights: keyHighlights
        }
    })
}

//methord for adding image 
const addImage = (addImageInputRef) => {
    if (addImageInputRef.current) {
        addImageInputRef.current.click();
    } else {
        console.warn('Element not mounted yet')
    }
}

//methord for adding main image
const onMainImageChange = (event, toast, setMainImageSrc, setProductNewForm) => {
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

            setProductNewForm(prev => {

                return {
                    ...prev,
                    mainImage: imageSrc
                }

            });

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
const onSubmit = async (event, productNewForm, setLoading, setSubmitted, setProductNewForm, toast, setMainImageSrc) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    console.log(productNewForm);
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
    formData.append('taxPercentage', productNewForm.taxPercentage);
    await addNewProduct(formData).then((res) => {
        setSubmitted(false);
        setLoading(false);
        reset(setProductNewForm, setMainImageSrc);
        
    }).catch(err => {
        console.log('error', err)
        setSubmitted(false);
        setLoading(false);
        toast({
            title: err.response.data.message,
            status: 'error',
            isClosable: true,
            // variant: 'top-accent'
        });
        response
    });
}

//methiord for reseting form
const reset = (setProductNewForm, setMainImageSrc) => {
    setProductNewForm({
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
    setMainImageSrc('');
}






//exports
export {
    handleInputChange, handleNumberInputChange, handleKeyHighlightsChange, handleIsDiscountedChange, handletaxTypeChange,
    getCategoryData, onCategoryChange, onSubCategoryChange, onItemChange, ontaxPercentageChange, addNewKeyHighlight,
    removeKeyHighlight, addImage, onMainImageChange, onSubmit
}