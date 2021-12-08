import React, { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Input } from "react-rainbow-components";
import kebabCase from "lodash/kebabCase";
import localforage from "localforage";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

const NewDoc = ({ isOpen, setIsOpen }: Props) => {
  const handleOnClose = () => setIsOpen(false);

  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const createNewDoc = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const docKey = kebabCase(title);
    localforage.setItem(docKey, []);
    navigate(`/doc/${docKey}`);
  };

  return (
    <Modal id="modal-1" isOpen={isOpen} onRequestClose={handleOnClose}>
      <form>
        <Input
          id="input-component-1"
          placeholder="Title New Doc"
          className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto wp-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <Button
          id="button-1"
          variant="neutral"
          label="Create New Doc"
          onClick={createNewDoc}
          disabled={!title}
          type="submit"
        />
      </form>
    </Modal>
  );
};

export default NewDoc;
