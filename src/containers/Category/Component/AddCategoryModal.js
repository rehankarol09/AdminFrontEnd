import React from 'react';
import { Row,Col,Container } from "react-bootstrap";
import Input from '../../../components/Ui/Input';
import NewModal from '../../../components/Ui/Input/Modal';

const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        ModalTitle,
        handleclose,
        categorylist,
        ParentId,
        setParentId,
        categoryname,
        setCategoryname,
        handleCategoryImage,
        type,
        setType
    } = props;

    return (
        <NewModal
            show={props.show}
            handleClose={handleClose}
            modaltitle={ModalTitle}
            handleclose={handleclose}
        >
            <Container>
                <Row>
                    <Col>
                        <Input
                            placeholder="Category Name"
                            type="text"
                            value={categoryname}
                            onChange={(e) => {
                                setCategoryname(e.target.value)
                            }}
                            className="form-control form-control-sm"
                        />
                    </Col>
                    <Col>
                        <select className="form-control form-control-sm" value={ParentId} onChange={e => setParentId(e.target.value)} style={{ marginBottom: "30px" }}>
                            <option>Select Category</option>
                            {categorylist.map(options =>

                                <option key={options.value} value={options.value}>{options.name}</option>
                            )}
                        </select>
                        
                        {/* <Input
                            placeholder={'Select Category'}
                            type={'select'}
                            value={ParentId}
                            onChange={setParentId}
                            options={categorylist}
                        /> */}
                    </Col>
                </Row>




                <Row>
                    <Col>
                    <select className='form-control' value={type} onChange={(e)=>{
                                    setType(e.target.value) 
                                }}>
                                    <option value=''>--Select Type--</option>
                                    <option value='store'>Store</option>
                                    <option value='product'>Product</option>
                                    <option value='Page'>Page</option>
                                </select>
                    </Col>
                </Row>





                <Row>
                    <Col>
                        <input type='file' name="categoryImage" onChange={handleCategoryImage} style={{marginTop:'10px'}} />
                    </Col>
                </Row>
            </Container>
           
            
        </NewModal>
    )
}

export default AddCategoryModal;

