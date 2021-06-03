import Router from "next/router";
import { useEffect } from "react";
import { HeadView } from "../components";

export async function getServerSideProps() {
  return {
    props: {
      ssr: true,
    },
  };
}

export default function Home() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      Router.push("/order/order-new");
    } else {
      Router.push("/auth/signin");
    }
  }, []);

  return (
    <div className="container">
      <HeadView title={"Børres burgere take-away"} />
      <main />
    </div>
  );
}
