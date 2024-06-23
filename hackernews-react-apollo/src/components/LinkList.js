import React from 'react';
import Link from './Link';

import { useQuery, gql } from '@apollo/client';
//useQuery
/*
This hook returns three items that are relevant for our purposes at this point:

loading: Is true as long as the request is still ongoing and the response hasn’t been received.
error: In case the request fails, this field will contain information about what exactly went wrong.
data: This is the actual data that was received from the server. It has the links property which represents a list of Link elements.
*/
export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const LinkList = () => {
  const {
    data,
    loading,
    error,
    subscribeToMore
  } = useQuery(FEED_QUERY, {
    onCompleted: ({ feed }) => {
      console.log(data)
    }
  });
  //useQuery是刷新浏览器时触发，而useLazyQuery是必须通过按钮或者其他方式手动触发


  //实现订阅功能
  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,//这是一个 GraphQL 文档，我们在其中定义订阅
    // 该字段可用于更新缓存，就像我们在突变中所做的那样
    // 两个参数，一个是先前的数据，另一个是结构出来的 订阅数据(新更新的数据)
    updateQuery: (prev, now) => {
      console.log("测试订阅功能")
      console.log(now)
      console.log("测试订阅功能")
      const { subscriptionData } = now
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(
        ({ id }) => id === newLink.id
      );
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename
        }
      });
    }
  });

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link, index) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
};
export default LinkList;