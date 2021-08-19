import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    AddCategory as addcategoryaction,
    updateCategories as updatecategoryaction,
    deletecategories as deletecategoriesaction
}
    from '../../actions';

import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './style.css'

import {
    IoIosCheckbox,
    IoIosCheckboxOutline,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash
} from "react-icons/io";
import {FaEdit} from 'react-icons/fa'
import UpdatecategoryModal from './Component/UpdateCategoryModal';
import AddCategoryModal from './Component/AddCategoryModal';
import DeleteCategoryModal from './Component/DeleteCategoryModal';

const CategoryPage = (props) => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [categoryname, setCategoryname] = useState('');
    const [ParentId, setParentId] = useState('');
    const [type,setType]=useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);



    ///Reusable code

    const updatecheckandexpandedCategories = () => {
        const categories = createcategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);

        });

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, index) => categoryId === category.value);
            category && expandedArray.push(category);
        });

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
       
    }

    //handle Close function
    const handleClose = () => {
        if(categoryname === '')
        {
            window.alert('Category Name is Required');
            return;
        }

        const form = new FormData();
        form.append('name', categoryname);
        form.append('parentId', ParentId);
        form.append('CategoryImage', categoryImage);
        form.append('type',type);
        dispatch(addcategoryaction(form));

        setCategoryname("");
        setParentId("");

        setShow(false);
    }

    const handleclose = () => {
        setShow(false);
        setCategoryname("");
        setParentId("");
    }

    //Handle show
    const handleShow = () => setShow(true);

    //Handling Category Image
    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    //Displaying linear list
    const createcategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push(
                {
                    value: category._id,
                    name: category.name,
                    parentId: category.parentId,
                    type:category.type
                }
            )
            if (category.children.length > 0) {
                createcategoryList(category.children, option)
            }
        }
        return option;
    }


    //Get Categories
    const rendergetallCategory = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && rendergetallCategory(category.children)
                })
        }
        return myCategories;
    }


    //Update Category 

    //Update Category Modal

    const updatehandleclose = () => {
        setUpdateCategoryModal(false);
    }

    

    //Upadate Category form
    const updatecategoryform = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : "")
        });

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('type', item.type);
            form.append('parentId', item.parentId ? item.parentId : "")
        });

        dispatch(updatecategoryaction(form));      
        setUpdateCategoryModal(false);
        setCheckedArray([]);
        setExpandedArray([]);
        setChecked([]);
        setExpanded([]);
        
    }

    //update category save data
    const updateCategory = () => {
        setUpdateCategoryModal(true);
        updatecheckandexpandedCategories();
        

    }


    //Handling Input Modal
    //key -which field
    // value to be changed
    const handleCategoryInputModal = (key, value, index, type) => {

        if (type === 'checked') {
            const updatedcheckedarray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedcheckedarray);
            console.log({ updatedcheckedarray });

        }
        else if (type === 'expanded') {
            const updatedexpandedarray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedexpandedarray);
            console.log({ updatedexpandedarray });
        }

        
    }

    //DElete categories

    //Modal
    const deletehandleclose = () => {
        setDeleteCategoryModal(false);
    }

   

    const deletecategory = () => {
        updatecheckandexpandedCategories();
        setDeleteCategoryModal(true);
        console.log({ expandedArray, checkedArray })
    }

    const deletecategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        //let idsmergedarray = expandedIdsArray.concat(checkedIdsArray);
        console.log({ expandedIdsArray, checkedIdsArray });

        if (checkedIdsArray.length > 0) {
            dispatch(deletecategoriesaction(checkedIdsArray));
            setDeleteCategoryModal(false);
        }
        setDeleteCategoryModal(false);
    }


    const categorylist = createcategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className='actionbtncontainer'>
                                <span>Action:</span>
                                <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
                                <button onClick={deletecategory}><IoIosTrash/><span>Delete</span></button>
                                <button onClick={updateCategory}><FaEdit/><span>Edit</span></button>
                            </div>
                           
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={rendergetallCategory(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: < IoIosArrowDown />,
                            }}
                        />
                    </Col>
                </Row>
            </Container>


            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                ModalTitle={"Add New Category"}
                handleclose={handleclose}
                categorylist={categorylist}
                categoryname={categoryname}
                ParentId={ParentId}
                setCategoryname={setCategoryname}
                setParentId={setParentId}
                handleCategoryImage={handleCategoryImage}
                type={type}
                setType={setType}

            />

            {/* //Update category Modal */}
            <UpdatecategoryModal
                show={updateCategoryModal}
                handleClose={updatecategoryform}
                ModalTitle="Update Categories"
                size='lg'
                handleclose={updatehandleclose}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInputModal={handleCategoryInputModal}
                categorylist={categorylist}
            />

            <DeleteCategoryModal
                ModalTitle="Are You Sure"
                show={deleteCategoryModal}
                handleClose={deletecategories}
                handleclose={deletehandleclose}
                checkedArray={checkedArray}
                expandedArray={expandedArray}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => alert('No')
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: () => deletecategories()
                    }
                ]
                }

            />

        </Layout>
    )
}

export default CategoryPage;