import React, { useState, FormEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useTypedSelector from '../hooks/useTypedSelector';
import { IListItem } from '../types/listItem';
import { updateListItem } from '../store/actions/listItemActions';

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
      // backgroundColor: '#FFEB0A',
      margin: '10px'
    }
  })
);

export default function UpdateListItemModal({
  modalTitle,
  listItemData
}: {
  modalTitle: string;
  listItemData: IListItem;
}) {
  const styles = useStyles();
  const { token } = useTypedSelector((state) => state.tokenInfo);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [creds, setCreds] = useState({
    id: listItemData.id,
    todoId: listItemData.todoId,
    userId: listItemData.userId,
    todoTitle: listItemData.todoTitle,
    isCompleted: listItemData.isCompleted,
    token
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

          dispatch(updateListItem(creds));
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

UpdateListItemModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  listItemData: PropTypes.shape({
    userId: PropTypes.string,
    todoId: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string,
    isCompleted: PropTypes.bool
  }).isRequired
};
