import React, { useEffect, useState } from "react";
import Filters from "./assets/Filters";
import { ProductList } from "./assets/ProductList";
import styled from "styled-components";

const ImgDiv = styled.div`
  display: flex;
  position: relative;
`;
const InputField = styled.input`
  width: 50vw;
  height: 4vh;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
const ImgContainer = styled.img`
  width: 96vw;
  height: 20vh;
  margin-left: 5px;
  margin-right: auto;
`;


const Container = styled.div`
  width: 90vw;
  height: 60vh;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background: #f0f0f0;

  @media (max-width: 550px) {
    background: #f0f0f0;
    margin-left: auto;
    margin-right: auto;
    height: 70vh;
  }
  @media (min-width: 551px) and (max-width: 768px) {
    background: #f0f0f0;
    margin-left: auto;
    margin-right: auto;
    height: 75vh;
    margin-top: 10px;
  }
`;

const FilterContainer = styled.div`
  height: 20px;
  padding: 20px;
  background: #71c2d9;
  @media (max-width: 550px) {
    width: auto;
    height: 30px;
    padding: 15px;
  }
  @media (min-width: 551px) and (max-width: 768px) {
    width: auto;
    height: 40px;
    padding: 20px;
  }
`;

const Products = styled.div`
  margin-top: 30px;
  max-width: 80vw;
  display:flex;
  flex-wrap:wrap;
  margin-left:auto;
  margin-right:auto;
  gap:10px;
 
@media (max-width:550px){
  margin-top: 10px;
  height: 50vh;
  width:81vw;
  display:flex;
  flex-wrap:wrap;
  gap:10px;
 }
 @media (min-width:551px) and (max-width:768px){
  width:78vw;
  height:56vh;
  display: flex;
  flex-direction: column; 
  margin-top: 20px;
  gap:15px;
`;

const Product = styled.span`
height: 130px;
width:160px;
border: 1px solid #ccc;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
@media (max-width:550px){
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  width:35vw;
  height:26vh;
  display: flex;
  flex-direction: column;
  
}
@media (min-width:551px) and (max-width:768px){
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  width:24vw;
  height:26vh;
  display: flex;
  flex-direction: column; 
}
`;

const ProductImage = styled.img`
  width: 160px;
  height: 90px;
  border-radius: 2px;
  
  @media (max-width: 550px) {
    width: 35vw;
    height: 20vh;
    border-radius: 2px;
  }
  @media (min-width: 551px) and (max-width: 768px) {
    width: 24vw;
    height: 20vh;
  }
`;

const ProductPrice = styled.span`
  width: 180px;
  height: 10px;

  @media (max-width: 768px) {
    height: 8vh;
    width: 15vw;
    background: white;
  }
`;

const BtnContainer = styled.span`
  width: 117px;
  height: 23px;
  background: #bdbfde;
  margin-left: 30vw;
`;

const App = () => {
  const [price, setPrice] = useState("0-500");
  const [category, setCategory] = useState("watches");
  const [products, setProducts] = useState(ProductList);
  const [filterProduct, setFilterProduct] = useState(ProductList);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const handlePrice = (selectedPrice) => {
    setPrice(selectedPrice);
  };

  const handleCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const filteredProductArry = (price, category) => {
    const [minPrice, maxPrice] = price.split("-").map(Number);

    let filteredProduct = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.category.toLowerCase() === category.toLowerCase()
    );
    console.log(filteredProduct);
    setFilterProduct([...filteredProduct]);
    console.log(filterProduct);
  };

  useEffect(() => {
    if (price && category) {
      filteredProductArry(price, category);
    }
  }, [price, category]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <ImgDiv>
        <InputField placeholder="search here" />
        <ImgContainer
          src="https://miro.medium.com/v2/resize:fit:1018/1*iAu65xDmvpVdBJgps6EDEw.png"
          alt="img"
        />
      </ImgDiv>

      <Container>
        <FilterContainer>
          <Filters
            price={price}
            setPrice={handlePrice}
            category={category}
            setCategory={handleCategory}
          />
        </FilterContainer>

        <Products>
  {currentProducts.length > 0 ? (
    currentProducts.map((product) => (
      <Product key={product}>
        <ProductImage src={product.image} />
       
        <ProductPrice>
          {product.category}
          <br />
          Rs.{product.price}
        </ProductPrice>
      </Product>
    ))
  ) : (
    <div>No product for such filter</div>
  )}
</Products>


      </Container>
      <BtnContainer>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= filterProduct.length}
        >
          Next
        </button>
      </BtnContainer>
    </>
  );
};

export default App;
