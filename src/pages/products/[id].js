import { useRouter } from 'next/router';

const ProductDetails = ({ product }) => {
  const router = useRouter();

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>      
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch('http://localhost:3000/products');
  const products = await response.json();

  const paths = products.map(product => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`http://localhost:3000/products/${params.id}`);
  const product = await response.json();

  return {
    props: { product },
    revalidate: 10, 
  };
}

export default ProductDetails;
