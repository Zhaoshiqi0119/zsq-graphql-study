import React, { useState } from 'react';

import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FEED_QUERY } from './LinkList';//引入用来查询缓存的graphql语句
const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!,$url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;


const CreateLink = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    description: '',
    url: ''
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    //这个variables是用来传递参数的，CREATE_LINK_MUTATION里定义了需要两个参数，因此这里就要传递两个参数，参数的类型一定要正确，否则会报错400
    variables: {
      description: formState.description,
      url: formState.url
    },
    //update用来手动缓存数据，用来即使更新数据
    update: (cache, { data: { post } }) => {
      //根据graphql语句，从缓存中找到我们想要的缓存数据
      const data = cache.readQuery({
        query: FEED_QUERY,
      });
      //在readQuery得到对应的缓存数据后，如果逻辑复杂的话，可以单独写一段代码，来修改缓存数据
      //下面updatedLinks是投票功能中的函数，由于添加链接功能比较简单，因此不需要单独写函数     
      /*
          const updatedLinks = feed.links.map((feedLink) => {
            if (feedLink.id === link.id) {
              return {
                ...feedLink,
                votes: [...feedLink.votes, vote]
              };
            }
            return feedLink;
          });
      */
      //将修改好的缓存数据重新写入缓存，实现手动缓存
      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links]
          }
        },
      });
    },
    
    onCompleted: () => navigate('/')
    
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
        e.preventDefault();
        createLink();
      }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;