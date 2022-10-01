import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

export default function QuestionId() {
  const router = useRouter();
  const [checkedId, setChechedId] = useState("");
  const client = trpc.useContext();
  let id = router.query.id;
  if (typeof id !== "string") id = "";
  const { data, isLoading } = trpc.useQuery(["question.getById", { id }]);
  const { data: options, isLoading: optionLoading } = trpc.useQuery([
    "options.getByQuestionId",
    { questionId: id },
  ]);

  console.log(options);
  if (!options) return <div>Loading...</div>;
  // const { mutate } = trpc.useMutation("votes.create", {
  //   onSuccess: () => {
  //     client.invalidateQueries("question.getById");
  //     // if (!inputRef.current) return;
  //     // inputRef.current.value = "";
  //   },
  // });

  if (!data) return <div> NO QUESTION FOUND.</div>;
  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col p-6">
      <p className="text-4xl pt-2 pl-4">{data.question?.question}</p>
      <div></div>
      <div className=" mb-4 flex flex-col px-5 py-2">
        {/* {(options as any).map((option: any) => (
          <label
            className="ml-2 text-gray-900 dark:text-gray-300 flex flex-row p-2 
              border-2 border-gray-300 rounded-md hover:border-gray-400 hover:shadow-lg m-2"
            key={option.id}
          >
            <div className="pt-2 pl-3 pb-1">
              <input
                type="checkbox"
                value="option.text"
                checked={checkedId === option.id}
                className="w-5 h-5"
                onChange={() => setChechedId(option.id)}
              />
            </div>
            <p className="pl-3 text-2xl font-bold">{option.text}</p>
          </label>
        ))} */}
        <div className="flex p-2">
          <a
            className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            onClick={() => {
              // mutate({ optionId: checkedId });
            }}
            href="#"
          >
            Submit Vote
          </a>
        </div>
      </div>
    </div>
  );
}
