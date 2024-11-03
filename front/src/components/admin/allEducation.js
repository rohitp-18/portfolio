import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import "./allProject.scss";
import { Link, useNavigate } from "react-router-dom";
import { Add, Circle, Delete, Edit, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEducation,
  getAllEducation,
} from "../../redux/actions/allAction";
import UpdateEducation from "./updateEducation";
import { AlertContext } from "../utils/alertProvider";
import {
  CLEAR_ERRORS,
  DELETE_EDUCATION_RESET,
} from "../../redux/constants/allConstants";

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
        <label>{select.college}</label>
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-start", mt: "30px" }}>
        <h4>description:- </h4>
        <label>{select.percentage}</label>
      </Box>
    </>
  );
}

function AllEducation() {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [update, setUpdate] = useState(false);
  const [select, setSelect] = useState(null);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState();

  const { educations, error, deleted, message } = useSelector(
    (state) => state.education
  );
  const { about } = useSelector((state) => state.all);
  const dispatch = useDispatch();
  const { sendAlert } = useContext(AlertContext);
  const navigate = useNavigate();

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
    { field: "percentage", headerName: "Percentage", minWidth: 100, flex: 1 },
    { field: "cgpa", headerName: "CGPA", minWidth: 100, flex: 1 },
    { field: "year", headerName: "Years", minWidth: 100, flex: 1 },
    { field: "college", headerName: "College", minWidth: 100, flex: 1 },
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

  useEffect(() => {
    let call = [];
    if (educations) {
      educations.filter((user) => {
        call.push({
          id: user._id,
          project: user,
          name: user.name,
          percentage: user.percentage,
          cgpa: user.cgpa,
          year: user.year,
          college: user.college,
        });
      });
    }
    setRows(call);
  }, [educations]);

  const closeDialog = () => {
    setOpen(false);
    setSelect(null);
  };

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (deleted) {
      sendAlert(message, "success");
      setDialog(false);
      dispatch({ type: DELETE_EDUCATION_RESET });
      dispatch(getAllEducation(id));
      return;
    }
  }, [message, error, deleted, dispatch]);

  useEffect(() => {
    if (about) {
      setId(about._id);
      dispatch(getAllEducation(about._id));
    }
  }, [dispatch, about]);
  return (
    <>
      {educations && (
        <main className="main-all-projects">
          <section className="section-projects">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                margin: "30px 0",
              }}
            >
              <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                name="Name"
                sx={{ width: "30ch", mr: "10px" }}
                value={id}
                variant="standard"
                type="search"
                onChange={(e) => setId(e.target.value)}
              />
              <Button
                onClick={() =>
                  id.length === 24 && dispatch(getAllEducation(id))
                }
                size="small"
                disabled={id && id.length !== 24}
                variant="outlined"
              >
                Search
              </Button>
            </Box>

            <Button
              sx={{ mb: "10px", display: "flex", ml: "auto", mr: "auto" }}
              onClick={() => navigate("/admin/education/new")}
              variant="outlined"
            >
              <Add /> Add Education
            </Button>
            {/* </Link> */}
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
                    onClick={() => dispatch(deleteEducation(id, select.id))}
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
                <UpdateEducation
                  id={about._id}
                  project={select.project}
                  setOpen={setUpdate}
                />
              </Modal>
            )}
          </section>
        </main>
      )}
    </>
  );
}

export default AllEducation;
