import CallToAction from "./CallToAction";

export default function Projects() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center p-10">
      <h2 className="text-3xl font-semibold">Projects</h2>
      <p className="text-gray-500">
        Build fun and engaging projects while learning HTML, CSS, and
        JavaScript!
      </p>
      <div className="projects">
        <CallToAction />
      </div>
    </div>
  );
}
