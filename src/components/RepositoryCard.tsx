import { Button, Card, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const RepositoryCard = ({
  name,
  description,
  url,
}: {
  name: string;
  description?: string;
  url: string;
}) => (
    <Card
      sx={{
        height: "100%",
        width: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" },
        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Typography variant="h6" gutterBottom noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          {description || "No description"}
        </Typography>
        <Button variant="outlined" href={url} target="_blank" fullWidth>
            {useTranslation().t("dashboard.viewRepository")}
        </Button>
      </CardContent>
    </Card>
  );
