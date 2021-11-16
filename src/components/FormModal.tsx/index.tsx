import React from "react";

import { Add, Edit } from "../../icons";
import Button from "../Button";
import { DragonProps } from "../DragonCard";
import Modal from "../Modal";
import Title from "../Title";

import Dragon from "../../services/dragon";

import "./style.scss";

interface EditModalProps {
  display: boolean;
  dragon?: DragonProps | null;
  onClose: () => void;
  onComplete?: () => void;
}

export default function FormModal({
  display,
  dragon,
  onClose,
  onComplete,
}: EditModalProps) {
  const [name, setName] = React.useState(dragon?.name! ?? "");
  const [type, setType] = React.useState(dragon?.type! ?? "");
  const [isCompleted, setIsCompleted] = React.useState(false);

  React.useEffect(() => {
    setName(dragon?.name ?? "");
    setType(dragon?.type ?? "");
  }, [dragon]);

  const id = dragon?.id!;
  const isEdit = !!id;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const onSuccess = () => {
      onComplete?.();
      setIsCompleted(true);
      setTimeout(() => {
        onClose();
        setIsCompleted(false);
        setName("");
        setType("");
      }, 1000);
    };

    isEdit
      ? Dragon.editDragon({ id, name, type }).then((res) => {
          if (res.status === 200) {
            onSuccess();
          }
        })
      : Dragon.addDragon({ type, name }).then((res) => {
          if (res.status === 201) {
            onSuccess();
          }
        });
  };

  return (
    <>
      <Modal
        title={
          <span>
            {isEdit ? (
              <>
                <Edit /> Editar
              </>
            ) : (
              <>
                <Add /> Adicionar
              </>
            )}
          </span>
        }
        display={display}
        onClose={onClose}
      >
        {isCompleted ? (
          <Title>✅ Sucesso</Title>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </label>

            <label>
              Tipo:
              <input
                type="text"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </label>
            <Button type="submit">Salvar</Button>
          </form>
        )}
      </Modal>
    </>
  );
}
