import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "meals" */
export type Meals = {
  __typename?: 'meals';
  date?: Maybe<Scalars['String']>;
  date_eaten?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  incidentals: Scalars['numeric'];
  isDinner: Scalars['Boolean'];
  /** An object relationship */
  menu: Menu;
  menu_id: Scalars['uuid'];
  shared: Scalars['Boolean'];
  test: Scalars['Boolean'];
  who: Scalars['String'];
};

/** aggregated selection of "meals" */
export type Meals_Aggregate = {
  __typename?: 'meals_aggregate';
  aggregate?: Maybe<Meals_Aggregate_Fields>;
  nodes: Array<Meals>;
};

/** aggregate fields of "meals" */
export type Meals_Aggregate_Fields = {
  __typename?: 'meals_aggregate_fields';
  avg?: Maybe<Meals_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Meals_Max_Fields>;
  min?: Maybe<Meals_Min_Fields>;
  stddev?: Maybe<Meals_Stddev_Fields>;
  stddev_pop?: Maybe<Meals_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Meals_Stddev_Samp_Fields>;
  sum?: Maybe<Meals_Sum_Fields>;
  var_pop?: Maybe<Meals_Var_Pop_Fields>;
  var_samp?: Maybe<Meals_Var_Samp_Fields>;
  variance?: Maybe<Meals_Variance_Fields>;
};


