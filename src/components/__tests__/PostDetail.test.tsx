import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getPost } from '../../constants/queries';
import PostDetail from '../PostDetail';

const mocks = [
  {
    request: {
      query: getPost,
      variables: { id: '1' },
    },
    result: {
      data: {
        post: {
          title: 'Test Post',
          description: 'This is a test post',
          fields: [
            {
              key: 'COVER_IMAGE',
              relationEntities: {
                medias: [
                  {
                    urls: {
                      full: 'https://example.com/image.jpg',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
];

describe('PostDetail', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMock = [
      {
        request: {
          query: getPost,
          variables: { id: '1' },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/An error occurred/)).toBeInTheDocument();
  });

  it('renders post data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(await screen.findByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post')).toBeInTheDocument();
  });

  it('renders no post message when no data', async () => {
    const noDataMock = [
      {
        request: {
          query: getPost,
          variables: { id: '1' },
        },
        result: {
          data: {
            post: null,
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={noDataMock} addTypename={false}>
        <MemoryRouter initialEntries={['/post/1']}>
          <Routes>
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(await screen.findByText(/No posts available/)).toBeInTheDocument();
  });
});
