import fs from 'fs/promises';
import path from 'path';

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  //Fallback to handle while there's no data on the fallback routes
  if (!loadedProduct) return <p>Loading...</p>;

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

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const { tshirts, sneakers } = data;
  return { tshirts, sneakers };
};

//The goal of this function is to tell NextJs what instances of this page should be pre-generated
export async function getStaticPaths() {
  const data = await getData();

  const { tshirts, sneakers } = data;

  const allProducts = [...tshirts, ...sneakers];
  const ids = allProducts.map((product) => product.id);

  const pathsWithParams = ids.map((id) => {
    return {
      params: {
        productId: id,
      },
    };
  });

  return {
    paths: pathsWithParams,

    //Fallback is used to tell nextJs that any other productId is possible but those that are not listed are not rendered on the server but just in time as the request to that specific page reaches the server - s1 is missing above
    fallback: true,
  };
}

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
export async function getStaticProps(context) {
  const data = await getData();

  const { tshirts, sneakers } = data;

  const allProducts = [...tshirts, ...sneakers];

  console.log('All Products', allProducts);
  const { params } = context;
  const { productId } = params;
  const product = allProducts.find((product) => product?.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return { props: { loadedProduct: product } };
}
