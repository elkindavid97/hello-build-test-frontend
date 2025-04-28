import { useCallback, useEffect, useState } from "react";
import type { GithubRepo } from "../types";
import { API_BASE_URL } from "../config/envs";

export const useGithubData = (token: string | null) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [starredRepos, setStarredRepos] = useState<GithubRepo[]>([]);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const fetchWithAuth = useCallback(
    async (url: string) => {
      if (!token) throw new Error("Token not found");
      
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
      return response.json();
    },
    [token]
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const userResponse = await fetchWithAuth(`${API_BASE_URL}/users`);
        if (userResponse.githubToken) {
          const reposData = await fetchWithAuth(`${API_BASE_URL}/github/repos`);
          const starredData = await fetchWithAuth(`${API_BASE_URL}/github/starred`);
          setRepos(reposData);
          setStarredRepos(starredData);
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error(error);
        setIsConnected(false);
      }
    };

    fetchUserData();
  }, [token, fetchWithAuth]);

  return { repos, starredRepos, isConnected };
};
