import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Radio,
  FormControlLabel,
  Input,
  RadioGroup,
  Typography,
  FormControl,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import "./filters.scss";
import { ExpandMore, Search } from "@mui/icons-material";
import { useSelector } from "react-redux";

function Filters({ skills, setSkills, category, setCategory, sort, setSort }) {
  const { skills: checkSkill } = useSelector((state) => state.all);
  const [load, setLoad] = useState(false);

  return (
    <>
      <section className="filters">
        <h3>Filters</h3>
        <div className="div-filters">
          <Accordion defaultExpanded>
            <AccordionSummary className="skills" expandIcon={<ExpandMore />}>
              <h4>Sort By</h4>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="summary">
                <RadioGroup
                  onChange={(e) => setSort(e.target.value)}
                  defaultValue="sort"
                  value={sort}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{ display: "none" }}
                    value="sort"
                    control={<Radio size="small" />}
                    label="Newest First"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Radio size="small" />}
                    label="Newest First"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="old"
                    control={<Radio size="small" />}
                    label="Oldest First"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="popular"
                    control={<Radio size="small" />}
                    label="Populared"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="realvent"
                    control={<Radio size="small" />}
                    label="Realvent"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary className="skills" expandIcon={<ExpandMore />}>
              <h4>Catergory</h4>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="summary"
              >
                <FormControlLabel
                  value="all"
                  control={<Radio size="small" />}
                  label="All"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="mern"
                  control={<Radio size="small" />}
                  label="Full-Stack Web Projects"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="react"
                  control={<Radio size="small" />}
                  label="React.js Projects"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="android"
                  control={<Radio size="small" />}
                  label="Android app Projects"
                  labelPlacement="end"
                />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary className="skills" expandIcon={<ExpandMore />}>
              <h4>Skills</h4>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="summary"
              >
                <Input
                  type="search"
                  placeholder="search skill..."
                  startAdornment={
                    <Search sx={{ fontSize: "1.1rem", opacity: 0.7 }} />
                  }
                />
                <FormControlLabel
                  control={<Radio size="small" />}
                  value={"all"}
                  sx={{ display: "none" }}
                />

                {checkSkill &&
                  checkSkill.map((skill, i) => {
                    if (!load && i > 4) {
                      return;
                    }
                    return (
                      <FormControlLabel
                        value={skill.name}
                        control={<Radio size="small" />}
                        label={skill.name}
                        labelPlacement="end"
                        onClick={() => setSkills([...skills, skill.name])}
                      />
                    );
                  })}
              </RadioGroup>
              <Typography
                fontWeight={600}
                variant="body2"
                color="primary"
                component={"div"}
                onClick={() => setLoad(!load)}
              >
                {!load ? "load more..." : "load less..."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="drawer-button">
          <Button>Cancel</Button>
          <Button variant="contained">Apply</Button>
        </div>
      </section>
    </>
  );
}

export default Filters;
