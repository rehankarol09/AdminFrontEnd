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
                onHide={props.handleclose}
                size={props.size}
                backdrop="static"
                keyboard={false}
                
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.modaltitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <Modal.Footer>
                    {
                        props.buttons ? props.buttons.map((btn, index) => (
                            <Button
                                key={index}
                                variant={btn.color}
                                onClick={btn.onClick}
                            >
                                {btn.label}
                            </Button>
                        )
                        )
                            : <Button
                                variant="primary"
                                onClick={props.handleClose}
                                {...props}
                                className='btn-sm'
                                style={{ background: '#333' }}>
                                Save
                            </Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default NewModal;