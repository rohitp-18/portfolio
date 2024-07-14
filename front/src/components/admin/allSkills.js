import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Modal,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import "./allusers.scss";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../utils/alertProvider";
import parse from "html-react-parser";
import { CLEAR_ERRORS } from "../../redux/constants/userConstants";
import { deleteSkill, getAllSkills } from "../../redux/actions/SkillAction";
import UpdateSkill from "./updateSkill";
import { DELETE_SKILL_RESET } from "../../redux/constants/skillConstant";
import { Link } from "react-router-dom";

function ContentText({ select }) {
  const style = {
    display: "flex",
    gap: "10px",
    pt: "5px",
    alignItems: "center",
  };

  return (
    <>
      <Box sx={style}>
        <h4>id :-</h4>
        <label>{select.id}</label>
      </Box>
      <Box sx={style}>
        <h4>Name :-</h4>
        <label>{select.name}</label>
      </Box>
      <Box sx={style}>
        <h4>Percentage :-</h4>
        <label>{select.percentage}</label>
      </Box>
      <Box sx={{ display: "grid", placeContent: "center", mt: "30px" }}>
        <Box
          className="output-skill"
          sx={{ position: "relative", margin: "0 30px" }}
        >
          <Fab>{parse(select.icon)}</Fab>
          <CircularProgress
            variant="determinate"
            size={80}
            sx={{
              color: "#oof",
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
            value={select.percentage}
          />
          <h4>{select.name}</h4>
        </Box>
      </Box>
    </>
  );
}

function AllSkills() {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [rows, setRows] = useState([]);

  const { skills } = useSelector((state) => state.skill);

  const { message, deleted, error } = useSelector((state) => state.adminSkills);
  const { sendAlert } = useContext(AlertContext);
  const dispatch = useDispatch();

  const deleteProject = (e) => {
    setDialog(true);
    setSelect(e.row);
  };

  const columns = [
    {
      field: "id",
      filterable: false,
      disableColumnMenu: true,
      headerName: "Id",
      minWidth: 60,
      flex: 0.5,
    },
    { field: "name", headerName: "Name", minWidth: 100, flex: 1 },
    { field: "percentage", headerName: "Percentage", minWidth: 60, flex: 0.8 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit color="success" />}
          label="Edit"
          onClick={() => onCellClick(params)}
        />,
        <GridActionsCellItem
          icon={<Delete color="error" />}
          label="Delete"
          onClick={() => deleteProject(params)}
        />,
      ],
    },
  ];

  const dialogHandler = () => {
    setOpen(false);
    setModal(true);
  };

  const deleteDialog = () => {
    setOpen(false);
    setDialog(true);
  };

  const onCellClick = (e) => {
    if (e.field === "action") {
      return;
    }
    setSelect(e.row);
    setOpen(true);
  };

  useEffect(() => {
    if (!skills && error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }
  }, [skills, error, dispatch]);

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (deleted) {
      sendAlert(message, "success");
      setDialog(false);
      dispatch({ type: DELETE_SKILL_RESET });
      return;
    }
    dispatch(getAllSkills());
  }, [message, error, deleted, dispatch]);

  useEffect(() => {
    let call = [];
    if (skills) {
      skills.filter((skill) => {
        call.push({
          id: skill._id,
          name: skill.name,
          percentage: skill.percentage,
          icon: skill.icon,
        });
      });
    }
    setRows(call);
  }, [skills]);

  useEffect(() => {
    dispatch(getAllSkills());
  }, [dispatch]);

  return (
    <>
      <main className="main-all-projects">
        <section className="section-projects">
          <Link
            style={{
              display: "grid",
              placeContent: "center",
              paddingBottom: "10px",
            }}
            to={"/admin/project/new"}
          >
            <Button variant="outlined">
              <Add /> Add skill
            </Button>
          </Link>
          <DataGrid
            sx={{ maxWidth: "1100px", m: "0 auto" }}
            onCellClick={(e) => onCellClick(e)}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 25,
                },
              },
            }}
            rows={rows}
          />

          {select && (
            <Dialog open={dialog} onClose={() => setDialog(false)}>
              <DialogTitle>Are You Sure?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <ContentText select={select} />
                  <div style={{ fontSize: "14px", paddingTop: "10px" }}>
                    {select.id} delete this user
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button
                  variant="contained"
                  onClick={() => dispatch(deleteSkill(select.id))}
                  color="error"
                >
                  <Delete /> Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {select && (
            <Dialog
              sx={{ minWidth: "320px" }}
              open={open}
              onClose={() => setOpen(false)}
            >
              <DialogTitle>{select.name}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <ContentText select={select} />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={deleteDialog} color="error">
                  <Delete /> Delete
                </Button>
                <Button
                  onClick={() => dialogHandler(select)}
                  variant="contained"
                >
                  <Edit /> Edit
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {select && (
            <Modal
              className="modal-admin-user"
              open={modal}
              onClose={() => setModal(false)}
            >
              <UpdateSkill setOpen={setModal} select={select} />
            </Modal>
          )}
        </section>
      </main>
    </>
  );
}

export default AllSkills;
