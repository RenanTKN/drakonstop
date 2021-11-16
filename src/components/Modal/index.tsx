import { ReactNode } from "react";
import ReactDOM from "react-dom";

import "./style.scss";

const modalRoot = document.getElementById("modal")!;

interface ModalProps {
  children: ReactNode;
  title: ReactNode;
  display: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  title,
  display,
  onClose,
}: ModalProps) {
  return display
    ? ReactDOM.createPortal(
        <div className="overlay" onClick={onClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              {title}
              <div
                className="modal-close"
                onClick={() => {
                  onClose?.();
                }}
              >
                &times;
              </div>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>,
        modalRoot
      )
    : null;
}
