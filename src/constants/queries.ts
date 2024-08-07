import { gql, DocumentNode } from '@apollo/client';
import fieldKeys from './fieldKeys';

export type FieldKeys = {
  SPACE_ID: string;
  COVER_IMAGE: string;
};

export const getPosts: DocumentNode = gql`
  query GetPosts($limit: Int!, $cursor: String) {
    posts(
      limit: $limit,
      after: $cursor,
      spaceIds: ["${fieldKeys.SPACE_ID}"]
    ) {
      nodes {
        title
        description
        id
         reactions {
          	count
          	reaction
        }
      }
        totalCount
    }
  }
`;

export const getPost = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      description
      fields {
        key
        value
        relationEntities {
          __typename
          medias {
            __typename
            ... on Image {
              urls {
                full
                large
                medium
                small
                thumb
              }
            }
          }
        }
      }
    }
  }
`;

export const getBearerToken = gql`
  query {
    getTokens(networkDomain: "podders-uccbycyx.bettermode.io") {
      accessToken
      role {
        name
        scopes
      }
      member {
        id
        name
      }
    }
  }
`;

export const addReaction = gql`
  mutation addReaction($input: AddReactionInput!, $postId: ID!) {
    addReaction(input: $input, postId: $postId) {
      status
    }
  }
`;

export const removeReaction = gql`
  mutation removeReaction($reaction: String!, $postId: ID!) {
    removeReaction(reaction: $reaction, postId: $postId) {
      status
    }
  }
`;
