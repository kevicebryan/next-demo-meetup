import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>KB's Meetups</title>
        <meta name="description" content="Meetups for you and I"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  // fetch data from API... // server side code!
  const MONGO_URL =
    "mongodb+srv://kevice:kevinbryan@cluster0.zkzm3ef.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

//alternative to getStaticProps() --> refreshes for every Request, use if data always changes

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from API
//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export default HomePage;