/** aggregate fields of "meals" */
export type Meals_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Meals_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "meals" */
export type Meals_Aggregate_Order_By = {
  avg?: Maybe<Meals_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Meals_Max_Order_By>;
  min?: Maybe<Meals_Min_Order_By>;
  stddev?: Maybe<Meals_Stddev_Order_By>;
  stddev_pop?: Maybe<Meals_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Meals_Stddev_Samp_Order_By>;
  sum?: Maybe<Meals_Sum_Order_By>;
  var_pop?: Maybe<Meals_Var_Pop_Order_By>;
  var_samp?: Maybe<Meals_Var_Samp_Order_By>;
  variance?: Maybe<Meals_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "meals" */
export type Meals_Arr_Rel_Insert_Input = {
  data: Array<Meals_Insert_Input>;
  on_conflict?: Maybe<Meals_On_Conflict>;
};

/** aggregate avg on columns */
export type Meals_Avg_Fields = {
  __typename?: 'meals_avg_fields';
  incidentals?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "meals" */
export type Meals_Avg_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "meals". All fields are combined with a logical 'AND'. */
export type Meals_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Meals_Bool_Exp>>>;
  _not?: Maybe<Meals_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Meals_Bool_Exp>>>;
  date?: Maybe<String_Comparison_Exp>;
  date_eaten?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  incidentals?: Maybe<Numeric_Comparison_Exp>;
  isDinner?: Maybe<Boolean_Comparison_Exp>;
  menu?: Maybe<Menu_Bool_Exp>;
  menu_id?: Maybe<Uuid_Comparison_Exp>;
  shared?: Maybe<Boolean_Comparison_Exp>;
  test?: Maybe<Boolean_Comparison_Exp>;
  who?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "meals" */
export enum Meals_Constraint {
  /** unique or primary key constraint */
  MealsIdKey = 'meals_id_key',
  /** unique or primary key constraint */
  MealsPkey = 'meals_pkey'
}

/** input type for inserting data into table "meals" */
export type Meals_Insert_Input = {
  date?: Maybe<Scalars['String']>;
  date_eaten?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  incidentals?: Maybe<Scalars['numeric']>;
  isDinner?: Maybe<Scalars['Boolean']>;
  menu?: Maybe<Menu_Obj_Rel_Insert_Input>;
  menu_id?: Maybe<Scalars['uuid']>;
  shared?: Maybe<Scalars['Boolean']>;
  test?: Maybe<Scalars['Boolean']>;
  who?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Meals_Max_Fields = {
  __typename?: 'meals_max_fields';
  date?: Maybe<Scalars['String']>;
  date_eaten?: Maybe<Scalars['timestamptz']>;
  incidentals?: Maybe<Scalars['numeric']>;
  who?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "meals" */
export type Meals_Max_Order_By = {
  date?: Maybe<Order_By>;
  date_eaten?: Maybe<Order_By>;
  incidentals?: Maybe<Order_By>;
  who?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Meals_Min_Fields = {
  __typename?: 'meals_min_fields';
  date?: Maybe<Scalars['String']>;
  date_eaten?: Maybe<Scalars['timestamptz']>;
  incidentals?: Maybe<Scalars['numeric']>;
  who?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "meals" */
export type Meals_Min_Order_By = {
  date?: Maybe<Order_By>;
  date_eaten?: Maybe<Order_By>;
  incidentals?: Maybe<Order_By>;
  who?: Maybe<Order_By>;
};

/** response of any mutation on the table "meals" */
export type Meals_Mutation_Response = {
  __typename?: 'meals_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Meals>;
};

/** input type for inserting object relation for remote table "meals" */
export type Meals_Obj_Rel_Insert_Input = {
  data: Meals_Insert_Input;
  on_conflict?: Maybe<Meals_On_Conflict>;
};

/** on conflict condition type for table "meals" */
export type Meals_On_Conflict = {
  constraint: Meals_Constraint;
  update_columns: Array<Meals_Update_Column>;
  where?: Maybe<Meals_Bool_Exp>;
};

/** ordering options when selecting data from "meals" */
export type Meals_Order_By = {
  date?: Maybe<Order_By>;
  date_eaten?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  incidentals?: Maybe<Order_By>;
  isDinner?: Maybe<Order_By>;
  menu?: Maybe<Menu_Order_By>;
  menu_id?: Maybe<Order_By>;
  shared?: Maybe<Order_By>;
  test?: Maybe<Order_By>;
  who?: Maybe<Order_By>;
};

/** select columns of table "meals" */
export enum Meals_Select_Column {
  /** column name */
  Date = 'date',
  /** column name */
  DateEaten = 'date_eaten',
  /** column name */
  Id = 'id',
  /** column name */
  Incidentals = 'incidentals',
  /** column name */
  IsDinner = 'isDinner',
  /** column name */
  MenuId = 'menu_id',
  /** column name */
  Shared = 'shared',
  /** column name */
  Test = 'test',
  /** column name */
  Who = 'who'
}

/** input type for updating data in table "meals" */
export type Meals_Set_Input = {
  date?: Maybe<Scalars['String']>;
  date_eaten?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  incidentals?: Maybe<Scalars['numeric']>;
  isDinner?: Maybe<Scalars['Boolean']>;
  menu_id?: Maybe<Scalars['uuid']>;
  shared?: Maybe<Scalars['Boolean']>;
  test?: Maybe<Scalars['Boolean']>;
  who?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Meals_Stddev_Fields = {
  __typename?: 'meals_stddev_fields';
  incidentals?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "meals" */
export type Meals_Stddev_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Meals_Stddev_Pop_Fields = {
  __typename?: 'meals_stddev_pop_fields';
  incidentals?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "meals" */
export type Meals_Stddev_Pop_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Meals_Stddev_Samp_Fields = {
  __typename?: 'meals_stddev_samp_fields';
  incidentals?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "meals" */
export type Meals_Stddev_Samp_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Meals_Sum_Fields = {
  __typename?: 'meals_sum_fields';
  incidentals?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "meals" */
export type Meals_Sum_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** update columns of table "meals" */
export enum Meals_Update_Column {
  /** column name */
  Date = 'date',
  /** column name */
  DateEaten = 'date_eaten',
  /** column name */
  Id = 'id',
  /** column name */
  Incidentals = 'incidentals',
  /** column name */
  IsDinner = 'isDinner',
  /** column name */
  MenuId = 'menu_id',
  /** column name */
  Shared = 'shared',
  /** column name */
  Test = 'test',
  /** column name */
  Who = 'who'
}

/** aggregate var_pop on columns */
export type Meals_Var_Pop_Fields = {
  __typename?: 'meals_var_pop_fields';
  incidentals?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "meals" */
export type Meals_Var_Pop_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Meals_Var_Samp_Fields = {
  __typename?: 'meals_var_samp_fields';
  incidentals?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "meals" */
export type Meals_Var_Samp_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Meals_Variance_Fields = {
  __typename?: 'meals_variance_fields';
  incidentals?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "meals" */
export type Meals_Variance_Order_By = {
  incidentals?: Maybe<Order_By>;
};

/** columns and relationships of "menu" */
export type Menu = {
  __typename?: 'menu';
  active: Scalars['Boolean'];
  category: Scalars['String'];
  cost: Scalars['numeric'];
  id: Scalars['uuid'];
  name: Scalars['String'];
};

/** aggregated selection of "menu" */
export type Menu_Aggregate = {
  __typename?: 'menu_aggregate';
  aggregate?: Maybe<Menu_Aggregate_Fields>;
  nodes: Array<Menu>;
};

/** aggregate fields of "menu" */
export type Menu_Aggregate_Fields = {
  __typename?: 'menu_aggregate_fields';
  avg?: Maybe<Menu_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Menu_Max_Fields>;
  min?: Maybe<Menu_Min_Fields>;
  stddev?: Maybe<Menu_Stddev_Fields>;
  stddev_pop?: Maybe<Menu_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Menu_Stddev_Samp_Fields>;
  sum?: Maybe<Menu_Sum_Fields>;
  var_pop?: Maybe<Menu_Var_Pop_Fields>;
  var_samp?: Maybe<Menu_Var_Samp_Fields>;
  variance?: Maybe<Menu_Variance_Fields>;
};


/** aggregate fields of "menu" */
export type Menu_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Menu_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "menu" */
export type Menu_Aggregate_Order_By = {
  avg?: Maybe<Menu_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Menu_Max_Order_By>;
  min?: Maybe<Menu_Min_Order_By>;
  stddev?: Maybe<Menu_Stddev_Order_By>;
  stddev_pop?: Maybe<Menu_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Menu_Stddev_Samp_Order_By>;
  sum?: Maybe<Menu_Sum_Order_By>;
  var_pop?: Maybe<Menu_Var_Pop_Order_By>;
  var_samp?: Maybe<Menu_Var_Samp_Order_By>;
  variance?: Maybe<Menu_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "menu" */
export type Menu_Arr_Rel_Insert_Input = {
  data: Array<Menu_Insert_Input>;
  on_conflict?: Maybe<Menu_On_Conflict>;
};

/** aggregate avg on columns */
export type Menu_Avg_Fields = {
  __typename?: 'menu_avg_fields';
  cost?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "menu" */
export type Menu_Avg_Order_By = {
  cost?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "menu". All fields are combined with a logical 'AND'. */
export type Menu_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Menu_Bool_Exp>>>;
  _not?: Maybe<Menu_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Menu_Bool_Exp>>>;
  active?: Maybe<Boolean_Comparison_Exp>;
  category?: Maybe<String_Comparison_Exp>;
  cost?: Maybe<Numeric_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "menu" */
export enum Menu_Constraint {
  /** unique or primary key constraint */
  MenuPkey = 'menu_pkey'
}

/** input type for inserting data into table "menu" */
export type Menu_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Menu_Max_Fields = {
  __typename?: 'menu_max_fields';
  category?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "menu" */
export type Menu_Max_Order_By = {
  category?: Maybe<Order_By>;
  cost?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Menu_Min_Fields = {
  __typename?: 'menu_min_fields';
  category?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "menu" */
export type Menu_Min_Order_By = {
  category?: Maybe<Order_By>;
  cost?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "menu" */
export type Menu_Mutation_Response = {
  __typename?: 'menu_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Menu>;
};

/** input type for inserting object relation for remote table "menu" */
export type Menu_Obj_Rel_Insert_Input = {
  data: Menu_Insert_Input;
  on_conflict?: Maybe<Menu_On_Conflict>;
};

/** on conflict condition type for table "menu" */
export type Menu_On_Conflict = {
  constraint: Menu_Constraint;
  update_columns: Array<Menu_Update_Column>;
  where?: Maybe<Menu_Bool_Exp>;
};

/** ordering options when selecting data from "menu" */
export type Menu_Order_By = {
  active?: Maybe<Order_By>;
  category?: Maybe<Order_By>;
  cost?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "menu" */
export enum Menu_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Category = 'category',
  /** column name */
  Cost = 'cost',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "menu" */
export type Menu_Set_Input = {
  active?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['String']>;
  cost?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Menu_Stddev_Fields = {
  __typename?: 'menu_stddev_fields';
  cost?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "menu" */
export type Menu_Stddev_Order_By = {
  cost?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Menu_Stddev_Pop_Fields = {
  __typename?: 'menu_stddev_pop_fields';
  cost?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "menu" */
export type Menu_Stddev_Pop_Order_By = {
  cost?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Menu_Stddev_Samp_Fields = {
  __typename?: 'menu_stddev_samp_fields';
  cost?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "menu" */
export type Menu_Stddev_Samp_Order_By = {
  cost?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Menu_Sum_Fields = {
  __typename?: 'menu_sum_fields';
  cost?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "menu" */
export type Menu_Sum_Order_By = {
  cost?: Maybe<Order_By>;
};

/** update columns of table "menu" */
export enum Menu_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Category = 'category',
  /** column name */
  Cost = 'cost',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Menu_Var_Pop_Fields = {
  __typename?: 'menu_var_pop_fields';
  cost?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "menu" */
export type Menu_Var_Pop_Order_By = {
  cost?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Menu_Var_Samp_Fields = {
  __typename?: 'menu_var_samp_fields';
  cost?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "menu" */
export type Menu_Var_Samp_Order_By = {
  cost?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Menu_Variance_Fields = {
  __typename?: 'menu_variance_fields';
  cost?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "menu" */
export type Menu_Variance_Order_By = {
  cost?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "meals" */
  delete_meals?: Maybe<Meals_Mutation_Response>;
  /** delete data from the table: "menu" */
  delete_menu?: Maybe<Menu_Mutation_Response>;
  /** insert data into the table: "meals" */
  insert_meals?: Maybe<Meals_Mutation_Response>;
  /** insert data into the table: "menu" */
  insert_menu?: Maybe<Menu_Mutation_Response>;
  /** update data of the table: "meals" */
  update_meals?: Maybe<Meals_Mutation_Response>;
  /** update data of the table: "menu" */
  update_menu?: Maybe<Menu_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootDelete_MealsArgs = {
  where: Meals_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_MenuArgs = {
  where: Menu_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_MealsArgs = {
  objects: Array<Meals_Insert_Input>;
  on_conflict?: Maybe<Meals_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_MenuArgs = {
  objects: Array<Menu_Insert_Input>;
  on_conflict?: Maybe<Menu_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_MealsArgs = {
  _set?: Maybe<Meals_Set_Input>;
  where: Meals_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_MenuArgs = {
  _set?: Maybe<Menu_Set_Input>;
  where: Menu_Bool_Exp;
};

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "meals" */
  meals: Array<Meals>;
  /** fetch aggregated fields from the table: "meals" */
  meals_aggregate: Meals_Aggregate;
  /** fetch data from the table: "meals" using primary key columns */
  meals_by_pk?: Maybe<Meals>;
  /** fetch data from the table: "menu" */
  menu: Array<Menu>;
  /** fetch aggregated fields from the table: "menu" */
  menu_aggregate: Menu_Aggregate;
  /** fetch data from the table: "menu" using primary key columns */
  menu_by_pk?: Maybe<Menu>;
};


/** query root */
export type Query_RootMealsArgs = {
  distinct_on?: Maybe<Array<Meals_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Meals_Order_By>>;
  where?: Maybe<Meals_Bool_Exp>;
};


/** query root */
export type Query_RootMeals_AggregateArgs = {
  distinct_on?: Maybe<Array<Meals_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Meals_Order_By>>;
  where?: Maybe<Meals_Bool_Exp>;
};


/** query root */
export type Query_RootMeals_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootMenuArgs = {
  distinct_on?: Maybe<Array<Menu_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Menu_Order_By>>;
  where?: Maybe<Menu_Bool_Exp>;
};


/** query root */
export type Query_RootMenu_AggregateArgs = {
  distinct_on?: Maybe<Array<Menu_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Menu_Order_By>>;
  where?: Maybe<Menu_Bool_Exp>;
};


/** query root */
export type Query_RootMenu_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "meals" */
  meals: Array<Meals>;
  /** fetch aggregated fields from the table: "meals" */
  meals_aggregate: Meals_Aggregate;
  /** fetch data from the table: "meals" using primary key columns */
  meals_by_pk?: Maybe<Meals>;
  /** fetch data from the table: "menu" */
  menu: Array<Menu>;
  /** fetch aggregated fields from the table: "menu" */
  menu_aggregate: Menu_Aggregate;
  /** fetch data from the table: "menu" using primary key columns */
  menu_by_pk?: Maybe<Menu>;
};


/** subscription root */
export type Subscription_RootMealsArgs = {
  distinct_on?: Maybe<Array<Meals_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Meals_Order_By>>;
  where?: Maybe<Meals_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMeals_AggregateArgs = {
  distinct_on?: Maybe<Array<Meals_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Meals_Order_By>>;
  where?: Maybe<Meals_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMeals_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMenuArgs = {
  distinct_on?: Maybe<Array<Menu_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Menu_Order_By>>;
  where?: Maybe<Menu_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMenu_AggregateArgs = {
  distinct_on?: Maybe<Array<Menu_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Menu_Order_By>>;
  where?: Maybe<Menu_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMenu_By_PkArgs = {
  id: Scalars['uuid'];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type InsertMealsMutationVariables = Exact<{
  data: Array<Meals_Insert_Input> | Meals_Insert_Input;
}>;


export type InsertMealsMutation = { __typename?: 'mutation_root', insert_meals?: { __typename?: 'meals_mutation_response', returning: Array<{ __typename?: 'meals', id: any }> } | null | undefined };

export type UpdateMealsMutationVariables = Exact<{
  id: Scalars['uuid'];
  data: Meals_Set_Input;
}>;


export type UpdateMealsMutation = { __typename?: 'mutation_root', update_meals?: { __typename?: 'meals_mutation_response', returning: Array<{ __typename?: 'meals', id: any }> } | null | undefined };

export type InsertMenuItemMutationVariables = Exact<{
  data: Array<Menu_Insert_Input> | Menu_Insert_Input;
}>;


export type InsertMenuItemMutation = { __typename?: 'mutation_root', insert_menu?: { __typename?: 'menu_mutation_response', returning: Array<{ __typename?: 'menu', id: any }> } | null | undefined };

export type DeleteMealMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteMealMutation = { __typename?: 'mutation_root', delete_meals?: { __typename?: 'meals_mutation_response', returning: Array<{ __typename?: 'meals', id: any }> } | null | undefined };

export type GetAllMealsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMealsQuery = { __typename?: 'query_root', meals: Array<{ __typename?: 'meals', id: any, date?: string | null | undefined, shared: boolean, who: string, isDinner: boolean, incidentals: any, test: boolean, menu: { __typename?: 'menu', category: string, cost: any, name: string } }> };

export type GetMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuQuery = { __typename?: 'query_root', menu: Array<{ __typename?: 'menu', category: string, cost: any, id: any, name: string, active: boolean }> };

export type GetFilteredMealsQueryVariables = Exact<{
  category: Scalars['String'];
}>;


export type GetFilteredMealsQuery = { __typename?: 'query_root', meals: Array<{ __typename?: 'meals', date?: string | null | undefined, shared: boolean, who: string, menu: { __typename?: 'menu', name: string } }> };

export type GetFilteredMenuQueryVariables = Exact<{
  category?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetFilteredMenuQuery = { __typename?: 'query_root', menu: Array<{ __typename?: 'menu', active: boolean, cost: any, name: string, id: any }> };

export type GetTestingMealsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTestingMealsQuery = { __typename?: 'query_root', meals: Array<{ __typename?: 'meals', id: any, date?: string | null | undefined, shared: boolean, who: string, isDinner: boolean, incidentals: any, test: boolean, menu: { __typename?: 'menu', category: string, cost: any, name: string } }> };


export const InsertMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertMeals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"meals_insert_input"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_meals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertMealsMutation, InsertMealsMutationVariables>;
export const UpdateMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMeals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"meals_set_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_meals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"StringValue","value":"","block":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMealsMutation, UpdateMealsMutationVariables>;
export const InsertMenuItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertMenuItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"menu_insert_input"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_menu"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<InsertMenuItemMutation, InsertMenuItemMutationVariables>;
export const DeleteMealDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMeal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_meals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteMealMutation, DeleteMealMutationVariables>;
export const GetAllMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllMeals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"test"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"menu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shared"}},{"kind":"Field","name":{"kind":"Name","value":"who"}},{"kind":"Field","name":{"kind":"Name","value":"isDinner"}},{"kind":"Field","name":{"kind":"Name","value":"incidentals"}},{"kind":"Field","name":{"kind":"Name","value":"test"}}]}}]}}]} as unknown as DocumentNode<GetAllMealsQuery, GetAllMealsQueryVariables>;
export const GetMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<GetMenuQuery, GetMenuQueryVariables>;
export const GetFilteredMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilteredMeals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"test"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"BooleanValue","value":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"menu"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"menu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shared"}},{"kind":"Field","name":{"kind":"Name","value":"who"}}]}}]}}]} as unknown as DocumentNode<GetFilteredMealsQuery, GetFilteredMealsQueryVariables>;
export const GetFilteredMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilteredMenu"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"menu"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]}}]} as unknown as DocumentNode<GetFilteredMenuQuery, GetFilteredMenuQueryVariables>;
export const GetTestingMealsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTestingMeals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"menu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shared"}},{"kind":"Field","name":{"kind":"Name","value":"who"}},{"kind":"Field","name":{"kind":"Name","value":"isDinner"}},{"kind":"Field","name":{"kind":"Name","value":"incidentals"}},{"kind":"Field","name":{"kind":"Name","value":"test"}}]}}]}}]} as unknown as DocumentNode<GetTestingMealsQuery, GetTestingMealsQueryVariables>;