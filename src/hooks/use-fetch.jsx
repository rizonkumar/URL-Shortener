const { useState } = require("react");

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setErrors(null);

    try {
      const response = await cb(options, ...args);
      setData(response);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, errors, fn };
};

export default useFetch;
