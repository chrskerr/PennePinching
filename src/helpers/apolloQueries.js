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
