import Link from 'next/link';

export async function getServerSideProps({ query }) {
  console.log('query params', query);

  return {
    props: {},
  };
}

export default function TopBar() {
  return (
      <div  className='container h-screen flex flex-col justify-center space-y-6 text-center'>
        <p className='font-sans text-lg italic'>{"What's the weather like today"}</p>
        <Link href="/word-cloud">
        <a>View Forecast</a>
        </Link>
      </div>
  );
}
