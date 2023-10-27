import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 30px;
  gap: 20px;
  font-size: 3rem;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;
export default function NewProducts({ products, wishedProducts }) {
  // console.log({wishedProducts});
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product._id} {...product} wished= {wishedProducts?.includes(product._id)} />
          ))}
      </ProductGrid>
    </Center>
  );
}
