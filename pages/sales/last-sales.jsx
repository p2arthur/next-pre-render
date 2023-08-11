import { useEffect, useState } from 'react';

const LastSales = (props) => {
  const [lastSales, setLastSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const transformedLastSales = [];

  const appendLastSalesData = async () => {
    const data = await (
      await fetch(
        'https://nextjs-course-c486e-default-rtdb.firebaseio.com/sales.json'
      )
    ).json();

    for (const key in data) {
      transformedLastSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }

    setLastSales(transformedLastSales);
  };

  useEffect(() => {
    appendLastSalesData();
    setIsLoading(true);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading last sales...</p>;
  }

  if (!lastSales) {
    return <p>No data yet...</p>;
  }

  return (
    <div>
      <h1>Last sales</h1>
      <h2>{props.title}</h2>
      <ul>
        {lastSales.map((sale) => (
          <li>
            {sale.username} spent - {sale.volume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastSales;

export async function getServerSideProps(context) {
  return { props: { title: 'This is serverside rendered' } };
}
