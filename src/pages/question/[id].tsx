import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function QuestionId() {
  const router = useRouter();
  const id = router.query.id;
  if (typeof id !== "string") return null;
  const { data, isLoading } = trpc.useQuery(["question.getById", { id }]);
  console.log(data)

  if (!data) return <div> NO QUESTION FOUND.</div>;
  // console.log(data);
  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col p-6">
      <div className="text-2xl text-red-600">Questions</div>
      <p>{data.question?.question}</p>
      <div></div>
      <div className=" mb-4 flex flex-col px-5 py-2">
        {
          data.question?.options.map(
            (option) =>
              <label className="ml-2 text-sm font-small text-gray-900 dark:text-gray-300 flex flex-row p-2 
              border-2 border-gray-300 rounded-md hover:border-gray-400 hover:shadow-lg m-2"
                key={option.id}>
                <input type="checkbox" value="option.text" />
                <p className="pl-2">{option.text}</p>
              </label>
          )
        }
      </div>
    </div>
  );
}
