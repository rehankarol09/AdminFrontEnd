import React from 'react';
import NewModal from '../../../components/Ui/Input/Modal';



const DeleteCategoryModal = (props) => {

    const {
        ModalTitle,
        show,
        handleClose,
        handleclose,
        buttons,
        checkedArray,
        expandedArray
    } = props;

    return (
        <NewModal
        modaltitle={ModalTitle}
            show={show}
            handleClose={handleClose}
            handleclose={handleclose}
            buttons={buttons}
        >

            <h5>Checked</h5>
            {
                checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }
            <h5>Expanded</h5>
            {
                expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }
        </NewModal>
    )

}

export default DeleteCategoryModal;