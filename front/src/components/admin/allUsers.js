import { Add, Delete, Edit } from "@mui/icons-material";
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
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import UpdateUser from "./updateUser";
import "./allusers.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteUserAction,
  alluserAction,
} from "../../redux/actions/userActions";
import { AlertContext } from "../utils/alertProvider";
import {
  ADMIN_DELETE_USER_RESET,
  CLEAR_ERRORS,
} from "../../redux/constants/userConstants";

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
        <h4>id</h4>
        <label>{select.id}</label>
      </Box>
      <Box sx={style}>
        <h4>Name</h4>
        <label>{select.name}</label>
      </Box>
      <Box sx={style}>
        <h4>Email</h4>
        <label>{select.email}</label>
      </Box>
      <Box sx={style}>
        <h4>Role</h4>
        <label>{select.role}</label>
      </Box>
    </>
  );
}

function AllUsers() {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [modal, setModal] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [rows, setRows] = useState([]);

  const { users, message, deleted, error } = useSelector(
    (state) => state.adminUser
  );
  const { sendAlert } = useContext(AlertContext);
  const dispatch = useDispatch();

  const deleteUser = (e) => {
    setDialog(true);
    setSelect(e.row);
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
    { field: "email", headerName: "Email", minWidth: 100, flex: 1 },
    { field: "role", headerName: "Role", minWidth: 100, flex: 1 },
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
          onClick={() => deleteUser(params)}
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
    if (!users && error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }
  }, [users, error, dispatch]);

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (deleted) {
      sendAlert(message, "success");
      dispatch({ type: ADMIN_DELETE_USER_RESET });
      return;
    }
  }, [message, error, deleted, dispatch]);

  useEffect(() => {
    let call = [];
    if (users) {
      users.filter((user) => {
        call.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
      });
    }
    setRows(call);
  }, [users]);

  useEffect(() => {
    dispatch(alluserAction());
  }, [dispatch]);

  return (
    <>
      <main className="main-all-projects">
        <section className="section-projects">
          <DataGrid
            className="laptop"
            onCellClick={(e) => onCellClick(e)}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            rows={rows}
          />

          <DataGrid
            className="mobile"
            onCellClick={(e) => onCellClick(e)}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  action: false,
                  role: false,
                },
              },
            }}
            rows={rows}
          />

          {select && (
            <Dialog
              className="soooooo"
              open={dialog}
              onClose={() => setDialog(false)}
            >
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
                  onClick={() => dispatch(adminDeleteUserAction(select.id))}
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
              <UpdateUser setOpen={setModal} select={select} />
            </Modal>
          )}
        </section>
      </main>
    </>
  );
}

export default AllUsers;
