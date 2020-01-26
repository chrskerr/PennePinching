import gql from 'graphql-tag';

export const GET_ALL_MEALS = gql`
    query GetAllMeals {
        meals(where: {test: {_eq: false}}) {
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
        }
    }
`

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
`
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
`

export const GET_FILTERED_MENU = gql`
    query GetFilteredMenu($category: String! ) {
        menu(where: {category: {_eq: $category}}) {
            active
            cost
            name
            id
        }
    }
`
