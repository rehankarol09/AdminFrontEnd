
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import {  Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Ui/Input';
import { AddProducts } from '../../actions/index';
import NewModal from '../../components/Ui/Input/Modal';
import './style.css'
import {  generatepublicUrl } from '../../urlConfig';

const Products = (props) => {
  const dispatch = useDispatch();
  const [name, setname] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategorydId] = useState('');
  const [productpicture, setProductpictures] = useState([]);
  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);
  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetail] = useState(null);
  //const {...others} = props;


  //Displaying Products
  const renderProducts = () => {
    return (
      <Table responsive="sm" style={{ fontSize: '16px'},{marginTop:'15px'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>

          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ?
              product.products.map((product, index) =>
              (
                <tr key={product._id} onClick={() => handleshowProductDetailModal(product)}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.category.name}</td>
                </tr>
              )) :[]
          }
        </tbody>
      </Table>
    )
  }

  //Displaying no product display message
  
  //Add Product Modal

  //handle close
  const handleClose = () => {
   if(name === '')
   {
     alert("Name is Required");
     return;
   }

   if(description === '')
   {
     alert("description is Required");
     return;
   }
   if(quantity === '')
   {
     alert("quantity is Required");
     return;
   }
   if(price === '')
   {
     alert("price is Required");
     return;
   }
   if(categoryId === '')
   {
     alert("Type is Required");
     return;
   }

   if(productpicture === '')
   {
     alert("Image is Required");
     return;
   }
    const form = new FormData();
    form.append('name', name);
    form.append('description', description);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('category', categoryId);
    for (let pic of productpicture) {

      form.append('productpicture', pic);
    }
    dispatch(AddProducts(form));

    setname('');
    setDescription('');
    setQuantity('');
    setPrice('');
    setCategorydId('');

    setShow(false);
  }

  //handle show
  const handleShow = () => setShow(true);

  //Populating category in Modal
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

  //Handling product picture
  const handleProductPictures = (e) => {
    setProductpictures([...productpicture, e.target.files[0]]);
  };

  const handleclose = () => setShow(false)

  //Modal
  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        modaltitle={"Add New Product"}
        size={'md'}
        handleclose={handleclose}
        
      >
        <Input
          placeholder="Product Name"
          type="text"
          value={name}
          onChange={(e) => {
            setname(e.target.value)
          }}
        />
        <Input
          placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
        <Input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value)
          }}
        />

        <Input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}

        />

        <select className="form-control" value={categoryId} onChange={e => setCategorydId(e.target.value)} style={{ marginBottom: "30px" }}>
          <option>Select Category</option>
          {createcategoryList(category.categories).map(options =>

            <option key={options.value} value={options.value}>{options.name}</option>
          )}
        </select>

        {/* <Input
          type={'select'}
          placeholder={"Select category"}
          onChange={e => setCategorydId(e.target.value)}
          value={categoryId}
          options={category.categories}
        /> */}

        {productpicture.length > 0 ?
          productpicture.map((pic, index) => (
            <div key={index}>{pic.name}</div>

          ))
          : []
        }

        <input type="file" name="productpicture" onChange={handleProductPictures} required={true} />
      </NewModal>
    );
  }


  // Product Details Modal
  //Modal

  const handleclosedetailmodal = () => setProductDetailModal(false);

  const renderproductDetailModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        show={productDetailModal}
        handleClose={handlecloseproductdetailModal}
        modaltitle={"Product Details"}
        size={'lg'}
        handleclose={handleclosedetailmodal}
        
      >
        <Row>
          <Col md={6}>
            <label className='key'>Product Name</label>
            <p className='value'>{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className='key'>Price</label>
            <p className='value'>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className='key'>Quantity</label>
            <p className='value'>{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className='key'>Category</label>
            <p className='value'>{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className='key'>Description</label>
            <p className='value'>{productDetails.description}</p>
          </Col>
        </Row>
        <Row> 
          <Col >
            <label className='key'>Pictures</label>
            <div style={{display:'flex'}}>
              {productDetails.productpictures.map((picture,index) =>
                <div className="productImageContainer" key={index}>
                  <img className="img-responsive"  src={generatepublicUrl(picture.img)} alt="" />
                </div>
              )}
            </div>          
          </Col>
        </Row>
      </NewModal>

    )
  }

  //Handleclose
  const handlecloseproductdetailModal = () => {
    setProductDetailModal(false);
  }

  //Handle Show
  const handleshowProductDetailModal = (product) => {
    setProductDetailModal(true);
    setProductDetail(product);

  }


  return (
    <div>
      <Layout sidebar>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <h3>Products</h3>
                <Button variant="primary" onClick={(e) => handleShow()}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              {renderProducts()}
            </Col>
          </Row>
        </Container>

        {renderAddProductModal()}
        {renderproductDetailModal()}
      </Layout>
    </div>
  )
}

export default Products;




