import { ApproachListItem } from "../../app/page"

export function ApproachSection() {
  return (
    <div className="lg:order-2 col-span-full lg:col-span-3 flex flex-col items-start gap-10 bg-secondary p-6 md:p-12 rounded-3xl">
      <h2 className="font-headline text-4xl">How I Work</h2>
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 list-[decimal-leading-zero] list-inside">
        <ApproachListItem
          title="Start from First Principles"
          description="I believe that to truly solve a problem, you have to work hard to understand the real context behind it. Nothing matters if you aren't truly grappling with the problem underneath the problem."
        />
        <ApproachListItem
          title="People-First Leadership"
          description="Creating enduring, impactful products is a team sport. I believe in building teams that are the right size, comprised of the right people, that care about each other deeply, and that have the space and safety to work creatively and quickly."
        />
        <ApproachListItem
          title="Every Problem is a Gem"
          description="Different problems require different approaches. I believe in using the right approach for the job, and that there is no one-size-fits-all solution. Knowing how to adapt to each situation is key."
        />
        <ApproachListItem
          title="Prototype When You're Stuck"
          description="When the path forward is unclear, exploration through prototyping, sharing internally, testing externally, and iteration is better than over-solving slowly."
        />
        <ApproachListItem
          title="Build Systems to Move Fast"
          description="When you know what needs to be done, you need to be able to move fast. I believe in building systems that allow you to move efficiently, and that are flexible enough to change as you learn more."
        />
        <ApproachListItem
          title="No Bullshit"
          description="Doing great work is hard enough without having to deal with politics, ego, or other friction. I believe in being direct, honest, and transparent, and that the best work happens when you're working with people you trust."
        />
      </ol>
    </div>
  )
}
