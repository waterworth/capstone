import React from "react";
import Nav from "../components/Nav";
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from "../util/createUrqlClient";
import {useMeetingsQuery} from '../generated/graphql'


const Index = () => {
  const [{data}] = useMeetingsQuery();
  return(
    <main>
      <Nav/>
      {!data ? <div>Loading...</div> : data.meetings.map((meeting) => 
        <section key={meeting.id}>
          <h2>{meeting.title}</h2> 
          <h3>Meeting is at: {meeting.timeslot}</h3>
          <h3>Length of meeting: {meeting.length} hours</h3>
          <p>Meeting details: {meeting.description}</p>
        </section>
      )}
    </main>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);