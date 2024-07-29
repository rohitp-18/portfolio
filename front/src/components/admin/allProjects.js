import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import "./allProject.scss";
import { Link } from "react-router-dom";
import {
  Add,
  Circle,
  Delete,
  Edit,
  EmergencyRecording,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../utils/alertProvider";
import UpdateProject from "./updateProject";
import {
  deleteProject,
  getAllProjects,
} from "../../redux/actions/projectAction";

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
      <Box sx={{ display: "flex", alignItems: "flex-start", mt: "30px" }}>
        <h4>description:- </h4>
        <label>{select.description}</label>
      </Box>
    </>
  );
}

function AllProjects() {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [update, setUpdate] = useState(false);
  const [select, setSelect] = useState(null);
  const [rows, setRows] = useState([]);

  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { sendAlert } = useContext(AlertContext);

  const deleteProjects = (e) => {
    setDialog(true);
    setSelect(e.row);
  };
  const onCellClick = (e) => {
    if (e.field === "action") {
      return;
    }
    setSelect(e.row);
    setOpen(true);
  };

  const columns = [
    {
      field: "id",
      filterable: false,
      disableColumnMenu: true,
      headerName: "Id",
      minWidth: 50,
      flex: 0.5,
    },
    { field: "name", headerName: "Name", minWidth: 100, flex: 1 },
    { field: "category", headerName: "Category", minWidth: 100, flex: 1 },
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
          onClick={() => deleteProjects(params)}
        />,
      ],
    },
  ];

  const onCellChange = (e) => {
    setSelect(e);
    setOpen(true);
  };

  useEffect(() => {
    let call = [];
    if (projects) {
      projects.filter((user) => {
        user.categories =
          user.category === "mern"
            ? "MERN Stack Website"
            : user.category === "react"
            ? "React.js Website"
            : "Android application";
        call.push({
          id: user._id,
          project: user,
          name: user.name,
          description: user.description,
          category: user.categories,
        });
      });
    }
    setRows(call);
  }, [projects]);

  const closeDialog = () => {
    setOpen(false);
    setSelect(null);
    // console.log(select);
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
  return (
    <>
      {projects && (
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
                <Add /> Add Project
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
              <Dialog open={open} onClose={() => closeDialog()}>
                <DialogTitle>{select.name}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{select.description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to={`/project/${select.id}`}>
                    <Button color="warning">
                      <Circle
                        sx={{ mr: "3px" }}
                        fontSize="10px"
                        color="error"
                      />
                      Details
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setDialog(true)}
                    variant="outlined"
                    color="error"
                  >
                    <Delete /> Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setUpdate(true);
                    }}
                    variant="contained"
                  >
                    <Edit /> Edit
                  </Button>
                </DialogActions>
              </Dialog>
            )}
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
                    onClick={() => dispatch(deleteProject(select.id))}
                    color="error"
                  >
                    <Delete /> Delete
                  </Button>
                </DialogActions>
              </Dialog>
            )}
            {select && (
              <Modal
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                open={update}
                onClose={() => setUpdate(false)}
              >
                <UpdateProject project={select.project} setUpdate={setUpdate} />
              </Modal>
            )}
          </section>
        </main>
      )}
    </>
  );
}

export default AllProjects;
