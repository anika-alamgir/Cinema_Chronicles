const CCLogo = () => {
  const styles = {
    logo: {
      fontWeight: "bold",
      fontSize: "34px",
      background: "cyan",
      backgroundClip: "text",
      color: "transparent",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginLeft: "5px",
    },
  };

  return <p style={styles.logo}>CC</p>;
};

export default CCLogo;
