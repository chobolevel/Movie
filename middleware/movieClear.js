export default async function({ store }) {
  await store.dispatch("movie/setMovieListClear");
}
