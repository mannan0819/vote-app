import { Option, Voting } from "@prisma/client";
import { ReactElement } from "react";

type MOptionProps = {
    option: Option;
    votesData: Voting | null | undefined;
    votes: { optionId: string; _count: { optionId: number; }; }[] | null | undefined;
    totalVotes: number;
    onChange: () => void;
    checkedId: string;
}

export function MOption({ option, votesData, votes, totalVotes, onChange, checkedId }: MOptionProps): ReactElement {
    return <label
        className="ml-2 text-gray-900 dark:text-gray-300 flex flex-row p-2 border-2
       border-gray-300 rounded-md hover:border-gray-400 hover:shadow-lg m-2"
        key={option.id}
    >
        <div className="pt-2 pl-3 pb-1">
            {!!votesData ?
                <p className="font-bold text-green-400">{
                    votes?.find(v => v.optionId === option.id)?._count.optionId ?? 0
                }</p> :
                <input
                    type="checkbox"
                    value="option.text"
                    disabled={!!votesData}
                    checked={checkedId === option.id}
                    className="w-5 h-5"
                    onChange={onChange}
                />
            }
        </div>

        <p className={"ml-2 pl-1 text-2xl font-bold " +
            (!!votesData && votes?.some(v => v.optionId === option.id) ?
                "bg-yellow-50 contents text-blue-800" : "text-white")}
            style={{
                width: ((votes && votes.find(v => v.optionId === option.id)?._count) ?
                    (Number(votes.find(v => v.optionId === option.id)?._count.optionId) / totalVotes) * 100 : 0) + '%'
            }}>
            {option.text}
        </p>
    </label>
}