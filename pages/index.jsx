export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return { props: { products: [{ id: 'p1', title: 'Product 1' }] } };
}
