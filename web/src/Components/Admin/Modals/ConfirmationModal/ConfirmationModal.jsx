import './ConfirmationModal.css'
import { FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Input, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
const ConfirmationModal = ({
    isOpen = false,
    setIsOpen,
    onConFirmation,
    action
}) => {

    useEffect(() => {
        //intially setting random pass
        setConfirmationPass(generateRandomText());
    }, []);

    //var for determining text matches or not
    const [textMatches, setTextMatches] = useState(false);
    const [confirmationPass, setConfirmationPass] = useState('Confirm')

    //methord for closing modal
    const closeModal = () => {
        //generate now pass on modal close
        setTextMatches(false);
        setConfirmationPass(generateRandomText());
        setIsOpen && setIsOpen(false);
    }

    //methord for handling confirmation of the modal
    const onConfirm = () => {
        console.log();
        onConFirmation && onConFirmation();
        closeModal();
    }

    //methord for generating randon 6 char long yrxt for confirmation
    const generateRandomText = () => {
        const str = "ABCDEFGHIJKLMONOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";

        const randomArr = [];

        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(str.length * Math.random());
            randomArr.push(str[randomIndex]);
        }

        const randomtext = randomArr.join('');
        return randomtext;
    }

    //var for handing change in input field of confirmation modal
    const onInputChange = (e) => {
        const input = e.target.value;
        console.log(input);
        if (input === confirmationPass) {
            setTextMatches(true);
        } else {
            setTextMatches(false)
        }
    }

    return (
        <Modal size='xl' isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent className="confirmation-modal-content">
                <ModalCloseButton onClick={closeModal} />
                <ModalBody >
                    <h4 className="modal-subhead">Confirm Your Action.</h4>
                    <p className="confirmation-text text-red-600">{action}</p>
                    <br />
                    <p className="confirmation-pass">Type "{confirmationPass}" to confirm your action</p>
                    <br />
                    <FormControl>
                        <Input type='text' onChange={(e) => { onInputChange(e) }} />
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme={textMatches ? 'green' : 'red'}
                        isDisabled={!textMatches}
                        onClick={onConfirm}>
                        Confirm
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmationModal;