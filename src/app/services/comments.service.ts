import { Injectable } from '@angular/core';
import { ListCommentsbyClassVideoQuery, ModelCommentsFilterInput, ModelSortDirection, ModelStringKeyConditionInput } from '../API.service';
import { API, graphqlOperation } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  async ListCommentsbyClassVideo(
    classVideoID: string,
    createdAt?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelCommentsFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCommentsbyClassVideoQuery> {
    const statement = `query ListCommentsbyClassVideo($classVideoID: ID!, $createdAt: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelCommentsFilterInput, $limit: Int, $nextToken: String) {
        ListCommentsbyClassVideo(
          classVideoID: $classVideoID
          createdAt: $createdAt
          sortDirection: $sortDirection
          filter: $filter
          limit: $limit
          nextToken: $nextToken
        ) {
          __typename
          items {
            __typename
            id
            menssages
            classVideoID
            userDataID
            userData {
              __typename
              id
              userID
              user {
                __typename
                id
                name
              }
              updatedAt
              createdAt
            }
            updatedAt
            createdAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      classVideoID
    };
    if (createdAt) {
      gqlAPIServiceArguments.createdAt = createdAt;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCommentsbyClassVideoQuery>(
      response.data.ListCommentsbyClassVideo
    );
  }
}
