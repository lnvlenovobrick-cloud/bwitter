export const getStaticPaths = () => {
  return {
    paths: [], // Leave this empty so it builds nothing at compile-time
    fallback: 'blocking' // Forces it to wait until runtime
  };
};
