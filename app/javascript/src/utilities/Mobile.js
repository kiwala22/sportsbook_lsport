export default {
  isMobile() {
    return (
      /Android|webOS|iPhone|iPod|iPad|iPad Pro|iPad Mini|iPad Air|BlackBerry/i.test(
        navigator.userAgent
      ) ||
      /Android|webOS|iPhone|iPod|iPad|iPad Pro|iPad Mini|iPad Air|BlackBerry/i.test(
        navigator.platform
      )
    );
  },
};
