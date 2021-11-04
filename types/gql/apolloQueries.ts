import gql from "graphql-tag";

export const GET_ALL_MEALS = gql`
    query GetAllMeals {
        meals(where: {test: {_eq: false}}) {
            id
            date
            menu {
                category
                cost
                name
            }
            shared
            who
            isDinner
            incidentals
            test
        }
    }
`;

export const GET_MENU = gql`
    query GetMenu {
        menu {
            category
            cost
            id
            name
            active
        }
    }
`;
export const GET_FILTERED_MEALS = gql`
    query GetFilteredMeals($category: String! ) {
        meals(where: {test: {_eq: false}, menu: {category: {_eq: $category}}}) {
            date
            menu {
                name
            }
            shared
            who
        }
    }
`;

export const GET_FILTERED_MENU = gql`
    query GetFilteredMenu($category: [String!] ) {
        menu(where: {category: {_in: $category}}) {
            active
            cost
            name
            id
            active
        }
    }
`;

export const GET_TESTING_MEALS = gql`
    query GetTestingMeals {
        meals {
            id
            date
            menu {
                category
                cost
                name
            }
            shared
            who
            isDinner
            incidentals
            test
        }
    }
`;