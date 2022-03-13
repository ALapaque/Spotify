import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Center from '../components/Center';
import Sidebar from '../components/Sidebar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify clone</title>
        <meta name="viewport"
              content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>

        <div>
          {/*  PLAYER */ }
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  };
}
