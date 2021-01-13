import Sidebar from './Sidebar/';

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
            width: 100vw;
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
            width: 100vw;
          }
        `}
      </style>
    </div>
  );
}

export default Layout;
