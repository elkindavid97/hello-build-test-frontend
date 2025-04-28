import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGithubData } from "../hooks/useGithubData";
import { useAuthToken } from "../hooks/useAuthToken";
import { GithubRepo } from "../types";
import { useTranslation } from "react-i18next";
import { RepositoryCard } from "../components/RepositoryCard";
import { LanguageSwitcher } from "../components/LanguajeSwitcher";
import { useState } from "react";
import { API_BASE_URL } from "../config/envs";

export const Dashboard = () => {
  const { t } = useTranslation();
  const token = useAuthToken();
  const { repos, starredRepos, isConnected } = useGithubData(token);
  const [searchTerm, setSearchTerm] = useState("");

  const connectGithub = () => {
    if (!token) return console.error("Token not found in localStorage");
    window.location.href = `${API_BASE_URL}/github/auth?token=${token}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (isConnected === null) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const filteredRepos = repos.filter((repo) =>
    repo?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t("dashboard.title").toUpperCase()}
          </Typography>
          <LanguageSwitcher />
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            {t("dashboard.logout").toUpperCase()}
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {!isConnected ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="70vh"
          >
            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={connectGithub}
              size="large"
              sx={{ mb: 2 }}
            >
              {t("dashboard.connectGitHub")}
            </Button>
          </Box>
        ) : (
          <>
            {repos.length > 0 && (
              <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
                <TextField
                  label={t("dashboard.searchRepo")}
                  variant="outlined"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  sx={{ width: "300px" }}
                />
              </Box>
            )}
            <Section
              title={t("dashboard.yourRepositories")}
              repos={filteredRepos}
            />
            <Section
              title={t("dashboard.starredRepositories")}
              repos={starredRepos}
            />
          </>
        )}
      </Container>
    </>
  );
};

const Section = ({ title, repos }: { title: string; repos: GithubRepo[] }) => (
  <>
    <Typography variant="h4" textAlign="center" gutterBottom sx={{ mt: 4 }}>
      {title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        mt: 2,
      }}
    >
      {repos.map((repo) => (
        <Box key={repo.id} sx={{ flex: "1 1 250px", maxWidth: "300px" }}>
          <RepositoryCard
            name={repo.name ?? ""}
            description={repo.description ?? "No description"}
            url={`https://github.com/${repo.full_name}`}
          />
        </Box>
      ))}
    </Box>
  </>
);

export default Dashboard;
