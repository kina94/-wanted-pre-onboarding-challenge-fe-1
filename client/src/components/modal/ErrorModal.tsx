import React from "react";
import Animation from "../animation/Animation";
import Button from "../button/Button";
import Modal from "./Modal";
import errorAnimation from "../../resource/animation/77363-error-warning-alert.json";

interface Props {
  errorState: string;
  modalCloseOption(): void;
}

function ErrorModal({ errorState, modalCloseOption }: Props) {
  return (
    <>
      <Modal>
        <Animation
          animationData={errorAnimation}
          width="150px"
          height="auto"
        ></Animation>
        <p className="text-slate-500 font-bold p-[1em]">{errorState}</p>{" "}
        <div>
          <Button className="indigo" onClick={modalCloseOption}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ErrorModal;
