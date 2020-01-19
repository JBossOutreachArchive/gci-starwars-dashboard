import { gql } from "apollo-boost";

export const TableModel = {
    columnHeader : [
        "Name",
        "Cost in Credits",
        "Cargo Capacity",
        "Consumables",
        "Crew",
        "Hyperdrive Rating",
        "Manufacturer"
    ],
    columnIdentifier : [
        "name",
        "costInCredits",
        "cargoCapacity",
        "consumables",
        "crew",
        "hyperdriveRating",
        "manufacturer"
    ]
  }

export const Q = gql`
query AllStarships($first: Int, $skip: Int) {
    allStarships(first: $first, skip: $skip) {
      id
      name
      consumables
      costInCredits
      manufacturer
      cargoCapacity
      crew
      hyperdriveRating
    }
  }
`;

export const DataName = "allSpecies"
export default Q;