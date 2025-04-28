import React from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: SelectChangeEvent) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <Select
      size="small"
      value={i18n.language}
      onChange={handleChange}
      sx={{ minWidth: 120, backgroundColor: "white" }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="es">Español</MenuItem>
    </Select>
  );
};
