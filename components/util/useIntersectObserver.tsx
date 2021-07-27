import { useEffect, useState } from "react";

type Info = {
  target: any;
  observer: IntersectionObserver | null;
};

/* parameter 
1. callback함수 
2. root가 될 className 
*/
const useIntersectObserver = (
  callback = () => {},
  containerClassName = "viewport"
) => {
  const eventKeyName = "event";
  const observerClassName = "observer-end-line";
  const [info, setInfo] = useState<Info>({
    target: null,
    observer: null,
  });
  // const containerClassName = "container";
  const scrollEvent = () => {
    callback();
    console.log("이벤트 발생");
  };
  const stopObserver = () => {
    info.observer?.unobserve(info.target); //observer 이벤트 종료
  };

  const startObserver = () => {
    info.observer?.observe(info.target); //observer 이벤트 재개
  };
  useEffect(() => {
    const targetEle = document.querySelector(`.${observerClassName}`);
    if (targetEle == null) return;
    targetEle.addEventListener(eventKeyName, scrollEvent);
    return () => {
      targetEle.removeEventListener(eventKeyName, scrollEvent);
    };
  }, []);

  useEffect(() => {
    const target = document.querySelector(`.${observerClassName}`);
    info.target = target;

    function handleIntersection(
      entries: IntersectionObserverEntry[],
      io: IntersectionObserver
    ) {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          entry.target.dispatchEvent(new CustomEvent(eventKeyName));
        } else {
        }
      });
    }
    const options = {
      root: document.querySelector(`.${containerClassName}`),
      rootMargin: "100px", // rootMargin을 '10px 10px 10px 10px'로 설정
      threshold: 0, // 타겟 엘리먼트가 교차영역에 진입했을 때, 교차영역에 타켓 엘리먼트의 50%가 있을 때, 교차 영역에 타켓 엘리먼트의 100%가 있을 때 observe가 반응한다.
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    info.observer = observer;
    startObserver();
    // observer.observe(target);
  }, []);

  const endLineTarget = () => {
    return (
      <>
        <div className={observerClassName}></div>
        {/* detect EndLine */}
      </>
    );
  };
  return { stopObserver, endLineTarget };
};
export default useIntersectObserver;
