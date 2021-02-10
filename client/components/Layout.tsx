import Sidebar from './Sidebar/';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
`;

function Layout(props: any) {
  return (
    <LayoutWrapper>
      <Sidebar />
      {props.children}
      <style jsx global>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: 'Inter', sans-serif;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
          * {
            box-sizing: border-box;
          }
        `}
      </style>
    </LayoutWrapper>
  );
}

export default Layout;
