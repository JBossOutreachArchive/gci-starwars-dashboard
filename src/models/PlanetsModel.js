import { gql } from "apollo-boost";

export const TableModel = {
    columnHeader : [
      "Name",
      "Climate",
      "Diameter",
      "Gravity",
      "Population",
      "Orbital Period",
    ],
    columnIdentifier : [
      "name",
      "climate",
      "diameter",
      "gravity",
      "population",
      "orbitalPeriod"
    ]
  }

export const Q = gql`
 query AllPlanets($first: Int, $skip: Int) {
    allPlanets(first: $first, skip: $skip) {
      id
      name
      climate
      diameter
      gravity
      population
      orbitalPeriod
    }
  }
`;

export const DataName = "allPlanets"
export default Q;