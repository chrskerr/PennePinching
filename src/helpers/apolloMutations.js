import gql from 'graphql-tag';

export const INSERT_MEALS = gql`
    mutation InsertMeals($data: [ meals_insert_input! ]! ) {
        insert_meals(objects: $data ) {
            returning{
                id
            }
        }
    }
`