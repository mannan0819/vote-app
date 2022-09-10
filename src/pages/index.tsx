import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

const QuestionCreater: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("question.create", {
    onSuccess: () => {
      client.invalidateQueries("question.getAll");
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });
  return (
    <input
      ref={inputRef}
      className="border border-gray-300 rounded-md p-2"
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value });
        }
      }}
    ></input>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["question.getAll"]);

  // console.log(data);
  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col p-6 pl-10">
      <div className="text-2xl text-red-600 pb-4">Questions</div>

      {data.map((question) => (
        <Link href={`/question/${question.id}`} key={question.id}>
          <a>
            <div >{question.question}</div>
          </a>
        </Link>
      ))}

      <div className="py-2">
        <QuestionCreater />
      </div>
    </div>
  );
};

export default Home;
