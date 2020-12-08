import React from "react";
import Nav from "../components/Nav";
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from "../util/createUrqlClient";
import {useMeetingsQuery} from '../generated/graphql'


const Index = () => {
  const [{data}] = useMeetingsQuery();
  return(
    <div>
      <Nav/>
      {!data ? <div>Loading...</div> : data.meetings.map((meeting) => 
        <div key={meeting.id}>{meeting.title}</div>
      )}
    </div>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);