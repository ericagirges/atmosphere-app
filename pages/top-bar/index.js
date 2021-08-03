import Link from 'next/link';

export async function getServerSideProps({ query }) {
  console.log('query params', query);

  return {
    props: {},
  };
}

export default function TopBar() {
  return (
      <div  className='bg-gradient-to-t from-blue-50 via-blue-200 to-blue-400 container h-screen flex flex-col justify-center space-y-6 text-center'>
        <div className='text-9xl animate-pulse fixed left-12 top-3'>☁️</div>
        <div className='text-6xl animate-pulse fixed inset-x-0 top-0'>☁️</div>
        <div className='text-9xl animate-pulse fixed right-10 top-5'>☁️</div>
        <div className='text-6xl animate-pulse fixed right-0 top-10'>☁️</div>
        <p className='font-sans text-xl italic'>{"What's the weather like today?"}</p>
        <Link href="/word-cloud">
        <a className='w-1/4 place-self-center px-3 py-1 transition ease-in duration-200 rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none'>View Forecast</a>
        </Link>
        <div className='text-7xl animate-pulse fixed inset-y-0.5'>☁️</div>
        <div className='text-9xl animate-pulse fixed left-4 bottom-12'>☁️</div>
        <div className='text-9xl animate-pulse fixed inset-x-0 bottom-0'>☁️</div>
        <div className='text-8xl animate-pulse fixed right-4 bottom-9'>☁️</div>
      </div>
  );
}
a