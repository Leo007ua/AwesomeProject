export const selectAllPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;

export const selectPosts = (state, id) => {
  let post = state.posts.posts.find((item) => item.id === id);
  post ? post = Object.values(post) : post = []
  return post;
};

export const selectCommentatorsPhoto = (state, id) => {
  const avatar = state.posts.commentatorsPhoto.find(
    (avatar) => avatar.uid === id
  );
  return avatar ? avatar.url : null;
};
