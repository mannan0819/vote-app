import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function NewVote() {
    const router = useRouter();
    const id = router.query.id;
    if (typeof id !== "string") return null;
    const { mutate } = trpc.useMutation("options.create", {
        onSuccess: () => {
            // client.invalidateQueries("question.getAll");
            // if (!inputRef.current) return;
            // inputRef.current.value = "";
        },
    });

    const { data, isLoading } = trpc.useQuery(["question.getById", { id }]);
    const options = [
        { text: 'Yes', value: 'yes', questionId: data?.question?.id ?? '' },
        { text: 'No', value: 'no', questionId: data?.question?.id ?? '' }
    ];

    if (!data) return <div> NO QUESTION FOUND.</div>;
    // console.log(data);
    return isLoading || !data ? (
        <div>Loading...</div>
    ) : (
        <div className="flex flex-col p-6">
            <div className="flex flex-col p-6">
                <div className="text-2xl text-red-600">{data.question?.question}</div>
                <div></div>
            </div>
            <form>
                {options.map((option) => (
                    <div className="mb-4" key={option.value}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Option 1:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="yes" type="text" placeholder="Yes" value={option.value} />
                    </div>
                ))}
                <button className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Add an Option</button>
                <button type="submit" className="float-right mr-5 text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Submit</button>
            </form>
        </div>
    );
}
