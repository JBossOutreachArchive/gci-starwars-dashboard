import { gql } from "apollo-boost";

export const TableModel = {
    columnHeader : [
      "Name",
      "Birth Year",
      "Gender",
      "Height",
    ],
    columnIdentifier : [
      "name",
      "birthYear",
      "gender",
      "height"
    ]
  }

export const Q = gql`
  query AllPersons($first: Int, $skip: Int) {
    allPersons(first: $first, skip: $skip) {
      id
      name
      birthYear
      gender
      height
    }
}
`;

export const DataName = "allPersons"

export default Q;