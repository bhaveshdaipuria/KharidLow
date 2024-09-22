import { addProduct, updateProducts } from "../../../Services/adminServices/productsService";
import { getCategoryData } from "../../../Services/adminServices/productsService";

let categoryData = {};
let subCategoryData = {};

const handleInputChange = (e, setProductNewForm) => {
	const { name, value } = e.target;
	setProductNewForm((prev) => ({
		...prev,
		[name]: value,
	}));
};

const handleNumberInputChange = (e, name, setProductNewForm) => {
	const value = e;
	setProductNewForm((prev) => ({
		...prev,
		[name]: value,
	}));
};

const handleKeyHighlightsChange = (e, index, setProductNewForm) => {
	const { name, value } = e.target;
	setProductNewForm((prev) => {
		const keyHighLights = prev.keyHighlights;
		keyHighLights[index][name] = value;
		return {
			...prev,
			keyHighlights: keyHighLights,
		};
	});
};

const handleIsDiscountedChange = (e, setProductNewForm) => {
	setProductNewForm((prev) => ({
		...prev,
		isDiscounted: e,
	}));
};

const handletaxTypeChange = (e, setProductNewForm) => {
	setProductNewForm((prev) => ({
		...prev,
		taxType: e,
	}));
};

//methods for handling form data change ends

//method for getting category related data
const getCatData = async (setCategories) => {
	await getCategoryData()
		.then((res) => {
			if (res.data && Object.keys(res.data).length) {
				categoryData = res.data;
				setCategories(Object.keys(categoryData));
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

//method run on ctaegory selection
const onCategoryChange = (
	event,
	setSubCategories,
	setItemList,
	setProductNewForm,
) => {
	//empty the subcattegory and item list on caegory change
	setSubCategories([]);
	setItemList([]);

	//setting sub category list
	subCategoryData = categoryData[event.target.value];
	if (subCategoryData && typeof subCategoryData == "object") {
		setSubCategories(Object.keys(subCategoryData));
		setProductNewForm((prev) => ({
			...prev,
			category: event.target.value,
		}));
	}
};

//method run on sub ctaegory selection
const onSubCategoryChange = (event, setItemList, setProductNewForm) => {
	//empty the item list on caegory change
	setItemList([]);

	//setting sub category list
	// setItemList(subCategoryData[event.target.value].map(item));
	if (subCategoryData[event.target.value]) {
		setItemList(subCategoryData[event.target.value]);
		setProductNewForm((prev) => ({
			...prev,
			subCategory: event.target.value,
		}));
	}
};

const onItemChange = (event, setProductNewForm) => {
	setProductNewForm((prev) => ({
		...prev,
		item: event.target.value,
	}));
};

const ontaxRateChange = (event, setProductNewForm) => {
	setProductNewForm((prev) => ({
		...prev,
		taxRate: event.target.value,
	}));
};

//method for adding new key highlight
const addNewKeyHighlight = (setProductNewForm) => {
	setProductNewForm((prev) => {
		const keyHighlights = prev.keyHighlights;
		keyHighlights.push({
			key: "",
			value: "",
		});

		return {
			...prev,
			keyHighlights: keyHighlights,
		};
	});
};

//method for removing particular key highlight at given index
const removeKeyHighlight = (index, setProductNewForm) => {
	setProductNewForm((prev) => {
		const keyHighlights = prev.keyHighlights;
		keyHighlights.splice(index, 1);

		return {
			...prev,
			keyHighlights: keyHighlights,
		};
	});
};

//method for adding image
const addImage = (addImageInputRef) => {
	if (addImageInputRef.current) {
		addImageInputRef.current.click();
	} else {
		console.warn("Element not mounted yet");
	}
};

//method for adding main image
const onMainImageChange = (
	event,
	toast,
	setMainImageSrc,
	setProductNewForm,
) => {
	const imageSrc = event.target.files[0];

	if (imageSrc) {
		//checking if of type image or not
		const type = imageSrc.type;
		if (
			type !== "image/jpeg" &&
			type !== "image/png" &&
			type !== "image/webp"
		) {
			toast({
				title: "Invalid file type",
				description: "Only .png, .jpg, .jpeg and .webp files are allowed",
				status: "error",
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

			setProductNewForm((prev) => {
				return {
					...prev,
					mainImage: imageSrc,
				};
			});
		};

		//handling on error
		reader.onerror = (err) => {
			console.log(err);
		};

		//convertning blob data to url
		reader.readAsDataURL(imageSrc);
	}
};

//method for handling submit
const onSubmit = async (
	event,
	productNewForm,
	setLoading,
	setSubmitted,
	setProductNewForm,
	toast,
	setMainImageSrc,
	isEditMode
) => {
	event.preventDefault();
	setLoading(true);
	let keysToAppend;
	const formData = new FormData();
	if (isEditMode) {
		const oldProduct = location.state.productDetails;
		const keys = Object.keys(oldProduct);
		const updatedKeys = keys.filter((key) => productNewForm[key] !== oldProduct[key]);
		keysToAppend = updatedKeys;
	} else {
		keysToAppend = Object.keys(productNewForm);
	}

	keysToAppend.forEach((key) => {
		if (key === 'keyHighlights') {
			formData.append(key, JSON.stringify(productNewForm[key]));
		} else {
			formData.append(key, productNewForm[key]);
		}
	})

	if (isEditMode) {
		try {
			const res = await updateProducts(formData);
			if (res) {
				setSubmitted(false);
				setLoading(false);
				reset(setProductNewForm, setMainImageSrc);
				toast({
					title: "Product Updated Sucessfully",
					status: "success",
					isClosable: true,
					// variant: 'top-accent'
				});
			}
		} catch (err) {
			console.log("error", err);
			setSubmitted(false);
			setLoading(false);
			toast({
				title: err.response.data.message,
				status: "error",
				isClosable: true,
				// variant: 'top-accent'
			});
			setIsEditMode(false);
		}

	} else {
		await addProduct(formData)
			.then((res) => {
				setSubmitted(false);
				setLoading(false);
				reset(setProductNewForm, setMainImageSrc);
				toast({
					title: 'Product Added Successfully',

					status: "success",
					isClosable: true,
					// variant: 'top-accent'
				});
			})
			.catch((err) => {
				console.log("error", err);
				setSubmitted(false);
				setLoading(false);
				toast({
					title: err.response.data.message,
					status: "error",
					isClosable: true,
					// variant: 'top-accent'
				});
			});
	}
};

//method for reseting form
const reset = (setProductNewForm, setMainImageSrc) => {
	setProductNewForm({
		category: "",
		subCategory: "",
		item: "",
		productName: "",
		subHead: "",
		sku: "",
		summary: "",
		keyHighlights: [
			{
				key: "",
				value: "",
			},
		],
		mainImage: "",
		basePrice: 0,
		moq: 0,
		isDiscounted: false,
		baseDiscount: 0,
		taxType: "",
		taxRate: "",
	});
	setMainImageSrc("");
};

//exports
export {
	handleInputChange,
	handleNumberInputChange,
	handleKeyHighlightsChange,
	handleIsDiscountedChange,
	handletaxTypeChange,
	getCatData,
	onCategoryChange,
	onSubCategoryChange,
	onItemChange,
	ontaxRateChange,
	addNewKeyHighlight,
	removeKeyHighlight,
	addImage,
	onMainImageChange,
	onSubmit,
};
