import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
