import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <h2>{loadedProduct.description}</h2>
    </>
  );
};

export default ProductDetailPage;

//Dynamic routes are not pre rendered by NextJs - For dynamic paths we use getStaticPath to set all possible paths (and only in dynamic paths) - Then we can use the getStaticProps method
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

//The goal of this function is to tell NextJs what instances of this page should be pre-generated
export async function getStaticPaths() {
  return {
    paths: [
      { params: { productId: 't1' } },
      { params: { productId: 't2' } },
      { params: { productId: 't3' } },
      { params: { productId: 's1' } },
      { params: { productId: 's2' } },
      { params: { productId: 's3' } },
    ],
    fallback: false,
  };
}

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const { tshirts, sneakers } = JSON.parse(jsonData);
  console.log('products', tshirts, sneakers);

  const allProducts = [...tshirts, ...sneakers];
  const { params } = context;
  const { productId } = params;
  const product = allProducts.find((product) => product.id === productId);

  if (!product) {
    return { redirect: { destination: '/productNotFound' } };
  }

  return { props: { loadedProduct: product } };
}
