import axios from "axios";

const Emailverify = async (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    email,
  });
  try {
    const res = await axios.post("/api/verifyemail", body, config);

    return res.data.deliverability;
  } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 500 )
        return error.response.data;
      else if (error.response.status === 400)
        return error.response.data.error[0].msg;
      else  return 'no response';
  }
};

export default Emailverify;
