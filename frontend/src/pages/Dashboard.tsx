import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-20 px-4">
        <h1 className="text-xl font-semibold">Dashboard Content</h1>
        <p className="text-foreground/80 mt-2">
          Welcome to your dashboard! Your data and insights will appear here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
