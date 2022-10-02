import { Option } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

export default function QuestionId() {
  const router = useRouter();
  const [toggle, setToggle] = useState(100);
  const [checkedId, setChechedId] = useState("");
  const client = trpc.useContext();
  let id = router.query.id;
  if (typeof id !== "string") id = "";
  const { data, isLoading } = trpc.useQuery(["question.getById", { id }]);

  const options = data?.question?.options || [];
  let totalVotes = 0;
  const { data: votesData, isLoading: votesDataLoading } =
    trpc.useQuery(["votes.getVotes", { optionsIds: options.map(o => o.id) }]);
  const { data: votes, isLoading: votesLoading } =
    trpc.useQuery(["votes.getTotalVotes", { optionsIds: options.map(o => o.id) }]);
  const { mutate } = trpc.useMutation("votes.create", {
    onSuccess: () => {
      client.invalidateQueries("votes.getVotes");
    },
  })
  if (votes) votes.forEach(v => totalVotes += v._count.optionId);
  console.log(votes)
  console.log(votes?.find(v => v.optionId === "cl8rh5dx40014ugg5f2mpnxi8"))

  const handleVote = async (optionId: string) => {
    mutate({ optionId });
  };

  if (!data) return <div> NO QUESTION FOUND.</div>;
  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col p-6">
      <p className="text-4xl pt-2 pl-4">{data.question?.question}</p>
      <div className=" mb-4 flex flex-col px-5 py-2"
      >
        {options.map(option => (
          <label
            className="ml-2 text-gray-900 dark:text-gray-300 flex flex-row p-2 
              border-2 border-gray-300 rounded-md hover:border-gray-400 hover:shadow-lg m-2"
            key={option.id}
          >
            <div className="pt-2 pl-3 pb-1">
              {!!votesData ?
                <p>{votes?.find(v => v.optionId === option.id)?._count.optionId}</p> :
                <input
                  type="checkbox"
                  value="option.text"
                  disabled={!!votesData}
                  checked={checkedId === option.id}
                  className="w-5 h-5"
                  onChange={() => setChechedId(option.id)}
                />
              }
            </div>

            <p className={"ml-2 pl-1 text-2xl font-bold " +
              (!!votesData ? "gray contents text-blue-800" : "text-white")}
              style={{
                width: ((votes && votes.find(v => v.optionId === option.id)?._count) ?
                  (Number(votes.find(v => v.optionId === option.id)?._count.optionId) / totalVotes) * 100 : 0) + '%'
              }}>
              {option.text}
            </p>
          </label>
        ))}


        {votesData ? (
          <div key={votesData.id}>
            <p>{votesData.optionId}</p>
          </div>
        ) : <div>No Votes for this question</div>}


        {!votesData ? <div className="flex p-2">
          <a
            className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            onClick={() => {
              handleVote(checkedId);
            }}
            href="#"
          >
            Submit Vote
          </a>
        </div> :
          <div>
            <div className="ml-2 text-gray-900 dark:text-gray-300 flex flex-row p-2 
          border-2 border-gray-300 rounded-md hover:border-gray-400 hover:shadow-lg m-2 w-50">
              <a>
                You have already voted for this question
              </a>
            </div>
            <div className="gray contents" style={{ width: toggle + '%' }}>These are the contents of this</div>
            <a href="#" onClick={() => setToggle(toggle / 2)}>Click me</a>
            <p className="text-lg text-white">this is {toggle}</p>
          </div>
        }
      </div>
    </div >
  );
}