import Header from "~/UI/shell/header";

export default function CountPage() {
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main className="h-full">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* constainer */}
          <div className="h-full rounded bg-slate-500 flex flex-col justify-center items-center space-y-6">
            {/* question text card */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                {/* Content goes here */}
                <h1>How many people are in the household?</h1>
              </div>
            </div>

            {/* Number Display */}
            <div className="w-full flex flex-row justify-between items-center bg-slate-300">
              <div>
                <button> - </button>
              </div>
              <div>
                <span className="text-7xl"> 0</span>
              </div>
              <div>
                <button> + </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
