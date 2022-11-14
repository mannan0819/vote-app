export default function About() {
    return (
        <div className="container mx-auto pt-4">
            <h1 className="text-4xl font-bold text-center">About</h1>
            <p className="text-2xl text-center">This is a simple voting app made by Mannan.</p>
            <p className="text-2xl text-center">It uses Next.js, React, TypeScript, TailwindCSS, Prisma, and TRPC.</p>
            <p className="text-2xl text-center">It is hosted on Vercel.</p>
            <p className="text-2xl text-center">The source code is available on <a href="https://github.com/mannan0819/vote-app" className="text-blue-500">GitHub</a>.</p>
        </div>
    )
}