import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500"
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, []);

  if (!session?.user?.image || !session.user.name) {
    return <></>;
  }

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-3 bg-black text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img className="rounded-full w-10 h-10"
               src={ session?.user?.image }
               alt={ session.user.name } />
          <h2>{ session.user.name }</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section className={`flex items-center space-x-7 bg-gradient-to-b to-black ${color} h-80 padding-8`}>
        <h1>hello</h1>
      </section>
    </div>
  );
};

export default Center;
