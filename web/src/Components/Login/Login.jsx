import React from "react";
import "./Login.css";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	InputGroup,
	Input,
	InputRightElement,
	Button,
	useToast,
} from "@chakra-ui/react";
import { userLogin } from "../../Services/userServices/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	const [formState, setFormState] = React.useState({
		email: "",
		password: "",
		touched: {
			email: false,
			password: false,
		},
	});

	const toast = useToast();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
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
	const isEmailError = formState.email === "" && formState.touched.email;
	const isPasswordError =
		formState.password === "" && formState.touched.password;

	const onSubmit = async (e) => {
		e.preventDefault();
		await userLogin(formState)
			.then((res) => {
				toast({
					title: "Login Successfully",
					status: "success",
					isClosable: true,
				});
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<div className="login-details">
					<div className="inputs">
						<div className="input-filled-outer">
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
								<FormControl isRequired isInvalid={isPasswordError}>
									<FormLabel>Enter Password</FormLabel>
									<InputGroup size="md">
										<Input
											name="password"
											value={formState.password}
											onChange={handleInputChange}
											onBlur={handleBlur}
											pr="4.5rem"
											type={show ? "text" : "password"}
											placeholder="Enter Password"
										/>
										<InputRightElement width="4.5rem">
											<Button h="1.75rem" size="sm" onClick={handleClick}>
												{show ? "Hide" : "Show"}
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
							<Button mt={4} colorScheme="teal" type="submit">
								Submit
							</Button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
};

export default Login;
