import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Add, Edit } from "../../icons";
import Dragon from "../../services/dragon";
import Button from "../Button";
import { DragonProps } from "../DragonCard";
import Modal from "../Modal";
import Title from "../Title";

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
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: dragon?.name ?? "",
      type: dragon?.type ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obrigatório"),
      type: Yup.string().required("Campo obrigatório"),
    }),
    onSubmit: ({ name, type }) => {
      setIsLoading(true);
      const onSuccess = () => {
        onComplete?.();
        setIsCompleted(true);
        setTimeout(() => {
          onClose();
          setIsCompleted(false);
          formik.setFieldValue("name", "");
          formik.setFieldValue("type", "");
          setIsLoading(false);
        }, 750);
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
    },
  });

  React.useEffect(() => {
    formik.setFieldValue("name", dragon?.name ?? "");
    formik.setFieldValue("type", dragon?.type ?? "");
    formik.setFieldTouched("name", false);
    formik.setFieldTouched("type", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragon, display]);

  const id = dragon?.id!;
  const isEdit = !!id;

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
          <form onSubmit={formik.handleSubmit} className="form">
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
              />
              {formik.touched.name && formik.errors.name && (
                <div className="form-error">{formik.errors.name}</div>
              )}
            </label>

            <label>
              Tipo:
              <input
                type="text"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.type && formik.errors.type && (
                <div className="form-error">{formik.errors.type}</div>
              )}
            </label>
            <Button type="submit" disabled={isLoading}>
              Salvar
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
