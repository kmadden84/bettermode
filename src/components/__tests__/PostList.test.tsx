import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { PostList } from '../PostList';
import { addReaction, getPosts } from '../../constants/queries';

const mockPosts = [
  {
    id: '1',
    title: 'Post 1',
    description: 'Description 1',
    reactions: [],
    image: 'image1.jpg',
  },
  {
    id: '2',
    title: 'Post 2',
    description: 'Description 2',
    reactions: [],
    image: 'image2.jpg',
  },
];

describe('PostList', () => {
  it('renders posts correctly', () => {
    render(
      <BrowserRouter>
        <MockedProvider>
          <PostList
            posts={mockPosts}
            totalPages={1}
            currentPage={1}
            loadPage={() => {}}
          />
        </MockedProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('renders "Read more" links', () => {
    render(
      <BrowserRouter>
        <MockedProvider>
          <PostList
            posts={mockPosts}
            totalPages={1}
            currentPage={1}
            loadPage={() => {}}
          />
        </MockedProvider>
      </BrowserRouter>,
    );

    const readMoreLinks = screen.getAllByText('Read more');
    expect(readMoreLinks).toHaveLength(2);
    expect(readMoreLinks[0]).toHaveAttribute('href', '/post/1');
  });

  it('renders pagination correctly', () => {
    const loadPage = jest.fn();
    render(
      <BrowserRouter>
        <MockedProvider>
          <PostList
            posts={mockPosts}
            totalPages={3}
            currentPage={2}
            loadPage={loadPage}
          />
        </MockedProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('3'));
    expect(loadPage).toHaveBeenCalledWith(3);
  });

  it('handles reactions correctly', async () => {
    const mocks = [
      {
        request: {
          query: addReaction,
          variables: { input: { reaction: '+1' }, postId: '1' },
        },
        result: { data: { success: true } },
      },
      {
        request: {
          query: getPosts,
        },
        result: { data: { posts: mockPosts } },
      },
    ];

    render(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <PostList
            posts={mockPosts}
            totalPages={1}
            currentPage={1}
            loadPage={() => {}}
          />
        </MockedProvider>
      </BrowserRouter>,
    );

    const reactionButton = screen.getByTestId('reaction-button-1');
    fireEvent.click(reactionButton);

    await new Promise((resolve) => setTimeout(resolve, 0));
  });
});
