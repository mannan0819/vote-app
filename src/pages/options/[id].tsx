import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MLoading } from "../../components/MLodaing";
import MTimePicker from "../../components/MTimePicker";
import { trpc } from "../../utils/trpc";

export default function NewVote() {
  const router = useRouter();
  let id = router.query.id;
  if (typeof id !== "string") id = "";
  const { mutateAsync } = trpc.useMutation("options.createMany", {
    onSuccess: () => {
      // client.invalidateQueries("question.getAll");
      // if (!inputRef.current) return;
      // inputRef.current.value = "";
    },
  });

  const { data, isLoading } = trpc.useQuery(["question.getById", { id }]);
  const questionId = data?.question?.id;
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "yes", questionId: questionId },
    { text: "no", questionId: questionId },
  ]);
  const [endsAt, setEndsAt] = React.useState<Dayjs | null>(dayjs().add(1, 'hour'));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!options || options.length === 0) return;
    const savedQ = await mutateAsync({
      options,
      questionId: data?.question?.id ?? null,
      questionText: data?.question?.question ?? newQuestion,
      endsAt: endsAt?.toDate() || null
    });
    console.log('savedQ', savedQ)
    router.push(`/question/${savedQ.id}`);
  };

  return isLoading || !data ? (
    <MLoading />
  ) : (
    <div className="flex flex-col p-10">
      <div className="flex flex-col pb-2">
        {data?.question ? <div className="text-2xl text-lime-400">{data.question?.question}</div> :
          <input
            className="shadow appearance-none border text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="yes"
            type="text"
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
        }
        <div></div>
      </div>
      <form className="p-2" onSubmit={handleSubmit}>
        <div className="text-white pb-2">
          <MTimePicker label="Ends At:" value={endsAt} setValue={setEndsAt} />
        </div>
        {options.map((option, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-slate-300 text-sm font-bold mb-2">
              Option {index + 1}:
            </label>
            <div className="flex flex-row">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="yes"
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => {
                  setOptions((newArr) =>
                    newArr.map((eachOpt, i) => ({
                      ...eachOpt,
                      text: index === i ? e.target.value : eachOpt.text,
                    }))
                  );
                }}
              />
              <a
                className="bi bi-x-circle-fill text-pink-600 text-lg p-2"
                href="#"
                onClick={() => {
                  setOptions((newArr) => newArr.filter((_, i) => i !== index));
                }}
              ></a>
            </div>
          </div>
        ))}
        <div className="flex flex-row">
          <a
            className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            onClick={() => {
              setOptions([...options, { text: "", questionId }]);
            }}
            href="#"
          >
            Add an Option
          </a>
        </div>
        <button
          type="submit"
          className="float-right mr-5 text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
