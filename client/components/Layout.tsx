import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../util/createUrqlClient';
import Sidebar from './Sidebar/Sidebar';

function Layout(props: any) {
  return (
    <div className='page-layout'>
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
          .page-layout {
            display: flex;
            flex-direction: row;
          }
        `}
      </style>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Layout);
