import React from "react";
import { Row } from "react-bootstrap";

import OrderProfile from "../../components/profile/orderProfile/OrderProfile";
import UpdateProfile from "../../components/profile/updateProfile/UpdateProfile";

const ProfilePage = ({ history }) => {
  return (
    <Row>
      <UpdateProfile history={history} />
      <OrderProfile history={history} />
    </Row>
  );
};

export default ProfilePage;
