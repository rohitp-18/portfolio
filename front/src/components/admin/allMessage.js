import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import "./allProject.scss";
import { Link, useNavigate } from "react-router-dom";
import { Add, Circle, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../utils/alertProvider";
import {
  deleteMessage,
  getAllMessages,
} from "../../redux/actions/messageAction";
import {
  CLEAR_ERRORS,
  DELETE_MESSAGE_RESET,
} from "../../redux/constants/messageConstant";

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
        <h4>Email :-</h4>
        <label>{select.email}</label>
      </Box>
      <Box sx={style}>
        <h4>Message :-</h4>
        <label>{select.message}</label>
      </Box>
    </>
  );
}

function AllMessage() {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [select, setSelect] = useState(null);
  const [rows, setRows] = useState([]);

  const { messages, message, success, deleted, loading, error } = useSelector(
    (state) => state.adminMessage
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { sendAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const deletemessages = (e) => {
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
    { field: "email", headerName: "Email", minWidth: 100, flex: 1 },
    { field: "message", headerName: "Message", minWidth: 100, flex: 1 },
    {
      field: "action",
      headerName: "Action",
      type: "actions",
      sortable: false,
      minWidth: 150,
      flex: 0.3,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete color="error" />}
          label="Delete"
          onClick={() => deletemessages(params)}
        />,
      ],
    },
  ];

  useEffect(() => {
    if (!messages && error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }
  }, [messages, error, dispatch]);

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (deleted) {
      sendAlert(message, "success");
      setDialog(false);
      dispatch({ type: DELETE_MESSAGE_RESET });
    }
    dispatch(getAllMessages());
  }, [message, error, deleted, dispatch]);

  useEffect(() => {
    let call = [];
    if (messages) {
      messages.filter((user) => {
        call.push({
          id: user._id,
          name: user.name,
          email: user.email,
          message: user.message,
        });
      });
    }
    setRows(call);
  }, [messages]);

  const closeDialog = () => {
    setOpen(false);
    setSelect(null);
    // console.log(select);
  };

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);
  return (
    <>
      {messages && user.role === "admin" ? (
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
              onClick={() => navigate("/admin/project/new")}
              variant="outlined"
            >
              <Add /> Add Project
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
                    onClick={() => {
                      setRows(rows.filter((r) => r.id !== select.id));
                      dispatch(deleteMessage(select.id));
                    }}
                    color="error"
                  >
                    <Delete /> Delete
                  </Button>
                </DialogActions>
              </Dialog>
            )}
          </section>
        </main>
      ) : (
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
            minHeight: "80vh",
            width: "100%",
          }}
        >
          <h2>Only Admin can see this</h2>
        </main>
      )}
    </>
  );
}

export default AllMessage;
