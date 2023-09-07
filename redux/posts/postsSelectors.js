export const selectAllPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;

export const selectComments = (state, id) => {
  const post = state.posts.posts.find((item) => item.id === id);
  return post ? post.comments : [];
};

export const selectCommentatorsPhoto = (state, id) => {
  const avatar = state.posts.commentatorsPhoto.find(
    (avatar) => avatar.uid === id
  );
  return avatar ? avatar.url : null;
};
