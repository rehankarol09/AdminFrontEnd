import React from "react";
import Input from "../../../components/Ui/Input";
import NewModal from "../../../components/Ui/Input/Modal";
import { Row,Col,Container } from "react-bootstrap";

const UpdatecategoryModal = (props) => {

    const {
        show,
        handleClose,
        handleclose,
        size,
        ModalTitle,
        expandedArray,
        checkedArray,
        handleCategoryInputModal,
        categorylist} 
        = props;

    return (
        <NewModal
            show={show}
            handleClose={handleClose}
            modaltitle={ModalTitle}
            size={size}
            handleclose={handleclose}
        >
            <Container>
                {/* Expanded Array*/}
                <Row>
                    <Col>
                        <h5>Expanded List</h5>
                    </Col>
                </Row>

                {expandedArray.length > 0 &&
                    expandedArray.map((item, index) => (
                        <Row key={index}>
                            <Col>
                                <Input
                                    placeholder="Category Name"
                                    type='text'
                                    value={item.name}
                                    onChange={(e) => {
                                        handleCategoryInputModal('name', e.target.value, index, "expanded")
                                    }}
                                />
                            </Col>
                            <Col>
                                {/* <select className="form-control" value={item.parentId}
                                    onChange={(e) => {
                                        handleCategoryInputModal('parentId', e.target.value, index, "expanded")
                                    }}
                                    style={{ marginBottom: "30px" }}>

                                    <option >Select Category</option>
                                    {
                                    categorylist.map(options =>

                                        <option key={options.value} value={options.value}>{options.name}</option>
                                    )}
                                </select> */}

                                <Input
                                    placeholder="Select category"
                                    type='select'
                                    options={categorylist}
                                    value={item.parentId}
                                    onChange={(e) => {
                                        handleCategoryInputModal('parentId', e.target.value, index, "expanded")
                                    }}
                                />

                            </Col>
                            <Col>
                                <select className='form-control' value={item.type} 
                                onChange={(e)=>{
                                    handleCategoryInputModal('type', e.target.value, index, "expanded")
                                }}
                                >
                                    <option>--Select Type--</option>
                                    <option value='store'>Store</option>
                                    <option value='product'>Product</option>
                                    <option value='Page'>Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                    )
                }

                {/* Checked Array*/}
                <Row>
                    <Col>
                        <h5>Checked List</h5>
                    </Col>

                </Row>

                {checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                    (
                        <Row key={index}>
                            <Col>
                                <Input
                                    placeholder="Category Name"
                                    type='text'
                                    value={item.name}
                                    onChange={(e) => {
                                        handleCategoryInputModal('name', e.target.value, index, "checked")
                                    }}
                                />
                            </Col>
                            

                            <Col >
                                <Input
                                    placeholder="Select category"
                                    type='select'
                                    options={categorylist}
                                    value={item.parentId}
                                    onChange={(e) => {
                                        handleCategoryInputModal('parentId', e.target.value, index, "checked")
                                    }}
                                />
                            </Col>
                            <Col>
                                <select className='form-control' value={item.type} onChange={(e)=>{
                                    handleCategoryInputModal("type",e.target.value,index,"checked")
                                }}>
                                    <option>--Select Type--</option>
                                    <option value='store'>Store</option>
                                    <option value='product'>Product</option>
                                    <option value='Page'>Page</option>
                                </select>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </NewModal>
    )
}

export default UpdatecategoryModal;