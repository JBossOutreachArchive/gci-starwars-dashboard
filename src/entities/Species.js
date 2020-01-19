import React from "react";

import { useParams } from "react-router";

import {TableModel, Q, DataName} from "../models/SpeciesModel"
import QueryNavigator from "../components/QueryNavigator"

const Species = () => {
  let { page } = useParams();
  if(page===null) page = 1;
  
  return (
    <QueryNavigator tableModel={TableModel} page={page} query={Q} dataName={DataName}  />
  );
};

export default Species;
