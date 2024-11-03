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
import { useNavigate } from "react-router-dom";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../utils/alertProvider";
import { deleteAbout, getAllAbout } from "../../redux/actions/allAction";
import UpdateAbout from "./updateAbout";

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
        <h4>Show:- </h4>
        <label>{select.show.toString()}</label>
      </Box>
    </>
  );
}

function AllAbout() {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [update, setUpdate] = useState(false);
  const [select, setSelect] = useState(null);
  const [rows, setRows] = useState([]);

  const { abouts } = useSelector((state) => state.adminAbout);
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
    { field: "show", headerName: "Show", minWidth: 100, flex: 1 },
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
    if (abouts) {
      abouts.filter((user) => {
        call.push({
          id: user._id,
          about: user,
          name: user.name,
          show: user.show,
        });
      });
    }
    setRows(call);
  }, [abouts]);

  const closeDialog = () => {
    setOpen(false);
    setSelect(null);
  };

  useEffect(() => {
    dispatch(getAllAbout());
  }, [dispatch]);
  return (
    <>
      {abouts && (
        <main className="main-all-projects">
          <section className="section-projects">
            {/* <Link
              style={{
                display: "grid",
                placeContent: "center",
                paddingBottom: "10px",
              }}
              to={"/admin/project/new"}
            > */}
            <Button
              sx={{ mb: "10px", display: "flex", ml: "auto", mr: "auto" }}
              onClick={() => navigate("/admin/about/new")}
              variant="outlined"
            >
              <Add /> Add About
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
                  <ContentText select={select} />
                </DialogContent>
                <DialogActions>
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
                    onClick={() => dispatch(deleteAbout(select.id))}
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
                <UpdateAbout project={select.about} setUpdate={setUpdate} />
              </Modal>
            )}
          </section>
        </main>
      )}
    </>
  );
}

export default AllAbout;
