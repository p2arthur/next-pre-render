import React from 'react';

const UserProfile = (props) => {
  return <div>{props.userId}</div>;
};

export default UserProfile;

//We don't need to use getStaticPaths when using the getServerSideProps as it will render the page on the server on each request - Pages are not pre-generated on build time
export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params['user-id'];

  return { props: { userId } };
}
