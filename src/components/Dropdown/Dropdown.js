import React, { useState } from "react";
import ClickOutside from "@codecraftkit/clickoutside";
import styles from "./Dropdown.module.scss";
import ActiveArrowClosed from "./ActiveArrowClosed.svg";
import ActiveArrowOpened from "./ActiveArrowOpened.svg";
import BlockedArrow from "./BlockedArrow.svg";

const Dropdown = ({
  title,
  items = [],
  multiSelect = false,
  Block = false,
}) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [selectedValue, setValue] = useState("");
  const toggle = () => setOpen(!open);
  const close = () => setOpen(false);
  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      console.log(open);
      if (!multiSelect) {
        setSelection([item]);
        setValue(item.value);
        close();
      } else {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
      setValue(0);
      if (!multiSelect) close();
    }
  }

  function CheckEnter(e) {
    if (e.key === "Enter") {
      toggle();
    }
  }

  function isItemInSelection(item) {
    if (selection.find((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  function chooseArrow() {
    if (Block) {
      return BlockedArrow;
    }
    if (!open) {
      return ActiveArrowClosed;
    }
    return ActiveArrowOpened;
  }
  return (
    <div className={styles.dd_wrapper}>
      <ClickOutside handleAction={close}>
        <div
          tabIndex={0}
          className={`${selectedValue ? styles.noPlaceHolder : ""} ${
            styles.dd_header
          }
          `}
          role="button"
          onKeyPress={CheckEnter}
          onClick={!Block ? toggle : undefined}
        >
          <div className={styles.dd_header_title}>
            <p className={styles.dd_header__title__bold}>
              {selectedValue || title}
            </p>
          </div>
          <div className={styles.dd_header__action}>
            <img src={chooseArrow()} alt="" className={styles.img} />
          </div>
        </div>
        {open && !Block && (
          <ul className={styles.dd_list}>
            {items.map((item) => (
              <li
                className={`${styles.dd_list_item} ${
                  isItemInSelection(item) && styles.Selected
                }`}
                key={item.id}
              >
                <button
                  type="button"
                  className={isItemInSelection(item) && styles.Selected}
                  onClick={() => handleOnClick(item)}
                >
                  <span>{item.value}</span>
                  <span>{}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </ClickOutside>
    </div>
  );
};

export default Dropdown;
