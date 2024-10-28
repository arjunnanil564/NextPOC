import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProductList = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const router = useRouter();
  const category = router.query.category;

  useEffect(() => {
    if (category) {
      const newProducts = products.filter(product => product.category === category);
      setFilteredProducts(newProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const filter = (cat) => {
    router.push(`?category=${cat}`);
  };

  return (
    <>
      <h1>Products</h1>
      <section>
        <button onClick={() => filter('')}>All Categories</button>
        <button onClick={() => filter('Category 1')}>Category 1</button>
        <button onClick={() => filter('Category 2')}>Category 2</button>
        <button onClick={() => filter('Category 3')}>Category 3</button>
      </section>
      <br />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <a href={`/products/${product.id}`}>
              {product.name} - ${product.price} - {product.category}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/products');
  const products = await response.json();

  return {
    props: { products },
    revalidate: 10, 
  };
}

export default ProductList;
