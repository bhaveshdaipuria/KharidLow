import React from 'react';
import './Register.css'
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
    AbsoluteCenter
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons'

const Register = () => {

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [formState, setFormState] = React.useState({
        email: '',
        password: '',
        name: '',
        contactNo: '',
        touched: {
            email: false,
            password: false,
            name: false,
            contactNo: false
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
    const isEmailError = formState.email === '' && formState.touched.email;
    const isNameError = formState.name === '' && formState.touched.name;
    const isPasswordError = formState.password === '' && formState.touched.password;
    const isContactNoError = formState.contactNo === '' && formState.touched.contactNo;

    return (
        <>
            <form action="">
                <div className="registerpage-detail">
                    <div className="inputs">
                        <div className="input-filled-outer">
                            <div className="input-fields">
                                <FormControl isRequired isInvalid={isNameError}>
                                    <FormLabel>Enter Your Full Name</FormLabel>
                                    <Input
                                        placeholder="Enter Name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                    />
                                    {!isNameError ? (
                                        // <FormHelperText>Enter the email you'd like to receive updates.</FormHelperText>
                                        ""
                                    ) : (
                                        <FormErrorMessage>Name is required.</FormErrorMessage>
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
                                    <FormControl isRequired isInvalid={isPasswordError}>
                                        {/* <FormLabel>Enter Password</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="fullAddress"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter Full Address'
                                        />
                                        {!isPasswordError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>Full address is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </div>
                                <div className="input-fields-address">
                                    <FormControl isRequired isInvalid={isPasswordError}>
                                        {/* <FormLabel>Enter Password</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter City'
                                        />
                                        {!isPasswordError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>Password is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <FormControl isRequired isInvalid={isPasswordError}>
                                        {/* <FormLabel>Enter Password</FormLabel> */}
                                        <Input
                                            type="text"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter Police Station'
                                        />
                                        {!isPasswordError ? (
                                            // <FormHelperText>Enter your password.</FormHelperText>
                                            ""
                                        ) : (
                                            <FormErrorMessage>Password is required.</FormErrorMessage>
                                        )}
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
};

export default Register;
