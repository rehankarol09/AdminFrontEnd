import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useState } from 'react';
import NewModal from '../../components/Ui/Input/Modal';
import { useDispatch, useSelector } from 'react-redux';
import categorylist from '../../helpers/linearcategories';
import Input from '../../components/Ui/Input';
import { Container, Row, Col } from 'react-bootstrap';
import {AddPage} from '../../actions/index';

/**
* @author
* @function NewPage
**/

const NewPage = (props) => {
  const [show, setShow] = useState(false);
  const category = useSelector(state => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [bannerImages, setBannerImages] = useState([]);
  const [type,setType] = useState('');
  const page = useSelector(state => state.page);
  const dispatch = useDispatch();


  useEffect((e) => {
    setCategories(createcategoryList(category.categories));
  }, [category]);

  useEffect(()=>{

  },[page])


  const createcategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push(
        {
          value: category._id,
          name: category.name
        }
      )
      if (category.children.length > 0) {
        createcategoryList(category.children, option)
      }
    }
    return option;
  }

 const onCategoryChange = (e) =>
 {
   const category = categories.find(cat=> cat.value === e.target.value);
   setCategoryId(e.target.value);
   setType(category.type);
 }

  const handleproductImages = (e) => {
    setProductImages([...productImages, e.target.files[0]]);
  }

  const handlebannerImages = (e) => {
    setBannerImages([...bannerImages, e.target.files[0]]);

  }

  const submitPageForm = (e) =>
  {
    
    if(categoryId === '')
    {
      window.alert("Required");
      return;
    }

    if(title === '')
    {
      window.alert("Required");
      return;
    }
    if(desc === '')
    {
      window.alert("Required");
      return;
    }


    const form = new FormData();
    form.append('title',title);
    form.append('desc',desc);
    form.append('type',type);
    form.append('category',categoryId);
    for(let ban of bannerImages){
      form.append('banners',ban)
    }

    for(let pro of productImages)
    {
      form.append('products',pro)
    }
    
    dispatch(AddPage(form));

    setType('');
    setTitle('');
    setDesc('');
    setCategoryId('');
    setBannerImages('');
    setProductImages('');



    setShow(false);
    console.log({title,desc,type,bannerImages,productImages});
  }


  const renderNewPageModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={submitPageForm}
        modaltitle={"Add New Page"}
        handleclose={() => setShow(false)}
        size={'md'}
      >

        <Container>
          <Row>
            <Col md={12} style={{ marginBottom: '12px' }}>
              <select value={categoryId} onChange={onCategoryChange} className={'form-control form-control-md'}>
                <option>--Select Category</option>
                {createcategoryList(category.categories).map((cat, index) =>
                (
                  <option value={cat.value} key={cat.value}>{cat.name}</option>
                ))
                }
              </select>

              
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Input
                type={'text'}
                placeholder={'Title'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Input
                type={'text'}
                placeholder={'Description'}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
          </Row>
          
            <Row>
              <Col>
                {
                  bannerImages.length > 0 &&
                  bannerImages.map((img, index) => (
                    <div key={index}>{img.name}</div>
                  ))
                }
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                label={'Banner Images'}
                  type={'file'}
                  name={bannerImages}
                  onChange={handlebannerImages}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                {
                  productImages.length > 0 &&
                  productImages.map((img, index) => (
                    <div key={index}>{img.name}</div>
                  ))
                }
              </Col>
            </Row>
          <Row>
            <Col md={12}>
              <Input
                type={'file'}
                onChange={handleproductImages}
              />
            </Col>
          </Row>
        </Container>

      </NewModal>
    )
  }





  return (
    <Layout sidebar>

      <div>
        <button onClick={() => setShow(true)}>New Page</button>
      </div>

      {renderNewPageModal()}
    </Layout>


  )

}

export default NewPage;