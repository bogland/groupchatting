import React from "react";
import GoogleLogin from "react-google-login";

type Props = {};

const index = (props: Props) => {
  // const { onLoginGoogle } = props;
  const onLoginGoogle = (result) => {
    console.log(result);
  };

  const onClick = () => {
    alert("로긴 버튼");
  };
  return (
    <>
      <div className={"login"}>
        123
        <GoogleLogin
          clientId="23029233287-7bkiktbq73lpae4jpk01ct7r48omsn24.apps.googleusercontent.com"
          onSuccess={(result) => onLoginGoogle(result)}
          onFailure={(result) => onLoginGoogle(result)}
        />
      </div>
    </>
  );
};

export default index;
