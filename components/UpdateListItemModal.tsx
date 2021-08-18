import React, { useState, FormEvent } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  Modal,
  TextField,
  Typography
} from '@material-ui/core';
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
    }
  })
);

export default function UpdateListItemModal({
  buttonTitle,
  modalTitle,
  listItemData
}: {
  buttonTitle: string;
  modalTitle: string;
  listItemData: IListItem;
}) {
  const classes = useStyles();
  const { token } = useTypedSelector((state) => state.tokenInfo);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [creds, setCreds] = useState({
    id: listItemData.id,
    todoId: listItemData.todo_id,
    userId: listItemData.user_id,
    todoTitle: listItemData.todoTitle,
    token
  });

  const dispatch = useDispatch();

  const body = (
    <Container style={modalStyle} className={classes.paper}>
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
      <Button type="button" onClick={() => setOpen(true)}>
        {buttonTitle}
      </Button>
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
  buttonTitle: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  listItemData: PropTypes.shape({
    user_id: PropTypes.string,
    todo_id: PropTypes.string,
    id: PropTypes.string,
    todoTitle: PropTypes.string
  }).isRequired
};
