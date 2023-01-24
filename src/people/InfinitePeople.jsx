import React from "react";
import { useInfiniteQuery } from "react-query";
import Person from "./Person";
import InfiniteScroll from "react-infinite-scroller";

const initialUrl = "http://swapi.dev/api/people";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};
const InfinitePeople = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error! {error.toString()}</div>;

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
  //  추가로 데이터가 필요할때는 fetchNextPage를 불러오게한다
  //  추가데이터가 있는지 확인 => hasMore(hasNextPage)
};

export default InfinitePeople;
