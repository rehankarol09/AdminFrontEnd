import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Modal, Container, Row, Col, Button ,Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Ui/Input';
import { AddProducts } from  '../../actions/index';
import NewModal from '../../components/Ui/Input/Modal';
import productReducrer from '../../reducers/product.reducrer';
/**
* @author
* @function Product
**/

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


  const handleShow = () => setShow(true);

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


  const handleProductPictures = (e) => {
    setProductpictures([...productpicture, e.target.files[0]]);
  };

 
  

  const renderProducts = () =>
  {
    return (
      <Table responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Prroduct Images</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    product.products.length>0?
                    product.products.map((product,index) =>
                      (
                        <tr key={product._id}>
                        <td>{index+1}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price}</td>
                      </tr>
                      )):null
                  }
                </tbody>
              </Table>
    )
  }

const display = () =>
{
  return(
    <div>
      <p>No Products to display</p>
    </div>
  )
}

const renderProductModal = ()=>{
  return(
  <NewModal
    show={show}
    handleClose={handleClose}
    ModalTitle={"Add New Product"}
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

const handleProductDetailModal =() =>
{
   setProductDetailModal(false);
}

const renderProductDetailsModal = () =>
{
  <NewModal
  show={productDetailModal}
  handleClose={handleProductDetailModal}
  ModalTitle={"Product Details"}
  >

  </NewModal>
}




  return (
    <div>
      <Layout sidebar>
        <Container fluid>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <h3>Products</h3>
                <Button variant="primary" onClick={handleShow}>
                  Add
                </Button>
              </div>
            </Col>
          </Row>

         <Row>
           <Col>
              {product.products.length>0?
                renderProducts():
                display()
              }
           </Col>
         </Row>
        </Container>
       
       {renderProductModal()}
        
      
      </Layout>
    </div>
  )

}

export default Products;