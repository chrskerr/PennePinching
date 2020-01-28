import gql from "graphql-tag";

export const INSERT_MEALS = gql`
    mutation InsertMeals($data: [meals_insert_input!]!) {
        insert_meals(objects: $data) {
            returning {
                id
            }
        }
    }
`;

export const UPDATE_MEALS = gql`
    mutation UpdateMeals($id: UUID!, $data: [meals_update_input!]!) {
        update_meals(where: { id: { _eq: "" } }, _set: $data) {
            returning {
                id
            }
        }
    }
`;

export const INSERT_MENU_ITEM = gql`
    mutation InsertMenuItem($data: [menu_insert_input!]!) {
        insert_menu(objects: $data) {
            returning {
                id
            }
        }
    }
`;
