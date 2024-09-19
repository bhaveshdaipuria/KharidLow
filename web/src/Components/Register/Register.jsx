import React from 'react';
import './Register.css';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    InputGroup,
    Input,
    InputRightElement,
    Button,
    InputLeftElement,
    useToast
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons'
import { Col } from 'react-bootstrap';
import { register } from '../../Services/registerService';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [formState, setFormState] = React.useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNo: '',
        touched: {
            fullName: false,
            email: false,
            password: false,
            contactNo: false,
            confirmPassword: false
        },
    });

    const toast = useToast();

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

    //methord for submitting the form
    const onSubmit = async (e) => {
        e.preventDefault();

        //in case password and confirm password doesn't matches
        if (formState.password !== formState.confirmPassword) {
            toast({
                title: 'Password confirmation and password should be same',
                status: 'error',
                isClosable: true
            });
            return;
        }

        await register(formState).then((res) => {
            toast({
                title: 'User registered successfully',
                status: 'success',
                isClosable: true
            });
            setFormState({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
                contactNo: '',
                touched: {
                    fullName: false,
                    email: false,
                    password: false,
                    contactNo: false,
                    confirmPassword: false
                },
            });

            isNameError = false;
            isEmailError = false;
            isPasswordError = false;
            isConfirmPasswordError = false;
            isContactNoError = false;
            navigate('/');
        }).catch((err) => {
            console.log(err)
        });
    }

    // Error conditions
    let isNameError = formState.fullName === '' && formState.touched.fullName;
    let isEmailError = formState.email === '' && formState.touched.email;
    let isPasswordError = formState.password === '' && formState.touched.password;
    let isConfirmPasswordError = formState.confirmPassword === '' && formState.touched.confirmPassword;
    let isContactNoError = formState.contactNo === '' && formState.touched.contactNo;

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="registerpage-detail">
                    <div className="registerInputs">
                        <div className="input-filled-outer">
                            <h3 className='text-center text-2xl text-gray-700' style={{ fontWeight: 600 }}>Register Your Self.</h3>
                            <div>
                                <Col xs={12} lg={6} className='my-3' >
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
                                </Col>
                                <Col xs={12} lg={6} className='my-3'>
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
                                </Col>
                                <Col xs={12} lg={6} className='my-3'>
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
                                </Col>
                                <Col xs={12} lg={6} className='my-3'>
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
                                </Col>
                                <Col xs={12} lg={6} className='my-3'>
                                    <div className="input-fields">
                                        <FormControl isRequired isInvalid={isConfirmPasswordError}>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <InputGroup size='md'>
                                                <Input
                                                    name='confirmPassword'
                                                    value={formState.confirmPassword}
                                                    onChange={handleInputChange}
                                                    onBlur={handleBlur}
                                                    pr='4.5rem'
                                                    type={show ? 'text' : 'password'}
                                                    placeholder='Confirm Password'
                                                />
                                                <InputRightElement width='4.5rem'>
                                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                        {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {!isConfirmPasswordError ? (
                                                // <FormHelperText>Enter your password.</FormHelperText>
                                                ""
                                            ) : (
                                                <FormErrorMessage>Password Confirmation is required.</FormErrorMessage>
                                            )}
                                        </FormControl>
                                    </div>
                                </Col>
                            </div>

                            <Button
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