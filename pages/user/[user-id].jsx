import React from 'react';

const UserProfile = (props) => {
  return <div>{props.userId}</div>;
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params['user-id'];

  return { props: { userId } };
}
