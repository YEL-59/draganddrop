import LeadsOverview from "./components/LeadsOverview";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className="w-full bg-blue-600 p-4 text-center text-lg font-bold">
        Sales Overview
      </header>
      <LeadsOverview />
    </div>
  );
}

export default App;
