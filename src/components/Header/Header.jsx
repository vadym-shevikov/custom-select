import { config } from "../../../config";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <a className={styles.link} href={config.gitHubUrl} target="_blank">
        GitHub
      </a>
    </div>
  );
};
