import { VoteQuestion } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MLoading } from "../components/MLodaing";
import { trpc } from "../utils/trpc";

const QuestionCreater: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const router = useRouter();
  const { mutate, isLoading } = trpc.useMutation("question.create", {
    onSuccess: (data) => {
      // client.invalidateQueries("question.getAll");
      // if (!inputRef.current) return;
      // inputRef.current.value = "";
      if ("id" in data) router.push(`/options/${data.id}`);
    },
  });
  return (
    <input
      ref={inputRef}
      className="border border-gray-700 rounded-md p-2 bg-gray-800 "
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

  return isLoading || !data ? (
    <MLoading />
  ) : (
    <div className="flex flex-col p-6 pl-10">
      <div className="text-2xl text-lime-500 pb-4">
        <i className="bi bi-check2-square text-teal-400 pr-2" />
        Votes App
      </div>

      {data.map((question) => (
        <Link href={`/question/${question.id}`} key={question.id}>
          <a>
            <div className="flex flex-row">
              <i className="bi bi bi-journals text-indigo-600 text-2xl p-2 mt-1" />
              <div className="flex flex-col mt-2">
                <span className="text-lg">{question.question}</span>
                <span className="text-xs">{question.createdAt.toDateString()}</span>
              </div>
            </div>

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
