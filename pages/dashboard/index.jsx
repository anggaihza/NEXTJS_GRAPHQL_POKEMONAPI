import {useUser} from "@/context/user";
import withProtected from "@/hoc/withProtected";
import React from "react";
import AuthLayout from "@/components/Layout/Authenticated";

const Dashboard = () => {
  const user = useUser();
  const {email, uid} = user;
  return (
    <AuthLayout title="Dashboard">
      <div>
        <p>
          Email: <b>{email}</b>
        </p>
        <br />
        <p>
          UID: <b>{uid}</b>
        </p>
      </div>
    </AuthLayout>
  );
};

export default withProtected(Dashboard);
