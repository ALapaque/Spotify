import { getProviders, signIn } from 'next-auth/react';

const Login = ({ providers }: any) => {
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <img className="w-52 mb-5"
           src="https://links.papareact.com/9xl"
           alt="Spotify logo" />

      { Object.values(providers).map((provider: any) => (
        <button className="bg-[#18D860] text-white p-5 rounded-full"
                key={ provider.name }
                onClick={ () => signIn(provider.id, { callbackUrl: '/' }) }>
          Login with { provider.name }
        </button>
      )) }

    </div>
  );
};

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
}
