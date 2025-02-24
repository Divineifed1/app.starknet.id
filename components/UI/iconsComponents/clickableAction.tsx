import React, { FunctionComponent, ReactNode } from "react";
import styles from "../../../styles/components/identityMenu.module.css";

type ClickableActionProps = {
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  description?: string;
  style?: "primary" | "secondary";
  width?: "fixed" | "auto";
};

const ClickableAction: FunctionComponent<ClickableActionProps> = ({
  icon,
  onClick,
  title,
  description,
  style = "secondary",
  width = "fixed",
}) => {
  const actionClass =
    style === "secondary" ? styles.clickableActionSecondary : styles.clickableActionPrimary;
  const widthClass = width === "auto" ? styles.clickableActionAutoWidth : "";
  const iconClass =
    style === "secondary" ? styles.clickableIconSecondary : styles.clickableIconPrimary;

  return (
    <div className={`${actionClass} ${widthClass} mx-auto`} onClick={onClick}>
      <div className={iconClass}>{icon}</div>
      <div className="ml-2">
        {title && <h1 className={styles.clickableActionTitle}>{title}</h1>}
        {description && <p className={styles.clickableActionDescription}>{description}</p>}
      </div>
    </div>
  );
};

export default ClickableAction;

