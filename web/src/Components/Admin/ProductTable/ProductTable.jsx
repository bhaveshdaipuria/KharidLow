import React from 'react';
import './ProductTable.css'; // Import external CSS file
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { FaEye, FaMagnifyingGlass, FaPen } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import ProductImagesModal from '../Modals/ProductImagesModal/ProductImagesModal';
import ProductSizesModal from '../Modals/ProductSizes/ProductSizesModal';
import ProductColorsModal from '../Modals/ProductColorsModal/ProductColorsModal';
import PriceSlabModal from '../Modals/PriceSlabModal/PriceSlabModal';

const ProductTable = () => {
    const coins = [
        {
            id: 1,
            mainImage: '',
            productName: 'Red T-shirt',
            category: 'RTC',
            subCategory: '$67,177.77',
            item: 'shirts',
            sku: 'PJK/UI/009',
            basePrice: '100',
            baseDiscount: '10%',
            color: '#FFA037',
            taxType: "",
            productCode: "",
            keyHighlights: "",
            baseSize: "",
            baseColor: "",
            stock: 11
        },
        {
            id: 2,
            name: 'Solana',
            symbol: 'SOL',
            price: '$187.50',
            supply: '444,812,093',
            hourlyChange: '0.24%',
            dailyChange: '1.77%',
            weeklyChange: '-7.16%',
            color: '#1E293B',
            iconPath:
                'M12.488 21.159a.5.5 0 0 1 .354-.146h12.22a.25.25 0 0 1 .176.427l-2.413 2.414...',
        },
        {
            id: 3,
            name: 'Polygon',
            symbol: 'MATIC',
            price: '$1.50',
            supply: '6,872,692,303',
            hourlyChange: '0.5%',
            dailyChange: '2.3%',
            weeklyChange: '-4.5%',
            color: '#E84191',
            iconPath: 'M21.21 10.888c0 1.042-1.454 1.888-3.247 1.888...',
        },
    ];

    return (
        <>
            <div className="product-table-container">
                <main className="product-table-main">
                    <div className="product-table-wrapper">
                        <div className="product-table-card">
                            <header className="product-table-header">
                                <h2>Product List</h2>
                                <div className="table-operations grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="category-filters grid gap-2 grid-cols-2 ">

                                        <Select placeholder='Select Category' size='xs'>
                                            <option>United Arab Emirates</option>
                                            <option>Nigeria</option>
                                        </Select>
                                        <Select placeholder='Select Category' size='xs'>
                                            <option>United Arab Emirates</option>
                                            <option>Nigeria</option>
                                        </Select>

                                    </div>
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
                                                <th>Name</th>
                                                <th>SKU</th>
                                                <th>Item Type</th>
                                                <th>Price</th>
                                                <th>Discount</th>
                                                <th className='text-center'>Price Slabs</th>
                                                <th>Stock Quantity</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {coins.map((coin) => (
                                                <tr key={coin.id}>
                                                    <td>{coin.id}</td>
                                                    <td>
                                                        <div className="product-image">
                                                            {/* <img src="" alt="" className="image-view"/> */}
                                                        </div>
                                                    </td>
                                                    <td>{coin.productName}</td>
                                                    <td>{coin.sku}</td>
                                                    <td>{coin.item}</td>
                                                    <td className="text-emerald">{coin.basePrice}</td>
                                                    <td className="text-emerald">{coin.baseDiscount}</td>
                                                    <td className="text-red text-center" ><FaPen title='Edit Product' className='btn text-md text-blue-600 action-btns' /></td>
                                                    <td className="text-red">{coin.stock}</td>
                                                    <td className=''>
                                                        <FaPen title='Edit Product' className='btn text-md text-blue-600 action-btns' />
                                                        <FaEye title='Preview' className='btn text-md text-blue-600 action-btns' />
                                                        <RiDeleteBin5Fill title='Delete Item' className='btn text-md text-red-600 action-btns'></RiDeleteBin5Fill>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* <ProductImagesModal></ProductImagesModal> */}
            {/* <ProductSizesModal></ProductSizesModal> */}
            {/* <ProductColorsModal></ProductColorsModal> */}
            <PriceSlabModal></PriceSlabModal>
        </>
    );
};

export default ProductTable;
