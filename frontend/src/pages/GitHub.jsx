import React, { useEffect, useState } from "react";

const GitHub = () => {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/abhiyadav-123");
        const userData = await userRes.json();
        setUser(userData);

        const reposRes = await fetch("https://api.github.com/users/abhiyadav-123/repos");
        const reposData = await reposRes.json();
        setRepos(reposData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100 text-base-content">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100 text-error text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        {user && (
          <div className="bg-base-200 p-6 rounded-2xl shadow-xl mb-12 text-center">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary"
            />
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="mt-2">{user.bio || "No bio available"}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary mt-4"
            >
              View GitHub Profile
            </a>
          </div>
        )}

        {/* Repositories Section */}
        <h1 className="text-4xl font-bold text-center mb-10 text-primary">
          My GitHub Repositories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-base-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-primary">{repo.name}</h2>
              <p className="text-sm mt-2 text-base-content/70">
                {repo.description || "No description available"}
              </p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-warning">⭐ {repo.stargazers_count}</span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info hover:underline"
                >
                  View Repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHub;
