import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name='Atmosphere'
          content='Zendesk App generated by create next app'
        />
      </Head>
    </div>
  );
}
