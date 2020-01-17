import gql from 'graphql-tag';

export const GET_ALL_MEALS = gql`
    query MyQuery {
        meals {
            date
            meal_category
            menu_cost
            shared
            who
        }
    }
`