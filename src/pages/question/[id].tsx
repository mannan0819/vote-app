import { useRouter } from "next/router";
import { useState } from "react";
import { MButton } from "../../components/MButton";
import { MLoading } from "../../components/MLodaing";
import { MOption } from "../../components/MOption";
import { trpc } from "../../utils/trpc";

export default function QuestionId() {
  const router = useRouter();
  const [checkedId, setChechedId] = useState("");
  const client = trpc.useContext();
  let id = router.query.id;
  if (typeof id !== "string") id = "";
  const { data, isLoading } = trpc.useQuery(["question.getById", { id }]);
  const options = data?.question?.options || [];

  const { data: votesData, isLoading: votesDataLoading } = trpc.useQuery(["votes.getVotes", { optionsIds: options.map(o => o.id) }]);
  const { data: votes, isLoading: votesLoading } = trpc.useQuery(["votes.getTotalVotes", { optionsIds: options.map(o => o.id) }]);
  const { mutate } = trpc.useMutation("votes.create", {
    onSuccess: () => {
      client.invalidateQueries("votes.getVotes");
      client.invalidateQueries("votes.getTotalVotes");
    },
  })
  let totalVotes = 0;
  if (votes) votes.forEach(v => totalVotes += v._count.optionId);

  const handleVote = async (optionId: string) => {
    mutate({ optionId });
  };

  return isLoading || votesDataLoading || votesLoading || !data ? <MLoading /> : (
    <div className="flex flex-col p-6">
      <p className="text-4xl pt-2 pl-4">{data.question?.question}</p>
      <div className=" mb-4 flex flex-col px-5 py-2">
        {options.map(option => (
          <MOption
            key={option.id}
            option={option}
            checkedId={checkedId}
            totalVotes={totalVotes}
            votes={votes}
            votesData={votesData}
            onChange={() => setChechedId(option.id)} />
        ))}
        {!votesData && <MButton handleClick={() => handleVote(checkedId)} />
        }
      </div>
    </div >
  );
}