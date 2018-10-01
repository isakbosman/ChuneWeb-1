import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  featured: [],
  contentFeedHome: [],
  artistTracksForYou: [],
  contentFeedForYou: [],
  pagesHome: 0,
  pagesForYou: 0,
  topTracks: [],
  topChune: [],
  url: '',
  title: '',
  modal: false,
  followArtists: false
};

const successGetContentHomePageUser = (state, { featured, contentFeedHome }) => ({
  ...state,
  featured,
  contentFeedHome,
  pagesHome: 0
});
const successGetContentForYouPageUser = (state, { artistTracksForYou, contentFeedForYou }) => ({
  ...state,
  artistTracksForYou,
  contentFeedForYou,
  pagesForYou: 0
});
const fethcMoreContentHomePageUser = state => ({ ...state });
const fethcMoreContentForYouPageUser = state => ({ ...state });
const successfethcMoreContentHome = (state, { featured, contentFeedHome }) => {
  const content = state.contentFeedHome.concat(contentFeedHome);
  let pages = state.pagesHome + 1;
  if (contentFeedHome.length === 0) pages = 0;
  return ({
    ...state,
    featured,
    contentFeedHome: content,
    pagesHome: pages
  });
};
const successfethcMoreContentForYou = (state, { artistTracksForYou, contentFeedForYou }) => {
  const content = state.contentFeedForYou.concat(contentFeedForYou);
  let pages = state.pagesHome + 1;
  if (contentFeedForYou.length === 0) pages = 0;
  return ({
    ...state,
    artistTracksForYou,
    contentFeedForYou: content,
    pagesForYou: pages
  });
};
const successGetTopTracks = (state, { topTracks }) => ({ ...state, topTracks });
const successGetChuneSupply = (state, { topChune }) => ({ ...state, topChune });
const openArticleUrl = (state, { url, title, modal }) => ({
  ...state,
  url,
  title,
  modal
});
const closeArticleUrl = (state, { modal }) => ({
  ...state,
  url: '',
  title: '',
  modal
});
const noFollowArtists = (state, { followArtists }) => ({ ...state, followArtists });

const handlers = {
  [TYPES.SUCCESS_GET_CONTENT_HOME_PAGE_USER]: successGetContentHomePageUser,
  [TYPES.SUCCESS_GET_CONTENT_FORYOU_PAGE_USER]: successGetContentForYouPageUser,
  [TYPES.FETCH_MORE_CONTENT_HOME_PAGE_USER]: fethcMoreContentHomePageUser,
  [TYPES.FETCH_MORE_CONTENT_FORYOU_PAGE_USER]: fethcMoreContentForYouPageUser,
  [TYPES.SUCCESS_FETCH_CONTENT_HOME]: successfethcMoreContentHome,
  [TYPES.SUCCESS_FETCH_CONTENT_FORYOU]: successfethcMoreContentForYou,
  [TYPES.SUCCESS_GET_TOP_TRACKS]: successGetTopTracks,
  [TYPES.SUCCESS_GET_CHUNE_SUPPLY]: successGetChuneSupply,
  [TYPES.OPEN_ARTICLE_URL]: openArticleUrl,
  [TYPES.CLOSE_ARTICLE_URL]: closeArticleUrl,
  [TYPES.NO_FOLLOW_ARTISTS]: noFollowArtists
};

export const reducerContent = createReducer(initState, handlers);