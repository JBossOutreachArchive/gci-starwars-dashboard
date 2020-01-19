import { gql } from "apollo-boost";

export const TableModel = {
    columnHeader : [
      "Name",
      "Cost in Credits",
      "Cargo Capacity",
      "Consumables",
      "Crew",
      "Max Atmosphering Speed",
    ],
    columnIdentifier : [
      "name",
      "costInCredits",
      "cargoCapacity",
      "consumables",
      "crew",
      "maxAtmospheringSpeed"
    ]
  }

export const Q = gql`
 query AllVehicles($first: Int, $skip: Int) {
    allVehicles(first: $first, skip: $skip) {
      id
      name
      consumables
      costInCredits
      manufacturer
      cargoCapacity
      crew
      maxAtmospheringSpeed
    }
  }
`;

export const DataName = "allVehicles"
export default Q;