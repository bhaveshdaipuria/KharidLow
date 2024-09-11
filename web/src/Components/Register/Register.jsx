import React from 'react';
import './Register.css';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    InputLeftElement,
    Divider,
    Box,
    AbsoluteCenter,
    Stack,
    Select
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons'

const Register = () => {

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [formState, setFormState] = React.useState({
        fullName: '',
        email: '',
        password: '',
        contactNo: '',
        fullAddress: '',
        houseNo: '',
        streetNo: '',
        city: '',
        landmark: '',
        pincode: '',
        state: '',
        touched: {
            fullName: false,
            email: false,
            password: false,
            contactNo: false,
            fullAddress: false,
            houseNo: false,
            streetNo: false,
            city: false,
            landmark: false,
            pincode: false,
            state: false
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle touch state for when a field is blurred
    const handleBlur = (e) => {
        const { name } = e.target;
        setFormState((prev) => ({
            ...prev,
            touched: {
                ...prev.touched,
                [name]: true, // Mark the specific field as touched
            },
        }));
    };

    // Error conditions
    const isNameError = formState.fullName === '' && formState.touched.fullName;
    const isEmailError = formState.email === '' && formState.touched.email;
    const isPasswordError = formState.password === '' && formState.touched.password;
    const isContactNoError = formState.contactNo === '' && formState.touched.contactNo;
    const isFullAddressError = formState.fullAddress === '' && formState.touched.fullAddress;
    const isHouseNoError = formState.houseNo === '' && formState.touched.houseNo;
    const isStreetNoError = formState.streetNo === '' && formState.touched.streetNo;
    const isCityError = formState.city === '' && formState.touched.city;
    const isPincodeError = formState.pincode === '' && formState.touched.pincode;
    const isStateError = formState.state === '' && formState.touched.state;

    return (
        <>
            <form action="/register" method="post">
                <div className="registerpage-detail">
                    <div className="inputs">
                        <div className="input-filled-outer">
                            <h3>Register Your Self</h3>
                            <div className="input-fields">
                                <FormControl isRequired isInvalid={isNameError}>
                                    <FormLabel className="label">Enter Your Full Name</FormLabel>
                                    <Input
                                        placeholder="Enter Name"
                                        name="fullName"
                                        value={formState.fullName}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    />
                                    {!isNameError ? (
                                        // <FormHelperText>Enter the email you'd like to receive updates.</FormHelperText>
                                        ""
                                    ) : (
                                        <FormErrorMessage>Full Name is required.</FormErrorMessage>
                                    )}
                                </FormControl>
                            </div>
                            <div className="input-fields">
                                <FormControl isRequired isInvalid={isEmailError}>
                                    <FormLabel>Enter Your Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter Email"
                                    />
                                    {!isEmailError ? (
                                        // <FormHelperText>Enter the email you'd like to receive updates.</FormHelperText>
                                        ""
                                    ) : (
                                        <FormErrorMessage>Email is required.</FormErrorMessage>
                                    )}
                                </FormControl>
                            </div>
                            <div className="input-fields">
                                <FormControl isRequired isInvalid={isContactNoError}>
                                    <FormLabel>Enter Your Contact No</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <PhoneIcon color='gray.300' />
                                        </InputLeftElement>
                                        <Input
                                            type="tel"
                                            placeholder="Contact Number"
                                            name="contactNo"
                                            value={formState.contactNo}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                        />
                                    </InputGroup>
                                    {!isContactNoError ? (
                                        ""
                                    ) : (
                                        <FormErrorMessage>Contact Number is required.</FormErrorMessage>
                                    )}
                                </FormControl>
                            </div>
                            <div className="input-fields">
                                <FormControl isRequired isInvalid={isPasswordError}>
                                    <FormLabel>Enter Password</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            name='password'
                                            value={formState.password}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            pr='4.5rem'
                                            type={show ? 'text' : 'password'}
                                            placeholder='Enter Password'
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                {show ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    {!isPasswordError ? (
                                        // <FormHelperText>Enter your password.</FormHelperText>
                                        ""
                                    ) : (
                                        <FormErrorMessage>Password is required.</FormErrorMessage>
                                    )}
                                </FormControl>
                            </div>
                            <div>
                                <Box position='relative' padding='8'>
                                    <Divider />
                                    <AbsoluteCenter bg='white' px='4'>
                                        Enter Your Full Address
                                    </AbsoluteCenter>
                                </Box>
                            </div>
                            <div className="input-fields">
                                <div>
                                    <FormControl isRequired isInvalid={isFullAddressError}>
                                        {/* <FormLabel>Enter Full Address</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="fullAddress"
                                            value={formState.fullAddress}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter Full Address'
                                        />
                                        {!isFullAddressError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>Full address is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </div>
                                <div className="input-fields-address">
                                    <FormControl isRequired isInvalid={isHouseNoError}>
                                        {/* <FormLabel>Flat, House No, Building, Apartment</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="houseNo"
                                            value={formState.houseNo}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Flat, House No, Building, Apartment'
                                        />
                                        {!isHouseNoError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>Flat, House No, Building, Apartment is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <FormControl isRequired isInvalid={isStreetNoError}>
                                        {/* <FormLabel>Enter Password</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="streetNo"
                                            value={formState.streetNo}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter Street, Sector'
                                        />
                                        {!isStreetNoError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>Street, Sector is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </div>
                                <div className="input-fields-address">
                                    <FormControl isRequired isInvalid={isCityError}>
                                        {/* <FormLabel>Enter Password</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="city"
                                            value={formState.city}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter City, Village'
                                        />
                                        {!isCityError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>City, Village is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        {/* <FormLabel>Flat, House No, Building, Apartment</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="landmark"
                                            value={formState.landmark}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter Landmark'
                                        />
                                    </FormControl>
                                </div>
                                <div className="input-fields-address">
                                    <FormControl isRequired isInvalid={isPincodeError}>
                                        {/* <FormLabel>Enter Password</FormLabel> */}
                                        <Input
                                            type="number"
                                            name="pincode"
                                            value={formState.pincode}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter Pincode'
                                        />
                                        {!isPincodeError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>Pincode is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <FormControl isRequired isInvalid={isStateError}>
                                        <Stack spacing={3}>
                                            <Select variant='outline' placeholder='Select State'
                                                name="state"
                                                value={formState.state}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                                <option value="Goa">Goa</option>
                                                <option value="Gujarat">Gujarat</option>
                                                <option value="Haryana">Haryana</option>
                                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                <option value="Jharkhand">Jharkhand</option>
                                                <option value="Karnataka">Karnataka</option>
                                                <option value="Kerala">Kerala</option>
                                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Manipur">Manipur</option>
                                                <option value="Meghalaya">Meghalaya</option>
                                                <option value="Mizoram">Mizoram</option>
                                                <option value="Nagaland">Nagaland</option>
                                                <option value="Odisha">Odisha</option>
                                                <option value="Punjab">Punjab</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                                <option value="Sikkim">Sikkim</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Telangana">Telangana</option>
                                                <option value="Tripura">Tripura</option>
                                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                <option value="Uttarakhand">Uttarakhand</option>
                                                <option value="West Bengal">West Bengal</option>
                                            </Select>
                                        </Stack>
                                        {!isStateError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>State is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </div>
                            </div>
                            <Button
                                mt={4}
                                colorScheme='teal'
                                type='submit'
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
};

export default Register;
