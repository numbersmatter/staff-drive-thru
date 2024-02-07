export function QuestionDisplay({questionText}:{questionText: string}) {
  return (
    <div className=" overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 sm:py-4">
        {/* Content goes here */}
        <h1 className="text-4xl font-medium">
          {questionText}
        </h1>
      </div>
    </div>
  );
}