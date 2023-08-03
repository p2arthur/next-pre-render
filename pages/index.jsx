import fs from 'fs/promises';
import path from 'path';

export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log('getStaticProps context', context);
  console.log('regenerating');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const { products } = JSON.parse(jsonData);

  if (!jsonData) {
    return { redirect: { detination: '/no-data' } };
  }

  if (products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products: products },
    revalidate: 5,
  };
}
