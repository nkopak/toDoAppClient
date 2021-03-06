import React, { useState, FormEvent, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import useTypedSelector from '../hooks/useTypedSelector';
import { createListItem } from '../store/actions/listItemActions';

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

export default function SimpleModal({
  buttonTitle,
  modalTitle
}: {
  buttonTitle: string;
  modalTitle: string;
}) {
  const classes = useStyles();
  const router = useRouter();

  const { id, token } = useTypedSelector((state) => state.tokenInfo);
  // const { todoId } = useTypedSelector((state) => state.listItem);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [creds, setCreds] = useState({
    userId: id,
    todoId: '',
    token,
    todoTitle: '',
    isCompleted: false
  });

  useEffect(() => {
    if (!router.isReady) return;

    const { todoId } = router.query;

    async function fetchData() {
      if (typeof todoId === 'string') {
        setCreds({ ...creds, todoId });
      }
    }
    fetchData();
  }, [router.isReady]);

  const dispatch = useDispatch();

  const body = (
    <Container style={modalStyle} className={classes.paper}>
      <Typography id="simple-modal-title" variant="h5">
        {modalTitle}
      </Typography>

      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();

          dispatch(createListItem(creds));
          setOpen(false);
          toast.success(`Todo list ${creds.todoTitle} created.`);
        }}
      >
        <TextField
          id="standard-basic"
          label="Todo Title"
          onChange={(e) => setCreds({ ...creds, todoTitle: e.target.value })}
        />
        <Button type="submit">Create</Button>
      </form>
    </Container>
  );

  return (
    <div>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        endIcon={<PlaylistAddIcon />}
      >
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

SimpleModal.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired
};
