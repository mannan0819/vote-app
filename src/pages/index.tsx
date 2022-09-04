
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["getAllQuestions"])
  console.log(data);
  return isLoading || !data ? <div>Loading...</div> : <div>{data[0]?.question}</div>
};

export default Home;