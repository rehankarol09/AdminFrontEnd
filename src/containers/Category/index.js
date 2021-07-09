import React, { useEffect,useState } from 'react';
import Layout from '../../components/Layout';
import {Row ,Col, Container,  Button, useAccordionToggle} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddCategory} from '../../actions';
import { categoryConstants } from '../../actions/constants';
import Input from '../../components/Ui/Input';
import NewModal from '../../components/Ui/Input/Modal';

//import NewModal from '../../components/Ui/Modal';

/**
* @author
* @function 
**/

const CategoryPage = (props) => {

const category = useSelector(state => state.category);
const dispatch = useDispatch();
const [show, setShow] = useState(false);
const [categoryname,setCategoryname]=useState('');
const [ParentId,setParentId] =useState('');
const [categoryImage, setCategoryImage] = useState('');




const handleClose = () => 
{
    const form = new FormData();
    form.append('name',categoryname);
    form.append('parentId',ParentId);
    form.append('CategoryImage',categoryImage);
    dispatch(AddCategory(form));

    setCategoryname("");
    setParentId("");

    setShow(false);
}


const handleShow = () => setShow(true);


const rendergetallCategory = (categories) =>
{
    let myCategories = [];
    for(let category of categories){
        myCategories.push(
            <li key={category.name}>
                {category.name}
                {category.children.length>0? 
                (<ul>
                    {rendergetallCategory(category.children)}
                </ul>):null
                }
            </li>
            
        )      
    }
    return myCategories;
}

const createcategoryList = (categories, option=[]) =>
{
  for(let category of categories)
  {
      option.push(
          {
              value:category._id,
              name:category.name
          }
      )
      if(category.children.length>0)
      {
          createcategoryList(category.children,option)
      }
  }
  return option;
}



const handleCategoryImage =(e)=>
{
    setCategoryImage(e.target.files[0]);
}

return (
        <Layout sidebar>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {rendergetallCategory(category.categories)}
                            
                        </ul>
                    </Col>
                </Row>
            </Container>
            <NewModal
            show={show}
            handleClose={handleClose}
            ModalTitle={"Add New Category"}
            >
            <Input
                placeholder="Category Name"
                type="text"
                value={categoryname}
                onChange={(e) => {
                    setCategoryname(e.target.value)
                }}
            />
            <select className="form-control" value={ParentId} onChange={e => setParentId(e.target.value)} style={{marginBottom:"30px"}}>
                <option>Select Category</option>
                {createcategoryList(category.categories).map(options =>

                    <option key={options.value} value={options.value}>{options.name}</option>
                )}
            </select>
            <input type='file' name="categoryImage" onChange={handleCategoryImage}/>
            </NewModal>
        </Layout>
    )

}
export default CategoryPage;