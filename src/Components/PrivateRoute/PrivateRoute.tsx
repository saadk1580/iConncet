import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useStateObserver } from "../../hooks/useStateOberser";
import { Spinner } from "../Icons/Spinner";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { userDetails, loading } = useStateObserver();

  if(loading) return <Spinner width={50} color="#ffffff"/>

  if (!userDetails) {
    return <Navigate to="/login" />;
  }

  return children;
};
