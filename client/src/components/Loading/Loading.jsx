import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.div}>
        <div className={styles.preloader}></div>
    </div>
//     <div className={style.loading}> 
//     <img src='images/loading.gif'alt="Loading.." width='250px'/>
//     <p className={style.loadingtext}>Loading...</p>
// </div>
  );
};

export default Loading;
