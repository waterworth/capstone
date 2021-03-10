import { useRouter } from 'next/router';
import styled from 'styled-components';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import UserList from '../../components/UserList';
import { useMeetingByIdQuery } from '../../generated/graphql';

interface MeetingPageProps {}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  overflow: scroll;
`;

const MeetingPage: React.FC<MeetingPageProps> = ({}) => {
  const { asPath } = useRouter();
  const meetingId = parseInt(asPath.split('/')[2]);

  const { data, refetch } = useMeetingByIdQuery({
    variables: {
      id: meetingId,
    },
  });

  const handleRefetch = () => {
    refetch();
  };

  return (
    <Layout>
      <Wrapper>
        <Header title='Meeting Details' />
        <h1>Meeting: {data?.meetingById?.title}</h1>
        <h2>Users</h2>
        <ul>
          {data?.meetingById?.users?.map((user) => (
            <li key={user?.id}>{user?.username}</li>
          ))}
        </ul>
        <h2>Date and Time</h2>
        <p>{new Date(data?.meetingById?.timeslot).toLocaleString()}</p>
        <h2> Length</h2>
        <p>{data?.meetingById?.length} hours</p>
        <h2>Description</h2>
        <p>{data?.meetingById?.description}</p>
        <h2>Add Users</h2>
        <UserList refetch={handleRefetch} meetingId={meetingId} />
      </Wrapper>
    </Layout>
  );
};

export default MeetingPage;
