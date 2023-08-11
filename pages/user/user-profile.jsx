//This page can't be rendered using static server side render cause we need to know for what user we need to render the page

const UserProfile = (props) => {
  return <h1>Username: {props.username}</h1>;
};

export default UserProfile;

//With getServerSideProps have access to the request - getServerSideProps is rendered on each request that's why we dont need the revalidate key on the returned object.

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log('request:', req.headers);

  return { props: { username: 'duendedalei' } };
}
