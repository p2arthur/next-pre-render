import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

export default function HomePage(props) {
  const { tshirts, sneakers } = props.products;

  const products = [...tshirts, ...sneakers];
  console.log(products);

  return (
    <>
      <div>
        <h2>Tshirts</h2>
        <ul>
          {tshirts.map((product) => (
            <Link href={`/product/${product.id}`}>
              <li key={product.id}>{product.title}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <h2>Sneakers</h2>
        <ul>
          {sneakers.map((product) => (
            <Link href={`/product/${product.id}`}>
              <li key={product.id}>{product.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

//Get static props is used to prepare data to be served on the server side render - It runs before the component is rendered
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const { tshirts, sneakers } = JSON.parse(jsonData);

  if (!jsonData) {
    return { redirect: { detination: '/no-data' } };
  }

  if (tshirts.length === 0 || sneakers.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products: { tshirts, sneakers } },
    revalidate: 5,
  };
}
