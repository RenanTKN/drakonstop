import React from "react";
import { Trash } from "../../icons";
import Button from "../Button";
import { DragonProps } from "../DragonCard";
import Dragon from "../../services/dragon";

import Modal from "../Modal";

import "./style.scss";
import { useNavigate, useParams } from "react-router";

interface RemoveModalProps {
  dragon: DragonProps;
  display: boolean;
  onClose: () => void;
  refreshDragons?: () => void;
}

export default function RemoveModal({
  dragon,
  display,
  onClose,
  refreshDragons,
}: RemoveModalProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const idParam = useParams<"id">().id;

  const removeDragon = () => {
    setIsLoading(true);
    Dragon.deleteDragon(dragon.id).then((res) => {
      setIsLoading(false);
      if (res.status !== 200) {
        setError("Erro ao excluir, tente novamente.");
      } else {
        setError("");
        if (!!idParam) {
          navigate("/");
        } else {
          refreshDragons?.();
          onClose();
        }
      }
    });
  };

  return (
    <Modal
      display={display}
      onClose={onClose}
      title={
        <span>
          <Trash /> Remover dragão
        </span>
      }
    >
      <div>
        <strong>
          Remover dragão #{dragon.id} {dragon.name}?
        </strong>
        <div className="modal-action-buttons">
          <Button color="gray" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button color="red" onClick={removeDragon} disabled={isLoading}>
            Excluir
          </Button>
        </div>
        {!!error && <span className="error-msg">{error}</span>}
      </div>
    </Modal>
  );
}
