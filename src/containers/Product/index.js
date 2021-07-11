/**
* @author
* @function Product
**/

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Modal, Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Ui/Input';
import { AddProducts } from '../../actions/index';
import NewModal from '../../components/Ui/Input/Modal';
import productReducrer from '../../reducers/product.reducrer';
import './style.css'
import { api, generatepublicUrl } from '../../urlConfig';

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


  //Displaying Products
  const renderProducts = () => {
    return (
      <Table responsive="sm" style={{ fontSize: '16px'}}>
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
              )) : display()
          }
        </tbody>
      </Table>
    )
  }

  //Displaying no product display message
  const display = () => {
    return (
      <div>
        <p>No Products to display</p>
      </div>
    )
  }

  //Add Product Modal

  //handle close
  const handleClose = () => {
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


  //Modal
  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        ModalTitle={"Add New Product"}
        size={'md'}
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
        {productpicture.length > 0 ?
          productpicture.map((pic, index) => (
            <div key={index}>{pic.name}</div>

          ))
          : []
        }

        <input type="file" name="productpicture" onChange={handleProductPictures} />
      </NewModal>
    );
  }


  // Product Details Modal
  //Modal
  const renderproductDetailModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        show={productDetailModal}
        handleClose={handlecloseproductdetailModal}
        ModalTitle={"Product Details"}
        size={'lg'}
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
              {productDetails.productpictures.map(picture =>
                <div className="productImageContainer">
                  <img src={generatepublicUrl(picture.img)} />
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




