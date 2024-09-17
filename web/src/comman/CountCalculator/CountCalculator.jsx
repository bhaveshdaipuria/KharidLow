import { useState } from 'react';
import { Button, Box, Flex, Input } from '@chakra-ui/react';
import './CountCalculator.css'

const CountCalculator = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <>
    <div className="couter-heading">
        Select the Qunatity<span className='min-count-note'>(Note: <sup>*</sup>Minimum quantity should be 6)</span>
    </div>
    <Box 
      borderWidth="1px" 
      borderRadius="md" 
      p={4} 
      maxW="300px"
      bg="white" 
      boxShadow="md"  // Moderate shadow for separation from the background
    >
      <Flex align="center" justify="space-between">
        {/* Increment Button */}
        <Button 
          size="md" 
          bg="lightblue" 
          color="black" 
          onClick={increment} 
          _hover={{ bg: "blue.100" }}
          borderRadius="md"
        >
          +
        </Button>
        
        {/* Display the count in the center */}
        <Input 
          value={count} 
          readOnly 
          textAlign="center" 
          size="md" 
          width="80px"  // Slightly bigger input
          borderWidth="1px" 
          borderColor="gray.300"
          borderRadius="md"
          mx={3}  // Spacing between the buttons and input
        />
        
        {/* Decrement Button */}
        <Button 
          size="md" 
          bg="lightblue" 
          color="black" 
          onClick={decrement} 
          _hover={{ bg: "blue.100" }}
          borderRadius="md"
        >
          -
        </Button>
      </Flex>
    </Box>
    </>
  );
};

export default CountCalculator;
