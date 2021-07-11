import React from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
* @author
* @function Modal
**/

const NewModal = (props) => {
    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                size={props.size}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.ModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={props.handleClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default NewModal;