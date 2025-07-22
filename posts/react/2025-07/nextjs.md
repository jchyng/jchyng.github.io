---
title: "nextJS dynamic route"
date: "2025-07-10"
category: "기술정리"
excerpt: "useState, useEffect, useCallback 등 자주 사용하는 Hook들의 올바른 사용법과 주의사항들을 정리해보았다. 특히 의존성 배열 관리가 중요하다."
tags: ["React", "Hook", "useState", "useEffect", "최적화"]
---

# React Hook 사용 패턴 정리

React Hook을 사용하면서 자주 실수하거나 헷갈리는 부분들을 정리해보았다.

## useState

가장 기본적인 Hook이지만, 함수형 업데이트 패턴을 놓치기 쉽다.

```javascript
// ❌ 잘못된 사용
const [count, setCount] = useState(0);
const increment = () => setCount(count + 1);

// ✅ 올바른 사용
const increment = () => setCount(prev => prev + 1);
```

### 왜 함수형 업데이트를 사용해야 할까?

1. **클로저 문제 해결**: 이벤트 핸들러에서 오래된 state 값을 참조하는 문제 방지
2. **연속 업데이트**: 여러 번 호출되어도 올바른 값으로 업데이트
3. **성능**: 불필요한 리렌더링 방지

## useEffect

의존성 배열 관리가 가장 중요하다.

```javascript
// ❌ 무한 렌더링 위험
useEffect(() => {
  setData(fetchData());
}, [data]);

// ✅ 적절한 의존성 관리
useEffect(() => {
  const fetchAndSetData = async () => {
    const result = await fetchData();
    setData(result);
  };
  fetchAndSetData();
}, []); // 빈 배열로 마운트 시에만 실행
```

### useEffect 패턴들

1. **마운트 시에만 실행**
```javascript
useEffect(() => {
  // 초기화 로직
}, []);
```

2. **특정 값 변화 감지**
```javascript
useEffect(() => {
  // userId가 변할 때마다 실행
}, [userId]);
```

3. **cleanup 함수**
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    // 타이머 로직
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

## useCallback과 useMemo

성능 최적화를 위해 사용하지만, 과도한 사용은 오히려 성능을 해칠 수 있다.

### 언제 사용해야 할까?

1. **자식 컴포넌트에 props로 전달되는 함수**
2. **다른 Hook의 의존성 배열에 포함되는 함수**
3. **비용이 큰 계산 결과**

```javascript
// useCallback 예시
const handleClick = useCallback((id) => {
  onItemClick(id);
}, [onItemClick]);

// useMemo 예시
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

## 커스텀 Hook 만들기

로직을 재사용하기 위해 커스텀 Hook을 만들 때의 패턴:

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue];
}
```

### 커스텀 Hook의 장점

1. **로직 재사용**: 여러 컴포넌트에서 동일한 로직 사용
2. **관심사 분리**: 컴포넌트는 UI에만 집중
3. **테스트 용이성**: 로직을 독립적으로 테스트 가능

## 실제 사용 예시

실제 프로젝트에서 자주 사용하는 패턴:

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await api.getUser(userId);
        
        if (!isCancelled) {
          setUser(userData);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setUser(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // cleanup 함수로 race condition 방지
    return () => {
      isCancelled = true;
    };
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}
```

## 마무리

Hook을 제대로 이해하고 사용하면 React 개발이 훨씬 즐거워진다. 특히 의존성 배열과 함수형 업데이트 패턴은 반드시 숙지하자.

핵심은 **언제, 왜 사용하는지**를 이해하는 것이다. 무작정 사용하기보다는 각 Hook의 목적을 명확히 하고 적절한 곳에 사용하는 것이 중요하다.