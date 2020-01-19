import React from "react";

import { useParams } from "react-router";

import {TableModel, Q, DataName} from "../models/PlanetsModel"
import QueryNavigator from "../components/QueryNavigator"

const Planets = () => {
  let { page } = useParams();
  if(page===null) page = 1;
  
  return (
    <QueryNavigator tableModel={TableModel} page={page} query={Q} dataName={DataName}  />
  );
};

export default Planets;
