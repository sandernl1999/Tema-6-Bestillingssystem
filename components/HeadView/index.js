import Head from "next/head";

const HeadView = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadView;
