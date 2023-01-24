import React from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import Species from "./Species";

const initialUrl = "http://swapi.dev/api/species";
// fetch : 리소스 비동기요청. 주로 API를 호출하고 응답 데이터를 받아오는 역할
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const InfiniteSpecies = () => {
  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    fetchNextPage, //더많은 데이터가 필요할때 어떤함수를 실행할지 InfiniteScroll에 지시하는 역할
    hasNextPage, //수집할 데이터가 더 있는지 결정하는 불리언
  } = useInfiniteQuery(
    "sw-species", // 쿼리키
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    //쿼리함수는 객체 매개변수를 받고 프로퍼티중 하나로 pageParam을 갖고있다
    //pageParam은 fetchNextPage가 어떻게 보일지 결정하고, 다음 페이지가 있는지 결정(기본값인 initialUrl을 할당한다)
    //fetchUrl은 Url인 pageParam을 가져와서 json을 반환
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
    //getNextPageParam은 옵션으로 lastPage를 갖는다. 필요시 두번째 인자로 allPage도 넣을수있다
    //pageParam을 lastPage.next(json db안에 있는 객체)로 설정
    //fetchNextPage를 실행하면 next프로퍼티가 무엇인지에 따라 마지막 페이지에 도착한 다음 pageParam을 사용하게 된다
    // pageParam값은 데이터가 추가되면 갱신된다 (getNextPageParam)

    // hasNextPage는 위 함수의 undefined 반환여부에 따라 달라진다
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;
  // 캐시된 데이터가 없어서 새 데이터를 가져올때는 데이터가 정의되지않았으므로 undefined
  // 따라서 isLoading이나 isError로 조기반환 실행

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {/* useInfiniteQuery에서 반환된 데이터는 useQuery(쿼리함수의 결과를 그대로 출력)와 맵핑된 모습이 다르다 */}
        {data.pages.map((pageData) => {
          return pageData.results.map((species) => {
            return (
              <Species
                key={species.name}
                name={species.name}
                skinColor={species.skin_colors}
                language={species.language}
              />
            );
          });
        })}
      </InfiniteScroll>
    </>
  );
};

export default InfiniteSpecies;
