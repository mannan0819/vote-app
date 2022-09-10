import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function QuestionId() {
  const router = useRouter();
  const id = router.query.id;
  if (typeof id !== "string") return null;
  const { data, isLoading } = trpc.useQuery(["question.getById", { id }]);

  if (!data) return <div> NO QUESTION FOUND.</div>;
  // console.log(data);
  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col p-6">
      <div className="text-2xl text-red-600">Questions</div>
      <p>{data.question?.question}</p>
      <div></div>
    </div>
  );
}
