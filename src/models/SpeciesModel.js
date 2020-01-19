import { gql } from "apollo-boost";

export const TableModel = {
    columnHeader : [
        "Name",
        "Average Height",
        "Average Lifespan",
        "Classification",
        "Designation"
    ],
    columnIdentifier : [
        "name",
        "averageHeight",
        "averageLifespan",
        "classification",
        "designation"
    ]
  }

export const Q = gql`
 query AllSpecies($first: Int, $skip: Int) {
    allSpecies(first: $first, skip: $skip) {
      id
      name
      averageHeight
      averageLifespan
      classification
      designation
    }
  }
`;

export const DataName = "allSpecies"
export default Q;