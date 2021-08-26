import React, { useState, FormEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  IconButton,
  Container,
  Modal,
  TextField,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateList } from '../store/actions/listActions';
import useTypedSelector from '../hooks/useTypedSelector';
import { IList } from '../types/list';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    updateBtn: {
      backgroundColor: '#FFEB0A',
      margin: '10px'
    }
  })
);
export default function UpdateListModal({
  // buttonTitle,
  modalTitle,
  listData
}: {
  // buttonTitle: string;
  modalTitle: string;
  listData: IList;
}) {
  const styles = useStyles();
  const { token } = useTypedSelector((state) => state.tokenInfo);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [creds, setCreds] = useState({
    id: listData.id,
    user_id: listData.user_id,
    token,
    todoTitle: listData.todoTitle
  });

  const dispatch = useDispatch();

  const body = (
    <Container style={modalStyle} className={styles.paper}>
      <Typography id="simple-modal-title" variant="h5">
        {modalTitle}
      </Typography>

      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();

          dispatch(updateList(creds));
          setOpen(false);
          toast.success(`Todo list ${creds.todoTitle} updated.`);
        }}
      >
        <TextField
          id="standard-basic"
          label="Todo Title"
          value={creds.todoTitle}
          onChange={(e) => setCreds({ ...creds, todoTitle: e.target.value })}
        />
        <Button type="submit">Update</Button>
      </form>
    </Container>
  );

  return (
    <div>
      <IconButton
        type="button"
        className={styles.updateBtn}
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

UpdateListModal.propTypes = {
  // buttonTitle: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  listData: PropTypes.shape({
    user_id: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string
  }).isRequired
};
